import { ogSize, renderOg } from "@/lib/og";

export const alt = "MSRX Articles — The AI World";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg({ eyebrow: "MSRX Articles", title: "The AI World", subtitle: "Artificial intelligence, explained in plain words and with the maths." });
}
