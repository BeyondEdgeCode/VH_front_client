import { ReactNode } from 'react';
import { BaseFilter } from '../../components/filters/baseFilter';
import { KategoryScrean } from '../../components/kategory/kategoryScrean';
import { Layout } from '../../components/layout/layout';
import { ProductCard } from '../../components/ProductCard/productCard';
import { setNewCategoryState } from '../../components/ui-kit/button/dropDown/category.store';
import img from '../../public/img/tovar1.jpg';
import { HomeProps, Product } from '../../type.store';
import { getCategory, getProductsById } from '../../utilsFunctions/GetFromAPI';


const filterTogle = {
  type: 'togle',
  value: [
    {
      value: 'Все товары',
      state: true
    },
    {
      value: 'В наличии',
      state: false
    }
  ], 
}

const priceSeparation = {
  type: 'price',
  value: [
    {
      value: 'от',
      state: 0,
    },
    {
      value: 'до',
      state: null,
    }
  ],
}

const selectboxFilter = {
  type: 'selectbox',
  label: "Срок доставки",
  value: [
    {
      value: 'Сегодня или завтра',
      state: true,
    },
    {
      value: 'До 5 дней',
      state: false
    },
    {
      value: 'Любая',
      state: false
    },
  ]
} 

const checkBoxFilter = {
  type: 'checkbox',
  label: "Объем",
  value: [
    {
      value: '10ml',
      state: false

    },
    {
      value: '20ml',
      state: false
    },
    {
      value: '30ml',
      state: false
    },
    {
      value: '40ml',
      state: false
    },
  ]
}

const filters= [
  filterTogle,
  priceSeparation,
  selectboxFilter,
  checkBoxFilter,
];

interface KategoryProps extends HomeProps {
  products: Array<Product>,
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


const Kategory= ({category, products}: KategoryProps) => {
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
  
  return {
    props: {
      category,
      products,
    },
  }
}
  
export default Kategory