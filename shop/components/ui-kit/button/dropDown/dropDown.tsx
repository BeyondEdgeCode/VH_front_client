import Link from 'next/link';
import { useObservable } from '../../../../utilsFunctions/useHook';
import { category$ } from './category.store';
import css from './dropDown.module.css';


export const DropDown = () => {
    const category = useObservable(category$) ?? []; 
    return (
      <div className={css.main_menu}>
        <ul>
          <li className={css.title}>Категории товаров
            <ul>
              {category.map(el => {
                if(el.subcategories.length>0) {
                  return (
                    <li>
                      <Link href={`/kategory/${el.id}`}>
                        {el.title}
                      </Link>
                      <ul className={css.subList}>
                        {el.subcategories.map(el => (<li>{el.title}</li>))}
                      </ul>
                    </li>
                  );
                }
                return (
                  <Link href={`/kategory/${el.id}`}>
                    <li>{el.title}</li>
                  </Link>
                );
              })}
            </ul>
          </li>
        </ul>
      </div>
    );
}