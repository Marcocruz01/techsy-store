// Type del producto 
export type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
}

// Type del CartItem
export type CartItem = Pick<Product,  'id' | 'name' | 'description' | 'price' | 'category' | 'image'> & {
    quantity: number;
}

// Type del ProductId
export type ProductId = Product['id'];

// Type del filter
export type Filter = {
    category: string | null;
    search: string;
}
 