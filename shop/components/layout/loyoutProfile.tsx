import { ReactNode, useEffect, useState } from 'react';
import { Layout } from './layout';

import css from './loyout.module.css';
import cn from 'classnames';
import { useCurrentPathname } from '../../utilsFunctions/routerUtils';
import { Button } from '../ui-kit/button/button';
import Link from 'next/link';
import { useRouter } from 'next/router';

type Layout = {
    children: ReactNode;
};

type ButtonGroupProps = {
    buttons: Array<{ text: string; route: string }>;
};

const ButtonGroupTitles = [
    {
        text: 'Личные даннные',
        route: 'profile',
    },
    {
        text: 'Изменить пароль',
        route: 'change-password',
    },
    {
        text: 'Мои заказы',
        route: 'orders',
    },
    {
        text: 'Избранное',
        route: 'favorites/',
    },
];

const ButtonGroup = ({ buttons }: ButtonGroupProps) => {
    const router = useCurrentPathname();
    const allRoute = useRouter();

    return (
        <div className={css.buttonWrap}>
            {buttons.map((b) => (
                <Link
                    href={`/profile/${b.route == 'profile' ? '' : b.route}`}
                    key={b.text}
                >
                    <Button
                        isActiveState={
                            router !== b.route &&
                            (b.route !== 'profile'
                                ? !allRoute.asPath.includes(
                                      b.route.split('/')[0]
                                  )
                                : true)
                        }
                    >
                        {b.text}
                    </Button>
                </Link>
            ))}
        </div>
    );
};

export const LoyoutProfile = ({ children }: Layout) => {
    return (
        <Layout mode={'vertical'}>
            <ButtonGroup buttons={ButtonGroupTitles} />
            {children}
        </Layout>
    );
};
