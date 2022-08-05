import { Fragment } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import defaultLayout from '~/layouts/DefaultLayout'
import AdminLayout from './layouts/AdminLayout'
import { publicRoutes, privateRoutes } from '~/routes'

function App() {
    return (
        <Router>
            <div className='App'>
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component
                        let Layout = defaultLayout
                        if (route.layout) {
                            Layout = route.layout
                        } else if (route.layout === null) {
                            Layout = Fragment
                        }
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        )
                    })}
                    {privateRoutes.map((route, index) => {
                        const Page = route.component
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <AdminLayout>
                                        <Page />
                                    </AdminLayout>
                                }
                            />
                        )
                    })}
                </Routes>
            </div>
        </Router>
    )
}

export default App
