import { BasketAside } from "../../../components/basketAside/basketAside"
import { KategoryScrean } from "../../../components/kategory/kategoryScrean";
import { Layout } from "../../../components/layout/layout"
import { ProductCard } from "../../../components/ProductCard/productCard";
import { setNewCategoryState } from "../../../components/ui-kit/button/dropDown/category.store";
import img from '../../../public/img/tovar1.jpg';
import { HomeProps } from "../../../type.store";
import { getCategory } from "../../../utilsFunctions/GetFromAPI";

const MOKE_SLIDE_EL = [
    <ProductCard 
      maxWidth={225}
      height={400}
      description={'Rell Strawberry Watermelon bla bla 30ml'}
      price={350}
      img={img.src} onClick={(): void  => {console.log(img.src)}}
    />,
    <ProductCard 
      maxWidth={225}
      height={400}
      description={'Rell Strawberry Watermelon bla bla 30ml'}
      price={350}
      img={img.src} onClick={(): void  => {console.log(img.src)}}
    />,
    <ProductCard 
      maxWidth={225}
      height={400}
      description={'Rell Strawberry Watermelon bla bla 30ml'}
      price={350}
      img={img.src} onClick={(): void  => {console.log(img.src)}}
    />,
    <ProductCard 
      maxWidth={225}
      height={400}
      description={'Rell Strawberry Watermelon bla bla 30ml'}
      price={350}
      img={img.src} onClick={(): void  => {console.log(img.src)}}
    />,
    <ProductCard 
      maxWidth={225}
      height={400}
      description={'Rell Strawberry Watermelon bla bla 30ml'}
      price={350}
      img={img.src} onClick={(): void  => {console.log(img.src)}}
    />,
    <ProductCard 
      maxWidth={225}
      height={400}
      description={'Rell Strawberry Watermelon bla bla 30ml'}
      price={350}
      img={img.src} onClick={(): void  => {console.log(img.src)}}
    />,
  ];


interface BasketProps extends HomeProps {}


const Basket = ({category}: BasketProps) => {
  setNewCategoryState(category);
  return (
    <Layout mode={'horizontal'}>
      <BasketAside />
      <KategoryScrean cards={MOKE_SLIDE_EL} />

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
  
export default Basket