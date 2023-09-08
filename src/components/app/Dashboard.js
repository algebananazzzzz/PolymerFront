import React, { useContext, useEffect } from 'react'
import { ToastContext } from '../toast/toast-context'

const DashboardPage = () => {
    const { addToast, removeToast } = useContext(ToastContext)

    useEffect(() => {
        addToast("Add toast")
    }, [addToast])

    return <div className="px-4 py-5 lg:px-8 xl:py-12 mx-auto">
        <h1 className="block text-2xl font-bold text-gray-800 sm:text-3xl dark:text-white">Dashboard</h1>
        <p className="pt-5 text-base md:text-lg text-gray-800 dark:text-gray-200 text-justify">
            This is an example of a Protected Route where only logged in users can view (see auth/protectedroute.js)
        </p>
    </div>
}

export default DashboardPage

export const Head = () => <title>Dashboard</title>