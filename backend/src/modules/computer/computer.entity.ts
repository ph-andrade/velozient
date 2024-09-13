export class Computer {
  id: number;
  manufacturer: string;
  serialNumber: string;
  status: string;
  purchaseDate: Date;
  warrantyExpiryDate: Date;
  specifications?: string;
  imageURL?: string;
}
