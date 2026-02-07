export interface PrintJob {
  retries: number;
  timeout: NodeJS.Timeout;
  resolve: () => void;
  reject: (err: Error) => void;
  printerId: string;
}

export const printJobs = new Map<string, PrintJob>();
