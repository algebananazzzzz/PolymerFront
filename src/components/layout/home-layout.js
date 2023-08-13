import * as React from 'react';
import { Link } from 'gatsby';

const HomeLayout = ({ children }) => {
    return <body className="dark bg-slate-900 min-h-screen">
        <header className="sticky top-0 flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-white border-b border-gray-200 text-sm py-3 sm:py-0 dark:bg-gray-800 dark:border-gray-700">
            <nav className="relative max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8" aria-label="Global">
                <div className="flex items-center justify-between">
                    <Link to="/" className="flex-none text-xl font-semibold dark:text-white" >Polymer</Link>
                </div>
                <div className="flex flex-col gap-y-4 gap-x-0 mt-5 sm:flex-row sm:items-center sm:justify-end sm:gap-y-0 sm:gap-x-7 sm:mt-0 sm:pl-7">
                    <Link to="/auth/login" className="font-medium text-gray-500 hover:text-gray-400 sm:py-6 dark:text-gray-400 dark:hover:text-gray-500">Login</Link>
                    <Link to="/auth/signup" className="font-medium text-gray-500 hover:text-gray-400 sm:py-6 dark:text-gray-400 dark:hover:text-gray-500">Sign Up</Link>
                </div>
            </nav>
        </header>
        {children}
    </body>
}

export default HomeLayout