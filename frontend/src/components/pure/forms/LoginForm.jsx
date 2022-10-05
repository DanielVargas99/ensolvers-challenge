import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import '../../../styles/notesStyle.scss'

const loginSchema = Yup.object().shape(
    {
        email: Yup.string()
            .email('Invalid email format')
            .required('Email is required'),
        password: Yup.string().required('Password is required')
    }
);

const LoginFormik = () => {
    
    const initialCredentials = {
        email: '',
        password: ''
    }

    let navigate = useNavigate();

    return (
        <div className='mt-4 p-4 d-flex justify-content-center'>
            <Formik
                // *** Initial values that the form will take ***
                initialValues={ initialCredentials }
                // *** Yup Validation Schema ***
                validationSchema = {loginSchema}
                // *** onSubmit Event ***
                onSubmit={async (values) => {
                    // We save the data in the localStorage
                    await localStorage.setItem('credentials', values);
                    navigate('/');
                }}
            >
                {/* Getting props from Formik */}
                {({errors, touched, isSubmitting}) => (
                    <Form>
                        <label htmlFor="email" className='mt-2'>Email</label>
                        <Field id="email" type="email" name="email" placeholder="example@email.com"
                               className='form-control form-control-lg mt-2 inputLogin' />

                        { /* Email Errors */
                            errors.email && touched.email &&
                            (<ErrorMessage name="email" component='div' />)
                        }

                        <label htmlFor="password" className='mt-2'>Password</label>
                        <Field id="password" type="password" name="password" placeholder="password"
                               className='form-control form-control-lg mt-2 inputLogin' />

                        { /* Password Errors */
                            errors.password && touched.password &&
                            (<ErrorMessage name="password" component='div' />)
                        }

                        <button type="submit" className='btn btn-primary btn-lg mt-3'>Login</button>
                        {isSubmitting ? (<p>Login your credentials...</p>) : null}
                    </Form>
                )}              
            </Formik>
        </div>
    );
}

export default LoginFormik;
