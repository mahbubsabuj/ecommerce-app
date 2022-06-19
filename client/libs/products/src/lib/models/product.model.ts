import { Category } from './category.model';

export interface Product {
  _id: string,
  id: string;
  name: string;
  brand: string,
  description: string;
  richDescription: string;
  image: string;
  images: string[];
  price: number;
  category: Category;
  countInStock: number;
  rating: number;
  numReviews: number;
  isFeatured: boolean;
  dateCreated: Date;
}
