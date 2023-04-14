const api = 'http://dockerbackend';
// const api = 'http://100.115.34.49:80';
const GET_CATEGORY = `${api}/product/category`;
const GET_PRODUCTS_BY_ID = `${api}/product/get_by_category?id=`;
const GET_MAIN_SWIPER = `${api}/ic/get_active`;
const GET_LATEST_PRODUCT = `${api}/product/get_latest`;
const GET_PRODUCT_BY_SUBCATEGORY_ID = `${api}/product/get_by_subcategory?id=`;
const GET_CATEGORY_FILTER = `${api}/product/filters/get_by_category?id=`;
const AUTH_USER = `${api}/user/auth/login`;
const GET_PRODUCT_BY_ID = `${api}/product/`;
const GET_PRODUCTS_BY_FILTERS = `${api}/product/filters/get_products_by_category`;
const GET_FILTERS_BY_SUBCATEGORY_ID = `${api}/product/filters/get_by_subcategory?id=`;
const GET_SUB_PRODUCTS_BY_FILTERS = `${api}/product/filters/get_products_by_subcategory`;
const ADD_FAVORITS = `${api}/product/favourite`;
const GET_REVIEWS = `${api}/product/reviews/`;
const ADD_TO_BASKET = `${api}/basket`; // post / get
const INC_BASKET = `${api}/basket/inc`;
const DEC_BASKET = `${api}/basket/dec`;
const SHOPS = `${api}/shop/get`;
const DEL_PRODUCT_BASKET = `${api}/basket/delete?id=`;
const DEL_PRODUCT_FAVORITE = `${api}/product/favourite?id=`;

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
    getProductsByFiltersAplyed: GET_PRODUCTS_BY_FILTERS,
    getSubCategoryFilterById: GET_FILTERS_BY_SUBCATEGORY_ID,
    getSubProductsByFiltersAplyed: GET_SUB_PRODUCTS_BY_FILTERS,
    addProductToFavorite: ADD_FAVORITS,
    getFavorite: ADD_FAVORITS,
    getReviews: GET_REVIEWS,
    addToBasket: ADD_TO_BASKET,
    getBasket: ADD_TO_BASKET,
    incBasket: INC_BASKET,
    decBasket: DEC_BASKET,
    getSops: SHOPS,
    delFromBasket: DEL_PRODUCT_BASKET,
    removeProductFavorite: DEL_PRODUCT_FAVORITE,
};
