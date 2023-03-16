import { ReactNode, useEffect, useState } from 'react';
import { KategoryScrean } from '../../components/kategory/kategoryScrean';
import { LoyoutProfile } from '../../components/layout/loyoutProfile';
import { ProductCard } from '../../components/ProductCard/productCard';
import { setNewCategoryState } from '../../components/ui-kit/button/dropDown/category.store';
import { HomeProps, Product } from '../../type.store';
import { getCategory, getFavorite } from '../../utilsFunctions/GetFromAPI';
import { useJWT } from '../../utilsFunctions/useHook';

interface FavoritesProps extends HomeProps {
    // favorite: Array<Product>;
}

const mapProductsFromAPI = (
    data: Array<{ id: number; product: Product }>
): Array<ReactNode> => {
    return data.map((el) => (
        <ProductCard
            id={el.id}
            maxWidth={225}
            height={400}
            description={el.product.title}
            price={el.product.price}
            hasSale={false}
            isNew={false}
            img={el.product.image_link}
            onClick={() => {}}
            key={el.id}
        />
    ));
};

const Favorites = ({ category }: FavoritesProps) => {
    setNewCategoryState(category);
    const [favorites, setFavorites] = useState<
        Array<{ id: number; product: Product }>
    >([]);

    useEffect(() => {
        //@ts-ignore
        const favorite = getFavorite(localStorage.getItem('JWT')).then((e) =>
            setFavorites(e)
        );
    }, []);

    return (
        <LoyoutProfile>
            <KategoryScrean
                cards={mapProductsFromAPI(favorites)}
                plug={'избранное пустое'}
            />
        </LoyoutProfile>
    );
};

export async function getServerSideProps() {
    const category = await getCategory();
    return {
        props: {
            category,
        },
    };
}

export default Favorites;
