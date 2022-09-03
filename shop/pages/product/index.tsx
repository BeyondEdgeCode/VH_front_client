import { Layout } from "../../components/layout/layout";
import { ProductPreview } from "../../components/ProductPreview/productPreview";
import { setNewCategoryState } from "../../components/ui-kit/button/dropDown/category.store";
import { HomeProps, Product } from "../../type.store";
import { getCategory } from "../../utilsFunctions/GetFromAPI";

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
        <ProductPreview />
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

