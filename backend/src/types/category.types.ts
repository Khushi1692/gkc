/**
 * Interface representing a Category.
 *
 * @interface ICategory
 * @property {string} _id - Unique identifier for the category.
 * @property {string} name - Name of the category.
 * @property {number} sortOrder - Order of the category in listings (default 0).
 * @property {boolean} isActive - Indicates if the category is active.
 * @property {Date} createdAt - Date when the category was created.
 * @property {Date} updatedAt - Date when the category was last updated.
 */
export interface ICategory {
  _id: string;
  name: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Interface representing input when creating a new category.
 *
 * @interface ICategoryInput
 * @property {string} name - Name of the category.
 * @property {number} [sortOrder] - Optional sort order.
 * @property {boolean} [isActive] - Optional active flag.
 */
export interface ICategoryInput {
  name: string;
  sortOrder?: number;
  isActive?: boolean;
}
