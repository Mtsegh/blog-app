import { useState } from 'react'
import { AuthImagePattern, InputField } from '../../components'
import { Loader2, Lock, Mail, User } from "lucide-react";
import { Link } from "react-router-dom";
import pen from "../../assets/pen.svg"
import useAuthStore from '../../store/useAuthStore';
import toast from "react-hot-toast";

export default function ResetPasswordPage() {

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        username: "",
        email: "",
        password: "",
        comfirmPassword: "",
    });

    const { signup, isSigningUp } = useAuthStore();

    const handleSubmit = (e) => {
        e.preventDefault();

        const success = validateForm();

        if (success === true) signup(formData);
    };

    const validateForm = () => {
        if (!formData.password) return toast.error("Password is required");
        if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");
        if (formData.password !== formData.comfirmPassword) return toast.error("Comfirm Password must match Password");

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
        <div className="flex flex-col justify-center items-center p-6 sm:p-12">
            <div className="w-full max-w-md space-y-8">
            {/* LOGO */}
            <div className="text-center mb-8 mt-15">
                <div className="flex flex-col items-center gap-2 group">
                <div
                    className="size-15 rounded-xl bg-primary/10 flex items-center justify-center 
                group-hover:bg-primary/20 transition-colors"
                >
                    <img src={pen} className="size-14" />
                </div>
                <h1 className="text-2xl font-bold mt-2">Reset Password</h1>
                <p className="text-base-content/60">Use a strong password that others cannot guess</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <InputField
                    label={"New Password"}
                    Icon={Lock}
                    type={showPassword ? "text" : "password"}
                    placeholder={"********"}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <InputField
                    label={"Comfirm Password"}
                    Icon={Lock}
                    type={showPassword ? "text" : "password"}
                    style={"mb-1"}
                    placeholder={"********"}
                    value={formData.comfirmPassword}
                    onChange={(e) => setFormData({ ...formData, comfirmPassword: e.target.value })}
                />
                <label className='flex items-center space-x-2 cursor-pointer top-0 pt-0 mt-0'>
                    <input
                        type="checkbox"
                        className="checkbox-primary/90 size-4"
                        checked={showPassword}
                        onChange={() => setShowPassword(!showPassword)}
                    />
                    <span className='select-none'>Show Password</span>
                </label>

                <button type="submit" className="btn btn-primary w-full" disabled={isSigningUp}>
                {isSigningUp ? (
                    <>
                    <Loader2 className="size-5 animate-spin" />
                    Loading...
                    </>
                ) : (
                    "Save Password"
                )}
                </button>
            </form>

            <div className="text-center">
                <p className="text-base-content/60">
                  Back to{" "}
                <Link to="/login" className="link link-primary">
                    Login
                </Link>
                </p>
            </div>
            </div>
        </div>

        </div>
    )
}

