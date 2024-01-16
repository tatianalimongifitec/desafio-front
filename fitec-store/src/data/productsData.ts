// Interface para definir a estrutura dos dados
interface Product {
    id: number;
    name: string;
    price: number;
}
  
  // Adicione a interface ProductData com assinatura de índice
interface ProductData {
    [category: string]: Product[];  // Assinatura de índice
}
  
  // Exporte a variável products com a nova interface
  export const products: ProductData = {
    Keyboard: [
      { id: 1, name: 'Mechanical Keyboard', price: 99.99 },
      { id: 2, name: 'Gaming Keyboard', price: 129.99 },
      { id: 3, name: 'Wireless Keyboard', price: 79.99 },
    ],
    Headset: [
      { id: 4, name: 'Over-Ear Headset', price: 59.99 },
      { id: 5, name: 'Gaming Headset', price: 79.99 },
      { id: 6, name: 'Bluetooth Headset', price: 89.99 },
    ],
    Mouse: [
      { id: 7, name: 'Gaming Mouse', price: 49.99 },
      { id: 8, name: 'Wireless Mouse', price: 29.99 },
      { id: 9, name: 'Ergonomic Mouse', price: 39.99 },
    ],
    Notebook: [
      { id: 10, name: 'Laptop', price: 899.99 },
      { id: 11, name: 'Gaming Laptop', price: 1299.99 },
      { id: 12, name: 'Ultra-Thin Notebook', price: 999.99 },
    ],
  };