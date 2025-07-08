export default function Home() {
  return (
    <>
      {/* Fondo SVG elegante */}
      <div className="fixed inset-0 -z-10 w-full h-full overflow-hidden pointer-events-none">
        <img src="/nnneon.svg" alt="Fondo abstracto" className="w-full h-full object-cover opacity-60" />
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <main className="min-h-screen flex flex-col items-center justify-start px-4 py-10 font-sans">
        {/* LOGO */}
        <img
          src="/cachicamo-logo.png"
          alt="Cachicamo Studios Logo"
          className="w-28 h-28 mb-8"
          draggable={false}
        />

        {/* NOMBRE Y TAGLINE */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-[#D4AF37] tracking-tight mb-3 text-center uppercase">
          CACHICAMO STUDIOS
        </h1>
        <div className="w-full max-w-2xl text-center mb-6">
          <p className="text-lg md:text-xl text-[#C0C0C0] mb-2">
            contenido, ideas y tecnología para un internet más creativo.
          </p>
          <div className="border-b border-[#C0C0C0]/40 mx-auto w-1/2"></div>
        </div>

        {/* INFO ESENCIAL EMPRESA */}
        <div className="w-full max-w-2xl text-center mb-10">
          <p className="text-[#C0C0C0] mb-2">
            Agencia de creatividad, producción digital y tecnología.
            <span className="text-[#D4AF37]"> YouTube, Web3, blogs y branding con visión global.</span>
          </p>
          <div className="border-b border-[#C0C0C0]/30 mx-auto w-1/3"></div>
        </div>

        {/* SERVICIOS */}
        <div className="w-full max-w-2xl mb-10">
          <h2 className="text-[#D4AF37] text-xl font-bold mb-3 tracking-wide text-left">
            Servicios
          </h2>
          <ul>
            <ServiceLine text="Contenido Digital y YouTube" />
            <ServiceLine text="Web3, NFTs y nuevas tecnologías" />
            <ServiceLine text="Blogs y medios digitales" />
            <ServiceLine text="Branding y diseño creativo" />
            <ServiceLine text="Consultoría e innovación tech" />
          </ul>
          <div className="border-b border-[#C0C0C0]/20 mt-6"></div>
        </div>

        {/* PORTFOLIO */}
        <div className="w-full max-w-2xl mb-10">
          <h2 className="text-[#D4AF37] text-xl font-bold mb-3 tracking-wide text-left">
            Portfolio
          </h2>
          <ul className="grid md:grid-cols-2 gap-2">
            <PortfolioLine text="El Grit Cast" url="https://elgritcast.com" />
            <PortfolioLine text="Ñam!" url="https://ñam.com" />
            <PortfolioLine text="3zkMC" url="https://3zkmc.com" />
            <PortfolioLine text="El Grit Cast Legends" url="#" />
            <PortfolioLine text="YouTube El Grit Cast" url="https://youtube.com/@elgritcast" />
            <PortfolioLine text="YouTube 3zkMC" url="https://youtube.com/@3zkMC" />
          </ul>
          <div className="border-b border-[#C0C0C0]/20 mt-6"></div>
        </div>

        {/* CONTACTO CON FORMULARIO */}
        <div className="w-full max-w-2xl text-center mb-10">
          <h2 className="text-[#D4AF37] text-xl font-bold mb-3 tracking-wide text-left">Contacto</h2>
          <form
            action="https://formspree.io/f/xkgbnjpr"
            method="POST"
            className="flex flex-col gap-4 items-center"
          >
            <div className="w-full md:w-2/3 text-left">
              <label htmlFor="email" className="block text-[#C0C0C0] text-sm mb-1 font-medium">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                required
                className="w-full bg-transparent border-b border-[#C0C0C0]/30 text-[#C0C0C0] focus:outline-none focus:border-[#D4AF37] py-2 px-1 transition"
                autoComplete="email"
              />
            </div>
            <div className="w-full md:w-2/3 text-left">
              <label htmlFor="message" className="block text-[#C0C0C0] text-sm mb-1 font-medium">Mensaje</label>
              <textarea
                name="message"
                id="message"
                rows={3}
                required
                className="w-full bg-transparent border-b border-[#C0C0C0]/30 text-[#C0C0C0] focus:outline-none focus:border-[#D4AF37] py-2 px-1 transition resize-none"
              ></textarea>
            </div>
            <input type="hidden" name="_redirect" value="https://cachicamo.studio/gracias.html" />
            <button
              type="submit"
              className="mt-2 bg-[#D4AF37] text-[#04474B] font-bold px-8 py-2 rounded-full shadow transition hover:bg-[#C0C0C0] hover:text-[#04474B] hover:scale-105"
            >
              Enviar
            </button>
          </form>
        </div>

        {/* FOOTER */}
        <footer className="w-full text-center text-xs text-[#C0C0C0] opacity-70 pt-8 pb-4">
          &copy; {new Date().getFullYear()} Cachicamo Studios LLC
        </footer>

        {/* BOTÓN FIJO DE MASTODON */}
        <a
          href="https://mastodon.social/@cachicamostudios"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Cachicamo Studios en Mastodon"
          className="fixed bottom-4 right-4 bg-[#D4AF37] p-2 rounded-full shadow-lg hover:scale-105 transition z-50"
        >
          <img
            src="/mastodon-icon.svg"
            alt="Mastodon"
            className="w-6 h-6"
            draggable={false}
          />
        </a>
      </main>
    </>
  )
}

// COMPONENTES SIMPLES
function ServiceLine({ text }: { text: string }) {
  return (
    <li className="text-[#C0C0C0] text-base py-2 border-b border-[#C0C0C0]/10 last:border-b-0">
      {text}
    </li>
  )
}

function PortfolioLine({ text, url }: { text: string, url: string }) {
  return (
    <li>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#C0C0C0] hover:text-[#D4AF37] transition font-semibold text-base py-2 block border-b border-[#C0C0C0]/10 last:border-b-0"
      >
        {text}
      </a>
    </li>
  )
}
