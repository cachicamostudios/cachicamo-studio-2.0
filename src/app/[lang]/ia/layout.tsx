import { GeistPixelSquare } from "geist/font/pixel";

export default function IaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${GeistPixelSquare.variable} ia-font-scope`}>
      {children}
    </div>
  );
}
