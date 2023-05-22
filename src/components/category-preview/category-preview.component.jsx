import ProductCard from '../product-card/product-card.component'
import './category-preview.styles.jsx'
import { CategoryPreviewContainer, CateTitle, Preview } from './category-preview.styles.jsx'

const CategoryPreview = ({ title, products }) => {
    return (
        <CategoryPreviewContainer>
            <h2>
                <CateTitle to={title} >{title?.toUpperCase()}</CateTitle>
            </h2>
            <Preview>
                {products?.filter((_, idx) => idx < 4)
                    .map((product) => {
                        return (<ProductCard key={product.id} product={product} />)
                    })}
            </Preview>
        </CategoryPreviewContainer>
    )
}

export default CategoryPreview