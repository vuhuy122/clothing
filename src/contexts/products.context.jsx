import { createContext, useEffect, useState } from 'react';
import DATA_PROD from '../shop-data.json'
// as the actual value you want to access
export const ProductContext = createContext({
    product: [],
});

export const ProductProvider = ({ children }) => {
    const [product, setProduct] = useState(null);

    const value = { product, setProduct }

    useEffect(() => {
        const unsubscribe = () => {
            if (DATA_PROD) {
                setProduct(DATA_PROD)
            }
        }
        return unsubscribe
    }, [])
    return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
}