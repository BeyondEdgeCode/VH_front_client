const api = 'http://dockerbackend'
const GET_CATEGORY = `${api}/product/category`
const GET_PRODUCTS_BY_ID = `${api}/product/get_by_category?id=`
const GET_MAIN_SWIPER = `${api}/ic/get_active`
const GET_LATEST_PRODUCT = `${api}/product/get_latest`
const GET_PRODUCT_BY_SUBCATEGORY_ID = `${api}/product/get_by_subcategory?id=`
const GET_CATEGORY_FILTER = `${api}/product/filters/get_by_category?id=`
const AUTH_USER = `${api}/user/auth/login`
const GET_PRODUCT_BY_ID = `${api}/product/`

export const API = {
    base: api,
    getCategory: GET_CATEGORY,
    getProductsById: GET_PRODUCTS_BY_ID,
    getProductById: GET_PRODUCT_BY_ID,
    getMainSwiper: GET_MAIN_SWIPER,
    getLatestProduct: GET_LATEST_PRODUCT,
    getProductsBySubcategoryId: GET_PRODUCT_BY_SUBCATEGORY_ID,
    getCategoryFilterById: GET_CATEGORY_FILTER,
    auth: AUTH_USER,
}
