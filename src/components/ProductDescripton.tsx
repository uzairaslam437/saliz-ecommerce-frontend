// import type { ProductDescriptionTypes } from "@/types/Product";
// import { useLocation, useParams } from "react-router-dom";
// import React, { useState, useEffect } from "react";

// export const ProductDescription = () => {
//   // const { id } = useParams<{ id: string }>();
//   const location = useLocation();
//   const productDetails = location.state?.product;

//   const [quantity, setQuantity] = useState(0);

//   const product: ProductDescriptionTypes = {
//     name: productDetails.name,
//     description: productDetails.description,
//     shortDescription: productDetails.shortDescription,
//     price: productDetails.price,
//     sku: productDetails.sku,
//     comparePrice: productDetails.comparePrice,
//     weight: productDetails.weight,
//     images: productDetails.images,
//     vendor: {
//       storeName: productDetails.vendorStoreName,
//       location: productDetails.location,
//     },
//   };

//   const [selectedImage, setSelectedImage] = useState<string>(product.images[0]);

//   useEffect(() => {
//     console.log(product);
//   }, []);

//   const handleAddToCart = () => {};

//   return (
//     <div className="max-w-6xl mx-auto p-6 space-y-8 font-poppins">
//       {/* Top Section: Image and Key Info Side by Side */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         {/* Left: Product Images */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           {/* Left: Product Images */}
//           <div>
//             {/* Large Image */}
//             <div className="border rounded mb-4 overflow-hidden flex justify-center items-center h-[400px] bg-white">
//               <img
//                 src={selectedImage}
//                 alt={product.name}
//                 className="max-w-full max-h-full object-contain"
//               />
//             </div>

//             {/* Thumbnails */}
//             <div className="flex space-x-4">
//               {product.images.map((imgUrl, idx) => (
//                 <img
//                   key={idx}
//                   src={imgUrl}
//                   alt={`Product thumbnail ${idx}`}
//                   onClick={() => setSelectedImage(imgUrl)}
//                   className={`w-24 h-24 object-contain rounded cursor-pointer border ${
//                     selectedImage === imgUrl
//                       ? "border-blue-600"
//                       : "border-gray-300"
//                   }`}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Right: Key Product Info */}
//         <div className="space-y-4">
//           <h1 className="text-3xl font-bold">{product.name}</h1>
//           <p className="text-xl text-blue-600 font-semibold">
//             PKR {product.price}
//           </p>

//           <p className="text-yellow-500 font-medium">
//             Rating: {product.rating || "N/A"}
//           </p>

//           {/* SKU and Weight */}
//           <div className="space-y-1">
//             <p className="text-gray-600">
//               SKU: <span className="font-medium">{product.sku}</span>
//             </p>
//             <p className="text-gray-600">
//               Weight: <span className="font-medium">{product.weight} grams</span>
//             </p>
//           </div>

//           {/* Quantity Selector with Plus/Minus */}
//           <div className="flex items-center space-x-4 mt-4">
//             <label htmlFor="quantity" className="text-gray-700 font-medium">
//               Quantity:
//             </label>
//             <div className="flex items-center border rounded">
//               <button
//                 type="button"
//                 onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
//                 className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-l"
//               >
//                 -
//               </button>
//               <input
//                 id="quantity"
//                 type="number"
//                 min="1"
//                 value={quantity}
//                 onChange={(e) =>
//                   setQuantity(Math.max(1, Number(e.target.value)))
//                 }
//                 className="w-16 text-center outline-none"
//               />
//               <button
//                 type="button"
//                 onClick={() => setQuantity((prev) => prev + 1)}
//                 className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-r"
//               >
//                 +
//               </button>
//             </div>
//           </div>

//           {/* Add to Cart Button */}
//           <button
//             onClick={handleAddToCart}
//             className="mt-4 w-full md:w-1/2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
//           >
//             Add to Cart
//           </button>
//         </div>
//       </div>

//       {/* Bottom Section: Description and Vendor Info */}
//       <div className="space-y-6">
//         {/* Short Description */}
//         <div>
//           <h2 className="text-xl font-semibold mb-2">Short Description</h2>
//           <p className="text-gray-700">{product.shortDescription}</p>
//         </div>

