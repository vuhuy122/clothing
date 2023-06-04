
import { useSelector } from 'react-redux';
import CategoryPreview from '../../components/category-preview/category-preview.component';
import { selectorCategoriesMap } from '../../store/category/category.selector';

const CategoriesPreview = () => {
    const categories = useSelector(selectorCategoriesMap)
    return (
        <>
            {
                Object?.keys(categories).map(title => {
                    const product = categories[title]
                    return <CategoryPreview key={title} products={product} title={title} />
                })
            }
        </>
    )
}
export default CategoriesPreview