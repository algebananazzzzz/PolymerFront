import React from "react";
import { navigate } from "gatsby";
import { Auth } from "aws-amplify";
import HomeLayout from "../layout/home-layout";

const AuthRoute = ({ component: Component, location, ...rest }) => {
    React.useEffect(() => {
        let isMounted = true;

        const checkAuth = async () => {
            try {
                await Auth.currentSession();
                if (isMounted) {
                    alert("You are already signed in. Redirecting to your dashboard.")
                    navigate('/app/dashboard');
                }
            } catch (error) {
                console.log('Not authenticated:', error);
                // Handle the error or display an error message to the user
            }
        };

        checkAuth();

        return () => {
            isMounted = false;
        };
    }, []);

    if (!Component || !Auth) {
        // Show a loading indicator or fallback component
        return <div>Loading...</div>;
    }

    return <HomeLayout>
        <Component {...rest} />
    </HomeLayout>;
};

export default AuthRoute;
