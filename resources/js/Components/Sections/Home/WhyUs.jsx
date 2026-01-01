import React from "react";

export default function WhyChooseUsSection() {
	const images = [
		{
			id: 1,
			image: "/images/WhyUs/whyus-1.png",
			alt: "Quality Products",
		},
		{
			id: 2,
			image: "/images/WhyUs/whyus-2.png",
			alt: "Premium Materials",
		},
		{
			id: 3,
			image: "/images/WhyUs/whyus-3.png",
			alt: "Expert Craftsmanship",
		},
		{
			id: 4,
			image: "/images/WhyUs/whyus-4.png",
			alt: "Modern Design",
		},
		{
			id: 5,
			image: "/images/WhyUs/whyus-5.png",
			alt: "Customer Satisfaction",
		},
		{
			id: 6,
			image: "/images/WhyUs/whyus-6.png",
			alt: "Trusted Brand",
		},
	];

	return (
		<section style={{ backgroundColor: "#FFF6EC" }} className="py-2">
			<div className="w-full px-6 max-w-screen-2xl mx-auto">
				{/* Images Grid */}
				<div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-5 lg:gap-10">
					{images.map((item) => (
						<div
							key={item.id}
							className="relative overflow-hidden group "
							style={{ paddingBottom: "100%" }}
						>
							<img
								src={item.image}
								alt={item.alt}
								className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
							/>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
