import { Layout } from '../../components/layout/layout';
import { ProductDescription } from '../../components/productDescription/productDescription';
import { ProductPreview } from '../../components/ProductPreview/productPreview';
import { Reviws } from '../../components/reviews/reviews';
import { setNewCategoryState } from '../../components/ui-kit/button/dropDown/category.store';
import { HomeProps, Product, Reviews } from '../../type.store';
import {
    getCategory,
    getProductById,
    getReviews,
} from '../../utilsFunctions/GetFromAPI';

import css from './product.module.css';

const Product = ({
    category,
    product,
    reviews,
}: HomeProps & {
    product: Product;
    reviews: Array<Reviews>;
}) => {
    setNewCategoryState(category);
    console.log(reviews);

    return (
        <Layout mode={'vertical'}>
            <div className={css.mainInfpWrap}>
                <ProductPreview product={product} />
                <ProductDescription product={product} />
            </div>
            <Reviws reviews={reviews} />
        </Layout>
    );
};

// @ts-ignore
export async function getServerSideProps({ params }: { id: string }) {
    const category = await getCategory();
    const product = await getProductById(Number(params.id));
    const reviews = await getReviews(Number(params.id));

    return {
        props: {
            category,
            product,
            reviews,
        },
    };
}

export default Product;
