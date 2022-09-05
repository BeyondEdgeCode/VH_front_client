import { RatingProps } from '../../type.store';
import css from './rating.module.css';
import cn from 'classnames';

export const Rating = ({theme = [], rating}: RatingProps) => {
    return (
        <div className={cn(css['rating-mini'], ...theme)}>
            {new Array(5).fill(1).map((r,i) => {
                if (i < rating) {
                    return <span className={css.active}></span>;
                }
                return <span></span>    
            })}
        </div>
    );
}