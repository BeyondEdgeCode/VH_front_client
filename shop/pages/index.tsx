import { GET_CATEGORY } from '../components/API';
import { Layout } from '../components/layout/layout';
import { ProductCard } from '../components/ProductCard/productCard';
import { BaseSwiper } from '../components/swiper/bigSwiper/BaseSwiper';
import { MediumSwiper } from '../components/swiper/longSwiper/mediumSwiper';
import img from '../public/img/tovar1.jpg';
import { Category, getCategory } from '../utilsFunctions/GetFromAPI';
import axios from 'axios';
import { setNewCategoryState } from '../components/ui-kit/button/dropDown/category.store';



const MOKE_SLIDE_EL = [
  <ProductCard 
    maxWidth={225}
    height={400}
    description={'Rell Strawberry Watermelon bla bla 30ml'}
    price={350}
    hasSale={true}
    isNew={false}
    img={img.src} onClick={(): void  => {console.log(img.src)}}
  />,
  <ProductCard 
    maxWidth={225}
    height={400}
    description={'Rell Strawberry Watermelon bla bla 30ml'}
    price={350}
    hasSale={true}
    isNew={false}
    img={img.src} onClick={(): void  => {console.log(img.src)}}
  />,
  <ProductCard 
    maxWidth={225}
    height={400}
    description={'Rell Strawberry Watermelon bla bla 30ml'}
    price={350}
    hasSale={true}
    isNew={false}
    img={img.src} onClick={(): void  => {console.log(img.src)}}
  />,
  <ProductCard 
    maxWidth={225}
    height={400}
    description={'Rell Strawberry Watermelon bla bla 30ml'}
    price={350}
    hasSale={true}
    isNew={false}
    img={img.src} onClick={(): void  => {console.log(img.src)}}
  />,
  <ProductCard 
    maxWidth={225}
    height={400}
    description={'Rell Strawberry Watermelon bla bla 30ml'}
    price={350}
    hasSale={true}
    isNew={false}
    img={img.src} onClick={(): void  => {console.log(img.src)}}
  />,
  <ProductCard 
    maxWidth={225}
    height={400}
    description={'Rell Strawberry Watermelon bla bla 30ml'}
    price={350}
    hasSale={true}
    isNew={false}
    img={img.src} onClick={(): void  => {console.log(img.src)}}
  />,
];

export interface HomeProps {
  category: Array<Category>,
}

const Home = ({category}: HomeProps) => {
  setNewCategoryState(category);
  return (
    <Layout mode={'vertical'} >
      <BaseSwiper />

      <MediumSwiper slides={MOKE_SLIDE_EL} widthSlide={225} label={'Распродажа'}/>
      <MediumSwiper slides={MOKE_SLIDE_EL} widthSlide={225} label={'Хиты продаж'}/>
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

export default Home

