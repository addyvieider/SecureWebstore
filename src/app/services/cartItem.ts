import { Product } from "./product";

export class CartItem {

    constructor(public product: Product, public packageType: string, public quantity: number) {}
}