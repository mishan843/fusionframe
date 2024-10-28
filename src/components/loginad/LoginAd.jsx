// import React, { useContext, useState } from 'react';
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { Button, Form, InputGroup, Spinner } from 'react-bootstrap';
// import { MdLockOutline, MdMailOutline } from 'react-icons/md';
// import { useNavigate } from 'react-router-dom';
// import styles from './loginad.module.css';
// import logo from '../../assets/logo.png';
// import loginImg from '../../assets/login.png'
// import { login } from '../../services/AuthService';
// import { UserContext } from '../../contexts/userContext';

// const validationSchema = Yup.object().shape({
//     email: Yup.string().required('The Email field is required.'),
//     password: Yup.string().required('The password field is required.'),
// });

// const LoginAd = () => {
//     const [error, setError] = useState('');
//     const [showPassword, setShowPassword] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);
//     const navigate = useNavigate();
//     const { setUserData } = useContext(UserContext);

//     const togglePasswordVisibility = () => {
//         setShowPassword(!showPassword);
//     };

//     const formik = useFormik({
//         initialValues: {
//             email: '',
//             password: '',
//         },
//         validationSchema: validationSchema,
//         onSubmit: async (values) => {
//             try {
//                 setIsLoading(true);
//                 const response = await login(values);
//                 if (response?.error) {
//                     setError(response.error);
//                     return setIsLoading(false);
//                 }
//                 navigate('/');
//                 setError('');
//                 localStorage.setItem('token', response?.data?.token);
//                 localStorage.setItem('userdata', JSON.stringify(response?.data));
//                 setUserData(response?.data);
//                 setIsLoading(false);
//             } catch (error) {
//                 console.log(error);
//             }
//         },
//     });


//     return (
//         <div className={`${styles.mainlogin}`}>
//             <div className='d-flex align-items-center justify-content-center me-0' style={{ height: '100vh' }}>
//                 <div className={styles.loginform}>
//                     <div className={`${styles.loginformsection} me-0 d-flex align-items-center justify-content-center`}>
//                         <div className='w-100 d-flex flex-column align-items-center justify-content-center'>
//                             <div className={`text-center ${styles.loginTab}`}>
//                                 <img src={logo} className={styles.logo} alt="" />
//                                 {/* <img className={`${styles.heading}`} src={logo} alt='logo' /> */}
//                             </div>
//                             <div className={` mx-3 my-5 ${styles.logincontent} `}>
//                                 <Form onSubmit={formik.handleSubmit} className='d-flex flex-column align-items-center justify-content-center'>
//                                     <Form.Group className="mb-4 text-start" controlId="email">
//                                         <Form.Label className={`${styles.label} mb-3`}>Email</Form.Label>
//                                         <InputGroup style={{ width: '300px' }}>
//                                             <Form.Label className={`${styles.inputbtn}`}><MdMailOutline /></Form.Label>
//                                             <Form.Control
//                                                 type="text"
//                                                 name="email"
//                                                 onChange={formik.handleChange}
//                                                 onBlur={formik.handleBlur}
//                                                 value={formik.values.email}
//                                                 className={`${styles.inputfield}`}
//                                                 placeholder="Enter email"
//                                                 aria-describedby="loginIdHelp"
//                                             />
//                                         </InputGroup>
//                                         {formik.touched.email && formik.errors.email && (
//                                             <div className={`${styles.errormsg}`}>{formik.errors.email}</div>
//                                         )}
//                                     </Form.Group>
//                                     <Form.Group className="mb-4 text-start" controlId="password">
//                                         <Form.Label className={`${styles.label} mb-3`}>Password</Form.Label>
//                                         <InputGroup style={{ width: '300px' }}>
//                                             <Form.Label className={`${styles.inputbtn}`}><MdLockOutline /></Form.Label>
//                                             <Form.Control
//                                                 type={showPassword ? 'text' : 'password'}
//                                                 name="password"
//                                                 onChange={formik.handleChange}
//                                                 onBlur={formik.handleBlur}
//                                                 value={formik.values.password}
//                                                 className={`${styles.inputfield}`}
//                                                 placeholder="Enter password"
//                                             />
//                                             <Button
//                                                 variant="outline-secondary"
//                                                 onClick={togglePasswordVisibility}
//                                                 className={`${styles.eybtn}`}
//                                             >
//                                                 {!showPassword ? (
//                                                     <FaEyeSlash />
//                                                 ) : (
//                                                     <FaEye />
//                                                 )}
//                                             </Button>
//                                         </InputGroup>
//                                         {formik.touched.password && formik.errors.password && (
//                                             <div className={`${styles.errormsg}`}>{formik.errors.password}</div>
//                                         )}
//                                     </Form.Group>

//                                     {error && <div className={`${styles.errormsg} my-3`}>{error}</div>}

//                                     <Button type="submit" className={`btn btn-lg ${styles.loginButton}`} disabled={isLoading}>
//                                         {isLoading ? <Spinner animation="border" size="sm" /> : 'Login'}
//                                     </Button>
//                                 </Form>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className={`${styles.backcolor} flex-column`} >
//                     <h5 className={`${styles.content} mb-5`}>Prezent<br />Spend Time, <br />Earn Rewards</h5>
//                     <img src={loginImg} alt="" className={`${styles.loginimg}`} />
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default LoginAd;