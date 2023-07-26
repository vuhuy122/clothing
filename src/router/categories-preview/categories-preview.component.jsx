
import { useSelector } from 'react-redux';
import CategoryPreview from '../../components/category-preview/category-preview.component';
import Spinner from '../../components/spinner/spinner.component';
import { selectorCategoriesIsloading, selectorCategoriesMap } from '../../store/category/category.selector';

const CategoriesPreview = () => {
    const categories = useSelector(selectorCategoriesMap)
    const isLoading = useSelector(selectorCategoriesIsloading)

    return (
        <>
            {isLoading ? <Spinner /> :
                Object?.keys(categories).map(title => {
                    const product = categories[title]
                    return <CategoryPreview key={title} products={product} title={title} />
                })
            }
        </>
    )
}
export default CategoriesPreview