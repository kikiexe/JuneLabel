import ApplicationLogo from "@/Components/UI/ApplicationLogo";
import Dropdown from "@/Components/UI/Dropdown";
import NavLink from "@/Components/UI/NavLink";
import ResponsiveNavLink from "@/Components/UI/ResponsiveNavLink";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";

import Footer from "./Footer";
import Navbar from "./Navbar";
import HeroSection from "@/Components/Sections/Home/Hero";
import BestSellerSection from "../Sections/Home/BestSeller";
import WhyChooseUsSection from "../Sections/Home/WhyUs";
import CopywritingSection from "../Sections/Home/Copywriting";


export default function AuthenticatedLayout({ header, children }) {
	const user = usePage().props.auth.user;

	const [showingNavigationDropdown, setShowingNavigationDropdown] =
		useState(false);

	return (
		<div className="min-h-screen bg-gray-100 flex flex-col">
			<Navbar />
			<HeroSection />
			<BestSellerSection />
			<WhyChooseUsSection />
			<CopywritingSection />
			<Footer />
		</div>
	);
}
