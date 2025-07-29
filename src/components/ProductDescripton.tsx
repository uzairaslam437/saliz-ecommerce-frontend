import type { ProductDescriptionTypes } from "@/types/Product";
import { useLocation , useParams} from "react-router-dom";
import React,{useState,useEffect} from 'react'

export const ProductDescription = () => {
    const { id } = useParams<{ id: string }>();
    const location = useLocation();
    const productDetails = location.state?.product;
    
    const [quantity,setQuantity] = useState(0);

    const product: ProductDescriptionTypes = {
            name: productDetails.name,
            description: productDetails.description,
            shortDescription: productDetails.shortDescription,
            price: productDetails.price,
            sku: productDetails.sku,
            comparePrice: productDetails.comparePrice,
            weight: productDetails.weight,
            images: productDetails.images,
            vendor:{
                storeName: productDetails.vendorStoreName,
                location: productDetails.location
            }
    }

    const [selectedImage,setSelectedImage] = useState<string>(product.images[0]);

    useEffect(()=>{
        
        console.log(product)
    },[])



    const handleAddToCart = () => {

    }

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-8 font-poppins">
        {/* Top Section: Image and Key Info Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left: Product Images */}
            <div>
            {/* Large Image */}
            <div className="border rounded mb-4 overflow-hidden">
                <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-[400px] object-cover"
                />
            </div>

            {/* Thumbnails */}
            <div className="flex space-x-4">
                {product.images.map((imgUrl, idx) => (
                <img
                    key={idx}
                    src={imgUrl}
                    alt={`Product thumbnail ${idx}`}
                    onClick={() => setSelectedImage(imgUrl)}
                    className={`w-24 h-24 object-cover rounded cursor-pointer border ${
                    selectedImage === imgUrl ? "border-blue-600" : "border-gray-300"
                    }`}
                />
                ))}
            </div>
            </div>

            {/* Right: Key Product Info */}
            <div className="space-y-4">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-xl text-blue-600 font-semibold">PKR {product.price}</p>

            <p className="text-yellow-500 font-medium">
                Rating: {product.rating || "N/A"}
            </p>

            {/* SKU and Weight */}
            <div className="space-y-1">
                <p className="text-gray-600">
                SKU: <span className="font-medium">{product.sku}</span>
                </p>
                <p className="text-gray-600">
                Weight: <span className="font-medium">{product.weight} kg</span>
                </p>
            </div>

            {/* Quantity Selector with Plus/Minus */}
            <div className="flex items-center space-x-4 mt-4">
                <label htmlFor="quantity" className="text-gray-700 font-medium">
                Quantity:
                </label>
                <div className="flex items-center border rounded">
                <button
                    type="button"
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-l"
                >
                    -
                </button>
                <input
                    id="quantity"
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                    className="w-16 text-center outline-none"
                />
                <button
                    type="button"
                    onClick={() => setQuantity((prev) => prev + 1)}
                    className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-r"
                >
                    +
                </button>
                </div>
            </div>

            {/* Add to Cart Button */}
            <button
                onClick={handleAddToCart}
                className="mt-4 w-full md:w-1/2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
                Add to Cart
            </button>
            </div>
        </div>

        {/* Bottom Section: Description and Vendor Info */}
        <div className="space-y-6">
            {/* Short Description */}
            <div>
            <h2 className="text-xl font-semibold mb-2">Short Description</h2>
            <p className="text-gray-700">{product.shortDescription}</p>
            </div>

            {/* Full Description */}
            <div>
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Vendor Info */}
            <div className="border rounded bg-gray-50">
            <h3 className="text-lg font-semibold mb-1">Vendor Information</h3>
            <p className="text-gray-700">
                Store: <span className="font-medium">{product.vendor.storeName}</span>
            </p>
            <p className="text-gray-700">
                Location:{" "}
                <span className="font-medium">{product.vendor.location}</span>
            </p>
            </div>
        </div>
        </div>

    );
};
