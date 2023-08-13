import * as React from 'react';
import { Link } from 'gatsby';
import { ThemeContext } from '../theme/theme-context';
import ThemeToggler from '../theme/dark-toggler';

const HomeLayout = ({ children }) => {
    const { theme, changeTheme } = React.useContext(ThemeContext)

    return <body className="min-h-screen">
        <header className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-white border-b text-sm py-2.5 sm:py-4 dark:bg-slate-900 dark:border-gray-700">
            <nav className="max-w-7xl flex justify-between items-center w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mr-5 md:mr-8">
                    <Link className="flex-none text-xl font-semibold dark:text-white" to="/">PolymerFront</Link>
                </div>
                <div className="flex flex-row items-center gap-2">
                    <ThemeToggler theme={theme} changeTheme={changeTheme}></ThemeToggler>
                    <Link to="/auth/login" className="font-medium text-gray-500 hover:text-gray-400 sm:py-6 dark:text-gray-400 dark:hover:text-gray-500">Login</Link>
                    <Link to="/auth/signup" className="font-medium text-gray-500 hover:text-gray-400 sm:py-6 dark:text-gray-400 dark:hover:text-gray-500">Sign Up</Link>
                </div>
            </nav>
        </header>
        <main id="content" role="main">
            {children}
        </main>
    </body>
}

export default HomeLayout