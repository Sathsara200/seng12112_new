export interface IProduct {
  name: string;          // Product name
  description?: string;  // Optional product description
  price: number;         // Price of the product
  stock?: number;        // Number of items in stock
  createdAt?: Date;      // Auto-generated timestamp
  updatedAt?: Date;      // Auto-generated timestamp
}


