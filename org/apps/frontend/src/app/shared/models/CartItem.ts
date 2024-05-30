export class CartItem{
    constructor(item:any, quantity: number){
      this.item = item;  
      this.quantity = quantity;
    }
    item: any;
    quantity = 1;


  get price(): number {
    return this.item.price * this.quantity;
  }
}
