import { Head } from '@inertiajs/react';

export default function DetailSection({ product, auth }) {

    const allImages = [
        product.image, 
        ...(product.gallery || [])
    ];

    return (
        <div className="bg-[#FFFFFF] pt-32 pb-16 px-6">
            <div className="max-w-7xl mx-auto w-full">
                
                {/* LAYOUT UTAMA: GRID 2 KOLOM */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    
                    {/* BAGIAN KIRI: GRID GAMBAR 2x2 */}
                    <div className="grid grid-cols-2 gap-4 max-h-[800px]">
                        {allImages.map((img, index) => (
                            <div 
                                key={index} 
                                className="aspect-[3/4] bg-white shadow-sm overflow-hidden rounded-sm"
                            >
                                <img 
                                    src={`/storage/${img}`} 
                                    alt={`${product.name} ${index + 1}`} 
                                    className="w-full h-full object-cover hover:scale-105 transition duration-500 ease-in-out"
                                />
                            </div>
                        ))}
                    </div>

                    {/* BAGIAN KANAN: INFO PRODUK (Sticky) */}
                    <div className="flex flex-col justify-start lg:sticky lg:top-40 h-fit space-y-6">
                        
                        {/* Kategori */}
                        <p className="text-xs font-semibold tracking-[0.2em] text-gray-400 uppercase">
                            {product.category?.name || 'Collection'}
                        </p>

                        {/* Nama Produk */}
                        <h1 className="text-4xl md:text-5xl font-serif text-[#7C634D] leading-tight">
                            {product.name}
                        </h1>

                        {/* Harga */}
                        <p className="text-2xl font-light text-gray-800">
                            {new Intl.NumberFormat('id-ID', { 
                                style: 'currency', 
                                currency: 'IDR', 
                                minimumFractionDigits: 0 
                            }).format(product.price)}
                        </p>

                        <hr className="border-[#7C634D]/20" />

                        {/* Deskripsi */}
                        <div className="prose prose-sm prose-brown max-w-none">
                            <h3 className="text-[#7C634D] font-medium mb-3 uppercase text-xs tracking-[0.15em]">
                                Deskripsi
                            </h3>
                            <div 
                                className="text-gray-600 font-light leading-relaxed text-sm"
                                dangerouslySetInnerHTML={{ __html: product.description }} 
                            />
                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
}