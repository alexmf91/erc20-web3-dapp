import { ConnectKitProvider } from 'connectkit'
import { Toaster } from 'react-hot-toast'
import { WagmiConfig } from 'wagmi'
import { AppLayout } from './components/ui/layouts'
import { config } from './config/wagmi'
import { Home } from './pages'

function App() {
  return (
    <WagmiConfig config={config}>
      <Toaster position="bottom-right" />
      <ConnectKitProvider mode="light">
        <AppLayout>
          <Home />
        </AppLayout>
      </ConnectKitProvider>
    </WagmiConfig>
  )
}

export default App
