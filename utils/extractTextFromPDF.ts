import { PdfReader } from "pdfreader";
import { base64ToBuffer } from "./base64ToBuffer";

export function extractTextFromPDF(base64PDF: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const buffer = base64ToBuffer(base64PDF);
    const reader = new PdfReader();
    let fullText = "";

    reader.parseBuffer(buffer, (err, item) => {
      if (err) {
        return reject(err);
      }
      if (!item) {
        return resolve(fullText.trim());
      }
      if ("text" in item && item.text) {
        fullText += item.text + " ";
      }
    });
  });
}
