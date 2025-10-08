export class ProductStored {
  id: number;
  date: string;
  productId: number;
  productName: string;
  quantityProduct: number;
  totalCostProduct: number;
  userId: number;
  ownerProductId: number;

  constructor(productStored: {
    id?: number, date?: string,
    productId?: number, productName?: string,
    quantityProduct?: number, totalCostProduct?: number,
    userId?: number, ownerProductId?: number}) {
    this.id = productStored.id || 0;
    this.date = productStored.date || '';
    this.productId = productStored.productId || 0;
    this.productName = productStored.productName || '';
    this.quantityProduct = productStored.quantityProduct || 0;
    this.totalCostProduct = productStored.totalCostProduct || 0;
    this.userId = productStored.userId || 0;
    this.ownerProductId = productStored.ownerProductId || 0;
  }
}
