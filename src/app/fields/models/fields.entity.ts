export class Fields {
  id:number;
  producerId:number;
  fieldName:string;
  location:string;
  size:number;

  constructor(fields: {id?: number, producerId?: number, fieldName?: string, location?: string, size?: number}) {
    this.id = fields.id || 0;
    this.producerId = fields.producerId || 0;
    this.fieldName = fields.fieldName || '';
    this.location = fields.location || '';
    this.size = fields.size || 0;
  }
}
