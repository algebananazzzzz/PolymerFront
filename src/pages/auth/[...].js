import React from "react"
import { Router } from "@reach/router"
import AuthRoute from "../../components/auth/authroute"
import ProtectedRoute from "../../components/auth/protectedroute"
import HomeLayout from "../../components/layout/home-layout"
import ChangePwComponent from "../../components/auth/changepw";
import ForgotpwComponent from "../../components/auth/forgotpw";
import LoginComponent from "../../components/auth/login";
import SignupComponent from "../../components/auth/signup";
import VerifyComponent from "../../components/auth/verify";
import NotFoundComponent from "../../components/404"

const AuthRoutes = () => {
    return (
        <HomeLayout>
            <Router basepath="/auth">
                <ProtectedRoute path="/changepw" component={ChangePwComponent} />
                <AuthRoute path="/forgotpw" component={ForgotpwComponent} />
                <AuthRoute path="/login" component={LoginComponent} />
                <AuthRoute path="/signup" component={SignupComponent} />
                <ProtectedRoute path="/verify" component={VerifyComponent} />
                <NotFoundComponent default></NotFoundComponent>
            </Router>
        </HomeLayout>
    )
}

export default AuthRoutes