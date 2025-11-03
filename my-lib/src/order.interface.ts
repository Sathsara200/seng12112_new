export interface IOrder {
  customerId: string;       // Reference to a customer (could be ObjectId in string form)
  productId: string;        // Reference to a product (could also be ObjectId)
  quantity: number;         // Number of items ordered
  totalPrice: number;       // Calculated total for the order
  orderDate: Date;          // When the order was placed
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled'; // Order lifecycle status
}
