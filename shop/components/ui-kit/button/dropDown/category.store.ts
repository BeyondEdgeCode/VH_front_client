import { BehaviorSubject } from "rxjs";
import { Category } from "../../../../type.store";
import { createSetterStore } from "../../../../utilsFunctions/utils";

const categoryStore$ = new BehaviorSubject<Array<Category>>([]);
export const setNewCategoryState = createSetterStore(categoryStore$);


export const category$ = categoryStore$.asObservable();