//         {/* Full Description */}
//         <div>
//           <h2 className="text-xl font-semibold mb-2">Description</h2>
//           <p className="text-gray-700 leading-relaxed">{product.description}</p>
//         </div>

//         {/* Vendor Info */}
//         <div className="border rounded bg-gray-50">
//           <h3 className="text-lg font-semibold mb-1">Vendor Information</h3>
//           <p className="text-gray-700">
//             Store:{" "}
//             <span className="font-medium">{product.vendor.storeName}</span>
//           </p>
//           <p className="text-gray-700">
//             Location:{" "}
//             <span className="font-medium">{product.vendor.location}</span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

import type { ProductDescriptionTypes } from "@/types/Product";
import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
// import { useCart, Product } from "@/contexts/CartContext";
import type { Product } from "@/types/cart";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Check, Plus, Minus } from "lucide-react";
import { toast } from "sonner"; // Optional: for success/error messages

export const ProductDescription = () => {
  const location = useLocation();
  const productDetails = location.state?.product;

  // Cart context
  const { addToCart, isInCart, quantityOfItem, updateQuantity } = useCart();

  // Local state
  const [quantity, setQuantity] = useState(1); // Start with 1 instead of 0
  const [isAdding, setIsAdding] = useState(false);

  const product: ProductDescriptionTypes = {
    id: productDetails.id,
    name: productDetails.name,
    description: productDetails.description,
    shortDescription: productDetails.shortDescription,
    price: productDetails.price,
    sku: productDetails.sku,
    comparePrice: productDetails.comparePrice,
    weight: productDetails.weight,
    images: productDetails.images,
    vendor: {
      storeName: productDetails.vendorStoreName,
      location: productDetails.location,
    },
  };

  const [selectedImage, setSelectedImage] = useState<string>(product.images[0]);

  // Convert your product to cart-compatible format
  const cartProduct: Product = {
    id: product.id, // Using SKU as unique ID
    name: product.name,
    price: product.price,
    imageUrl: product.images[0], // First image as main image
    description: product.shortDescription,
    stock: productDetails.stock || 999, // Add stock if available in your product data
  };

  // Cart status
  const currentCartQuantity = quantityOfItem(cartProduct.id);
  const inCart = isInCart(cartProduct.id);

  useEffect(() => {
    console.log(product);
  }, []);

  const handleQuantityChange = (newQuantity: number) => {
    const maxStock = cartProduct.stock || 999;
    if (newQuantity >= 1 && newQuantity <= maxStock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = async () => {
    setIsAdding(true);
    console.log(cartProduct.id)

    if (inCart) {
      try {
        updateQuantity(cartProduct.id, quantity);
        toast?.success(`${quantity} item(s) added to cart!`);

        setQuantity(1);
      } catch (error) {
        console.error("Error adding to cart:", error);
        toast?.error("Failed to add item to cart");
      } finally {
        setIsAdding(false);
      }
    } else {
      try {
        addToCart(cartProduct, quantity);

        // Optional: Show success toast
        toast?.success(`${quantity} item(s) added to cart!`);

        // Reset quantity to 1 after adding
        setQuantity(1);
      } catch (error) {
        console.error("Error adding to cart:", error);
        toast?.error("Failed to add item to cart");
      } finally {
        setIsAdding(false);
      }
    }
  };

  const handleInputQuantityChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newQuantity = parseInt(e.target.value);
    if (!isNaN(newQuantity)) {
      handleQuantityChange(newQuantity);
    }
  };

  // Check if product is available
  const isAvailable = cartProduct.stock && cartProduct.stock > 0;
  const maxAvailableQuantity = cartProduct.stock || 999;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8 font-poppins">
      {/* Top Section: Image and Key Info Side by Side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Product Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Product Images */}
          <div>
            {/* Large Image */}
            <div className="border rounded mb-4 overflow-hidden flex justify-center items-center h-[400px] bg-white">
              <img
                src={selectedImage}
                alt={product.name}
                className="max-w-full max-h-full object-contain"
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
                  className={`w-24 h-24 object-contain rounded cursor-pointer border ${
                    selectedImage === imgUrl
                      ? "border-blue-600"
                      : "border-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right: Key Product Info */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>

          {/* Price Section */}
          <div className="flex items-center gap-4">
            <p className="text-2xl text-blue-600 font-bold">
              PKR {product.price.toLocaleString()}
            </p>
            {product.comparePrice && product.comparePrice > product.price && (
              <p className="text-lg text-gray-500 line-through">
                PKR {product.comparePrice.toLocaleString()}
              </p>
            )}
          </div>

          {/* Stock Status */}
          <div className="flex items-center gap-2">
            {isAvailable ? (
              <>
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800"
                >
                  In Stock
                </Badge>
                {cartProduct.stock && cartProduct.stock < 10 && (
                  <span className="text-sm text-orange-600">
                    Only {cartProduct.stock} left!
                  </span>
                )}
              </>
            ) : (
              <Badge variant="destructive">Out of Stock</Badge>
            )}
          </div>

          {/* Current Cart Status */}
          {inCart && (
            <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
              <Check size={16} className="text-green-600" />
              <span className="text-green-700 font-medium">
                {currentCartQuantity} item(s) already in cart
              </span>
            </div>
          )}

          <p className="text-yellow-500 font-medium">
            Rating: {product.rating || "N/A"}
          </p>

          {/* SKU and Weight */}
          <div className="space-y-1">
            <p className="text-gray-600">
              SKU: <span className="font-medium">{product.sku}</span>
            </p>
            <p className="text-gray-600">
              Weight:{" "}
              <span className="font-medium">{product.weight} grams</span>
            </p>
          </div>

          {/* Quantity Selector with Plus/Minus */}
          <div className="space-y-3">
            <label
              htmlFor="quantity"
              className="text-gray-700 font-medium block"
            >
              Quantity:
            </label>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
                className="h-10 w-10 p-0"
              >
                <Minus size={16} />
              </Button>

              <input
                id="quantity"
                type="number"
                min="1"
                max={maxAvailableQuantity}
                value={quantity}
                onChange={handleInputQuantityChange}
                className="w-20 h-10 text-center border border-gray-300 rounded outline-none focus:border-blue-500"
              />

              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= maxAvailableQuantity}
                className="h-10 w-10 p-0"
              >
                <Plus size={16} />
              </Button>

              <span className="text-sm text-gray-500">
                Max: {maxAvailableQuantity}
              </span>
            </div>
          </div>

          {/* Add to Cart Button */}
          <div className="space-y-3 pt-4">
            <Button
              onClick={handleAddToCart}
              disabled={isAdding || !isAvailable}
              className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 h-12 px-8 text-lg"
              size="lg"
            >
              {isAdding ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Adding to Cart...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <ShoppingCart size={20} />
                  Add to Cart - PKR{" "}
                  {(product.price * quantity).toLocaleString()}
                </div>
              )}
            </Button>

            {/* Alternative: Buy Now Button */}
            {/* <Button
              variant="outline"
              className="w-full md:w-auto h-12 px-8 text-lg"
              size="lg"
              disabled={!isAvailable}
            >
              Buy Now
            </Button> */}
          </div>

          {/* Additional Product Info */}
          {product.comparePrice && product.comparePrice > product.price && (
            <div className="bg-green-50 p-3 rounded-lg border border-green-200">
              <p className="text-green-800 font-medium">
                You save: PKR{" "}
                {(product.comparePrice - product.price).toLocaleString()}
                <span className="text-sm ml-2">
                  (
                  {Math.round(
                    ((product.comparePrice - product.price) /
                      product.comparePrice) *
                      100
                  )}
                  % off)
                </span>
              </p>
            </div>
          )}
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
        <div className="border rounded bg-gray-50 p-4">
          <h3 className="text-lg font-semibold mb-2">Vendor Information</h3>
          <div className="space-y-1">
            <p className="text-gray-700">
              Store:{" "}
              <span className="font-medium">{product.vendor.storeName}</span>
            </p>
            <p className="text-gray-700">
              Location:{" "}
              <span className="font-medium">{product.vendor.location}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
