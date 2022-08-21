const DEFAULT_ROUTES = '/admin'
const ROUTES_PRODUCT = DEFAULT_ROUTES + '/products'
const ROUTES_CATEGORY = DEFAULT_ROUTES + '/categories'
const ROUTES_PRODUCT_CATEGORY = DEFAULT_ROUTES + '/products-category'

const admin = {
    home: DEFAULT_ROUTES,
    newProduct: ROUTES_PRODUCT + '/new',
    listProducts: ROUTES_PRODUCT + '/list',
    newCategory: ROUTES_CATEGORY + '/new',
    listCategories: ROUTES_CATEGORY + '/list',
    newProductCategory: ROUTES_PRODUCT_CATEGORY + '/new',
    listProductCategory: ROUTES_PRODUCT_CATEGORY + '/list',
}

export default admin
