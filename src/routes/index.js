import Home from '~/pages/Home'
import Login from '~/pages/Login'
import ProductDetails from '~/pages/ProductDetails'
import Cart from '~/pages/Cart'
import ForgotPass from '~/pages/Login/ForgotPass'
import SignUp from '~/pages/Login/SingUp'
import Categories from '~/pages/Categories'
import Payment from '~/pages/Payment'
import User from '~/pages/User'
import Profile from '~/pages/User/Profile'
import Oders from '~/pages/User/Oders/Oders'
// PublicRoutes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/cart', component: Cart },
    { path: '/products/:name--:id', component: ProductDetails },
    { path: '/categories', component: Categories },
    { path: '/checkout', component: Payment },
    { path: '/user', component: Profile },
    { path: '/orders', component: Oders, layout: null },
    { path: '/login', component: Login, layout: null },
    { path: '/forgot-password', component: ForgotPass, layout: null },
    { path: '/signup', component: SignUp, layout: null },
]

const privateRoutes = []

export { publicRoutes, privateRoutes }
