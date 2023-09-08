import React from "react"
import { Router } from "@reach/router"
import AuthRoute from "../../components/auth/authroute"
import ForgotpwComponent from "../../components/auth/forgotpw";
import LoginComponent from "../../components/auth/login";
import SignupComponent from "../../components/auth/signup";
import NotFoundComponent from "../../components/404"

const AuthRoutes = () => {
    return (
        <Router basepath="/auth">
            <AuthRoute path="/forgotpw" component={ForgotpwComponent} />
            <AuthRoute path="/login" component={LoginComponent} />
            <AuthRoute path="/signup" component={SignupComponent} />
            <NotFoundComponent default></NotFoundComponent>
        </Router>
    )
}

export default AuthRoutes