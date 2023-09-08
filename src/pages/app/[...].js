import React from "react"
import { Router } from "@reach/router"
import ProtectedRoute from "../../components/auth/protectedroute"
import DashboardPage from "../../components/app/Dashboard"
import ChangePwComponent from "../../components/auth/changepw"
import VerifyComponent from "../../components/auth/verify"
import NotFoundComponent from "../../components/404"

const AppRoutes = () => {
    return <Router basepath="/app">
        <ProtectedRoute path="/dashboard" component={DashboardPage} />
        <ProtectedRoute path="/changepw" component={ChangePwComponent} />
        <ProtectedRoute path="/verify" component={VerifyComponent} />
        <NotFoundComponent default></NotFoundComponent>
    </Router>
}

export default AppRoutes