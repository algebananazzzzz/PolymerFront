import * as React from "react";
import { Auth } from 'aws-amplify';
import { navigate, Link } from "gatsby";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import YAMLData from "../../../.polymer/content/auth.content.yml"


const LoginComponent = () => {
    const pageContent = YAMLData.login.page_content
    const [user, setUser] = React.useState(null)
    const [formstatus, setFormstatus] = React.useState(0)

    async function signIn(values, { setSubmitting, setStatus }) {
        await Auth.signIn(values["email"], values["password"])
            .then((user) => {
                if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
                    setUser(user)
                    setFormstatus(1)
                    setSubmitting(false)
                } else {
                    if (user.challengeName === undefined) {
                        navigate("/app/dashboard")
                    } else {
                        throw new Error("An unexpected error occured")
                    }
                }
                setStatus(null)
            })
            .catch((e) => {
                // if (e instanceof UserNotConfirmedException) {
                //     console.log(e)
                // }
                if (e.name === "UserNotConfirmedException") {
                    setUser({ username: values["email"] })
                    resendConfirmationCode(values["email"])
                    setFormstatus(2)
                    setStatus(e.message + " Please confirm user first.")
                }
                else {
                    setStatus(e.message)
                }
                setSubmitting(false)
                return e.message
            });
    }

    async function resendConfirmationCode(username) {
        try {
            await Auth.resendSignUp(username);
            console.log('code resent successfully');
        } catch (err) {
            console.log('error resending code: ', err);
        }
    }

    function confirmSignUp(values, { setSubmitting, setStatus }) {
        Auth.confirmSignUp(user.username, values["code"])
            .then(() => {
                navigate("/app/dashboard")
            })
            .catch((error) => {
                console.log(error)
                setStatus(error.message)
                setSubmitting(false)
                return error.message
            })
    }

    function newPassword(values, { setSubmitting, setStatus }) {
        Auth.completeNewPassword(
            user, // the Cognito User Object
            values["newpassword"], // the new password
            // OPTIONAL, the required attributes
            // {
            //     email: 'daniel.zhouqx@gmail.com',
            //     phone_number: '1234567890'
            // }
        )
            .then((user) => {
                // at this time the user is logged in if no MFA required
                navigate("/app/dashboard")
                console.log(user);
            })
            .catch((e) => {
                setStatus(e.message)
                setSubmitting(false)
                console.log(e.message);
                return e.message
            });
    }

    return <main className="w-full max-w-md mx-auto p-6">
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="p-4 sm:p-7">
                <div className="text-center">
                    {(formstatus === 0) ? <>
                        <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">{pageContent.login.header}</h1>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            {pageContent.login.description}
                            <Link to="/auth/signup" className="text-blue-600 decoration-2 hover:underline font-medium" >
                                &nbsp;{pageContent.login.link}
                            </Link>
                        </p>
                    </>
                        : (formstatus === 1) ? <>
                            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">{pageContent.newpassword.header}</h1>
                            {pageContent.newpassword.description &
                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                    {pageContent.newpassword.description}
                                </p>}
                        </>
                            : (formstatus === 2) ? <>
                                <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">{pageContent.confirmaccount.header}</h1>
                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                    {pageContent.confirmaccount.description}&nbsp;
                                    <button onClick={resendConfirmationCode} className="text-blue-600 decoration-2 hover:underline font-medium">
                                        {pageContent.confirmaccount.action}
                                    </button>
                                </p>
                            </>
                                : null}
                </div>
                <div className="mt-5">
                    <Formik
                        initialValues={(formstatus === 0) ? { email: '', password: '' }
                            : (formstatus === 1) ? { newpassword: '', confirmpassword: '' } :
                                (formstatus === 2) ? { code: '' }
                                    : null}
                        validate={values => {
                            const errors = {};
                            if (formstatus === 0) {
                                if (!values.email) {
                                    errors.email = 'Required';
                                } else if (!values.password) {
                                    errors.password = 'Required';
                                }
                            } else if (formstatus === 1) {
                                if (!values.newpassword) {
                                    errors.newpassword = 'Required';
                                } else if (!values.confirmpassword) {
                                    errors.confirmpassword = 'Required';
                                }
                                else if (values.newpassword !== values.confirmpassword) {
                                    errors.confirmpassword = 'Passwords do not match';
                                }
                            } else if (formstatus === 2) {
                                if (!values.code) {
                                    errors.code = 'Required';
                                } else if (values.code.length !== 6) {
                                    errors.code = 'Length of OTP is 6';
                                }
                            }

                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting, setStatus }) => {
                            if (formstatus === 0) {
                                signIn(values, { setSubmitting, setStatus })
                            } else if (formstatus === 1) {
                                newPassword(values, { setSubmitting, setStatus })
                            } else if (formstatus === 2) {
                                confirmSignUp(values, { setSubmitting, setStatus })
                            }
                        }}
                    >
                        {({ isSubmitting, errors, status }) => (
                            <Form>
                                <div className="grid gap-y-4">
                                    {(formstatus === 0) ?
                                        <>
                                            <div>
                                                <label htmlFor="email" className="block text-sm mb-2 dark:text-white">Username or Email</label>
                                                <div className="relative">
                                                    <Field name="email" id="email" className="py-3 px-4 block w-full rounded-md border bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800" required />
                                                    <div className={errors.email ? "absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3" : "hidden"}>
                                                        <svg className="h-5 w-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <ErrorMessage name="email" component="p" className="text-xs text-red-600 mt-2" />
                                            </div>
                                            <div>
                                                <label htmlFor="password" className="block text-sm mb-2 dark:text-white">Password</label>
                                                <div className="relative">
                                                    <Field type="password" id="password" name="password" className="py-3 px-4 block w-full rounded-md border bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800" required />
                                                    <div className={errors.password ? "absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3" : "hidden"}>
                                                        <svg className="h-5 w-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <ErrorMessage name="password" component="p" className="text-xs text-red-600 mt-2" />
                                            </div>
                                        </> : (formstatus === 1) ?
                                            <>
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
                                            </> : (formstatus === 2) ?
                                                <><div>
                                                    <label htmlFor="code" className="block text-sm mb-2 dark:text-white">OTP Code</label>
                                                    <div className="relative">
                                                        <Field name="code" id="code" type="password" className="py-3 px-4 block w-full rounded-md border bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800" required />
                                                        <div className={errors.code ? "absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3" : "hidden"}>
                                                            <svg className="h-5 w-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    <ErrorMessage name="code" component="p" className="text-xs text-red-600 mt-2" />
                                                </div>
                                                </>
                                                : null
                                    }
                                    {status && <p className="text-xs text-red-600">{status}</p>}
                                    <button type="submit" disabled={isSubmitting} className={isSubmitting ? "py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-400 text-white text-sm" : "py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"}>
                                        {isSubmitting ? "Submitting" : "Submit"}
                                    </button>
                                    <Link to="/auth/forgotpw" className="text-xs text-blue-600 decoration-2 hover:underline font-medium" >
                                        Forgot password?
                                    </Link>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    </main >
}

export default LoginComponent

export const Head = () => <title>Login</title>