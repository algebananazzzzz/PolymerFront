import React, { useEffect, useState } from "react";
import { navigate } from "gatsby";
import { Auth } from "aws-amplify";
import AppLayout from "../layout/app-layout"

const ProtectedRoute = ({ component: Component, location, ...rest }) => {
    const [session, setSession] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const checkAuth = async () => {
            try {
                const userSession = await Auth.currentSession();
                if (isMounted) {
                    setSession(userSession);
                }
            } catch (error) {
                console.log("Not authenticated", error);
                // Handle the error or display an error message to the user
                if (isMounted) {
                    alert("Either your session has expired, or you are not logged in. Please sign in again")
                    navigate("/auth/login");
                }
            }
        };

        checkAuth();

        return () => {
            isMounted = false;
        };
    }, [location]);

    const handleSignOut = async () => {
        try {
            await Auth.signOut();
            // Redirect to the sign-in page after successful sign-out
            navigate("/");
        } catch (error) {
            console.log("Error signing out:", error);
        }
    };

    if (session === null) {
        // Show a loading indicator or fallback component
        return <AppLayout></AppLayout>;
    } else if (session) {
        return <Component session={session} signOut={handleSignOut} {...rest} />;
    } else {
        navigate("/auth/login");
        return null;
    }
};

export default ProtectedRoute;
