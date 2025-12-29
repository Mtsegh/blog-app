import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from "react-hot-toast"
import { Loader } from "lucide-react"
import { BlogPage, CreateBlogPage, DashboardPage, EditBlogPage, EditProfilePage, EmailVerificationPage, ForgotPasswordPage, HomePage, LoginPage, ProfilePage, ResetPasswordPage, SearchPage, SettingsPage, SignUpPage, AuthorsPage, AddTopic, AllTopicsPage } from './pages';
import useAuthStore from './store/useAuthStore';
import { Footer, LoadingSpinner } from './components';
import { MainLayout } from './Layout';
import TopicsInfoPage from './pages/blogPages/TopicsInfoPage';


const ProtectedRoute = ({ children }) => {
	const { authUser } = useAuthStore();

	if (!authUser) {
		return <Navigate to='/login' replace />;
	}
	// console.log(authUser.isVerified);
	if (!authUser.isVerified) {
		// console.log("redirecting!!!!!!!");
		return <Navigate to='/verify-email' replace />;
	}

	return children;
};

// redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
	const { authUser } = useAuthStore();

	if (authUser) {
		if (authUser.isVerified) {
			return <Navigate to='/dashboard' replace />;
		} else if (!authUser.isVerified) {
			return <Navigate to='/verify-email' replace />;
		}
	}
	// console.log("not redirecting!!!!!!!");
	return children;
};


export default function App() {
	const { isCheckingAuth, checkAuth, authUser } = useAuthStore();

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
					<Route
						path='/dashboard'
						element={
							<ProtectedRoute>
								<DashboardPage />
							</ProtectedRoute>
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
						path='/topics/:topicSlug'
						element={ <TopicsInfoPage /> }
					/>				
					<Route
						path='/topics'
						element={ <AllTopicsPage /> }
					/>					
					<Route
						path='/authors'
						element={ <AuthorsPage /> }
					/>					
					<Route
						path='/authors/:userSlug'
						element={ <ProfilePage /> }
					/>					
					<Route
						path='/profile/:userSlug'
						element={ <ProfilePage /> }
					/>					
				</Route>

				<Route
					path='/edit-profile'
					element={
						<ProtectedRoute>
							<EditProfilePage />
						</ProtectedRoute>
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
					path='/create-topic'
					element={
						<ProtectedRoute>
							<AddTopic />
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
				<Route path='/verify-email'
					element={
						<RedirectAuthenticatedUser>
							<EmailVerificationPage />
						</RedirectAuthenticatedUser>
					}
				/>
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
