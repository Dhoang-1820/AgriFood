// Home pages
import config from '~/config'
import Home from '~/pages/Home'
import Login from '~/pages/Login'
import ProductDetails from '~/pages/ProductDetails'
import Cart from '~/pages/Cart'
import ForgotPass from '~/pages/Login/ForgotPass'
import SignUp from '~/pages/Login/SingUp'
import Categories from '~/pages/Categories'
import Payment from '~/pages/Payment'
import Profile from '~/pages/User/Profile'
import Oders from '~/pages/User/Oders/Oders'
import AddressBook from '~/pages/User/AddressBook'
import TransactionHistory from '~/pages/User/TransactionHistory'
import NewAddress from '~/pages/User/NewAddress'

// Admin pages
import NewProduct from '~/admin_pages/Products/NewProduct'
import ListProducts from '~/admin_pages/Products/ListProducts'
import NewCategory from '~/admin_pages/Category/NewCategory'
import ListCategories from '~/admin_pages/Category/ListCategories'
import NewProductCategory from '~/admin_pages/ProductCategory/NewProductCategory'
import ListProductCategory from '~/admin_pages/ProductCategory/ListProductCategory'

// PublicRoutes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.cart, component: Cart },
    { path: config.routes.productDetails, component: ProductDetails },
    { path: config.routes.categories, component: Categories },
    { path: config.routes.checkout, component: Payment },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.orders, component: Oders },
    { path: config.routes.addressBook, component: AddressBook },
    { path: config.routes.createAddress, component: NewAddress },
    { path: config.routes.transactionHistory, component: TransactionHistory },
    { path: config.routes.login, component: Login, layout: null },
    { path: config.routes.forgotPassword, component: ForgotPass, layout: null },
    { path: config.routes.signup, component: SignUp, layout: null },
]

const privateRoutes = [
    { path: config.admin.newProduct, component: NewProduct },
    { path: config.admin.listProducts, component: ListProducts },
    { path: config.admin.newCategory, component: NewCategory },
    { path: config.admin.listCategories, component: ListCategories },
    { path: config.admin.newProductCategory, component: NewProductCategory },
    { path: config.admin.listProductCategory, component: ListProductCategory },
]

export { publicRoutes, privateRoutes }
