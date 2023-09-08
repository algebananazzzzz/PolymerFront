import React, { useEffect, useState, useCallback } from 'react'
// import { gql, useQuery } from '@apollo/client';

// const GET_POSTS = gql`
// query SimpleQuery {
//     posts {
//         description
//         id
//         name
//     }
// }
// `;

const QueryPage = ({ signOut }) => {
    // const [toasts, setToasts] = useState([]);

    // const { loading, error, data } = useQuery(GET_POSTS, { fetchPolicy: 'no-cache' });

    // const removeToast = useCallback((id) => {
    //     setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    // }, [])

    // const addToast = useCallback((message, type = 'info', timeout = 5000) => {
    //     const id = Date.now()
    //     const newToast = {
    //         id: id,
    //         message,
    //         type,
    //     };

    //     setToasts((prevToasts) => [...prevToasts, newToast]);

    //     setTimeout(() => {
    //         removeToast(id)
    //     }, timeout);
    // }, [removeToast]);

    // useEffect(() => {
    //     if (data) {
    //         console.log(data)
    //     }

    //     if (error) {
    //         console.log(error)
    //         addToast("Error retrieving query", "error")
    //     }
    // }, [data, error])

    return <div className="px-4 py-5 lg:px-8 xl:py-12 mx-auto">
        <h1 className="block text-2xl font-bold text-gray-800 sm:text-3xl dark:text-white">Query</h1>
        <p className="pt-5 text-base md:text-lg text-gray-800 dark:text-gray-200 text-justify">
            This is an example of using Apollo-Client Query hook to fetch data.
        </p>
        <div className="py-5 grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
            {loading ? <div className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-indigo-600 rounded-full" role="status" aria-label="loading">
                <span className="sr-only">Loading...</span>
            </div>
                : error ? <p className="block text-sm text-gray-800 sm:text-md dark:text-white">{error.message}</p>
                    : data && <p className="block text-sm text-gray-800 sm:text-md dark:text-white">success fetching</p>}
        </div>
    </div>
}

export default QueryPage

export const Head = () => <title>Query</title>