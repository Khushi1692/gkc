import { Types } from "mongoose";

/**
 * Interface representing a Product.
 *
 * @interface IProduct
 * @property {string} _id - Unique identifier for the product.
 * @property {string} name - Name of the product.
 * @property {string} [description] - Optional description.
 * @property {string} categoryId - ID of the category this product belongs to.
 * @property {string} images - Image URL.
 * @property {number} basePrice - Base price of the product.
 * @property {boolean} isVegetarian - Indicates if the product is vegetarian.
 * @property {boolean} isActive - Indicates if the product is active.
 * @property {IProductCustomization[]} [customizations] - Optional customization groups.
 * @property {Date} createdAt - Date when the product was created.
 * @property {Date} updatedAt - Date when the product was last updated.
 */
export interface IProduct {
  _id: string;
  name: string;
  description?: string;
  categoryId: Types.ObjectId;
  image?: string;
  basePrice: number;
  isVegetarian: boolean;
  isActive: boolean;
  customizations?: IProductCustomization[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Interface for a product customization group.
 *
 * @interface IProductCustomization
 * @property {string} groupName - Name of the group.
 * @property {"radio" | "checkbox"} type - Type of selection.
 * @property {boolean} required - Indicates if group is required.
 * @property {IProductCustomizationOption[]} options - Options for the group.
 */
export interface IProductCustomization {
  groupName: string;
  type: "radio" | "checkbox";
  required: boolean;
  options: IProductCustomizationOption[];
}

/**
 * Interface for a product customization option.
 *
 * @interface IProductCustomizationOption
 * @property {string} name - Name of the option.
 * @property {number} priceModifier - Price modifier for this option.
 */
export interface IProductCustomizationOption {
  name: string;
  priceModifier: number;
}

/**
 * Interface representing input when creating a new product.
 *
 * @interface IProductInput
 * @property {string} name - Name of the product.
 * @property {string} [description] - Optional description.
 * @property {string} categoryId - Category ID.
 * @property {string[]} [images] - Optional image URLs.
 * @property {number} basePrice - Base price.
 * @property {boolean} [isVegetarian] - Optional vegetarian flag.
 * @property {boolean} [isActive] - Optional active flag.
 * @property {IProductCustomization[]} [customizations] - Optional customization groups.
 */
export interface IProductInput {
  name: string;
  description?: string;
  categoryId: string;
  image?: string;
  basePrice: number;
  isVegetarian?: boolean;
  isActive?: boolean;
  customizations?: IProductCustomization[];
}
