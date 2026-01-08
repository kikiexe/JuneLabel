import Navbar from "@/Components/Layout/Navbar";
import Footer from "@/Components/Layout/Footer";
import { Head, Link } from "@inertiajs/react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

export default function Dashboard() {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchUser = async () => {
			const token = Cookies.get("token");
			if (!token) {
				window.location.href = "/login";
				return;
			}

			try {
				const response = await axios.get("/api/user", {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				setUser(response.data);
			} catch (error) {
				console.error("Failed to fetch user:", error);
				Cookies.remove("token");
				window.location.href = "/login";
			} finally {
				setLoading(false);
			}
		};

		fetchUser();
	}, []);

	const handleLogout = async (e) => {
		e.preventDefault();
		try {
			const token = Cookies.get("token");
			if (token) {
				await axios.post(
					"/api/logout",
					{},
					{
						headers: { Authorization: `Bearer ${token}` },
					}
				);
				Cookies.remove("token");
			}
			window.location.href = "/login";
		} catch (error) {
			console.error("Logout failed:", error);
			// Force logout anyway
			Cookies.remove("token");
			window.location.href = "/login";
		}
	};

	if (loading) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-white">
				<div className="text-lg font-medium text-[#7C634D] font-inter">
					Loading...
				</div>
			</div>
		);
	}

	if (!user) return null;

	return (
		<div className="min-h-screen flex flex-col bg-white">
			<Head title="My Account" />
			<Navbar />

			<main className="flex-grow pt-24 pb-12 px-6 md:px-12 lg:px-16 w-full max-w-[1920px] mx-auto">
				<div className="mb-10 text-center">
					<h1 className="text-3xl md:text-4xl font-bold font-noto-serif-hk text-[#7C634D] tracking-tight uppercase">
						My Account
					</h1>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
					{/* Sidebar Navigation */}
					<div className="lg:col-span-1">
						<div className="flex flex-col space-y-1 border-gray-200">
							<Link
								href="/dashboard"
								className="py-3 px-4 text-sm font-bold uppercase tracking-widest text-white bg-[#7C634D] font-inter text-left"
							>
								Dashboard
							</Link>
							<Link
								href="#"
								className="py-3 px-4 text-sm font-medium uppercase tracking-widest text-[#7C634D] hover:bg-[#7C634D]/5 transition-colors font-inter text-left border-b border-gray-100"
							>
								My Orders
							</Link>
							<button
								onClick={handleLogout}
								className="py-3 px-4 text-sm font-medium uppercase tracking-widest text-[#7C634D] hover:bg-[#7C634D]/5 transition-colors font-inter text-left border-b border-gray-100 w-full"
							>
								Logout
							</button>
						</div>
					</div>

					{/* Main Content Area */}
					<div className="lg:col-span-3">
						<div className="bg-gray-50 p-8 border border-gray-100">
							<p className="text-[#7C634D] font-inter text-lg mb-4">
								Hello, <span className="font-bold">{user.name}</span>!
							</p>
							<p className="text-[#7C634D]/80 font-inter leading-relaxed">
								From your account dashboard you can view your recent orders,
								manage your shipping and billing addresses, and edit your
								password and account details.
							</p>
						</div>
					</div>
				</div>
			</main>

			<Footer />
		</div>
	);
}
