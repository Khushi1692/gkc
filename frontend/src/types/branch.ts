export interface BranchLocation {
  type: 'Point';
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

export interface BranchWithOpeningHours extends Branch {
  operatingHours: {
    day: string; // e.g., "Monday"
    open: string; // e.g., "09:00"
    close: string; // e.g., "18:00"
    isClosed: boolean;
  }[];
}
export interface BranchTodayHours {
  _id: string;
  day: string;
  open: string;
  close: string;
  isClosed: boolean;
}

export interface BranchStatus {
  branchId: string;
  branchName: string;
  isOpen: boolean;
  currentTime: string;
  todayHours: BranchTodayHours | null;
}
