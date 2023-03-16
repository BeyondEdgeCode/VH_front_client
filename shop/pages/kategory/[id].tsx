import Link from 'next/link';
import { NextRouter, useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';
import { FilterCollectorContainer } from '../../components/filters/filter-collector/filter-collector.container';
import { KategoryScrean } from '../../components/kategory/kategoryScrean';
import { Layout } from '../../components/layout/layout';
import { ProductCard } from '../../components/ProductCard/productCard';
import {
    kategoryProductData$,
    setNewKategoryProduct,
} from '../../components/stors/kategory-product.store';
import { setNewCategoryState } from '../../components/ui-kit/button/dropDown/category.store';
import { HomeProps, Product, ProductFilter } from '../../type.store';
import {
    getCategory,
    getCategoryFilterById,
    getProductsById,
} from '../../utilsFunctions/GetFromAPI';
import { useObservable } from '../../utilsFunctions/useHook';

interface KategoryProps extends HomeProps {
    products: Array<Product>;
    filters: Array<ProductFilter>;
    category_id: number;
}

// set description when it was
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
            key={el.id}
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
    const [cards, setCards] = useState<ReactNode[]>([]);

    setNewCategoryState(category);

    useEffect(() => {
        setNewKategoryProduct(products);
    }, [products]);

    const productfromStore = useObservable(kategoryProductData$);

    useEffect(() => {
        productfromStore && setCards(mapProductsFromAPI(productfromStore));
    }, [productfromStore]);

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
    const products = await getProductsById(Number(params.id));
    const filters = await (
        await getCategoryFilterById(Number(params.id))
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
