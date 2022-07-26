import type { NextPage } from 'next';
import { BaseFilter } from '../../components/filters/baseFilter';
import { KategoryScrean } from '../../components/kategory/kategoryScrean';
import { KategorySlider } from '../../components/kategorySlider/kategorySlider';
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
const MOKED_SLIDES = [
  <KategoryScrean cards={MOKE_SLIDE_EL} />,
  <KategoryScrean cards={MOKE_SLIDE_EL} />,
  <KategoryScrean cards={MOKE_SLIDE_EL} />,
  <KategoryScrean cards={MOKE_SLIDE_EL} />,
  <KategoryScrean cards={MOKE_SLIDE_EL} />,
]

const filterTogle = {
  type: 'togle',
  value: [{value: 'Все товары'}, {value: 'В наличии'}], 
}

const priceSeparation = {
  type: 'price',
  value: [{value: 'null'}],
}

const selectboxFilter = {
  type: 'selectbox',
  label: "Срок доставки",
  value: [
    {value: 'Сегодня или завтра'},
    {value: 'До 5 дней'},
    {value: 'Любая'},
  ]
} 

const checkBoxFilter = {
  type: 'checkbox',
  label: "Объем",
  value: [
    {value: '10ml'},
    {value: '20ml'},
    {value: '30ml'},
    {value: '40ml'},
  ]
}

const filters= [
  filterTogle,
  priceSeparation,
  selectboxFilter,
  checkBoxFilter,
];

// type BaseFilterProp = {
//   filters: Array<{
//     type: string,
//     label?: string,
//     value: Array<string | null>
//   }>
// };

const Home: NextPage = () => {
  return (
    <Layout mode={'horizontal'}>
        <BaseFilter filters={filters} />
        {/* <KategoryScrean cards={MOKE_SLIDE_EL} /> */}
        {/* <KategorySlider slides={MOKED_SLIDES} /> */}
    </Layout>
  )
}

export default Home
