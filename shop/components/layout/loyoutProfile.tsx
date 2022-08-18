import { ReactNode } from "react";
import { Layout } from "./layout";

import css from './loyout.module.css';
import cn from 'classnames';
import { useCurrentPathname } from "../../utilsFunctions/routerUtils";
import { Button } from "../ui-kit/button/button";


type Layout = {
    children: ReactNode,
}

type ButtonGroupProps = {
    buttons: Array<{text:string, route: string}>,
}

const ButtonGroupTitles = [
    {
        text: 'Личные даннные',
        route: 'profile',
    }, 
    {
        text: 'Изменить пароль',
        route: '',
    }, 
    {
        text: 'Мои заказы',
        route: '',
    }, 
    {
        text: 'Избранное',
        route: '',
    }
];

const ButtonGroup = ({buttons}: ButtonGroupProps) => {
    const router = useCurrentPathname();
    console.log('qweqwe',router);
    
    return (
        <div className={css.buttonWrap}>
            {buttons.map(b => (<Button isActiveState={router !== b.route}>{b.text}</Button>))}
        </div>
    )
};

export const LoyoutProfile = ({children}: Layout) => {
    return (
        <Layout mode={'horizontal'}>
            <ButtonGroup buttons={ButtonGroupTitles} />
            {children}
        </Layout>
      )
}