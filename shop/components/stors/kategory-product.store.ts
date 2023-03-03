import { BehaviorSubject } from 'rxjs';
import { Product } from '../../type.store';
import { createSetterStore } from '../../utilsFunctions/utils';

const kategoryProduct$ = new BehaviorSubject<Array<Product> | null>(null);
export const setNewKategoryProduct = createSetterStore(kategoryProduct$);

export const kategoryProductData$ = kategoryProduct$.asObservable();
