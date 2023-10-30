
import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Login from './components/Login/login';
import Home from './views/Home/Home';
import CreateProperty from './components/createProperty/createProperty';
import SignUpForm from './components/Singup/singUp';
import { useEffect } from 'react';
import { getProperty } from './redux/actions';
import Detail from '../src/views/Detail/Detail';
import NavBar from './components/NavBar/NavBar';
import NavBarAdmin from './components/NavBar/NavBarAdmin';
import HomeAdmin from './views/Home/HomeAdmin';
import Error404 from './components/Error/Error404';
import LoginAdmin from './components/Login/LoginAdmin';
import { EditPropertyFromAdmin } from './components/admin/editProperty/editProperty';
import Reservations from "./views/Reservations/Reservations";
import Postuser from './components/propertiesAdmin/propertyUser';
import PaymentForm from './components/PaymentForm/PaymentForm';
import GestionUser from './views/gestionUser/GestionUser'
import Bookings from "./views/MyBookings/MyBookings";
import axios from 'axios'

axios.defaults.baseURL = 'https://pfpruebadl-production.up.railway.app';

//agregando para verificar si se hace automaticamente"
function App() {
	const location = useLocation();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getProperty());
	}, [dispatch]);

	return (
		<div className="bg-indigo-50">
			{location.pathname === "/" && <NavBar />}
			{location.pathname === "/admin" && <NavBarAdmin />}
			{location.pathname === "/postUser" && <NavBarAdmin />}

			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/login' element={<Login />} />
				<Route path='/create' element={<CreateProperty />} />
				<Route path='/detail/:id' element={<Detail />} />
				<Route path='/signUp' element={<SignUpForm />} />
				<Route path='/admin' element={<HomeAdmin />} />
				<Route path='/error404' element={<Error404 />} />
				<Route path='/loginadmin' element={<LoginAdmin />} />
				<Route path='/admin/property/:id' element={<EditPropertyFromAdmin />} />
				<Route path="/detail/reservations/:id" element={<Reservations />} />
				<Route path='/postUser' element={<Postuser />} />
				<Route path='/checkout' element={<PaymentForm />} />

				<Route path='/gestionUser' element={<GestionUser />} />
				<Route path="/bookings" element={<Bookings />} />
			</Routes>
		</div>
	);
}
export default App;
