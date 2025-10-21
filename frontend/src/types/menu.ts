export interface Category {
  _id: string;
  name: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProductCustomizationOption {
  _id: string;
  name: string;
  priceModifier: number;
}

export interface IProductCustomization {
  _id: string;
  groupName: string;
  type: 'radio' | 'checkbox';
  required: boolean;
  options: IProductCustomizationOption[];
}

export interface Product {
  _id: string;
  name: string;
  description?: string;
  categoryId: string;
  image?: string;
  basePrice: number;
  isVegetarian: boolean;
  isActive: boolean;
  customizations?: IProductCustomization[];
  createdAt: Date;
  updatedAt: Date;
}
