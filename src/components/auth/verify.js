import * as React from "react";
import { Auth } from 'aws-amplify';
import { navigate, Link } from "gatsby";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import YAMLData from "../../../.polymer/content/auth.content.yml"

const VerifyComponent = () => {
    const [user, setUser] = React.useState({ attributes: { email: '' } });
    const pageContent = YAMLData.verify.page_content

    React.useEffect(() => {
        Auth.currentAuthenticatedUser({ bypassCache: true })
            .then((usr) => {
                setUser(usr)
            })
            .catch((err) => console.log(err));
    }, []);
    const [formstatus, setFormstatus] = React.useState(0)

    function updateUserEmail(values, { setSubmitting, setStatus }) {
        const email = values["email"]
        if (email === user.attributes.email) {
            Auth.verifyCurrentUserAttribute('email')
                .then(() => {

                    console.log('a verification code is sent');
                    setStatus(null)
                    setSubmitting(false)
                    setFormstatus(1)

                })
                .catch((error) => {
                    setStatus(error.message)
                    setSubmitting(false)
                    return error.message
                });
        } else {
            Auth.updateUserAttributes(user, {
                email: email
            })
                .then(() => {
                    console.log('a verification code is sent');
                    setStatus(null)
                    setSubmitting(false)
                    setFormstatus(1)
                })
                .catch((error) => {
                    setStatus(error.message)
                    setSubmitting(false)
                    return error.message
                });
        }
    }

    function resendConfirmationCode() {
        Auth.verifyCurrentUserAttribute('email')
            .then(() => {
                console.log('a verification code is sent');
            })
            .catch((error) => {
                console.log(error);
                return error.message
            });
    }

    function verifyEmailValidationCode(values, { setSubmitting, setStatus }) {
        Auth.verifyCurrentUserAttributeSubmit('email', values["code"])
            .then(() => {
                console.log('email verified');
                navigate("/app/dashboard")
            })
            .catch((error) => {
                setStatus(error.message)
                setSubmitting(false)
                return error.message
            });
    }

    return <main className="w-full max-w-md mx-auto p-6">
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="p-4 sm:p-7">
                <div className="text-center">
                    {(formstatus === 0) ? <>
                        <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">{pageContent.verify.header}</h1>
                        {pageContent.verify.description && <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            {pageContent.verify.description}
                            <Link to="/app/dashboard" className="text-blue-600 decoration-2 hover:underline font-medium" >
                                &nbsp;{pageContent.verify.link}
                            </Link>
                        </p>}
                    </> : (formstatus === 1) ?
                        <>
                            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">{pageContent.confirmotp.header}</h1>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                {pageContent.confirmotp.description}&nbsp;
                                <button onClick={resendConfirmationCode} className="text-blue-600 decoration-2 hover:underline font-medium">
                                    {pageContent.confirmotp.action}
                                </button>
                            </p>
                        </> : null}
                </div>
                <div className="mt-5">
                    <Formik
                        enableReinitialize={true}
                        initialValues={(formstatus === 0) ? { email: user.attributes.email } : { code: '' }}
                        validate={values => {
                            const errors = {};
                            if (formstatus === 0) {
                                if (!values.email) {
                                    errors.email = 'Required';
                                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                                ) {
                                    errors.email = 'Invalid email address';
                                } else if (values.email === user.attributes.email && user.attributes.email_verified) {
                                    errors.email = 'Email already verified!';
                                }
                            }
                            else {
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
                                updateUserEmail(values, { setSubmitting, setStatus })
                            } else {
                                verifyEmailValidationCode(values, { setSubmitting, setStatus })
                            }
                        }}
                    >
                        {({ isSubmitting, errors, status }) => (
                            <Form>
                                <div className="grid gap-y-4">
                                    {(formstatus === 0) ?
                                        <>
                                            <div>
                                                <label htmlFor="email" className="block text-sm mb-2 dark:text-white">Email</label>
                                                <div className="relative">
                                                    <Field name="email" id="email" type="text" className="py-3 px-4 block w-full rounded-md border bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800" required />
                                                    <div className={errors.email ? "absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3" : "hidden"}>
                                                        <svg className="h-5 w-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <ErrorMessage name="email" component="p" className="text-xs text-red-600 mt-2" />
                                            </div>
                                        </> :
                                        <>
                                            <div>
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
                                        </>}
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

export default VerifyComponent

export const Head = () => <title>Verify Email</title>