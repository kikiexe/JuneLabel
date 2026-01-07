import React, { useState } from "react";
import { Link } from '@inertiajs/react'; 
import { Facebook, Instagram, Mail, Twitter } from 'lucide-react';
import WhatsAppButton from '../../Utils/WhatsAppButton';
import Alert from '../../Utils/Alert';

export default function Footer() {
	const currentYear = new Date().getFullYear();
	const [email, setEmail] = useState("");
    const [alertOpen, setAlertOpen] = useState(false);

    const handleDevFeature = (e) => {
        e.preventDefault();
        setAlertOpen(true);
    };

	const handleSubscribe = (e) => {
		e.preventDefault();
		alert(`Terima kasih! Email ${email} telah didaftarkan.`);
		setEmail("");
	};

	return (
		<footer style={{ backgroundColor: "#ffffff", color: "#525252" }} className="py-12 px-6 md:px-10 lg:px-16 font-inter text-sm relative">
            <Alert isOpen={alertOpen} onClose={() => setAlertOpen(false)} />
            <WhatsAppButton />
			<div className="w-full max-w-[1920px] mx-auto">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
					
					<div className="lg:col-span-1">
                        <h3 className="text-xs font-bold tracking-[0.15em] mb-4 text-[#525252] uppercase">CUSTOMER CARE</h3>
                        <ul className="space-y-2 text-xs text-[#525252]/80">
                            <li><Link href="/payment-information" className="hover:underline">Payment Information</Link></li>
                            <li><Link href="/how-to-order" className="hover:underline">How to Order</Link></li>
                            <li><Link href="/how-to-pay" className="hover:underline">How to Pay</Link></li>
                            <li><Link href="/shipping-policy" className="hover:underline">Shipping Policy</Link></li>
                            <li><Link href="/terms-conditions" className="hover:underline">Terms of Service</Link></li>
                            <li><Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link></li>
                            <li><Link href="/track-order" className="hover:underline">Track Order</Link></li>
                        </ul>
                    </div>

                    <div className="lg:col-span-1">
                        <h3 className="text-xs font-bold tracking-[0.15em] mb-4 text-[#525252] uppercase">JUNE LABEL</h3>
                        <p className="text-xs leading-relaxed mb-6 text-[#525252]/80">
                            Founded in 2025, June Label comes with variety of cute and sweet colors as characteristic of Muslimah who always spread kindness. We inspire to present comfortable daily hijab for your everyday wear.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" onClick={handleDevFeature} className="hover:opacity-70 transition-opacity text-[#525252]">
                                <Facebook size={16} strokeWidth={1.5} />
                            </a>
                             <a 	href="https://www.tiktok.com/@junelabel.co" 
									target="_blank"
									rel="noopener noreferrer" 
									className="hover:opacity-70 transition-opacity text-[#525252]">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"></path>
                                </svg>
                            </a>
                            <a	href="https://www.instagram.com/junelabel.co/" 
                                target="_blank"
                                rel="noopener noreferrer" 
                                className="hover:opacity-70 transition-opacity text-[#525252]">
                                <Instagram size={16} strokeWidth={1.5} />
                            </a>
                            <a href="mailto:junelabelco@gmail.com" className="hover:opacity-70 transition-opacity text-[#525252]">
                                <Mail size={16} strokeWidth={1.5} />
                            </a>
                        </div>
                    </div>

                     <div className="lg:col-span-1">
                        <h3 className="text-xs font-bold tracking-[0.15em] mb-4 text-[#525252] uppercase">CUSTOMER SERVICES</h3>
                        <div className="space-y-3 text-xs text-[#525252]/80">
                             <p>
                                Chat with Us : <a href="https://wa.me/6282282577216" target="_blank" rel="noopener noreferrer" className="hover:underline transition-all">+62 822-8257-7216</a>
                             </p>
                             <p>Monday - Sunday : 8.30 AM - 9.00 PM</p>
                             <p className="mt-4">
                                Email : <a href="mailto:junelabelco@gmail.com" className="hover:underline transition-all">junelabelco@gmail.com</a>
                             </p>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <h3 className="text-xs font-bold tracking-[0.15em] mb-4 text-[#525252] uppercase">ABOUT US</h3>
                        <ul className="space-y-2 text-xs text-[#525252]/80">
                            <li><Link href="/contact-us" className="hover:underline">Contact Us</Link></li>
                            <li><Link href="/our-store" className="hover:underline">Our Store</Link></li>
                            <li><Link href="/about-us" className="hover:underline">Stories</Link></li>
                        </ul>
                    </div>

                    <div className="lg:col-span-1">
						<h3 className="text-xs font-bold tracking-[0.15em] mb-4 text-[#525252] uppercase">NEWSLETTER</h3>
						<p className="text-xs leading-relaxed mb-6 text-[#525252]/80">
							Subscribe to receive updates, access to exclusive deals, and more.
						</p>
						<form onSubmit={handleSubscribe} className="space-y-4">
							<input
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder=" Enter your email address"
								required
								className="w-full px-0 py-2 text-xs border-b border-[#525252] bg-transparent focus:outline-none focus:border-[#525252] transition-colors placeholder-[#525252]/50"
							/>
							<button
								type="submit"
								className="group relative px-6 py-2 text-[10px] font-bold uppercase tracking-[0.15em] border border-[#525252] bg-[#525252] overflow-hidden transition-all duration-300 shadow-sm text-white"
								style={{ borderRadius: '0px' }}
							>
								<span className="absolute inset-0 w-full h-full bg-[#FFFFFF] transition-transform duration-500 ease-[cubic-bezier(0.32,0,0.67,0)] scale-x-0 origin-right group-hover:scale-x-100 group-hover:origin-left"></span>
								<span className="relative z-10 transition-colors duration-500 group-hover:text-[#525252]">
									SUBSCRIBE
								</span>
							</button>
						</form>
					</div>
				</div>

				<div className="pt-8 text-center">
					<div className="grid grid-cols-8 md:flex md:flex-wrap justify-center items-center gap-x-1 gap-y-3 md:gap-x-4 mb-4 opacity-70">
						{[
							'midtrans.png', 'bca.png', 'mandiri.png', 'bni.png', 'bri.png', 
							'permata bank.png', 'ovo.png', 'dana.png', 'gopay.png', 
							'linkaja.png', 'visa.png', 'paypal.png', 'jcb.png', 
							'alfamart.png', 'qris.png', 'shopee pay.png'
						].map((logo, index) => (
							<div key={index} className="flex justify-center items-center px-1">
								<img 
									src={`/images/payments/${logo}`}
									alt={logo.replace('.png', '')}
									className="h-3 md:h-4 w-auto object-contain grayscale hover:grayscale-0 transition-all max-w-full"
								/>
							</div>
						))}
					</div>
					<p className="text-[10px] md:text-xs pt-2 text-[#525252]/60">
						&copy; {currentYear} <span className="underline">June Label</span> - All Rights Reserved. Developed by <a href="https://www.instagram.com/munkstudio.id/" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-70 transition-opacity">munkstudio.id</a>
					</p>
				</div>
			</div>
		</footer>
	);
}