import { ReactNode } from 'react'
import { KategoryScrean } from '../../components/kategory/kategoryScrean'
import { Layout } from '../../components/layout/layout'
import { ProductCard } from '../../components/ProductCard/productCard'
import { setNewCategoryState } from '../../components/ui-kit/button/dropDown/category.store'
import { HomeProps, Product } from '../../type.store'
import { getCategory, getProductsById } from '../../utilsFunctions/GetFromAPI'

interface KategoryProps extends HomeProps {
    products: Array<Product>
    // filters: Array<Filter>
}

// set description when it was
const mapProductsFromAPI = (data: Array<Product>): Array<ReactNode> => {
    return data.map((el) => (
        <ProductCard
            maxWidth={225}
            height={400}
            description={el.title}
            price={el.price}
            hasSale={false}
            isNew={false}
            img={el.image_link}
            onClick={(): void => {
                console.log()
            }}
            key={el.image_link}
        />
    ))
}

const Kategory = ({ category, products }: KategoryProps) => {
    setNewCategoryState(category)
    const cards = mapProductsFromAPI(products)

    return (
        <Layout mode={'horizontal'}>
            {/* <BaseFilter filters={filters} /> */}
            <KategoryScrean cards={cards} />
        </Layout>
    )
}

// @ts-ignore
export async function getServerSideProps({ params }: { id: string }) {
    const category = await getCategory()
    const products = await getProductsById(Number(params.id))

    return {
        props: {
            category,
            products,
        },
    }
}

export default Kategory
