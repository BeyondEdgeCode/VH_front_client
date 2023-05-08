import { ReactNode } from 'react';
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
    buttons: Array<{ text: string; route: string; icon: string }>;
};

const ButtonGroupTitles = [
    {
        text: 'Мои заказы',
        route: 'orders',
        icon: 'fa-box',
    },
    {
        text: 'Избранное',
        route: 'favorites/',
        icon: 'fa-heart',
    },
    {
        text: 'Личные даннные',
        route: 'profile',
        icon: 'fa-cogs',
    },
    // {
    //     text: 'Изменить пароль',
    //     route: 'change-password',
    //     icon: 'fa-box',
    // },
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
                    <div
                        className={cn(css.navWrap, {
                            [css.navWrapActive]:
                                router == b.route &&
                                (b.route == 'profile'
                                    ? allRoute.asPath.includes(
                                          b.route.split('/')[0]
                                      )
                                    : true),
                        })}
                    >
                        <i
                            className={cn('fa-solid', 'fa-2x', 'mr-2', b.icon)}
                        ></i>
                        <span>{b.text}</span>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export const LoyoutProfile = ({ children }: Layout) => {
    return (
        <Layout mode={'horizontal'}>
            <ButtonGroup buttons={ButtonGroupTitles} />
            {children}
        </Layout>
    );
};
