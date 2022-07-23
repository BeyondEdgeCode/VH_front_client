import Head from 'next/head';
import { ReactNode } from "react";
import { SHOP_NAME } from '../../GlobalVarible/global';
import { Footer } from "../footer/footer";
import { Header } from "../header/header";
import cn from 'classnames';

import css from './loyout.module.css';

type Layout = {
    children: ReactNode,
    title?: string
    mode: 'vertical' | 'horizontal';
}

export const Layout = ({children, title = SHOP_NAME, mode}: Layout) => {
    return (
        <>
        <Head>
            <title>{title}</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
            <script src="https://kit.fontawesome.com/f94f1e7176.js" crossOrigin="anonymous"></script>
        </Head>
        <Header />
            <main className={cn(css.wrap, {[css.horizontal]: mode == 'horizontal'})}>
                {children}
            </main>
        <Footer />
        </>
    );
}