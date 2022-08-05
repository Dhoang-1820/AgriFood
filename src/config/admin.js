const DEFAULT_ROUTES = '/admin'
const ROUTES_PRODUCT = DEFAULT_ROUTES + '/products'
const ROUTES_CATEGORY = DEFAULT_ROUTES + '/categories'
const ROUTES_PRODUCT_CATEGORY = DEFAULT_ROUTES + '/products-category'

const admin = {
    home: DEFAULT_ROUTES,
    listCategories: ROUTES_CATEGORY + '/list',
    newProduct: ROUTES_PRODUCT + '/new',
    newCategory: ROUTES_CATEGORY + '/new',
    newProductCategory: ROUTES_PRODUCT_CATEGORY + '/new',
    listProductCategory: ROUTES_PRODUCT_CATEGORY + '/list',
}

export default admin
