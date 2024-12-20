import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { ThemeProvider } from './components/theme-provider';
import { AuthProvider, useAuth } from './components/auth/AuthContext';
import { Products } from './pages/Products';
import { Register } from './pages/Register';
import { Profile } from './pages/Profile';
import { Login } from './pages/Login';
import { Cart } from './pages/Cart';
import { MainPage } from './pages/MainPage';
import { ErrorPage } from './pages/Error';

function App() {
	const router = createBrowserRouter([
		{
			path: '/',
			element: <MainPage />,
			children: [
				{ path: 'products', element: <Products /> },
				{ path: 'cart', element: <PrivateRoute><Cart /></PrivateRoute> },
				{ path: 'login', element: <Login /> },
				{ path: 'register', element: <Register /> },
				{ path: 'profile', element: <PrivateRoute><Profile /></PrivateRoute> },
				{ path: '*', element: <Navigate to="/" replace /> },
			],
			errorElement: <ErrorPage />,
		},
	]);

	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<AuthProvider>
				<RouterProvider router={router} />
			</AuthProvider>
		</ThemeProvider>
	);
}

function PrivateRoute({ children }: { children: JSX.Element }) {
	const { user } = useAuth();
	return user ? children : <Navigate to="/login" replace />;
}

export default App;