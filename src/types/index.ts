export type Product = {
  id: number,
  name: string,
  description: string,
  price: number,
  category: string,
  image: string,
}

// Hereda de product y tambien tendra el dato de quantity
export type CartItem =  Pick<Product, 'id' | 'name' | 'price' | 'image' | 'description' | 'category'> & {
  quantity: number,
}

export type ProductId = Product['id']


// Type
export type Filter = {
    category: string | null;
    search: string;
}