import { BasketAside } from "../../../components/basketAside/basketAside"
import { KategoryScrean } from "../../../components/kategory/kategoryScrean";
import { Layout } from "../../../components/layout/layout"
import { ProductCard } from "../../../components/ProductCard/productCard";
import img from '../../../public/img/tovar1.jpg';

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
  const MOKED_SLIDES = [
    <KategoryScrean cards={MOKE_SLIDE_EL} />,
    <KategoryScrean cards={MOKE_SLIDE_EL} />,
    <KategoryScrean cards={MOKE_SLIDE_EL} />,
    <KategoryScrean cards={MOKE_SLIDE_EL} />,
    <KategoryScrean cards={MOKE_SLIDE_EL} />,
  ]

const Basket = () => {
    return (
      <Layout mode={'horizontal'}>
        <BasketAside />
        <KategoryScrean cards={MOKE_SLIDE_EL} />

      </Layout>
    )
  }
  
export default Basket