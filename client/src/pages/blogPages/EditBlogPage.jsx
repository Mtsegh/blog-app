import { Navigate } from 'react-router-dom'
import BlogEditor from '../../components/BlogEditor'
import useBlogStore from '../../store/useBlogStore'
import useAuthStore from '../../store/useAuthStore';

export default function EditBlogPage() {
    const { blogData } = useBlogStore();
    const { authUser } = useAuthStore();

    if (!blogData || blogData.authorId !== authUser) {
        return (<Navigate to={'/'} replace/>)
    }
    const { getCategories } = useBlogStore();

    React.useEffect(() => {
        getCategories();
    }, [getCategories]);

    const props = {
        content: blogData.htmlContent,
        formData: {
            title: blogData.title,
            base64Img: blogData.coverImage,
            selectedCategory: blogData.category,
            tags: blogData.tags,
        }
    }

    return (
        <BlogEditor props={props} />
    )
}
