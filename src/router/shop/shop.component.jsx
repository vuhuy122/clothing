import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { fetchsetCategoriesStart } from '../../store/category/category.action';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category-component';
import './shop.styles.scss';

const Shop = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchsetCategoriesStart());
    }, [])

    return (
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=':category' element={<Category />} />
        </Routes>
    )
}
export default Shop