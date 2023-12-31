import { ConnectKitButton } from 'connectkit'
import { useAccount } from 'wagmi'
import {
  BurnTokensForm,
  MintTokensForm,
  Owner,
  TokenBalance,
  TokenInfo,
  TotalSupply,
  TransferTokensForm
} from '../components'

export default function Home() {
  const { isConnected } = useAccount()

  return (
    <div className="flex flex-col self-center sm:grid place-items-center px-3 py-16 md:px-5 gap-12">
      <h1 className="font-bold text-3xl sm:text-5xl md:text-6xl mb-2 bg-gradient-to-r from-pink-600 to-indigo-500 text-transparent bg-clip-text">
        Blockmaker ERC20 Token
      </h1>
      {isConnected ? (
        <>
          <TokenBalance />
          <div className="flex flex-col xl:flex-row gap-4">
            <div className="grid gap-4 h-fit">
              <Owner />
              <TotalSupply />
              <TokenInfo />
            </div>
            <div className="flex flex-col gap-4 justify-center">
              <TransferTokensForm />
              <MintTokensForm />
              <BurnTokensForm />
            </div>
          </div>
        </>
      ) : (
        <>
          <p className="text-gray-500 md:text-xl text-center ">
            Un token revolucionario en la blockchain, diseñado para empoderar a los usuarios y desarrolladores.
            <br />
            Blockmaker ERC20 ofrece transacciones rápidas, bajas tarifas y una plataforma segura.
            <br /> Ideal para proyectos de DeFi, juegos en blockchain y mucho más.
          </p>
          <p className="text-xl sm:text-2xl">🔒 Conecta tu wallet para comenzar.</p>
          <ConnectKitButton />
        </>
      )}
    </div>
  )
}
