import Link from 'next/link';
import { useObservable } from '../../../../utilsFunctions/useHook';
import { category$ } from './category.store';
import css from './dropDown.module.css';

export const DropDown = () => {
    const category = useObservable(category$) ?? [];
    return (
        <div className={css.main_menu}>
            <ul>
                <li className={css.title}>
                    Категории товаров
                    <ul>
                        {category.map((el) => {
                            if (el.subcategories.length > 0) {
                                return (
                                    <li key={el.id}>
                                        <Link href={`/kategory/${el.id}`}>
                                            {el.title}
                                        </Link>
                                        <ul className={css.subList}>
                                            {el.subcategories.map((sub) => (
                                                <Link
                                                    href={`/kategory/subKategory/${sub.id}`}
                                                    key={sub.id}
                                                >
                                                    <li>{sub.title}</li>
                                                </Link>
                                            ))}
                                        </ul>
                                    </li>
                                );
                            }
                            return (
                                <Link href={`/kategory/${el.id}`} key={el.id}>
                                    <li>{el.title}</li>
                                </Link>
                            );
                        })}
                    </ul>
                </li>
            </ul>
        </div>
    );
};
