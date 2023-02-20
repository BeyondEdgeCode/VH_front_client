import css from './reviews.module.css'

const Reviw = () => {
    return (
        <div className={css.reviwWrap}>
            <span className={css.reviewName}>
                Name
                <span className={css.datePosted}>12.12.2022</span>
            </span>
            <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe
                obcaecati magni blanditiis minus accusantium commodi, molestias
                voluptas esse officiis facere nostrum eligendi temporibus dicta.
                Sed assumenda libero excepturi similique aliquam.
            </p>
        </div>
    )
}

export const Reviws = () => {
    return (
        <div className={css.wrap}>
            <span className={css.reviwsTitle}>Отзывы</span>
            <Reviw />
            <Reviw />
        </div>
    )
}
