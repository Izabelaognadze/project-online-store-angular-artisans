export interface Product {
  id: string;
  name: string;
  category: string; //editTo : Category
  summary: string;
  description: string;
  img: string;
  imageThumbnail: string;
  price: string; //editTo :number
  status: Status;
}

export enum Status {
  active = 1,
  disabled = 2,
}

export enum Category {
  headphones = 1,
  speakers = 2,
  earphones = 3,
}
