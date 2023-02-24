import { Layout } from '../../components/layout/layout'
import { ProductDescription } from '../../components/productDescription/productDescription'
import { ProductPreview } from '../../components/ProductPreview/productPreview'
import { Reviws } from '../../components/reviews/reviews'
import { setNewCategoryState } from '../../components/ui-kit/button/dropDown/category.store'
import { HomeProps, Product } from '../../type.store'
import {
    getCategory,
    getProductById,
    getProductsById,
} from '../../utilsFunctions/GetFromAPI'

import css from './product.module.css'

const Product = ({
    category,
    latestProduct,
    product,
}: HomeProps & {
    latestProduct: Array<Product>
    product: any
}) => {
    setNewCategoryState(category)
    console.log(product, latestProduct)

    return (
        <Layout mode={'vertical'}>
            <div className={css.mainInfpWrap}>
                <ProductPreview />
                <ProductDescription />
            </div>
            <Reviws />
        </Layout>
    )
}

// @ts-ignore
export async function getServerSideProps({ params }: { id: string }) {
    const category = await getCategory()
    const ProductData = await getProductById(Number(params.id))
    console.log(ProductData, 'ALARM')

    return {
        props: {
            category,
            product: ProductData,
        },
    }
}

export default Product
