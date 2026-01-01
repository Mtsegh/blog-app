import { useState } from 'react'
import { AuthImagePattern, InputField } from '../../components'
import { Loader2, Lock, Mail, User } from "lucide-react";
import { Link } from "react-router-dom";
import pen from "../../assets/pen.svg"
import useAuthStore from '../../store/useAuthStore';
import toast from "react-hot-toast";

export default function LoginPage() {

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        userSlugOrEmail: "",
        password: "",
    });

    const { login, isLoggingIn } = useAuthStore();

    const handleSubmit = (e) => {
        e.preventDefault();

        const success = validateForm();

        if (success === true) login(formData);
    };

    const validateForm = () => {
        if (!formData.userSlugOrEmail.trim()) return toast.error("Email is required");
        if (!formData.password) return toast.error("Password is required");

        return true;
    };

    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            {/* right side */}

            <AuthImagePattern
                title="Join our community"
                subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
            />
        {/* left side */}
        <div className="flex flex-col justify-center items-center p-6 sm:p-12">
            <div className="w-full max-w-md space-y-8">
            {/* LOGO */}
            <div className="text-center mb-8">
                <div className="flex flex-col items-center gap-2 group">
                <div
                    className="size-15 rounded-xl bg-primary/10 flex items-center justify-center 
                group-hover:bg-primary/20 transition-colors"
                >
                    <img src={pen} className="size-14" />
                </div>
                <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
                <p className="text-base-content/60">Sign in to your account</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <InputField
                    label={"Email"}
                    Icon={User}
                    type={"text"}
                    placeholder={"paulapaul@gmail.com"}
                    value={formData.userSlugOrEmail}
                    onChange={(e) => setFormData({ ...formData, userSlugOrEmail: e.target.value })}
                />
                <InputField
                    label={"Password"}
                    Icon={Lock}
                    type={showPassword ? "text" : "password"}
                    style={"mb-1"}
                    placeholder={"********"}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <div className='flex items-center justify-between space-x-2 top-0 pt-0 mt-0'>
                    <label className='flex items-center space-x-2 cursor-pointer top-0 pt-0 mt-0'>
                        <input
                            type="checkbox"
                            className="checkbox-primary/90 size-4"
                            checked={showPassword}
                            onChange={() => setShowPassword(!showPassword)}
                        />
                        <span className='select-none'>Show Password</span>
                    </label>
                    <div className='flex items-center'>
						<Link to='/forgot-password' className='text- link-primary hover:underline'>
							Forgot password?
						</Link>
					</div>
                </div>

                <button type="submit" className="btn btn-primary w-full" disabled={isLoggingIn}>
                {isLoggingIn ? (
                    <>
                    <Loader2 className="size-5 animate-spin" />
                    Loading...
                    </>
                ) : (
                    "Login"
                )}
                </button>
            </form>

            <div className="text-center">
                <p className="text-base-content/60">
                    Don&apos;t have an account?{" "}
                    <Link to="/signup" className="link link-primary">
                        Create account
                    </Link>
                </p>
            </div>
            </div>
        </div>

        </div>
    )
}

