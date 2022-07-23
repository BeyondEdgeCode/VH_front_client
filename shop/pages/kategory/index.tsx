import type { NextPage } from 'next';
import { BaseFilter } from '../../components/filters/baseFilter';
import { KategoryScrean } from '../../components/kategory/kategoryScrean';
import { Layout } from '../../components/layout/layout';
import { ProductCard } from '../../components/ProductCard/productCard';
import img from '../../public/img/tovar1.jpg';


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

const Home: NextPage = () => {
  return (
    <Layout mode={'horizontal'}>
        <BaseFilter />
        <KategoryScrean cards={MOKE_SLIDE_EL} />
    </Layout>
  )
}

export default Home
