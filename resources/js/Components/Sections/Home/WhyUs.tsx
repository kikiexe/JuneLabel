import React from 'react';

export default function WhyChooseUsSection() {
  const images = [
    {
      id: 1,
      image: '/images/WhyUs/whyus-1.png',
      alt: 'Bahan nyaman dan adem',
      title: 'Bahan nyaman dan adem',
    },
    {
      id: 2,
      image: '/images/WhyUs/whyus-2.png',
      alt: 'Model kekinian',
      title: 'Model kekinian',
    },
    {
      id: 3,
      image: '/images/WhyUs/whyus-3.png',
      alt: 'Pilihan warna favorit',
      title: 'Pilihan warna favorit',
    },
    {
      id: 4,
      image: '/images/WhyUs/whyus-4.png',
      alt: 'Kualias awet dan tahan lama',
      title: 'Kualias awet dan tahan lama',
    },
    {
      id: 5,
      image: '/images/WhyUs/whyus-5.png',
      alt: 'Harga terjangkau',
      title: 'Harga terjangkau',
    },
    {
      id: 6,
      image: '/images/WhyUs/whyus-6.png',
      alt: 'Packaging menarik',
      title: 'Packaging menarik',
    },
  ];

  return (
    <section style={{ backgroundColor: '#FFF6EC' }} className="py-8">
      <div className="w-full px-6 max-w-screen-2xl mx-auto">
        {/* Images Grid */}
        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 lg:gap-8">
          {images.map((item) => (
            <div key={item.id} className="flex flex-col items-center">
              <div className="w-20 h-20 md:w-32 md:h-32 relative">
                <img src={item.image} alt={item.alt} className="w-full h-full object-contain" />
              </div>
              <p
                className="mt-1 mb-4 text-center text-xs md:text-sm font-bold	 font-inter"
                style={{ color: '#525252' }}
              >
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
