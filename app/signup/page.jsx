"use client";
import { useState } from "react";
import { useTanstack } from "@/providers/TanstackProvider";
import Link from "next/link";
import { toast } from 'react-toastify'; // Import toast

const SignUp = () => {
    const { register } = useTanstack();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(name, email, phone, password); // Assuming register returns a promise
            toast.success("Registration successful!"); // Show success toast
        } catch (error) {
            toast.error("Registration failed. Please try again."); // Show error toast
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-black">
            <div className="w-full max-w-4xl p-6 md:p-12 bg-white bg-opacity-10 rounded-2xl shadow-lg backdrop-blur-md border border-gray-700">
                {/* Logo Section */}
                <div className="flex justify-center mb-8">
                    {/* <img src={logo} alt="logo" className="w-12" /> */}
                </div>

                {/* Register Form Section */}
                <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
                    {/* Left: Text Section */}
                    <div className="md:w-1/2">
                        <h2 className="text-2xl md:text-4xl font-bold text-white">
                            Join Us Today!
                            <span className="block text-neutral-400 font-medium">
                                Register as a User
                            </span>
                        </h2>
                        <p className="mt-4 text-gray-300 leading-relaxed">
                            Create your account by filling in your valid information. It is quick and easy.
                        </p>
                    </div>

                    {/* Right: Form Section */}
                    <div className="w-full md:w-1/2">
                        <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-md">
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full p-2 mb-4 rounded border border-gray-300"
                                />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full p-2 mb-4 rounded border border-gray-300"
                                />
                                <input
                                    type="tel"
                                    placeholder="Phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full p-2 mb-4 rounded border border-gray-300"
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full p-2 mb-4 rounded border border-gray-300"
                                />
                                <button
                                    type="submit"
                                    className="w-full bg-yellow-400 text-black font-bold py-2 rounded hover:bg-yellow-300 transition"
                                >
                                    Sign Up
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Login Link */}
                <div className="mt-6">
                    <Link
                        href="/login"
                        className="flex items-center gap-2 text-sm md:text-base font-medium text-yellow-400 hover:underline"
                    >
                        <span>Already have an account? Login</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
