export class EscPosBuilder {
  private chunks: Buffer[] = [];

  private push(bytes: number[]) {
    this.chunks.push(Buffer.from(bytes));
  }

  init() {
    this.push([0x1b, 0x40]); // ESC @
    return this;
  }

  text(text: string) {
    this.chunks.push(Buffer.from(text, "ascii"));
    return this;
  }

  newLine(lines = 1) {
    this.chunks.push(Buffer.alloc(lines, 0x0a));
    return this;
  }

  alignCenter() {
    this.push([0x1b, 0x61, 0x01]);
    return this;
  }

  alignLeft() {
    this.push([0x1b, 0x61, 0x00]);
    return this;
  }

  bold(on = true) {
    this.push([0x1b, 0x45, on ? 1 : 0]);
    return this;
  }

  cut() {
    this.push([0x1d, 0x56, 0x00]); // GS V 0
    return this;
  }

  build(): Buffer {
    return Buffer.concat(this.chunks);
  }
}
