import { Reviews } from '../../type.store';
import { Rating } from '../rating/rating';
import css from './reviews.module.css';

const Reviw = (review: Reviews) => {
    return (
        <div className={css.reviwWrap}>
            <span className={css.reviewName}>
                {review.user.firstName ?? 'Аноним'}
                <span className={css.datePosted}>{`${new Date(
                    review.created_at
                ).toLocaleDateString()}`}</span>
                <Rating rating={review.stars} theme={['ml-2']} />
            </span>
            <p>{review.text}</p>
        </div>
    );
};

interface ReviwsProps {
    reviews: Array<Reviews>;
}

export const Reviws = ({ reviews }: ReviwsProps) => {
    return (
        <div className={css.wrap}>
            <span className={css.reviwsTitle}>Отзывы</span>
            {reviews.map((r) => (
                <Reviw key={r.id} {...r} />
            ))}
        </div>
    );
};
