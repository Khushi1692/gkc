export interface PrintJob {
  retries: number;
  timeout: NodeJS.Timeout;
  resolve: () => void;
  reject: (err: Error) => void;
}

export const printJobs = new Map<string, PrintJob>();
