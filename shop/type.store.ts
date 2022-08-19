import { BehaviorSubject } from "rxjs"

export type Theme = Array<string>

export type FilterState = {
    value: string,
    state: unknown
}

export type Filter = {
    type: string,
    label?: string,
    value: Array<FilterState>
}

export type TempFilter = {
    type: string,
    label?: string,
    value: Array<FilterState>
    store$: BehaviorSubject<Array<FilterState>>
}

export type Category = {
    id: number,
    subcategories: Array<{id: number, title: string}>,
    title: string
}

export interface HomeProps {
    category: Array<Category>,
}