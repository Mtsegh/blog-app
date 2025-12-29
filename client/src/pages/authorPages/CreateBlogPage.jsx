import React from 'react'
import BlogEditor from '../../components/BlogEditor';
import useCategoryStore from '../../store/useCategoryStore';

export default function CreateBlogPage() {
    const { getCategories } = useCategoryStore();

    React.useEffect(() => {
        getCategories();
    }, [getCategories]);
    
    return (
        <BlogEditor />      
    )
}
