import { sendEmailsToSubscribers } from "../emails/emailHandler.js";
import { Blog } from "../models/blogModel.js";
import slugify from "slugify";
import { uploadToCloudinary } from "../utils/cloudinary.uploader.js";
import proccessBlogHtml, { handleBase64OrLink } from "../utils/handleHtml.js";
import getExcerpt from "../utils/createExcerpt.js";
import User from "../models/userModel.js";
import Topics from "../models/topicsModel.js";


export const getAllBlogs = async (req, res) => {
    try {
        // Fetch all blogs sorted by createdAt descending
        const limit = parseInt(req.query.limit) || 10;
        const skip = parseInt(req.query.skip) || 0;
        const blogs = await Blog.find({ published: true })
            .sort({ publishedAt: -1 })
            .select("-htmlContent -tags -blogpics")
            .populate("author", "fullname userSlug profileImage")
            .populate("category", "_id name slug")
            .skip(skip)
            .limit(limit)
            .lean();
        
        if (!blogs) return res.status(404).json({ message: "No written stories yet. Check later" });


        res.status(200).json({ count: blogs.length, skip, limit, blogs, });
    } catch (error) {
        console.log("Error in getAllBlogs controller: ", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getBlog = async (req, res) => {
    try {
        const { slug } = req.params;

        const filter = { slug };
        let update;

        if (!req.user) {
            filter.published = true;
            update = { $inc: { views: 1 } };
        } else {
            filter.$or = [
                { published: true },
                { author: req.user._id }
            ];
        }

        const blog = await Blog.findOneAndUpdate(
            filter,
            update,
            { new: true }
        )
        .populate("author", "fullname userSlug profileImage")
        .lean();

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        res.status(200).json(blog);
    } catch (error) {
        console.error("Error in getBlog controller:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};



export const getBlogs = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const skip = parseInt(req.query.skip) || 0;
        
        const { author, category, drafts } = req.query;
        const filter = { };

        if (author) filter.author = author;
        if (category) filter.category = category;
        
        if (drafts === "true") {
            filter.published = false;  
        } else {
            filter.published = true;
        }
        
        if (!author && !category) {
            return res.status(400).json({ message: "Invalid request" });
        }

        const blogs = await Blog.find(filter)
            .sort({ createdAt: -1 })
            .select("-htmlContent -tags -blogPics")
            .populate("author", "fullname userSlug profileImage")
            .populate("category", "_id name slug")
            .skip(skip)
            .limit(limit);

        if (blogs.length === 0) {
            return res.status(404).json({ message: "No blogs found" });
        }

        res.status(200).json({ count: blogs.length, skip, limit, blogs });
        
    } catch (error) {
        console.error("Error in getBlogs controller:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


export const createBlog = async (req, res) => {
    try {
        const { title, htmlContent, coverImage, tags, category } = req.body;
        
        if (!title || !htmlContent || !coverImage || !tags || !category) return res.status(400).json({ message: "Invalid Blog. Make sure Blog is complete befor submiting" });

        const author = req.user._id;

        let slug = slugify(title, { lower: true, strict: true });
        let existing = await Blog.findOne({ slug });
        let counter = 1;

    // Append number if slug already exists
        while (existing) {
            slug = `${slugify(title, { lower: true, strict: true })}-${counter}`;
            existing = await Blog.findOne({ slug });
            counter++;
        }

        const proccessedHTML = await proccessBlogHtml(htmlContent);
        const excerpt = getExcerpt(proccessedHTML);

        const savedCoverImg = await uploadToCloudinary([coverImage], {folder: "blogs/content"});
        if (savedCoverImg.error) return res.status(500).json({ message: savedCoverImg.error });

        const newBlog = new Blog({
            author,
            title,
            slug,
            htmlContent: proccessedHTML,
            excerpt,
            coverImage: savedCoverImg[0],
            tags,
            category,
        })

        if (newBlog) {
            await newBlog.save()
            res.status(201).json(newBlog);
        } else {
            res.status(400).json({ message: "invalid blog data" })
        }
    } catch (error) {
        console.log("Error in createBlog controller: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const editBlog = async (req, res) => {
    try {
        const { title, slug, htmlContent, coverImage, tags, category } = req.body;
        if (!title || !slug || !htmlContent || !coverImage || !tags || !category) return res.status(400).json({ message: "Invalid Blog. Make sure Blog is complete before submiting" });

        const proccessedHTML = await proccessBlogHtml(htmlContent);
        const excerpt = getExcerpt(proccessedHTML);

        const coverImageLink = await handleBase64OrLink(coverImage);

        const newBlog = await Blog.findOneAndUpdate({
                slug
            },            
            {
                title,
                htmlContent: proccessedHTML,
                excerpt,
                coverImage: coverImageLink,
                category,
                tags,
            },
            {
                new: true
            }
        )

        if (newBlog) {
            res.status(201).json(newBlog);
        } else {
            res.status(400).json({ message: "invalid blog data" })
        }
    } catch (error) {
        console.log("Error in editBlog controller: ", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const publish = async (req, res) => {
  try {
    const { slug } = req.params;
    const author = req.user._id; // assuming logged-in user

    const blog = await Blog.findOneAndUpdate({ slug, author }, { published: true }, { new: true });
    
    if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
    }
    // Find subscribers (both author and category)
    // const [authorSubs, categorySubs] = await Promise.all([
    //     Subscription.find({ subscribeType: "User", subscribeTo: blog.authorId }).select("email -_id"),
    //     Subscription.find({ subscribeType: "Topics", subscribeTo: blog.category }).select("email -_id"),
    // ]);

    // Combine and remove duplicates
    // const allEmails = [...new Set([...authorSubs.map(s => s.email), ...categorySubs.map(s => s.email)])];

    // if (allEmails.length > 0) {
    //     await sendEmailsToSubscribers(allEmails, blog.excerpt);
    // }

    res.status(200).json({ message: "Blog published and notifications sent", blog });
  } catch (err) {
        console.error("Error publishing blog:", err.message);
        res.status(500).json({ message: "Internal Server Error" });
  }
};

export const likeBlog = async (req, res) => {
    try {
        const { slug } = req.params;

        const blog = await Blog.findOne({ slug });
        if (!blog) return res.status(404).json({ message: "Blog not found" });

        // Increment likes count
        blog.likes = (blog.likes || 0) + 1;
        await blog.save();

        res.status(200).json({ likesCount: blog.likes });
    } catch (error) {
        console.error("Error in visitor like:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


export const deleteBlog = async (req, res) => {
  try {
    const { slug } = req.params;
    const authorId = req.user._id; // assuming logged-in user

    const blog = await Blog.findOneAndDelete({ authorId, slug });

    if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (err) {
        console.error("Error deleting blog:", err.message);
        res.status(500).json({ message: "Internal Server Error" });
  }
};

export const searchBlogs = async (req, res) => {
    try {
        const { q, sortBy = "createdAt" } = req.query;
        const limit = Number(req.query.limit) || 10;
        const skip = Number(req.query.skip) || 0;

        if (!q?.trim()) {
            return res.status(400).json({ message: "Search cannot be empty" });
        }

        const searchRegex = new RegExp(q, "i");

        // Find matching authors
        const authors = await User.find(
            { fullname: searchRegex },
            { _id: 1 }
        );
        const authorIds = authors.map(a => a._id);

        // Find matching categories
        const categories = await Topics.find(
            { name: searchRegex },
            { _id: 1 }
        );
        const categoryIds = categories.map(c => c._id);

        const filter = {
            published: true,
            $or: [
                { title: searchRegex },
                { tags: { $in: [searchRegex] } },
                { author: { $in: authorIds } },
                { category: { $in: categoryIds } },
            ],
        };

        const validSorts = ["createdAt", "views", "likes"];
        const sortField = validSorts.includes(sortBy) ? sortBy : "createdAt";

        const blogs = await Blog.find(filter)
            .populate("author", "fullname")
            .populate("category", "name")
            .select("-htmlContent -blogpics")
            .sort({ [sortField]: -1 })
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            success: true,
            blogs,
            skip,
            limit,
            query: q,
        });
    } catch (error) {
        console.error("searchBlogs error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


