const api = 'http://master.if.evgeniy.host:8001';
const GET_CATEGORY = `${api}/category`;
const GET_PRODUCT_BY_ID = `${api}/product/get_by_category?id=`;
const GET_MAIN_SWIPER = `${api}/ic/get_active`;
const GET_LATEST_PRODUCT = `${api}/product/get_latest`

export const API  = {
    base: api,
    getCategory: GET_CATEGORY,
    getProductsById: GET_PRODUCT_BY_ID,
    getMainSwiper: GET_MAIN_SWIPER,
    getLatestProduct: GET_LATEST_PRODUCT,
}