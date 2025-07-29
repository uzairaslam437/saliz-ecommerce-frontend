
export interface ProductDetails{
    id: string;
    imageUrl:string;
    name:string;
    rating:string;
    price:string;
}

export interface ProductDescriptionTypes{
    id: string;
    name: string;
    description: string;
    shortDescription: string;
    price: string;
    comparePrice: string;
    weight: string;
    sku: string;
    rating: string | null;
    vendor: {
        storeName: string;
        location: string | null;
    }
    images : string[];
}