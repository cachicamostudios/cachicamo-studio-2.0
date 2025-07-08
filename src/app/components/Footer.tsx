// components/Footer.tsx
import MastodonLink from "./MastodonLink";

export default function Footer() {
  return (
    <footer
      style={{
        width: "100%",
        padding: "1rem",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        position: "fixed",
        bottom: 0,
        right: 0,
        background: "transparent",
        zIndex: 100,
      }}
    >
      <MastodonLink />
    </footer>
  );
}
