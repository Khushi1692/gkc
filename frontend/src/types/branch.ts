export interface BranchLocation {
  type: "Point";
  coordinates: [number, number]; // [longitude, latitude]
}

export interface Branch {
  _id: string;
  name: string;
  email?: string;
  phone?: string;
  address: string;
  location: BranchLocation;
  distance?: number;
}
