import { useAccount, useBalance } from 'wagmi'
import { ErrorInfo } from './ui'

// Componente Skeleton para mostrar mientras se carga el balance
function TokenBalanceSkeleton() {
  return (
    <div className="w-48 sm:w-60 bg-white border shadow p-2.5 rounded-md">
      <div className="h-5 bg-gray-300 rounded animate-pulse" />
    </div>
  )
}

export default function TokenBalance() {
  const { address, isConnected } = useAccount()

  const { data, isLoading } = useBalance({
    address,
    token: import.meta.env.VITE_TOKEN_CONTRACT_ADDRESS,
    // Ponemos watch para que se actualice el balance automaticamente
    watch: true
  })

  // Ponemos optional chaining con "?" para evitar errores si no tenemos aun el token en nuestra wallet
  const tokenBalance = Number(data?.formatted)

  return isLoading ? (
    <TokenBalanceSkeleton />
  ) : (
    <div className="bg-white border shadow w-fit p-1 gap-2 rounded-md flex items-center text-xs md:text-base">
      <p className="bg-zinc-700 text-white p-2 sm:py-1 rounded-l-md ">Token Balance:</p>
      {/* Comprovamos si esta conectado para mostrar balance, si no, mostramos el componente error info con mensaje */}
      {isConnected ? (
        <p className="p-2 sm:py-1">
          {/* Si el numero no es entero, fijamos los decimales en 3 */}
          {Number.isInteger(tokenBalance) ? tokenBalance : tokenBalance.toFixed(3)} {data?.symbol}
        </p>
      ) : (
        <ErrorInfo message="Conecta tu wallet para ver tu balance de BM" />
      )}
    </div>
  )
}
