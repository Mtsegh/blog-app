import React from 'react'
import BlogEditor from '../../components/BlogEditor'
import useBlogStore from '../../store/useBlogStore';

export default function CreateBlogPage() {
    const { getCategories } = useBlogStore();

    React.useEffect(() => {
        getCategories();
    }, [getCategories]);
    
    return (
        <BlogEditor />      
    )
}
