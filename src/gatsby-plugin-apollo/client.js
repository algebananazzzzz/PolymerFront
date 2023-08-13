import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Auth } from 'aws-amplify';

// Call this function to get the token
async function getAuthToken() {
    try {
        const session = await Auth.currentSession();
        const accessToken = session.getAccessToken().getJwtToken();
        return accessToken;
    } catch (error) {
        console.log('Error retrieving authentication token:', error);
        return null;
    }
}

const httpLink = createHttpLink({
    uri: process.env.GATSBY_APOLLO_URI,
});

const authLink = setContext(async (_, { headers }) => {
    const token = await getAuthToken();
    return {
        headers: {
            ...headers,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
            'authorization': token ? `Bearer ${token}` : '',
        },
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

export default client;