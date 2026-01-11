import { useState } from 'react';
import { Loader2, Lock, Mail, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import pen from "../../src/assets/pen.svg";
import useAuthStore from "../store/useAuthStore";
import toast from "react-hot-toast";
import InputField from './InputField';

export default function PopupLogin({ open, onClose }) {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        userSlugOrEmail: "",
        password: "",
    });

    const { login, isLoggingIn } = useAuthStore();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const success = validateForm();

        if (success !== true) return;
        const res = await login(formData);
        if (res) {
            onClose();
        }
    };

    const validateForm = () => {
        if (!formData.userSlugOrEmail.trim()) return toast.error("Email is required");
        if (!formData.password) return toast.error("Password is required");

        return true;
    };
    if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center px-5 justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative z-50 w-full max-w-md rounded-xl bg-white dark:bg-gray-900 shadow-xl p-6">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
        >
          ✕
        </button>

        {/* Your existing content */}
            <div className="flex flex-col items-center">
                <img src={pen} className="size-14 mb-3" />
                <h1 className="text-2xl font-bold">Welcome Back</h1>
                <p className="text-sm text-gray-500 mb-6">
                    Sign in to your account
                </p>
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

    )
}

    