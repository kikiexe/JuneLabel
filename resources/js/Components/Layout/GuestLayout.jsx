import Navbar from "@/Components/Layout/Navbar";
import Footer from "@/Components/Layout/Footer";

export default function GuestLayout({ children }) {
	return (
		<div className="min-h-screen flex flex-col bg-gray-100">
			<Navbar />
			<div className="flex-grow pt-16">{children}</div>
			<Footer />
		</div>
	);
}
