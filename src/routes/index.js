import Home from '~/pages/Home'
import Login from '~/pages/Login'
import ProductDetails from '~/pages/ProductDetails'

// PublicRoutes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/login', component: Login, layout: null },
    { path: '/products/:name--:id', component: ProductDetails },
]

const privateRoutes = []

export { publicRoutes, privateRoutes }
