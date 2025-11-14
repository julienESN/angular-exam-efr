export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  stock: number;
  category: string;
  imageUrl: string;
  shortDescription: string;
  description: string;
  specs: { [key: string]: string };
}
