import { ConnectKitButton } from 'connectkit'

export default function Header() {
  return (
    <header className="py-2 px-3 sm:py-4 sm:px-8 flex justify-between items-center bg-white border-b shadow-xs">
      {/* Logo para version mobile */}
      <img src="/blockmaker-small-logo.png" alt="blockmaker-logo" width={47} className="sm:hidden" />
      {/* Logo para version desktop */}
      <img src="/blockmaker-full-logo.png" alt="blockmaker-logo" width={300} className="hidden sm:flex" />
      {/* Botton de conexion wallet con prop showBalance para mostrar balance cuenta */}
      <ConnectKitButton showBalance />
    </header>
  )
}
