import { Category } from '../../../../utilsFunctions/GetFromAPI';
import { useObservable } from '../../../../utilsFunctions/useHook';
import { category$ } from './category.store';
import css from './dropDown.module.css';


type DropDownProps = {
  category: Array<Category>,
}

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
                      {el.title}
                      <ul className={css.subList}>
                        {el.subcategories.map(el => (<li>{el.title}</li>))}
                      </ul>
                    </li>
                  );
                }
                return (
                  <li>{el.title}</li>
                );
              })}
            </ul>
          </li>
        </ul>
      </div>
    );
}