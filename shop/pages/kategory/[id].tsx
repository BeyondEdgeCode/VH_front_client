import { ReactNode } from 'react';
import { BaseFilter } from '../../components/filters/baseFilter';
import { KategoryScrean } from '../../components/kategory/kategoryScrean';
import { Layout } from '../../components/layout/layout';
import { ProductCard } from '../../components/ProductCard/productCard';
import { setNewCategoryState } from '../../components/ui-kit/button/dropDown/category.store';
import img from '../../public/img/tovar1.jpg';
import { Filter, HomeProps, Product } from '../../type.store';
import { getCategory, getCategoryFilterById, getProductsById } from '../../utilsFunctions/GetFromAPI';

interface KategoryProps extends HomeProps {
  products: Array<Product>,
  filters: Array<Filter>
}

// set description when it was
const mapProductsFromAPI = (data: Array<Product>): Array<ReactNode> => {
  return data.map(el => 
    <ProductCard 
      maxWidth={225}
      height={400}
      description={el.title}
      price={el.price}
      hasSale={false}
      isNew={false}
      img={el.image_link} onClick={(): void  => {console.log(img.src)}}
  />)
}

const Kategory= ({category, products, filters}: KategoryProps) => {
    setNewCategoryState(category);
    const cards = mapProductsFromAPI(products);

  return (
    <Layout mode={'horizontal'}>
        <BaseFilter filters={filters} />
        <KategoryScrean cards={cards} />
    </Layout>
  )
}

export async function getStaticPaths() {
    const categorys = await getCategory();

    const paths = categorys.map((category) => ({
      params: { id: `${category.id}` },
    }));
  
    return { paths, fallback: false }
  }

// @ts-ignore
export async function getStaticProps({params}: {id:string}) {
  const category = await getCategory();
  const products = await getProductsById(Number(params.id));
  const filters = await getCategoryFilterById(Number(1));
  
  return {
    props: {
      category,
      products,
      filters,
    },
  }
}
  
export default Kategory
