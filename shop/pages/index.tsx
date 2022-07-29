import type { GetServerSidePropsContext, NextPage } from 'next';
import { Layout } from '../components/layout/layout';
import { ProductCard } from '../components/ProductCard/productCard';
import { BaseSwiper } from '../components/swiper/bigSwiper/BaseSwiper';
import { MediumSwiper } from '../components/swiper/longSwiper/mediumSwiper';
import img from '../public/img/tovar1.jpg';
import nookies, { parseCookies, setCookie } from 'nookies';
import { useEffect } from 'react';
import { useCookieisNewUser } from '../utilsFunctions/useHook';


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
type HomeProps = {
  prop: {
    [key: string]: string;
  }
}
const Home = ({prop}:HomeProps) => {

  // useCookieisNewUser(prop);
  useCookieisNewUser();


  return (
    <Layout mode={'vertical'}>
      <BaseSwiper />

      <MediumSwiper slides={MOKE_SLIDE_EL} widthSlide={225} label={'Распродажа'}/>
      <MediumSwiper slides={MOKE_SLIDE_EL} widthSlide={225} label={'Хиты продаж'}/>
    </Layout>
  )
}


export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const cookies = nookies.get(ctx);
  return {
    props: { params: cookies },
  };
}

export default Home

