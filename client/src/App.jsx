import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from "react-hot-toast"
import { Loader } from "lucide-react"
import { CategoryPage, BlogPage, CreateBlogPage, DashboardPage, EditBlogPage, EditProfilePage, EmailVerificationPage, ForgotPasswordPage, HomePage, LoginPage, ProfilePage, ResetPasswordPage, SearchPage, SettingsPage, SignUpPage, AuthorsPage } from './pages';
import useAuthStore from './store/useAuthStore';
import { BlogEditor, Footer, LoadingSpinner } from './components';
import { MainLayout } from './Layout';


const ProtectedRoute = ({ children }) => {
	const { authUser } = useAuthStore();

	if (!authUser) {
		return <Navigate to='/' replace />;
	}
	
	if (!authUser.isVerified) {
		console.log("redirecting!!!!!!!")
		return <Navigate to='/verify-email' replace />;
	}

	return children;
};

// redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
	const { authUser } = useAuthStore();

	if (authUser && authUser.isVerified) {
		console.log("redirecting!!!!!!!")
		return <Navigate to='/dashboard' replace />;
	}
	
	return children;
};


export default function App() {
	const { isCheckingAuth, checkAuth } = useAuthStore();

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	if (isCheckingAuth) return <LoadingSpinner />;

	return (
		<div className='min-h-dvh'>
			<Routes>
				<Route element={<MainLayout />}>
					<Route
						path='/'
						element={ <HomePage /> }
					/>
					<Route
						path='/stories/:sort'
						element={ <HomePage /> }
					/>
					{"@gpt here :sort refers to sorting criteria like 'latest' or 'top' to organize stories on the HomePage."}
					<Route
						path='/dashboard'
						element={
							<ProtectedRoute>
								<DashboardPage />
							</ProtectedRoute>
						}
					/>
					<Route
						path='/profile'
						element={
							<ProfilePage />
						}
					/>
					
					<Route
						path='/blog/:slug'
						element={ <BlogPage /> }
					/>
					<Route
						path='/search'
						element={ <SearchPage /> }
					/>
					<Route
						path='/topics/:topicName'
						element={ <CategoryPage /> }
					/>				
					<Route
						path='/topics'
						element={ <CategoryPage /> }
					/>					
					<Route
						path='/authors'
						element={ <AuthorsPage /> }
					/>					
				</Route>

				<Route
					path='/edit-profile'
					element={
						<EditProfilePage />
						// <ProtectedRoute>
						// 	<ProfilePage />
						// </ProtectedRoute>
					}
				/>
				<Route
					path='/create-story'
					element={
						<ProtectedRoute>
							<CreateBlogPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/edit-story/:slug'
					element={
						<ProtectedRoute>
							<EditBlogPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/settings'
					element={ <SettingsPage /> }
				/>
				<Route
					path='/signup'
					element={
						<RedirectAuthenticatedUser>
							<SignUpPage />
						</RedirectAuthenticatedUser>
					}
				/>
				<Route
					path='/login'
					element={
						<RedirectAuthenticatedUser>
							<LoginPage />
						</RedirectAuthenticatedUser>
					}
				/>
				<Route path='/verify-email' element={<EmailVerificationPage />} />
				<Route
					path='/forgot-password'
					element={
						<RedirectAuthenticatedUser>
							<ForgotPasswordPage />
						</RedirectAuthenticatedUser>
					}
				/>

				<Route
					path='/reset-password/:token'
					element={
						<RedirectAuthenticatedUser>
							<ResetPasswordPage />
						</RedirectAuthenticatedUser>
					}
				/>
				{/* catch all routes */}
				<Route path='*' element={<Navigate to='/' replace />} />
			</Routes>
			<Footer />
			<Toaster />
		</div>
	);
}
