import { ProductCard } from '../../../components/ProductCard/productCard';
import { AvalibleProducts } from './basket.view-model';

export const mapBasketCards = (
    availableProducts: AvalibleProducts,
    inc?: (id: number, newCount: number) => void,
    dec?: (id: number, newCount: number) => void,
    onDelete?: (id: number) => void
) =>
    availableProducts
        ? availableProducts.map(({ product, amount }) => (
              <ProductCard
                  key={product.id}
                  maxWidth={89}
                  height={100}
                  description={product.title}
                  price={product.price}
                  img={product.image_link}
                  id={product.id}
                  count={amount}
                  isAvailible={true}
                  incCb={inc}
                  decCb={dec}
                  onDelete={onDelete}
              />
          ))
        : [<></>];

export const mapBasketCardsNotAvaileble = (
    availableProducts: AvalibleProducts,
    onDelete?: (id: number) => void
) =>
    availableProducts
        ? availableProducts.map(({ product, amount }) => (
              <ProductCard
                  key={product.id}
                  maxWidth={89}
                  height={100}
                  description={product.title}
                  price={product.price}
                  img={product.image_link}
                  id={product.id}
                  count={amount}
                  isAvailible={false}
                  onDelete={onDelete}
              />
          ))
        : [<></>];
