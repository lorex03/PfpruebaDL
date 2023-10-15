import './login.css';
import { Formik } from 'formik';
import React, { useEffect } from 'react';
import fondo from '../../assets/img/loginRegister.jpg';
import logo from '../../assets/img/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { userLogin } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

export default function LoginAdmin() {
	let regExPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{1,15}$/;
	let regExEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector((state) => state.user);
	const userCreated = useSelector((state) => state.userCreated);
	console.log(user);
	console.log(userCreated);
	const handleSubmit = (valores) => {
		console.log(valores);
		dispatch(userLogin(valores));
	};

	useEffect(() => {
		if (user) {
			navigate('/admin');
		}
	}, [user, navigate]);

	return (
		<div
			className='min-h-screen flex flex-col items-center justify-between bg-fuchsia-900'
			style={{
				backgroundImage: `url(${fondo})`,
				backgroundSize: 'cover',
				backgroundRepeat: 'no-repeat',
			}}
		>
			<div className='w-1/3 mt-14'>
				<Formik
					// Declaramos los valores iniciales
					initialValues={{
						email: userCreated ? userCreated.email : '',
						password: userCreated ? userCreated.password : '',
					}}
					// Funcion para validar email y passwords
					validate={(valores) => {
						let errores = {};

						// Validamos el email y ademas testeamos con una expresion regular para que el email escrito sea formato correcto de email
						if (!valores.email) {
							errores.email = 'Please, put an email';
						} else if (!regExEmail.test(valores.email)) {
							errores.email = 'Invalid email';
						}
						if (!valores.password) {
							errores.password = 'Please, put your password';
						} else if (!regExPassword.test(valores.password)) {
							errores.password = 'Invalid password';
						}

						return errores;
					}}
					onSubmit={handleSubmit}
				>
					{({
						values,
						errors,
						touched,
						handleSubmit,
						handleChange,
						handleBlur,
					}) => (
						<form
							className='bg-white rounded-lg p-6 shadow-lg'
							onSubmit={handleSubmit}
						>
							<h1 className='text-5xl font-semibold text-left mb-4 text-gray-700'>
								<img src={logo} alt='Logo' />
							</h1>
							<div className='mb-4'>
								<label
									htmlFor='email'
									className='block text-left text-gray-700'
								></label>
								<input
									type='email'
									id='email'
									name='email'
									placeholder='Email'
									value={values.email}
									onChange={handleChange}
									onBlur={handleBlur}
									className={`mt-1 p-2 w-full rounded-full border ${
										touched.email && errors.email
											? 'border-red-500'
											: 'border-gray-300'
									}`}
								/>
								{touched.email && errors.email && (
									<div className='text-red-500 mt-2 text-sm'>
										{errors.email}
									</div>
								)}
							</div>
							<div className='mb-4'>
								<label
									htmlFor='password'
									className='block text-left text-gray-700'
								></label>
								<input
									type='password'
									id='password'
									name='password'
									placeholder='Password'
									onChange={handleChange}
									onBlur={handleBlur}
									className={`mt-1 p-2 w-full rounded-full border ${
										touched.password && errors.password
											? 'border-red-500'
											: 'border-gray-300'
									}`}
								/>
								{touched.password && errors.password && (
									<div className='text-red-500 mt-2 text-sm'>
										{errors.password}
									</div>
								)}
							</div>
							<div>
								<button
									type='submit'
									className='block bg-fuchsia-900 text-white px-4 py-2 rounded-full hover:bg-fuchsia-600 mb-2'
								>
									Login
								</button>
								<button
									type='submit'
									className='block bg-blue bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-900'
								>
									Login with Google
								</button>
							</div>
						</form>
					)}
				</Formik>
			</div>
			<br />
			<br />
			<br />
		</div>
	);
}
