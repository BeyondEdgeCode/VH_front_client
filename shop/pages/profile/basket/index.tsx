import { useEffect, useState } from 'react';
import { BasketAside } from '../../../components/basketAside/basketAside';
import { KategoryScrean } from '../../../components/kategory/kategoryScrean';
import { Layout } from '../../../components/layout/layout';
import { ProductCard } from '../../../components/ProductCard/productCard';
import { setNewCategoryState } from '../../../components/ui-kit/button/dropDown/category.store';
import img from '../../../public/img/tovar1.jpg';
import { BasketData, HomeProps } from '../../../type.store';
import { getBasket, getCategory } from '../../../utilsFunctions/GetFromAPI';

// const MOKE_SLIDE_EL = [
//     <ProductCard
//         key={1}
//         maxWidth={225}
//         height={400}
//         description={'Rell Strawberry Watermelon bla bla 30ml'}
//         price={350}
//         img={img.src}
//         onClick={(): void => {
//             console.log();
//         }}
//         id={0}
//     />,
//     <ProductCard
//         key={1}
//         maxWidth={225}
//         height={400}
//         description={'Rell Strawberry Watermelon bla bla 30ml'}
//         price={350}
//         img={img.src}
//         onClick={(): void => {
//             console.log();
//         }}
//         id={0}
//     />,
//     <ProductCard
//         key={1}
//         maxWidth={225}
//         height={400}
//         description={'Rell Strawberry Watermelon bla bla 30ml'}
//         price={350}
//         img={img.src}
//         onClick={(): void => {
//             console.log();
//         }}
//         id={0}
//     />,
//     <ProductCard
//         key={1}
//         maxWidth={225}
//         height={400}
//         description={'Rell Strawberry Watermelon bla bla 30ml'}
//         price={350}
//         img={img.src}
//         onClick={(): void => {
//             console.log();
//         }}
//         id={0}
//     />,
//     <ProductCard
//         key={1}
//         maxWidth={225}
//         height={400}
//         description={'Rell Strawberry Watermelon bla bla 30ml'}
//         price={350}
//         img={img.src}
//         onClick={(): void => {
//             console.log();
//         }}
//         id={0}
//     />,
//     <ProductCard
//         key={1}
//         maxWidth={225}
//         height={400}
//         description={'Rell Strawberry Watermelon bla bla 30ml'}
//         price={350}
//         img={img.src}
//         onClick={(): void => {
//             console.log();
//         }}
//         id={0}
//     />,
// ];

const mapBasketCards = (basket: BasketData | undefined) =>
    basket
        ? basket.products.map((product) => (
              <ProductCard
                  key={product.id}
                  maxWidth={225}
                  height={400}
                  description={product.product.title}
                  price={350}
                  img={product.product.image_link}
                  id={product.id}
                  count={product.amount}
              />
          ))
        : [<></>];

interface BasketProps extends HomeProps {}

const Basket = ({ category }: BasketProps) => {
    setNewCategoryState(category);
    const [basket, setBasket] = useState<BasketData>();

    useEffect(() => {
        //@ts-ignore
        getBasket(localStorage.getItem('JWT')).then((e) => setBasket(e));
    }, []);

    return (
        <Layout mode={'horizontal'}>
            <BasketAside />
            <KategoryScrean cards={mapBasketCards(basket)} />
        </Layout>
    );
};

export async function getStaticProps() {
    const category = await getCategory();
    return {
        props: {
            category,
        },
    };
}

export default Basket;
