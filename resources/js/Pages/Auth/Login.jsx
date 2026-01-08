import InputError from "@/Components/UI/InputError";
import PrimaryButton from "@/Components/UI/PrimaryButton";
import TextInput from "@/Components/UI/TextInput";
import GuestLayout from "@/Components/Layout/GuestLayout";
import { Head, Link } from "@inertiajs/react";
import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

export default function Login({ status, canResetPassword }) {
	const [data, setData] = useState({
		email: "",
		password: "",
	});

	const [errors, setErrors] = useState({});
	const [processing, setProcessing] = useState(false);

	const submit = async (e) => {
		e.preventDefault();
		setProcessing(true);
		setErrors({});

		try {
			const response = await axios.post("/api/login", data);

			// Store token in cookie
			Cookies.set("token", response.data.access_token, {
				expires: 14, // Default expiration
			});

			// Redirect to dashboard
			window.location.href = "/dashboard";
		} catch (error) {
			if (error.response && error.response.status === 401) {
				setErrors({ email: "These credentials do not match our records." });
			} else if (error.response && error.response.status === 422) {
				setErrors(error.response.data.errors);
			} else {
				console.error("Login failed:", error);
			}
		} finally {
			setProcessing(false);
		}
	};

	return (
		<GuestLayout>
			<Head title="Log in" />
			<div className="flex flex-1 overflow-hidden min-h-[calc(100vh-64px)]">
				<div className="hidden lg:flex lg:w-1/3 relative overflow-hidden">
					<img
						src="images/Login/login.jpeg"
						alt="Login Banner"
						className="absolute inset-0 w-full h-full object-cover"
					/>
				</div>

				<div className="flex-1 flex items-center justify-center p-8 bg-gray-50 overflow-y-auto">
					<div className="w-full max-w-md animate-fade-in-up px-4">
						<div className="mb-10 text-center">
							<h2 className="text-3xl font-bold font-noto-serif-hk text-[#7C634D] tracking-tight">
								LOGIN
							</h2>
							<p className="mt-3 text-sm text-[#7C634D] font-inter">
								Please enter your e-mail and password
							</p>
						</div>

						{status && (
							<div className="mb-6 bg-green-50 p-4 border border-green-200">
								<div className="flex">
									<div className="flex-shrink-0">
										<svg
											className="h-5 w-5 text-green-400"
											viewBox="0 0 20 20"
											fill="currentColor"
										>
											<path
												fillRule="evenodd"
												d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
												clipRule="evenodd"
											/>
										</svg>
									</div>
									<div className="ml-3">
										<p className="text-sm font-medium text-green-800">
											{status}
										</p>
									</div>
								</div>
							</div>
						)}

						<form onSubmit={submit} className="space-y-5">
							<div>
								<TextInput
									id="email"
									type="email"
									name="email"
									value={data.email}
									placeholder="Email"
									className="mt-1 block w-full px-4 py-3 placeholder-gray-400 !rounded-none border-[#7C634D] focus:border-[#7C634D] focus:ring-[#7C634D]"
									autoComplete="username"
									onChange={(e) => setData({ ...data, email: e.target.value })}
								/>
								<InputError message={errors.email} className="mt-2" />
							</div>

							<div>
								<TextInput
									id="password"
									type="password"
									name="password"
									value={data.password}
									placeholder="Password"
									className="mt-1 block w-full px-4 py-3 placeholder-gray-400 !rounded-none border-[#7C634D] focus:border-[#7C634D] focus:ring-[#7C634D]"
									autoComplete="current-password"
									onChange={(e) =>
										setData({ ...data, password: e.target.value })
									}
								/>
								<InputError message={errors.password} className="mt-2" />

								<div className="flex justify-end mt-2">
									{canResetPassword && (
										<Link
											href={route("password.request")}
											className="text-sm text-[#7C634D] font-medium hover:underline focus:outline-none focus:underline transition-all"
										>
											Lupa password?
										</Link>
									)}
								</div>
							</div>

							<button
								type="submit"
								className="group relative w-full py-3 font-inter text-base border border-[#7C634D] bg-[#7C634D] overflow-hidden transition-all duration-300"
								style={{ borderRadius: "0px" }}
								disabled={processing}
							>
								<span className="absolute inset-0 w-full h-full bg-[#FFFFFF] transition-transform duration-500 ease-[cubic-bezier(0.32,0,0.67,0)] scale-x-0 origin-right group-hover:scale-x-100 group-hover:origin-left"></span>
								<span className="relative z-10 text-[#FFFFFF] transition-colors duration-500 group-hover:text-[#7C634D] flex items-center justify-center h-full w-full">
									{processing ? (
										<span className="flex items-center">
											<svg
												className="animate-spin -ml-1 mr-3 h-4 w-4 text-[#7C634D]"
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
											>
												<circle
													className="opacity-25"
													cx="12"
													cy="12"
													r="10"
													stroke="currentColor"
													strokeWidth="4"
												></circle>
												<path
													className="opacity-75"
													fill="currentColor"
													d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
												></path>
											</svg>
											Processing...
										</span>
									) : (
										"Log in"
									)}
								</span>
							</button>

							<div className="text-center text-sm text-[#7C634D] mt-6">
								Belum Punya Akun?{" "}
								<Link
									href={route("register")}
									className="text-[#7C634D] font-medium hover:underline focus:outline-none transition-all"
								>
									Buat Akun
								</Link>
							</div>
						</form>
					</div>
				</div>
			</div>
		</GuestLayout>
	);
}
