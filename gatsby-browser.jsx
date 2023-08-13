import React from 'react';
import ThemeProvider from './src/components/theme/theme-context'
import { Amplify } from 'aws-amplify';
import './src/styles/global.css'
require('preline')

Amplify.configure({
    Auth: {
        identityPoolId: process.env.GATSBY_COGNITO_IDENTITYPOOLID,
        region: process.env.GATSBY_COGNITO_REGION,
        identityPoolRegion: process.env.GATSBY_COGNITO_REGION,
        userPoolId: process.env.GATSBY_COGNITO_USERPOOLID,
        userPoolWebClientId: process.env.GATSBY_COGNITO_WEBCLIENTID,
        mandatorySignIn: true,
    },
    Storage: {
        AWSS3: {
            bucket: process.env.GATSBY_DATA_BUCKET_NAME,
            region: process.env.GATSBY_DATA_BUCKET_REGION,
        }
    }
});

export const wrapRootElement = ({ element }) => (
    <ThemeProvider>
        {element}
    </ThemeProvider>
);