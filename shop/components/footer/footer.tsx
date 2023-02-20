import Link from 'next/link'
import { SHOP_NAME } from '../../GlobalVarible/global'
import { Inst } from '../svg/Insta'
import { Tg } from '../svg/Tg'
import css from './footer.module.css'
import { v4 as uuidv4 } from 'uuid'

const PHONE = '+7 904 344-46-48'
const INST = 'https://www.instagram.com/accounts/login/?next=/vape_hookah161/'
const TG = 'https://t.me/vape_hooka'

type LinkAbout = {
    link: string
    name: string
}

const LINKS_ABOUT: Array<LinkAbout> = [
    {
        link: '',
        name: 'О нас',
    },
    {
        link: '',
        name: 'Доставка',
    },
    {
        link: '',
        name: 'Оплата',
    },
    {
        link: '',
        name: 'Обмен и возврат',
    },
    {
        link: '',
        name: 'Личный кабинет',
    },
    {
        link: '',
        name: 'Узнать статус заказа',
    },
]

export const Footer = () => {
    return (
        <footer className={css.footer}>
            <div className={css.wrap}>
                <div className={css['info-wrap']}>
                    <section className={css['contact-info']}>
                        <div className={css['contact-info__phone']}>
                            <span>По вопросам сотрудничества:</span>
                            <a href={`tel: +${PHONE}`}>{PHONE}</a>
                        </div>
                        <span>Мы в соцсетях</span>
                        <div className={css['contact-info__network']}>
                            <a href={TG} target="_blank" className="mr-1">
                                <Tg />
                            </a>
                            <a href={INST} target="_blank">
                                <Inst />
                            </a>
                        </div>
                    </section>
                    <section className={css.about}>
                        <>
                            <span className={css.about__label}>
                                Покупателю:
                            </span>
                            {LINKS_ABOUT.map((el) => (
                                <Link href={el.link} key={uuidv4()}>
                                    {el.name}
                                </Link>
                            ))}
                        </>
                    </section>
                </div>
                <div className={css.colontitul}>
                    <div className={css.policy}>
                        <span>ⓒ 2022 Интернет-магазин «{SHOP_NAME}»</span>
                        <span>Все права защищены</span>
                    </div>
                    <div className={css['age-policy']}>
                        <span className={css['age-policy__icon']}>+18</span>
                        <span className={css['age-policy__text']}>
                            Мы не продаём товары лицам моложе 18 лет
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
