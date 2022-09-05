import { Layout } from "../../components/layout/layout";
import { ProductDescription } from "../../components/productDescription/productDescription";
import { ProductPreview } from "../../components/ProductPreview/productPreview";
import { Reviws } from "../../components/reviews/reviews";
import { setNewCategoryState } from "../../components/ui-kit/button/dropDown/category.store";
import { HomeProps, Product } from "../../type.store";
import { getCategory } from "../../utilsFunctions/GetFromAPI";

import css from './product.module.css';

const Product = ({
    category,
  }: 
    HomeProps & {
      latestProduct: Array<Product>
    }
  ) => {
  setNewCategoryState(category);

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


export async function getStaticProps() {
  const category = await getCategory();
  return {
    props: {
      category,
    },
  }
}

export default Product

