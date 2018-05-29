export class Order {
    constructor(public id: string,
    public name: string,
    public address: string,
    public product: {product: string, package: string, quantity: number}[]) {}
}