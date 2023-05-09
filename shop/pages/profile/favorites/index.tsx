import { ReactNode, useEffect, useState } from 'react';
import { KategoryScrean } from '../../../components/kategory/kategoryScrean';
import { LoyoutProfile } from '../../../components/layout/loyoutProfile';
import { ProductCard } from '../../../components/ProductCard/productCard';
import { setNewCategoryState } from '../../../components/ui-kit/button/dropDown/category.store';
import { HomeProps, Product } from '../../../type.store';
import { getCategory, getFavorite } from '../../../utilsFunctions/GetFromAPI';
import { useJWT_2 } from '../../../utilsFunctions/useHook';

interface FavoritesProps extends HomeProps {
    favorites: Array<{ id: number; product: Product }>;
}

const mapProductsFromAPI = (
    data: Array<{ id: number; product: Product }>,
    onDelite: Function
): Array<ReactNode> => {
    return data.map((el) => (
        <ProductCard
            id={el.product.id}
            maxWidth={225}
            height={400}
            description={el.product.title}
            price={el.product.price}
            hasSale={false}
            isNew={false}
            img={el.product.image_link}
            key={el.id}
            onDelete={onDelite}
        />
    ));
};

const Favorites = ({ category }: FavoritesProps) => {
    const [isLoading, setIsLoading] = useState(true);
    const [favorites, setFavorites] = useState<
        Array<{ id: number; product: Product }>
    >([]);
    const jwt = useJWT_2();

    setNewCategoryState(category);

    useEffect(() => {
        jwt &&
            getFavorite(jwt).then((e) => {
                setFavorites(e);
                setIsLoading(false);
            });
    }, [jwt, setIsLoading]);

    return (
        <LoyoutProfile>
            <KategoryScrean
                cards={mapProductsFromAPI(favorites, setFavorites)}
                plug={'избранное пустое'}
                isLoading={isLoading}
                isAuth={!jwt}
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
