import * as React from "react";
import { Auth } from 'aws-amplify';
import { navigate, Link } from "gatsby";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import YAMLData from "../../../.polymer/content/auth.content.yml"

const ChangePwComponent = () => {
    const [user, setUser] = React.useState({ attributes: { email: '' } });
    const pageContent = YAMLData.changepw.page_content.changepw

    React.useEffect(() => {
        Auth.currentAuthenticatedUser()
            .then((usr) => {
                setUser(usr)
            })
            .catch((err) => console.log(err));
    }, []);

    function changePassword(values, { setSubmitting, setStatus }) {
        Auth.changePassword(user, values["oldpassword"], values["newpassword"])
            .then((response) => {
                console.log(response)
                navigate('/protected')
            })
            .catch((e) => {
                setStatus(e.message)
                setSubmitting(false)
                return e.message
            });
    }

    return <main className="w-full max-w-md mx-auto p-6">
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="p-4 sm:p-7">
                <div className="text-center">
                    <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">{pageContent.header}</h1>
                    {pageContent.description && <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        {pageContent.description}
                        <Link to="/app/dashboard" className="text-blue-600 decoration-2 hover:underline font-medium" >
                            &nbsp;{pageContent.link}
                        </Link>
                    </p>
                    }
                </div>
                <div className="mt-5">
                    <Formik
                        initialValues={{ oldpassword: '', newpassword: '', confirmpassword: '' }}
                        validate={values => {
                            const errors = {};
                            if (!values.oldpassword) {
                                errors.oldpassword = 'Required';
                            } else if (!values.newpassword) {
                                errors.newpassword = 'Required';
                            } else if (!values.confirmpassword) {
                                errors.confirmpassword = 'Required';
                            } else if (values.confirmpassword !== values.newpassword) {
                                errors.confirmpassword = 'Passwords do not match';
                            }

                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting, setStatus }) => {
                            changePassword(values, { setSubmitting, setStatus })
                        }}
                    >
                        {({ isSubmitting, errors, status }) => (
                            <Form>
                                <div className="grid gap-y-4">
                                    <div>
                                        <label htmlFor="oldpassword" className="block text-sm mb-2 dark:text-white">Old Password</label>
                                        <div className="relative">
                                            <Field name="oldpassword" id="oldpassword" type="password" className="py-3 px-4 block w-full rounded-md border bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800" required />
                                            <div className={errors.oldpassword ? "absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3" : "hidden"}>
                                                <svg className="h-5 w-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <ErrorMessage name="oldpassword" component="p" className="text-xs text-red-600 mt-2" />
                                    </div>
                                    <div>
                                        <label htmlFor="newpassword" className="block text-sm mb-2 dark:text-white">New Password</label>
                                        <div className="relative">
                                            <Field name="newpassword" id="newpassword" type="password" className="py-3 px-4 block w-full rounded-md border bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800" required />
                                            <div className={errors.newpassword ? "absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3" : "hidden"}>
                                                <svg className="h-5 w-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <ErrorMessage name="newpassword" component="p" className="text-xs text-red-600 mt-2" />
                                    </div>
                                    <div>
                                        <label htmlFor="confirmpassword" className="block text-sm mb-2 dark:text-white">Confirm Password</label>
                                        <div className="relative">
                                            <Field name="confirmpassword" id="confirmpassword" type="password" className="py-3 px-4 block w-full rounded-md border bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800" required />
                                            <div className={errors.confirmpassword ? "absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3" : "hidden"}>
                                                <svg className="h-5 w-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <ErrorMessage name="confirmpassword" component="p" className="text-xs text-red-600 mt-2" />
                                    </div>
                                    {status && <p className="text-xs text-red-600">{status}</p>}
                                    <button type="submit" disabled={isSubmitting} className={isSubmitting ? "py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-400 text-white text-sm" : "py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"}>
                                        {isSubmitting ? "Submitting" : "Submit"}
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    </main>
}

export default ChangePwComponent

export const Head = () => <title>Change Password</title>