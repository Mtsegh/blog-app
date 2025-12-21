import { Navigate, useParams } from 'react-router-dom'
import BlogEditor from '../../components/BlogEditor'
import useBlogStore from '../../store/useBlogStore'
import useAuthStore from '../../store/useAuthStore';
import { useEffect } from 'react';
import { LoadingSpinner } from '../../components';

export default function EditBlogPage() {
    const { slug } = useParams();
    
    const { blogData, getCategories, isLoadingBlog, getBlog } = useBlogStore();
    const { authUser } = useAuthStore();

    useEffect(() => {
        console.log("am here");
        
        getBlog(slug);
        getCategories();
    }, [slug, getBlog, getCategories]);
    
    if (!isLoadingBlog && blogData && blogData.authorId !== authUser._id) {
        console.log("Redirecting...", blogData, authUser);
        return (<Navigate to={`/${slug}`} replace/>)
    }
    
    if (isLoadingBlog || !blogData) {
        return <LoadingSpinner />
    }
    
    return (
        <BlogEditor
            content={blogData.htmlContent}
            formData={{
                title: blogData.title,
                base64Img: blogData.coverImage,
                selectedCategory: blogData.category,
                tags: blogData.tags,
                slug: blogData.slug,
            }}
        />
    )
}
