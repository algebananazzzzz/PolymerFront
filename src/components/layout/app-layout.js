import React, { useState, useContext } from 'react';
import { Link } from 'gatsby'
import { ThemeContext } from '../theme/theme-context';
import { ToastContext } from '../toast/toast-context';
import ThemeToggler from '../theme/dark-toggler';

const AppLayout = ({ children, signOut }) => {
    const [navOpen, setNavOpen] = useState(false);
    const { theme, changeTheme } = useContext(ThemeContext)
    const { toasts, removeToast } = useContext(ToastContext)

    return <body className="dark:bg-slate-900">
        <div className="sticky top-0 inset-x-0 z-20 bg-white border-y px-4 sm:px-6 md:px-8 xl:hidden dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center py-4">
                <button type="button" onClick={() => {
                    setNavOpen((value) => {
                        return !value
                    })
                }} className="text-gray-500 hover:text-gray-600">
                    <span className="sr-only">Toggle Navigation</span>
                    <svg className="w-5 h-5" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                    </svg>
                </button>
                <div className='flex items-center justify-between w-full'>
                    <ol className="ml-3 flex items-center whitespace-nowrap min-w-0" aria-label="Breadcrumb">
                        <Link to="/app/dashboard" className="text-lg font-semibold text-gray-800 truncate dark:text-gray-400" aria-current="page">
                            Polymer
                        </Link>
                    </ol>
                    <ThemeToggler theme={theme} changeTheme={changeTheme}></ThemeToggler>
                </div>
            </div>
        </div>

        <div id="application-sidebar" className={`${navOpen ? "block " : "hidden "}fixed xl:block top-0 left-0 bottom-0 z-[60] w-64 bg-white border-r border-gray-200 pt-7 pb-10 overflow-y-auto scrollbar-y xl:translate-x-0 xl:right-auto xl:bottom-0 dark:scrollbar-y dark:bg-gray-800 dark:border-gray-700`}>
            <div className="px-6 flex items-center justify-between w-full">
                <Link className="flex-none text-xl font-semibold dark:text-white" to="/app/dashboard">Polymer</Link>
                <div className='hidden xl:block'>
                    <ThemeToggler theme={theme} changeTheme={changeTheme}></ThemeToggler>
                </div>
            </div>

            <nav className="hs-accordion-group p-6 w-full flex flex-col flex-wrap">
                <ul className="space-y-1.5">
                    <li>
                        <Link activeClassName='bg-gray-100 text-slate-700 dark:bg-gray-900 dark:text-white' className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300" to="/app/dashboard">
                            <svg className="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z" />
                                <path fillRule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z" />
                            </svg>
                            Dashboard
                        </Link>
                    </li>
                    <li className="hs-accordion" id="account-accordion">
                        <button className="w-full hs-accordion-toggle flex items-center gap-x-3.5 py-2 px-2.5 hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent text-sm text-slate-700 rounded-md hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:hs-accordion-active:text-white">
                            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 48 48">
                                <path d="M31.278,25.525C34.144,23.332,36,19.887,36,16c0-6.627-5.373-12-12-12c-6.627,0-12,5.373-12,12 c0,3.887,1.856,7.332,4.722,9.525C9.84,28.531,5,35.665,5,44h38C43,35.665,38.16,28.531,31.278,25.525z M16,16c0-4.411,3.589-8,8-8 s8,3.589,8,8c0,4.411-3.589,8-8,8S16,20.411,16,16z M24,28c6.977,0,12.856,5.107,14.525,12H9.475C11.144,33.107,17.023,28,24,28z" />
                            </svg>
                            Account

                            <svg className="hs-accordion-active:block ml-auto hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
                            </svg>

                            <svg className="hs-accordion-active:hidden ml-auto block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
                            </svg>
                        </button>

                        <div id="account-accordion-child" className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden">
                            <ul className="pt-2 pl-2">
                                <Link to="/app/verify" activeClassName='bg-gray-100 text-slate-700 dark:bg-gray-900 dark:text-white' className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-md hover:bg-gray-100 dark:bg-gray-800 dark:text-slate-400 dark:hover:text-slate-300" >
                                    <svg className="flex-none" width="16" height="16" viewBox="0 0 24 24" fill="none">
                                        <path d="M4 9.00005L10.2 13.65C11.2667 14.45 12.7333 14.45 13.8 13.65L20 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                        <path d="M3 9.17681C3 8.45047 3.39378 7.78123 4.02871 7.42849L11.0287 3.5396C11.6328 3.20402 12.3672 3.20402 12.9713 3.5396L19.9713 7.42849C20.6062 7.78123 21 8.45047 21 9.17681V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17V9.17681Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
                                    </svg>

                                    Verify Email
                                </Link>
                                <Link to="/app/changepw" activeClassName='bg-gray-100 text-slate-700 dark:bg-gray-900 dark:text-white' className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-md hover:bg-gray-100 dark:bg-gray-800 dark:text-slate-400 dark:hover:text-slate-300" >
                                    <svg className="flex-none" width="16" height="16" viewBox="0 0 24 24" fill="none" >
                                        <path d="M2 16C2 13.1716 2 11.7574 2.87868 10.8787C3.75736 10 5.17157 10 8 10H16C18.8284 10 20.2426 10 21.1213 10.8787C22 11.7574 22 13.1716 22 16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H8C5.17157 22 3.75736 22 2.87868 21.1213C2 20.2426 2 18.8284 2 16Z" stroke="currentColor" strokeWidth="1.5"></path>  <path d="M9 16C9 16.5523 8.55228 17 8 17C7.44772 17 7 16.5523 7 16C7 15.4477 7.44772 15 8 15C8.55228 15 9 15.4477 9 16Z" fill="currentColor"></path> <path d="M13 16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16C11 15.4477 11.4477 15 12 15C12.5523 15 13 15.4477 13 16Z" fill="currentColor"></path> <path d="M17 16C17 16.5523 16.5523 17 16 17C15.4477 17 15 16.5523 15 16C15 15.4477 15.4477 15 16 15C16.5523 15 17 15.4477 17 16Z" fill="currentColor"></path>  <path d="M6 10V8C6 4.68629 8.68629 2 12 2C14.7958 2 17.1449 3.91216 17.811 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
                                    </svg>
                                    Change Password
                                </Link>
                                {signOut && <button onClick={signOut} className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-md hover:bg-gray-100 dark:bg-gray-800 dark:text-slate-400 dark:hover:text-slate-300" >
                                    <svg className="flex-none" width="16" height="16" viewBox="0 0 24 24" fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M21.593 10.943c.584.585.584 1.53 0 2.116L18.71 15.95c-.39.39-1.03.39-1.42 0a.996.996 0 0 1 0-1.41 9.552 9.552 0 0 1 1.689-1.345l.387-.242-.207-.206a10 10 0 0 1-2.24.254H8.998a1 1 0 1 1 0-2h7.921a10 10 0 0 1 2.24.254l.207-.206-.386-.241a9.562 9.562 0 0 1-1.69-1.348.996.996 0 0 1 0-1.41c.39-.39 1.03-.39 1.42 0l2.883 2.893zM14 16a1 1 0 0 0-1 1v1.5a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1.505a1 1 0 1 0 2 0V5.5A2.5 2.5 0 0 0 12.5 3h-7A2.5 2.5 0 0 0 3 5.5v13A2.5 2.5 0 0 0 5.5 21h7a2.5 2.5 0 0 0 2.5-2.5V17a1 1 0 0 0-1-1z" fill="currentColor"></path>
                                    </svg>
                                    Sign Out
                                </button>}

                            </ul>
                        </div>
                    </li>
                </ul>
            </nav>
        </div>
        {navOpen ? <div role="button"
            tabindex="0"
            className="dark:opacity-30 bg-gray-400 dark:bg-slate-800 w-full px-4 sm:px-6 md:px-8 xl:pl-72 min-h-screen"
            onClick={() => {
                setNavOpen(false)
            }}
            onKeyDown={(event) => {
                if (event.key === "enter") {
                    setNavOpen(false)
                }
            }}
        >

            {children}

        </div>
            : <div className="w-full px-4 sm:px-6 md:px-8 xl:pl-72 min-h-screen">
                <div className='absolute top-24 right-16 z-50 w-80 flex flex-col gap-2'>
                    {toasts && toasts.map((toast, i) => {
                        return <div key={i} className="w-full bg-white border rounded-md shadow-lg dark:bg-gray-800 dark:border-gray-700" role="alert">
                            <div className="flex p-4">
                                <div className="flex-shrink-0">
                                    {toast.type === "success" ?
                                        <svg className="h-4 w-4 text-green-500 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                        </svg> : toast.type === "error" ?
                                            <svg className="h-4 w-4 text-red-500 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                                            </svg> : toast.type === "warning" ? <svg className="h-4 w-4 text-orange-500 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                            </svg> : <svg className="h-4 w-4 text-blue-500 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                                            </svg>}
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-gray-700 dark:text-gray-400">
                                        {toast.message}
                                    </p>
                                </div>
                                <div className="ml-auto">
                                    <button type="button" onClick={() => { removeToast(toast.id) }} className="inline-flex flex-shrink-0 justify-center items-center h-4 w-4 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white text-sm dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800">
                                        <span className="sr-only">Close</span>
                                        <svg className="w-3.5 h-3.5" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0.92524 0.687069C1.126 0.486219 1.39823 0.373377 1.68209 0.373377C1.96597 0.373377 2.2382 0.486219 2.43894 0.687069L8.10514 6.35813L13.7714 0.687069C13.8701 0.584748 13.9882 0.503105 14.1188 0.446962C14.2494 0.39082 14.3899 0.361248 14.5321 0.360026C14.6742 0.358783 14.8151 0.38589 14.9468 0.439762C15.0782 0.493633 15.1977 0.573197 15.2983 0.673783C15.3987 0.774389 15.4784 0.894026 15.5321 1.02568C15.5859 1.15736 15.6131 1.29845 15.6118 1.44071C15.6105 1.58297 15.5809 1.72357 15.5248 1.85428C15.4688 1.98499 15.3872 2.10324 15.2851 2.20206L9.61883 7.87312L15.2851 13.5441C15.4801 13.7462 15.588 14.0168 15.5854 14.2977C15.5831 14.5787 15.4705 14.8474 15.272 15.046C15.0735 15.2449 14.805 15.3574 14.5244 15.3599C14.2437 15.3623 13.9733 15.2543 13.7714 15.0591L8.10514 9.38812L2.43894 15.0591C2.23704 15.2543 1.96663 15.3623 1.68594 15.3599C1.40526 15.3574 1.13677 15.2449 0.938279 15.046C0.739807 14.8474 0.627232 14.5787 0.624791 14.2977C0.62235 14.0168 0.730236 13.7462 0.92524 13.5441L6.59144 7.87312L0.92524 2.20206C0.724562 2.00115 0.611816 1.72867 0.611816 1.44457C0.611816 1.16047 0.724562 0.887983 0.92524 0.687069Z" fill="currentColor" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    })}

                </div>
                {children}
            </div>}

    </body>
}

export default AppLayout