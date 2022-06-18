import { Category } from './category.model';

export interface Product {
  id: string;
  name: string;
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
