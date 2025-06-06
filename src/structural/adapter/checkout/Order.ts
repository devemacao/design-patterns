import { ProductDTO } from "./CatalogGateway";
import Item from "./Item";

export default class Order {
  items: Item[];
  constructor() {
    this.items = [];
  }

  addProduct(product: ProductDTO, quantity: number) {
    const item = new Item(product.productId, product.price, quantity);
    this.items.push(item);
  }

  getTotal() {
    let total = 0;
    for (const item of this.items) {
      total += item.getTotal();
    }
    return total;
  }
}
