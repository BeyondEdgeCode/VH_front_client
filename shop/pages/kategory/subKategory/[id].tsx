import { ReactNode } from 'react';
import { HomeProps, Product, ProductFilter } from '../../../type.store';
import {
    getCategory,
    getProductsById,
    getSubCategoryFilterById,
} from '../../../utilsFunctions/GetFromAPI';
import { Layout } from '../../../components/layout/layout';
import { ProductCard } from '../../../components/ProductCard/productCard';
import { setNewCategoryState } from '../../../components/ui-kit/button/dropDown/category.store';
import { KategoryScrean } from '../../../components/kategory/kategoryScrean';
import { FilterCollectorContainer } from '../../../components/filters/filter-collector/filter-collector.container';

interface KategoryProps extends HomeProps {
    products: Array<Product>;
    filters: Array<ProductFilter>;
    category_id: number;
}

// set description when it was-
const mapProductsFromAPI = (data: Array<Product>): Array<ReactNode> => {
    return data.map((el) => (
        <ProductCard
            id={el.id}
            maxWidth={225}
            height={400}
            description={el.title}
            price={el.price}
            hasSale={false}
            isNew={false}
            img={el.image_link}
            key={el.image_link}
        />
    ));
};

const TOGL_FILTER: ProductFilter = {
    id: '',
    is_filter: true,
    key: '',
    type: 'toggle',
    values: {},
};

const Kategory = ({
    category,
    products,
    filters,
    category_id,
}: KategoryProps) => {
    setNewCategoryState(category);
    const cards = mapProductsFromAPI(products);

    return (
        <Layout mode={'horizontal'}>
            <FilterCollectorContainer
                filters={[TOGL_FILTER, ...filters]}
                category_id={category_id}
            />
            <KategoryScrean cards={cards} />
        </Layout>
    );
};

// @ts-ignore
export async function getServerSideProps({ params }: { id: string }) {
    const category = await getCategory();
    const products = await getProductsById(Number(params.id), true);

    const filters = await (
        await getSubCategoryFilterById(Number(params.id))
    ).sort((f1, f2) => Number(f1.id) - Number(f2.id));

    return {
        props: {
            category,
            products,
            filters,
            category_id: Number(params.id),
        },
    };
}

export default Kategory;
