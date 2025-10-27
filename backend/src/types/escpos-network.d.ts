declare module "escpos-network" {
  class Network {
    constructor(address: string, port?: number);
    open(callback: (error?: Error) => void): void;
    write(data: Buffer, callback?: () => void): void;
    close(): void;
  }
  export = Network;
}