import routes from '~/config/routes'

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

// PublicRoutes
const publicRoutes = [
    { path: routes.home, component: Home },
    { path: routes.cart, component: Cart },
    { path: routes.productDetails, component: ProductDetails },
    { path: routes.categories, component: Categories },
    { path: routes.checkout, component: Payment },
    { path: routes.profile, component: Profile },
    { path: routes.orders, component: Oders },
    { path: routes.addressBook, component: AddressBook },
    { path: routes.createAddress, component: NewAddress },
    { path: routes.transactionHistory, component: TransactionHistory },
    { path: routes.login, component: Login, layout: null },
    { path: routes.forgotPassword, component: ForgotPass, layout: null },
    { path: routes.signup, component: SignUp, layout: null },
]

const privateRoutes = []

export { publicRoutes, privateRoutes }
