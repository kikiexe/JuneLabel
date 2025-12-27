import React, { useState } from "react";
import { Link } from '@inertiajs/react'; 

export default function Footer() {
	const currentYear = new Date().getFullYear();
	const [email, setEmail] = useState("");

	const handleSubscribe = (e) => {
		e.preventDefault();
		alert(`Terima kasih! Email ${email} telah didaftarkan.`);
		setEmail("");
	};

	return (
		<footer style={{ backgroundColor: "#d9d9d9", color: "#525252" }} className="py-12 px-6 md:px-16">
			<div className="w-full max-w-[1920px] mx-auto">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
					
                    {/* Layanan Konsumen */}
					<div>
						<h3 className="text-lg font-bold mb-4">Layanan Konsumen</h3>
						<div className="space-y-4 text-sm">
							<div>
								<p className="font-semibold">June Label</p>
								<p>Customer Service: +62 812-3456-7890</p>
								<p>Email: junelabelco@gmail.com</p>
							</div>
							<div>
								<p className="font-semibold">Direktorat Jenderal Perlindungan Konsumen dan Tertib Niaga</p>
								<p>Kementerian Perdagangan RI</p>
								<p>WhatsApp: +62 853 1111 1010</p>
							</div>
						</div>
					</div>

					{/* Informasi */}
					<div>
						<h3 className="text-lg font-bold mb-4">Informasi</h3>
						<ul className="space-y-2 mb-6 text-sm">
							<li>
								<Link href="/syarat-ketentuan" className="hover:opacity-70 transition-opacity">
									Syarat dan Ketentuan
								</Link>
							</li>
							<li>
								<Link href="/tentang" className="hover:opacity-70 transition-opacity">
									Tentang Kami
								</Link>
							</li>
							<li>
								<Link href="/privacy-policy" className="hover:opacity-70 transition-opacity">
									Privacy Policy
								</Link>
							</li>
							<li>
								<Link href="/lokasi" className="hover:opacity-70 transition-opacity">
									Lokasi Toko
								</Link>
							</li>
						</ul>

						{/* Social Media (Tetap pakai 'a' karena link keluar) */}
						<div className="flex gap-4">
                            <span className="text-xs text-gray-500">[Icon Sosmed Placeholder]</span>
						</div>
					</div>

					{/* Newsletter */}
					<div>
						<h3 className="text-lg font-bold mb-4">Newsletter</h3>
						<p className="text-sm mb-4">
							Dapatkan update terbaru dan penawaran spesial langsung ke email Anda.
						</p>
						<form onSubmit={handleSubscribe} className="space-y-3">
							<input
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="Masukkan email Anda"
								required
								className="w-full px-4 py-2 text-sm border-0 focus:outline-none focus:ring-2 focus:ring-gray-400 rounded bg-white text-[#525252]"
							/>
							<button
								type="submit"
								className="w-full px-4 py-2 text-sm font-semibold text-white hover:opacity-90 transition-opacity rounded bg-[#525252]"
							>
								Berlangganan
							</button>
						</form>
					</div>
				</div>

				<div className="border-t border-[#525252] pt-6 text-center">
					<p className="text-sm">
						&copy; {currentYear} - JUNELABEL | All Rights Reserved
					</p>
				</div>
			</div>
		</footer>
	);
}