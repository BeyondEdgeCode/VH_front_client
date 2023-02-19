import { Layout } from "../../components/layout/layout";
import { ProductDescription } from "../../components/productDescription/productDescription";
import { ProductPreview } from "../../components/ProductPreview/productPreview";
import { Reviws } from "../../components/reviews/reviews";
import { setNewCategoryState } from "../../components/ui-kit/button/dropDown/category.store";
import { HomeProps, Product } from "../../type.store";
import { getCategory, getProductById, getProductsById } from "../../utilsFunctions/GetFromAPI";

import css from './product.module.css';

const Product = ({category, latestProduct, product}:HomeProps & {
      latestProduct: Array<Product>,
      product: any
    }
  ) => {
  setNewCategoryState(category);
  console.log(product, latestProduct);
  

  return (
    <Layout mode={'vertical'} >
        <div className={css.mainInfpWrap}>
            <ProductPreview />
            <ProductDescription />
        </div>
        <Reviws />
    </Layout>
  )
}

export async function getStaticPaths() {
    // const products = await getProductsById();

    // const paths = new Array(10000).map(i => i).map((id) => ({
    //   params: { id: `${id}` },
    // }));

    const paths = [{ params: { id: '1' } }, { params: { id: '2' } }];
  
    return { paths, fallback: false }
}

export async function getStaticProps() {
  const category = await getCategory();
  const ProductData = await getProductById(3);
  console.log(ProductData, 'ALARM');
  
  return {
    props: {
      category,
      product: ProductData
    },
  }
}

export default Product

