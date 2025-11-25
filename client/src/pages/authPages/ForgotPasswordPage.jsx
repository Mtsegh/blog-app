import { useState } from 'react'
import { AuthImagePattern, InputField } from '../../components'
import { ArrowLeft, Loader2, Lock, Mail, User } from "lucide-react";
import { Link } from "react-router-dom";
import pen from "../../assets/pen.svg"
import useAuthStore from '../../store/useAuthStore';
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
    
    const [formData, setFormData] = useState({
        email: "",
    });

    const { sendResetLink, isLoading } = useAuthStore();

    const handleSubmit = (e) => {
        e.preventDefault();

        const success = validateForm();

        if (success === true) sendResetLink(formData);
    };

    const validateForm = () => {
        if (!formData.email.trim()) return toast.error("Username is required");
        
        return true;
    };

    return (
        <div className="grid lg:grid-cols-2">
            {/* right side */}

            <AuthImagePattern
                title="Join our community"
                subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
            />
        {/* left side */}
        <div className="flex flex-col justify-center items-center p-6 sm:p-12 mt-8">
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
                <h1 className="text-2xl font-bold mt-2">Forgot Password</h1>
                <p className="text-base-content/60">Enter your email address and we'll send you a link to reset your password.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <InputField
                    label={"Email"}
                    Icon={Mail}
                    type={"email"}
                    placeholder={"paulapaul@gmail.com"}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />

                <button type="submit" className="btn btn-primary rounded-lg w-full mt-1.5" disabled={isLoading}>
                {isLoading ? (
                    <>
                    <Loader2 className="size-5 animate-spin" />
                    Loading...
                    </>
                ) : (
                    "Send Reset Link"
                )}
                </button>
            </form>
    		<div className='px-8 top-0 flex justify-center'>
				<Link to={"/login"} className='text-50 text-primary hover:underline flex items-center'>
					<ArrowLeft className='h-4 w-4 mr-2' /> Back to Login
				</Link>
            </div>
            </div>
        </div>

        </div>
    )
}

