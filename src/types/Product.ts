
// export interface ProductDetails{
//     id: string;
//     imageUrl:string;
//     name:string;
//     rating:string;
//     price:string;
// }

// export interface ProductDescriptionTypes{
//     id: string;
//     name: string;
//     description: string;
//     shortDescription: string;
//     price: string;
//     comparePrice: string;
//     weight: string;
//     sku: string;
//     rating: string | null;
//     vendor: {
//         storeName: string;
//         location: string | null;
//     }
//     images : string[];
// }

// types/Product.ts

// Your existing ProductDescriptionTypes interface
export interface ProductDescriptionTypes {
  id: string,
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  sku: string;
  comparePrice?: number;
  weight: number;
  images: string[];
  rating?: number;
  stock?: number; // Add this if not already present
  vendor: {
    storeName: string;
    location: string;
  };
}

// // Extended interface for products coming from your backend
// export interface BackendProduct extends ProductDescriptionTypes {
//   id?: string; // Some products might have separate ID
//   vendorStoreName: string; // Your current structure
//   location: string; // Your current structure
//   // Add any other backend-specific fields
// }

// Utility function to convert your product format to cart format
export const convertToCartProduct = (product: ProductDescriptionTypes): import('@/types/cart').Product => {
  return {
    id: product.sku, // Using SKU as unique identifier
    name: product.name,
    price: product.price,
    imageUrl: product.images[0], // First image as main image
    description: product.description,
    stock: product.stock
  };
};

// Optional: Type for product with quantity (for cart display)
export interface ProductWithQuantity extends ProductDescriptionTypes {
  quantity: number;
}