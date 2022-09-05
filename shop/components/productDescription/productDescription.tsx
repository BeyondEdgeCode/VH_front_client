import { ProductDescriptionProp } from '../../type.store';
import { Rating } from '../rating/rating';
import css from './productDescription.module.css';



const CharacteristicsPiece = ({characteristics}: Pick<ProductDescriptionProp, 'characteristics'>) => {
    return (
        <>
           {characteristics.map(c => (
                <div className={css.characteristics__piece}>
                    <span className={css.characteristics__title}>{c.title}</span>
                    <div className={css.characteristics__dots}></div>
                    <span>{c.text}</span>
                </div>
            ))}
        </>
    );
};

const CHARACTERISTICSPIECE_MOCK= [
    {
        title: 'Цвет:',
        text: 'Тёмный океон в свету луны',
    },
    {
        title: 'Вес',
        text: '3 года строгого режима',
    },
    {
        title: 'Упаковка',
        text: 'Блатная',
    }
];

export const ProductDescription = () => {
    return (
        <div className={css.wrap}>
            <div className={css.descriptiponWrap}>
                <h3 className='mb_2'>
                    Description
                    <Rating rating={3} theme={['ml-2']}/>
                </h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Numquam cumque delectus, esse perferendis exercitationem 
                    inventore iste, nostrum animi error placeat modi libero
                    reiciendis rerum, vel ducimus soluta saepe veniam nesciunt.
                </p>
            </div>
            <h3 className={'mb_2'}>Характеристики</h3>
            <div className={css.characteristics}>
                <CharacteristicsPiece characteristics={CHARACTERISTICSPIECE_MOCK}/>
            </div>
        </div>
    )
}