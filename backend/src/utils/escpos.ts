export class EscPosBuilder {
  private chunks: Buffer[] = [];
  private WIDTH = 48; // Max chars per line for 80mm paper (Font A)

  private push(bytes: number[]) {
    this.chunks.push(Buffer.from(bytes));
  }

  init() {
    this.push([0x1b, 0x40]); // ESC @ (Initialize)
    return this;
  }

  text(text: string) {
    // Remove special chars that might break generic printers
    const cleanText = text.replace(/[^\x20-\x7E\n]/g, ""); 
    this.chunks.push(Buffer.from(cleanText, "ascii"));
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

  alignRight() {
    this.push([0x1b, 0x61, 0x02]);
    return this;
  }

  bold(on = true) {
    this.push([0x1b, 0x45, on ? 1 : 0]);
    return this;
  }

  // 🆕 NEW: Set Text Size (1-8)
  setSize(width: number, height: number) {
    // GS ! n
    // width: 0-7, height: 0-7. 
    // Command expects: (width-1) * 16 + (height-1)
    const n = (width - 1) * 16 + (height - 1);
    this.push([0x1d, 0x21, n]);
    return this;
  }

  // 🆕 NEW: Smart Row for "Item ...... $Price"
  row(left: string, right: string) {
    const leftWidth = this.WIDTH - right.length - 1; // -1 for space
    
    // Truncate left text if too long
    let leftText = left;
    if (leftText.length > leftWidth) {
      leftText = leftText.substring(0, leftWidth);
    }

    const spaces = " ".repeat(this.WIDTH - leftText.length - right.length);
    this.text(leftText + spaces + right);
    this.newLine();
    return this;
  }

  cut() {
    this.push([0x1d, 0x56, 0x42, 0x00]); // GS V B 0 (Full Cut)
    return this;
  }

  build(): Buffer {
    return Buffer.concat(this.chunks);
  }
}