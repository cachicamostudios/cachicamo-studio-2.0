import { notFound } from "next/navigation";

// Any path that doesn't match a real route under [lang] lands here and
// renders the styled, localized not-found page ([lang]/not-found.tsx).
export default function CatchAll() {
  notFound();
}
