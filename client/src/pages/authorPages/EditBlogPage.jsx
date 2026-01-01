import { Navigate, useParams } from 'react-router-dom'
import BlogEditor from '../../components/BlogEditor'
import useBlogStore from '../../store/useBlogStore'
import useAuthStore from '../../store/useAuthStore';
import { useEffect } from 'react';
import { LoadingSpinner } from '../../components';
import useCategoryStore from '../../store/useCategoryStore';

export default function EditBlogPage() {
    const { slug } = useParams();
    
    const { blogData, isLoadingBlog, getBlog } = useBlogStore();
    const { getCategories } = useCategoryStore();
    const { authUser } = useAuthStore();

    useEffect(() => {
  if (!slug) return;

  getBlog(slug);
  getCategories();
}, [slug, getBlog, getCategories]);

if (isLoadingBlog) {
  return <LoadingSpinner />;
}

    if (
        blogData &&
        authUser &&
        blogData.author?._id !== authUser._id
    ) {
        return <Navigate to={`/blog/${slug}`} replace />;
    }

    if (!blogData) {
        return <LoadingSpinner />;
    }

    return (
        <BlogEditor
            content={blogData.htmlContent}
            formData={{
                title: blogData.title,
                base64Img: blogData.coverImage,
                selectedTopics: blogData.category.slug,
                tags: blogData.tags,
                slug: blogData.slug,
            }}
        />
    );
}