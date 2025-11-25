export const getBlogs = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const skip = parseInt(req.query.skip) || 0;

        const { author, category } = req.query;
        const filter = { published: true };

        if (author) filter.authorId = author;
        if (category) filter.category = category.toLowerCase();

        if (!author && !category) {
            return res.status(400).json({ message: "Provide either author or category" });
        }

        const blogs = await Blog.find(filter)
            .sort({ createdAt: -1 })
            .select("-htmlContent -tags -blogPics")
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
