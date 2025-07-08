// components/MastodonLink.tsx
export default function MastodonLink() {
  return (
    <a
      href="https://mastodon.social/@cachicamostudios"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        textDecoration: 'none',
        fontWeight: 'bold',
        color: '#000',
      }}
    >
      <img
        src="/mastodon-icon.svg"
        alt="Mastodon"
        width={24}
        height={24}
      />
      <span>@cachicamostudios</span>
    </a>
  );
}
