/**
 * Interface representing a Branch (restaurant location).
 *
 * @interface IBranch
 * @property {string} _id - Unique identifier for the branch.
 * @property {string} name - Name of the branch.
 * @property {string} [email] - Email address of the branch (optional).
 * @property {string} [phone] - Contact phone number (optional).
 * @property {string} [address] - Physical address of the branch (optional).
 * @property {ILocation} location - GeoJSON coordinates of the branch.
 * @property {IOperatingHour[]} operatingHours - Array of operating hours per day.
 * @property {IBranchMenuItem[]} menu - Branch-specific menu with categories and products.
 * @property {boolean} isActive - Indicates if the branch is active.
 * @property {Date} createdAt - Date when the branch was created.
 * @property {Date} updatedAt - Date when the branch was last updated.
 */
export interface IBranch {
  _id: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  location: ILocation;
  operatingHours: IOperatingHour[];
  menu: IBranchMenu[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Interface for GeoJSON location coordinates.
 *
 * @interface ILocation
 * @property {string} type - Must be "Point".
 * @property {[number, number]} coordinates - [longitude, latitude].
 */
export interface ILocation {
  type: "Point";
  coordinates: [number, number];
}

/**
 * Interface for operating hours of a branch.
 *
 * @interface IOperatingHour
 * @property {string} day - Day of the week ("monday" | "tuesday" | ...).
 * @property {string} open - Opening time in "HH:mm" format.
 * @property {string} close - Closing time in "HH:mm" format.
 * @property {boolean} isClosed - Indicates if the branch is closed on that day.
 */
export interface IOperatingHour {
  day:
    | "monday"
    | "tuesday"
    | "wednesday"
    | "thursday"
    | "friday"
    | "saturday"
    | "sunday";
  open: string;
  close: string;
  isClosed: boolean;
}

/**
 * Interface for a branch menu category with its products.
 *
 * @interface IBranchMenu
 * @property {string} categoryId - ID of the category.
 * @property {IBranchMenuProduct[]} products - List of products in this category.
 */
export interface IBranchMenu {
  categoryId: string;
  products: IBranchMenuProduct[];
}

/**
 * Interface for a product within a branch menu.
 *
 * @interface IBranchMenuProduct
 * @property {string} productId - ID of the product.
 * @property {number} [price] - Optional branch-specific price override.
 * @property {boolean} isAvailable - Indicates if the product is available in this branch.
 */
export interface IBranchMenuProduct {
  productId: string;
  price?: number;
  isAvailable: boolean;
}

/**
 * Interface for input when creating a new branch.
 *
 * @interface IBranchInput
 * @property {string} name - Name of the branch.
 * @property {string} [email] - Email address of the branch.
 * @property {string} [phone] - Phone number of the branch.
 * @property {string} [address] - Address of the branch.
 * @property {ILocation} location - GeoJSON coordinates of the branch.
 * @property {IOperatingHour[]} operatingHours - Operating hours of the branch.
 */
export interface IBranchInput {
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  location: ILocation;
  operatingHours: IOperatingHour[];
}
