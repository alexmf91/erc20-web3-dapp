# Guía Completa para Iniciar tu Proyecto Web3

Este proyecto es una introducción paso a paso a varios aspectos importantes del desarrollo frontend en Web3, usando React y Vite. Cubriremos:

- Creación y configuración de un proyecto React usando Vite
- Integración de Tailwind CSS para un diseño eficiente
- Incorporación de bibliotecas Web3 para interactuar con la blockchain
- Estructura básica para un proyecto Web3
- Desarrollo de un ejemplo interactuando con un contrato ERC20
- Despliegue en Vercel para llevar tu proyecto a la web

# Configuración de un Proyecto React con Vite

Sigue estos pasos para configurar un nuevo proyecto de React con Vite:

1. **Creación del Proyecto**

- Ejecuta el siguiente comando en tu terminal para crear un nuevo proyecto:

  ```bash
  npm create vite@latest . -- --template react
  ```

2. **Manejo de directorio no vacío**:

- Si tu terminal muestra el siguiente mensaje:

  ```bash
  ✔ Current directory is not empty. Please choose how to proceed:
  ```

  Elige la opción: Ignore files and continue (Ignorar archivos y continuar)

3. Instalamos las dependencias.

   ```bash
   npm install
   ```

4. Ejecutamos la app de muestra para comprovar que funciona correctamente.

   ```bash
   npm run dev
   ```

5. Comprueba que se ha ejecutado correctamente en el servidor local. Por defecto, Vite utiliza el puerto 5173

- Abre tu navegador y visita [http://localhost:5173/](http://localhost:5173/)

6. Ahora que hemos comprovado que todo funciona correctamente podemos parar el servidor y seguir preparando nuestra dapp.

# Personalización de la App: Título y Favicon

- Para personalizar tu aplicación, edita el archivo index.html en tu proyecto:

  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <!-- Ponemos el icono de la carpeta public -->
      <link rel="icon" type="image/svg+xml" href="/blockmaker-small-logo.png" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <!-- Ponemos el titulo de la App -->
      <title>Blockmaker Token</title>
    </head>
    <body>
      <div id="root"></div>
      <script type="module" src="/src/main.jsx"></script>
    </body>
  </html>
  ```

# Configuracion de tailwind

1. Instalamos y configuramos nuestro framework de estilos para nuestra aplicacion:

   ```
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

2. Configuramos las rutas que contendran estilos tailwind en el fichero tailwind.config.js:

   ```js
   /** @type {import('tailwindcss').Config} */
   export default {
     content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
     theme: {
       extend: {}
     },
     plugins: []
   }``
   ```

3. Añadimos las directivas de tailwind en nuestro fichero index.css

   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

4. Cambiamos la fuente por defecto en nuestra aplicaion y el color de fondo:

   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;

   @layer base {
     html {
       font-family: 'Roboto', system-ui, sans-serif;
       background-color: #f9fafb;
     }
   }
   ```

5. Eliminamos el fichero App.css (si no es necesario)

# Estructura y componentes básicos

### Componente Header

1. Añadimos el archivo imagen blockmaker a nuestra carpeta raiz `public`.

2. Creamos el componente Header añadiendolo nuestro logo y le damos estilos usando tailwind.

   ```jsx
   export default function Header() {
     return (
       <header className="py-2 px-3 sm:py-4 sm:px-8 flex justify-between items-center bg-white border-b shadow-xs">
         {/_ Logo para version mobile _/}
         <img src="/blockmaker-small-logo.png" alt="blockmaker-logo" width={47} className="sm:hidden" />
         {/_ Logo para version desktop _/}
         <img src="/blockmaker-full-logo.png" alt="blockmaker-logo" width={300} className="hidden sm:flex" />
       </header>
     )
   }
   ```

### Componente Footer

- Creamos el componente Footer utulizando `new Date().getFullYear()` para que se actualize el año.

  ```jsx
  export default function Footer() {
    return (
      <footer className="py-4 px-3 sm:p-8 flex justify-center bg-white border-t shadow-xs">
        <p>Derechos de autor &copy; {new Date().getFullYear()} Blockmaker Academy</p>
      </footer>
    )
  }
  ```

### Componente AppLayout

- Dentro de la carpeta `componentes`, creamos una carpeta `ui`, y dentro de `ui` creamos una carpeta `layouts`` (diseños).
- Creamos un componente `AppLayout` que conentra el diseño principal de nuestra app, el Header y el Footer.

  ```jsx
  import PropTypes from 'prop-types'
  import React from 'react'
  import Footer from '../../Footer'
  import Header from '../../Header'

  export default function AppLayout({ children }) {
    return (
      <React.Fragment>
        <Header />
        <main className="mx-auto min-h-[85vh]">{children}</main>
        <Footer />
      </React.Fragment>
    )
  }

  AppLayout.propTypes = {
    children: PropTypes.node.isRequired
  }
  ```

  Añadimos un fichero index.js para exportar directamente el componente layout.

  ```js
  export { default as AppLayout } from './AppLayout'
  ```

### Componente pagina Home

- Creamos una carpeta `pages` en la raiz de src (src/pages)
- Creamos un componente Home

  ```jsx
  export default function Home() {
    return (
      <div>
        <h1>Esta es la pàgina principal</h1>
      </div>
    )
  }
  ```

- Creamos un fichero index.js para exportar todos los componentes pagina directamente, en este caso, solo Home:

  ```js
  export { default as Home } from './Home'
  ```

### Integrando AppLayout y Home

- Actualizamos nuestro componente `App` añadiendo nuestro componente `AppLayout` y `Home`.

  ```jsx
  import { AppLayout } from './components/ui/layouts'
  import { Home } from './pages'

  function App() {
    return (
      <AppLayout>
        <Home />
      </AppLayout>
    )
  }

  export default App
  ```

- Comprobamos que todo funciona correctamente, que la app funciona bien y se aplican correctamente los estilos de tailwind.

# Instalación y configuración de connectkit y wagmi

Seguimos las instrucciones de connectkit para la instalación y configuración de connectkit y wagmi en nuestra aplicacion para poder interacturar con la blockchain de manera mas sencilla y practica.

Documentación oficial: https://docs.family.co/connectkit/getting-started

1. **Instalacion de connectkit y sus dependencias**

   ```bash
   npm install connectkit wagmi viem
   ```

2. **Configuración de las API Keys (si aun no tienes ninguna).**

- ConnectKit utiliza el SDK de WalletConnect para facilitar la conexión de carteras. WalletConnect 2.0 requiere un projectId, que puedes crear de manera rápida y gratuita en [WalletConnect Cloud]("https://cloud.walletconnect.com/sign-up").

- ConnectKit necesita una clave API de [Infura]("https://www.infura.io/") o [Alchemy]("https://www.alchemy.com/"), dependiendo de las redes que tu dApp necesite. Para aprender más sobre las diferencias entre Infura y Alchemy, puedes visitar la sección de [Proveedores]("https://docs.family.co/connectkit/providers").

3. **Creamos un fichero .env y ponemos las siguientes variables de entorno:**

   ```
   # Alchemy
   VITE_ALCHEMY_ID=<TU_ALCHEMY_ID>

   # WalletConnect
   VITE_WALLETCONNECT_PROJECT_ID=<TU_WALLETCONNECT_PROJECT_ID>

   # Contract address
   VITE_TOKEN_CONTRACT_ADDRESS=0xA529Dfd9CB8ea733613021999B2d2D55DD376528
   ```

4. **Creamos nuestro fichero de configuracion de wagmi.**

   1. Creamos una carpeta config dentro de la carpeta src.
   2. Dentro de la carpeta config creamos el siguiente archivo con la configuracion de wagmi:

      ```js
      // Fichero wagmi.js
      import { getDefaultConfig } from 'connectkit'
      import { createConfig } from 'wagmi'
      import { sepolia } from 'wagmi/chains'

      export const config = createConfig(
        getDefaultConfig({
          // Importamos la variable de entorno con import.meta.env
          alchemyId: import.meta.env.VITE_ALCHEMY_ID,
          walletConnectProjectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,
          appName: 'Blockmaker ERC20 DApp',
          // Configuramos la chain
          chains: [sepolia]
        })
      )

      export default config
      ```

5. **Importamos la configuracion en nuestro componente APP y envolvemos con los componentnes proveedores de wagmi y connectkit.**

   ```jsx
   import { WagmiConfig } from 'wagmi'
   import { ConnectKitProvider } from 'connectkit'
   import { config } from './config/wagmi'

   function App() {
     return (
       <WagmiConfig config={config}>
         // Lo ponemos en modo light ya que construiremos la aplicacion en modo claro
         <ConnectKitProvider mode="light">
           <AppLayout>
             <Home />
           </AppLayout>
         </ConnectKitProvider>
       </WagmiConfig>
     )
   }

   export default App
   ```

## Actualización del componente Header

1. **Añadimos el boton de connectkit para conectar la wallet.**

   ```jsx
   import { ConnectKitButton } from 'connectkit'

   export default function Header() {
     return (
       <header className="py-2 px-3 sm:py-4 sm:px-8 flex justify-between items-center bg-white border-b shadow-xs">
         {/_ Logo para version mobile _/}
         <img src="/blockmaker-small-logo.png" alt="blockmaker-logo" width={47} className="sm:hidden" />
         {/_ Logo para version desktop _/}
         <img src="/blockmaker-full-logo.png" alt="blockmaker-logo" width={300} className="hidden sm:flex" />
         {/_ Botton de conexion wallet con prop showBalance para mostrar balance cuenta _/}
         <ConnectKitButton showBalance />
       </header>
     )
   }
   ```

2. **Ejecutamos la aplicacion y comprobamos que el boton de connectar funciona correctamente y nos conecta a la red de sepolia.**

# Creación de componentes UI reutilizables

1. **Instalamos libreria `react icons` para poder utilizar multiples iconos de manera sencilla en nuestra app.**

   - https://react-icons.github.io/react-icons/

   ```bash
   npm install react-icons --save
   ```

2. **Creamos el componente `LoadingSpinner` para mostrar durante las cargas:**

   ```jsx
   import PropTypes from 'prop-types'

   export default function LoadingSpinner({ className }) {
     return (
       <div role="status">
         <svg
           aria-hidden="true"
           className={`w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 ${className}`}
           viewBox="0 0 100 101"
           fill="none"
           xmlns="http://www.w3.org/2000/svg"
         >
           <path
             d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
             fill="currentColor"
           />
           <path
             d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
             fill="currentFill"
           />
         </svg>
         <span className="sr-only">Loading...</span>
       </div>
     )
   }

   LoadingSpinner.propTypes = {
     className: PropTypes.string
   }
   ```

3. **Creamos el componente `Boton`:**

- Añadimos estilos para los distintos estados del boton (hover, disabled).
- Añadimos la prop isLoading y componente LoadingSpinner para mostrar el estado cargando en el boton.

  ```jsx
  import PropTypes from 'prop-types'
  import LoadingSpinner from './LoadingSpinner'

  export default function Button({ type = 'button', onClick, disabled, isLoading, children }) {
    return (
      <button
        type={type}
        className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg disabled:opacity-75 disabled:cursor-not-allowed"
        onClick={onClick}
        disabled={disabled}
      >
        <span className="flex justify-center items-center gap-2">
          {isLoading && <LoadingSpinner className="h-6 w-6" />}
          {children}
        </span>
      </button>
    )
  }

  Button.propTypes = {
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    isLoading: PropTypes.bool,
    children: PropTypes.node.isRequired
  }
  ```

4. **Creamos el componente `ErrorInfo` para mostrar mensajes de error con icono.**

   ```jsx
   import { MdInfoOutline } from 'react-icons/md'
   import PropTypes from 'prop-types'

   export default function ErrorInfo({ message }) {
     return (
       <div className="flex items-center gap-2 bg-red-200 p-2 rounded">
         <MdInfoOutline className="text-red-500" />
         <p className="text-xs text-red-500">{message}</p>
       </div>
     )
   }

   ErrorInfo.propTypes = {
     message: PropTypes.string.isRequired
   }
   ```

5. **Creamos el componente `TextInput`:**

   ```jsx
   import PropTypes from 'prop-types'

   export default function TextInput({ type, onChange, value, placeholder, disabled }) {
     return (
       <input
         type={type}
         onChange={onChange}
         value={value}
         placeholder={placeholder}
         disabled={disabled}
         className="border border-gray-300 rounded-md w-full px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:cursor-not-allowed"
       />
     )
   }

   TextInput.propTypes = {
     type: PropTypes.oneOf(['text', 'number', 'password']),
     onChange: PropTypes.func,
     value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
     placeholder: PropTypes.string,
     disabled: PropTypes.bool
   }
   ```

6. **Creamos el componente `Title`:**

   ```jsx
   import PropTypes from 'prop-types'

   export default function Title({ children }) {
     return <h3 className="font-bold text-lg mb-2 w-fit text-slate-700">{children}</h3>
   }

   Title.propTypes = {
     children: PropTypes.node.isRequired
   }
   ```

7. **Creamos un fichero `index.js` dentro de la carpeta `components` para exportar todos los componentes directamente:**

   ```js
   export { default as Button } from './Button'
   export { default as ErrorInfo } from './ErrorInfo'
   export { default as LoadingSpinner } from './LoadingSpinner'
   export { default as TextInput } from './TextInput'
   export { default as Title } from './Title'
   ```

## Instalación libreria react-hot-toast

- Esto nos permitira mostrar notificaciones de eventos a traves de nuestra app y dar un mejor feedback al usuario.

- https://react-hot-toast.com/

1. **Instalacion libreria:**

   ```bash
   npm install react-hot-toast
   ```

2. **Configuración libreria.**

- Añadimos el componente `Toaster` en nuestro componente App.
- Mas adelante veremos como usar los `toast` para mostrar las notificaciones.

  ```jsx
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
  ```

# Creacion de componentes web3

En esta seccion crearemos los sigueintes componentes con sus componentes auxiliares:

1. Token Balance
2. Owner
3. Total Supply
4. TokenInfo
5. Transfer
6. Mint
7. Burn

## Configuracion del contrato ERC20 y wagmi:

- Como usaremos un metodos del contrato en algunos de los componentes, primero tenemos que integrar el ABI del contrato para poder leer los metodos del contrato sin error.

1. **Nos dirigmos al contrato en `etherscan` para desacrgar su `ABI`:**

   - https://sepolia.etherscan.io/address/0xA529Dfd9CB8ea733613021999B2d2D55DD376528#code

2. **Exportamos el ABI en formato text y lo copiamos.**

3. **Creamos una carpeta contracts/ABIs.**

4. **Creamos un archivo blockmakerTokenABI.js y exportamos la variable con el abi que hemos copiado anteriormente:**

   ```js
   export const blockmakerTokenABI = [
     {
       inputs: [{ internalType: 'address', name: 'initialOwner', type: 'address' }],
       stateMutability: 'nonpayable',
       type: 'constructor'
     },
     { inputs: [], name: 'ECDSAInvalidSignature', type: 'error' },
     {
       inputs: [{ internalType: 'uint256', name: 'length', type: 'uint256' }],
       name: 'ECDSAInvalidSignatureLength',
       type: 'error'
     },
     {
       inputs: [{ internalType: 'bytes32', name: 's', type: 'bytes32' }],
       name: 'ECDSAInvalidSignatureS',
       type: 'error'
     },
     {
       inputs: [
         { internalType: 'address', name: 'spender', type: 'address' },
         { internalType: 'uint256', name: 'allowance', type: 'uint256' },
         { internalType: 'uint256', name: 'needed', type: 'uint256' }
       ],
       name: 'ERC20InsufficientAllowance',
       type: 'error'
     },
     {
       inputs: [
         { internalType: 'address', name: 'sender', type: 'address' },
         { internalType: 'uint256', name: 'balance', type: 'uint256' },
         { internalType: 'uint256', name: 'needed', type: 'uint256' }
       ],
       name: 'ERC20InsufficientBalance',
       type: 'error'
     },
     {
       inputs: [{ internalType: 'address', name: 'approver', type: 'address' }],
       name: 'ERC20InvalidApprover',
       type: 'error'
     },
     {
       inputs: [{ internalType: 'address', name: 'receiver', type: 'address' }],
       name: 'ERC20InvalidReceiver',
       type: 'error'
     },
     {
       inputs: [{ internalType: 'address', name: 'sender', type: 'address' }],
       name: 'ERC20InvalidSender',
       type: 'error'
     },
     {
       inputs: [{ internalType: 'address', name: 'spender', type: 'address' }],
       name: 'ERC20InvalidSpender',
       type: 'error'
     },
     {
       inputs: [{ internalType: 'uint256', name: 'deadline', type: 'uint256' }],
       name: 'ERC2612ExpiredSignature',
       type: 'error'
     },
     {
       inputs: [
         { internalType: 'address', name: 'signer', type: 'address' },
         { internalType: 'address', name: 'owner', type: 'address' }
       ],
       name: 'ERC2612InvalidSigner',
       type: 'error'
     },
     { inputs: [], name: 'EnforcedPause', type: 'error' },
     { inputs: [], name: 'ExpectedPause', type: 'error' },
     {
       inputs: [
         { internalType: 'address', name: 'account', type: 'address' },
         { internalType: 'uint256', name: 'currentNonce', type: 'uint256' }
       ],
       name: 'InvalidAccountNonce',
       type: 'error'
     },
     { inputs: [], name: 'InvalidShortString', type: 'error' },
     {
       inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
       name: 'OwnableInvalidOwner',
       type: 'error'
     },
     {
       inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
       name: 'OwnableUnauthorizedAccount',
       type: 'error'
     },
     { inputs: [{ internalType: 'string', name: 'str', type: 'string' }], name: 'StringTooLong', type: 'error' },
     {
       anonymous: false,
       inputs: [
         { indexed: true, internalType: 'address', name: 'owner', type: 'address' },
         { indexed: true, internalType: 'address', name: 'spender', type: 'address' },
         { indexed: false, internalType: 'uint256', name: 'value', type: 'uint256' }
       ],
       name: 'Approval',
       type: 'event'
     },
     { anonymous: false, inputs: [], name: 'EIP712DomainChanged', type: 'event' },
     {
       anonymous: false,
       inputs: [
         { indexed: true, internalType: 'address', name: 'previousOwner', type: 'address' },
         { indexed: true, internalType: 'address', name: 'newOwner', type: 'address' }
       ],
       name: 'OwnershipTransferred',
       type: 'event'
     },
     {
       anonymous: false,
       inputs: [{ indexed: false, internalType: 'address', name: 'account', type: 'address' }],
       name: 'Paused',
       type: 'event'
     },
     {
       anonymous: false,
       inputs: [
         { indexed: true, internalType: 'address', name: 'from', type: 'address' },
         { indexed: true, internalType: 'address', name: 'to', type: 'address' },
         { indexed: false, internalType: 'uint256', name: 'value', type: 'uint256' }
       ],
       name: 'Transfer',
       type: 'event'
     },
     {
       anonymous: false,
       inputs: [{ indexed: false, internalType: 'address', name: 'account', type: 'address' }],
       name: 'Unpaused',
       type: 'event'
     },
     {
       inputs: [],
       name: 'DOMAIN_SEPARATOR',
       outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
       stateMutability: 'view',
       type: 'function'
     },
     {
       inputs: [
         { internalType: 'address', name: 'owner', type: 'address' },
         { internalType: 'address', name: 'spender', type: 'address' }
       ],
       name: 'allowance',
       outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
       stateMutability: 'view',
       type: 'function'
     },
     {
       inputs: [
         { internalType: 'address', name: 'spender', type: 'address' },
         { internalType: 'uint256', name: 'value', type: 'uint256' }
       ],
       name: 'approve',
       outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
       stateMutability: 'nonpayable',
       type: 'function'
     },
     {
       inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
       name: 'balanceOf',
       outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
       stateMutability: 'view',
       type: 'function'
     },
     {
       inputs: [{ internalType: 'uint256', name: 'value', type: 'uint256' }],
       name: 'burn',
       outputs: [],
       stateMutability: 'nonpayable',
       type: 'function'
     },
     {
       inputs: [
         { internalType: 'address', name: 'account', type: 'address' },
         { internalType: 'uint256', name: 'value', type: 'uint256' }
       ],
       name: 'burnFrom',
       outputs: [],
       stateMutability: 'nonpayable',
       type: 'function'
     },
     {
       inputs: [],
       name: 'decimals',
       outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
       stateMutability: 'view',
       type: 'function'
     },
     {
       inputs: [],
       name: 'eip712Domain',
       outputs: [
         { internalType: 'bytes1', name: 'fields', type: 'bytes1' },
         { internalType: 'string', name: 'name', type: 'string' },
         { internalType: 'string', name: 'version', type: 'string' },
         { internalType: 'uint256', name: 'chainId', type: 'uint256' },
         { internalType: 'address', name: 'verifyingContract', type: 'address' },
         { internalType: 'bytes32', name: 'salt', type: 'bytes32' },
         { internalType: 'uint256[]', name: 'extensions', type: 'uint256[]' }
       ],
       stateMutability: 'view',
       type: 'function'
     },
     {
       inputs: [
         { internalType: 'address', name: 'to', type: 'address' },
         { internalType: 'uint256', name: 'amount', type: 'uint256' }
       ],
       name: 'mint',
       outputs: [],
       stateMutability: 'nonpayable',
       type: 'function'
     },
     {
       inputs: [],
       name: 'name',
       outputs: [{ internalType: 'string', name: '', type: 'string' }],
       stateMutability: 'view',
       type: 'function'
     },
     {
       inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
       name: 'nonces',
       outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
       stateMutability: 'view',
       type: 'function'
     },
     {
       inputs: [],
       name: 'owner',
       outputs: [{ internalType: 'address', name: '', type: 'address' }],
       stateMutability: 'view',
       type: 'function'
     },
     { inputs: [], name: 'pause', outputs: [], stateMutability: 'nonpayable', type: 'function' },
     {
       inputs: [],
       name: 'paused',
       outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
       stateMutability: 'view',
       type: 'function'
     },
     {
       inputs: [
         { internalType: 'address', name: 'owner', type: 'address' },
         { internalType: 'address', name: 'spender', type: 'address' },
         { internalType: 'uint256', name: 'value', type: 'uint256' },
         { internalType: 'uint256', name: 'deadline', type: 'uint256' },
         { internalType: 'uint8', name: 'v', type: 'uint8' },
         { internalType: 'bytes32', name: 'r', type: 'bytes32' },
         { internalType: 'bytes32', name: 's', type: 'bytes32' }
       ],
       name: 'permit',
       outputs: [],
       stateMutability: 'nonpayable',
       type: 'function'
     },
     { inputs: [], name: 'renounceOwnership', outputs: [], stateMutability: 'nonpayable', type: 'function' },
     {
       inputs: [],
       name: 'symbol',
       outputs: [{ internalType: 'string', name: '', type: 'string' }],
       stateMutability: 'view',
       type: 'function'
     },
     {
       inputs: [],
       name: 'totalSupply',
       outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
       stateMutability: 'view',
       type: 'function'
     },
     {
       inputs: [
         { internalType: 'address', name: 'to', type: 'address' },
         { internalType: 'uint256', name: 'value', type: 'uint256' }
       ],
       name: 'transfer',
       outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
       stateMutability: 'nonpayable',
       type: 'function'
     },
     {
       inputs: [
         { internalType: 'address', name: 'from', type: 'address' },
         { internalType: 'address', name: 'to', type: 'address' },
         { internalType: 'uint256', name: 'value', type: 'uint256' }
       ],
       name: 'transferFrom',
       outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
       stateMutability: 'nonpayable',
       type: 'function'
     },
     {
       inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
       name: 'transferOwnership',
       outputs: [],
       stateMutability: 'nonpayable',
       type: 'function'
     },
     { inputs: [], name: 'unpause', outputs: [], stateMutability: 'nonpayable', type: 'function' }
   ]
   ```

5. **Creamos un fichero `index.js` para exportar directamente los ABIs:**

```js
export * from './blockmakerTokenABI'
```

### Componente Token Balance

- Creamos el componente token balance que mostrara cuantos tokens tiene el usuario que haya conectado la wallet.

- Usamos los hooks [useAccount]("https://wagmi.sh/react/hooks/useAccount") y [useBalance]("https://wagmi.sh/react/hooks/useBalance") de Wagmi para mostrar el balance de manera eficaz y sencilla.

- Importamos el componente en nuestro componente pagina `Home` para ver que funciona correctamente.

  ```jsx
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
  ```

### Componente Owner

- Creamos el componente owner que mostrara la dirección que creo el contrato erc20 del token.

- Como usaremos un metodo del contrato, tendemos que importar el ABI que hemos añadido anteriormente.

- Utilizamos el hook [useContractRead]("https://wagmi.sh/react/hooks/useContractRead") para leer el metodo owner del contrato.

  ```jsx
  import { useContractRead } from 'wagmi'
  import { blockmakerTokenABI } from '../contracts/ABIs'
  import { Title } from './ui'

  function OwnerSkeleton() {
    return (
      <div className="w-full bg-white border shadow px-3.5 py-5 rounded-md grid gap-2">
        <div className="h-5 bg-gray-300 rounded animate-pulse w-20" />
        <div className="h-7 bg-gray-300 rounded animate-pulse" />
      </div>
    )
  }

  export default function Owner() {
    const { data, isLoading } = useContractRead({
      address: import.meta.env.VITE_TOKEN_CONTRACT_ADDRESS,
      // Indicamos el ABI del contrato
      abi: blockmakerTokenABI,
      // Indicamos el metodo del contrato que queremos usar546
      functionName: 'owner'
    })

    return isLoading ? (
      <OwnerSkeleton />
    ) : (
      <section className="flex flex-col p-4 bg-white border shadow rounded-lg w-[360px] sm:w-[469px]">
        <Title>Owner</Title>
        <p className="text-zinc-600 text-xs sm:text-sm bg-gray-100  p-2 rounded-md ">{data}</p>
      </section>
    )
  }
  ```

### Componente TotalSupply

- Creamos un componente totalSupply para mostrar el supply total del token.
- Como también es un metodo del contrato importamos el abi y se lo pasamos al hook [useContractRead]("https://wagmi.sh/react/hooks/useContractRead")
- Indicamos que queremos leer el metodo `totalSupply`.
- Añadimos la propiedad `watch` con valor `true` ya que el total supply puede ir cambiado y de esta manera nuestro componente se actualizara con el nuevo valor.
- Importatmos la funcion formatEther para formatear el valor que nos devuelve el metodo a ether.

```jsx
import { formatEther } from 'viem/utils'
import { useContractRead } from 'wagmi'
import { blockmakerTokenABI } from '../contracts/ABIs'
import { Title } from './ui'

function TotalSupplySkeleton() {
  return (
    <div className="w-full bg-white border shadow px-3.5 py-5 rounded-md grid gap-2">
      <div className="h-5 bg-gray-300 rounded animate-pulse w-32" />
      <div className="h-7 bg-gray-300 rounded animate-pulse" />
    </div>
  )
}

export default function TotalSupply() {
  const { data, isLoading } = useContractRead({
    address: import.meta.env.VITE_TOKEN_CONTRACT_ADDRESS,
    abi: blockmakerTokenABI,
    functionName: 'totalSupply',
    watch: true
  })

  return isLoading ? (
    <TotalSupplySkeleton />
  ) : (
    <section className="flex flex-col p-4 bg-white border shadow rounded-lg w-[360px] sm:w-[469px]">
      <Title>Total Supply</Title>
      <p className="text-zinc-600 text-xs sm:text-sm bg-gray-100  p-2 rounded-md ">{formatEther(Number(data))}</p>
    </section>
  )
}
```

# Componente TokenInfo

- Para este componente, como contendra una lista, crearemos primero el componente `TokenInfoItem`.
- Podemos crear los componentes auxiliares en el mismo fichero o tenerlo separado en otros ficheros.
- Para leer la informacion del token usaremos el hook de wagmi [useToken]("https://wagmi.sh/react/hooks/useToken")

  ```jsx
  import PropTypes from 'prop-types'

  export default function TokenInfoItem({ label, value }) {
    return (
      <li className="bg-gray-100 p-2 rounded-md flex flex-col sm:flex-row gap-1">
        <span className="text-gray-700 font-semibold">{label}:</span>
        <p className="text-xs sm:text-sm">{value}</p>
      </li>
    )
  }

  TokenInfoItem.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }
  ```

  ```jsx
  import { useToken } from 'wagmi'
  import { ErrorInfo, Title } from './ui'
  import TokenInfoItem from './TokenInfoItem'

  function TokenInfoSkeleton() {
    return (
      <section className="p-4 bg-white border shadow rounded-lg w-[360px] sm:w-[469px]">
        <div className="h-6 bg-gray-300 rounded mb-4 w-[156px] animate-pulse" />
        <ul className="grid gap-4 animate-pulse">
          <li className="h-14 sm:h-9 bg-gray-300 rounded" />
          <li className="h-14 sm:h-9 bg-gray-300 rounded" />
          <li className="h-14 sm:h-9 bg-gray-300 rounded" />
          <li className="h-14 sm:h-9 bg-gray-300 rounded" />
          <li className="h-14 sm:h-9 bg-gray-300 rounded" />
        </ul>
      </section>
    )
  }

  export default function TokenInfo() {
    const { data, isLoading, isError } = useToken({
      address: import.meta.env.VITE_TOKEN_CONTRACT_ADDRESS,
      watch: true
    })

    if (isLoading) return <TokenInfoSkeleton />

    return (
      <section className="p-4 bg-white border shadow w-fit rounded-lg text-sm">
        <Title>Token Information</Title>
        {isError ? (
          <ErrorInfo message="Error cargando la información del token. Prueba de nuevo mas tarde." />
        ) : (
          <ul className="grid gap-4">
            <TokenInfoItem label="Name" value={data.name} />
            <TokenInfoItem label="Symbol" value={data.symbol} />
            <TokenInfoItem label="Address" value={data.address} />
            <TokenInfoItem label="Decimals" value={data.decimals} />
          </ul>
        )}
      </section>
    )
  }
  ```

  ## Componente TransferTokensForm

  Este componente se crea con el propósito de permitir la transferencia de tokens. Para lograrlo, se utilizan métodos de escritura del contrato, y el proceso se detalla a continuación:

  1. `usePrepareContractWrite`: En primer lugar, se hace uso del hook [usePrepareContractWrite]("https://wagmi.sh/react/prepare-hooks/usePrepareContractWrite") de Wagmi. Este hook se emplea para preparar los detalles de la transacción, incluyendo la función del contrato, los parámetros necesarios y la dirección del contrato.

  2. `useContractWrite`: En segundo lugar, se utiliza el hook [useContractWrite]("https://wagmi.sh/react/hooks/useContractWrite"), el cual aprovecha la configuración previamente preparada con usePrepareContractWrite para ejecutar la transacción en la cadena de bloques.

  3. `useWaitForTransaction`: Finalmente, se utiliza el hook [useWaitForTransaction]("https://wagmi.sh/react/hooks/useWaitForTransaction") para esperar la confirmación de la transacción en la cadena de bloques antes de proceder con otras acciones.

  ```jsx
  import { useEffect, useState } from 'react'
  import { toast } from 'react-hot-toast'
  import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
  import { blockmakerTokenABI } from '../contracts/ABIs'
  import { Button, TextInput, Title } from './ui'

  export default function TransferTokenForm() {
    const [to, setTo] = useState('')
    const [amount, setAmount] = useState('')

    const { config } = usePrepareContractWrite({
      address: import.meta.env.VITE_TOKEN_CONTRACT_ADDRESS,
      abi: blockmakerTokenABI,
      functionName: 'transfer',
      enabled: to && amount > 0,
      args: [to, BigInt(amount * 10 ** 18)]
    })

    const { data: writeData, write } = useContractWrite(config)

    const {
      isLoading: isTransactionLoading,
      isSuccess: isTransactionSuccess,
      isError: isTransactionError
    } = useWaitForTransaction({
      hash: writeData?.hash
    })

    const handleToInputChange = (e) => {
      setTo(e.target.value)
    }

    const handleAmountInputChange = (e) => {
      setAmount(e.target.value)
    }

    useEffect(() => {
      if (isTransactionSuccess) {
        toast.success('Se han transferido los tokens con éxito.')
        setTo('')
        setAmount('')
      }
      if (isTransactionError) {
        toast.error('No se ha podido realizar la transacción. Prueba de nuevo mas tarde.')
      }
    }, [isTransactionSuccess, isTransactionError])

    return (
      <section className="p-4 bg-white border shadow rounded-lg text-sm w-[360px] sm:w-[469px]">
        <div className="flex gap-1">
          <Title>Transfer</Title>
        </div>
        <form className="grid gap-4">
          <TextInput
            type="text"
            placeholder="To"
            value={to}
            disabled={isTransactionLoading}
            onChange={handleToInputChange}
          />
          <TextInput
            type="number"
            placeholder="Amount"
            value={amount}
            disabled={isTransactionLoading}
            onChange={handleAmountInputChange}
          />
          <Button
            disabled={!to || !amount || isTransactionLoading}
            isLoading={isTransactionLoading}
            onClick={() => write?.()}
          >
            {isTransactionLoading ? 'Transfering BM Tokens...' : 'Transfer BM Tokens'}
          </Button>
        </form>
      </section>
    )
  }
  ```

## Componente MintTokensForm

Este componente se crea con el propósito de permitir el minteo de tokens para el creador del contrato. Para lograrlo, se utilizan métodos de escritura del contrato, y el proceso se detalla a continuación:

1. `usePrepareContractWrite`: En primer lugar, se hace uso del hook [usePrepareContractWrite]("https://wagmi.sh/react/prepare-hooks/usePrepareContractWrite") de Wagmi. Este hook se emplea para preparar los detalles de la transacción, incluyendo la función del contrato, los parámetros necesarios y la dirección del contrato.

2. `useContractWrite`: En segundo lugar, se utiliza el hook [useContractWrite]("https://wagmi.sh/react/hooks/useContractWrite"), el cual aprovecha la configuración previamente preparada con usePrepareContractWrite para ejecutar la transacción en la cadena de bloques.

3. `useWaitForTransaction`: Finalmente, se utiliza el hook [useWaitForTransaction]("https://wagmi.sh/react/hooks/useWaitForTransaction") para esperar la confirmación de la transacción en la cadena de bloques antes de proceder con otras acciones.

```jsx
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
import { blockmakerTokenABI } from '../contracts/ABIs'
import { Button, TextInput, Title } from './ui'

export default function MintTokensForm() {
  const [to, setTo] = useState('')
  const [amount, setAmount] = useState('')

  const { address } = useAccount()

  const { data } = useContractRead({
    address: import.meta.env.VITE_TOKEN_CONTRACT_ADDRESS,
    abi: blockmakerTokenABI,
    functionName: 'owner'
  })

  // Comprobamos si la cuenta que está conectada es la misma que la del owner
  const isOwner = address === data

  const { config } = usePrepareContractWrite({
    address: import.meta.env.VITE_TOKEN_CONTRACT_ADDRESS,
    abi: blockmakerTokenABI,
    functionName: 'mint',
    enabled: to && amount > 0,
    args: [to, BigInt(amount * 10 ** 18)]
  })

  const { data: writeData, write } = useContractWrite(config)

  const {
    isLoading: isTransactionLoading,
    isSuccess: isTransactionSuccess,
    isError: isTransactionError
  } = useWaitForTransaction({
    hash: writeData?.hash
  })

  const handleToInputChange = (e) => {
    setTo(e.target.value)
  }

  const handleAmountInputChange = (e) => {
    setAmount(e.target.value)
  }

  useEffect(() => {
    if (isTransactionSuccess) {
      toast.success('Minteo realizado con éxito. Comprueba tu balance.')
      setTo('')
      setAmount('')
    }
    if (isTransactionError) {
      toast.error('No se ha podido realizar el minteo. Prueba de nuevo mas tarde.')
    }
  }, [isTransactionSuccess, isTransactionError])

  return (
    <section className="p-4 bg-white border shadow rounded-lg text-sm w-[360px] sm:w-[469px]">
      <div className="flex gap-1">
        <Title>Mint</Title>
        <p className="text-zinc-400 p-1">(Only Owner)</p>
      </div>
      <form className="grid gap-4">
        <TextInput
          type="text"
          placeholder="To"
          value={to}
          disabled={!isOwner || isTransactionLoading}
          onChange={handleToInputChange}
        />
        <TextInput
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={handleAmountInputChange}
          disabled={!isOwner || isTransactionLoading}
        />
        <Button
          disabled={!to || !amount || isTransactionLoading || !isOwner}
          isLoading={isTransactionLoading}
          onClick={() => write?.()}
        >
          {isOwner ? (isTransactionLoading ? 'Minting BM Tokens...' : 'Mint BM Tokens') : 'Only Owner Can Mint'}
        </Button>
      </form>
    </section>
  )
}
```

## Componente BurnTokensForm

Este componente se crea con el propósito de permitir la quema de tokens para el creador del contrato. Para lograrlo, se utilizan métodos de escritura del contrato, y el proceso se detalla a continuación:

1. `usePrepareContractWrite`: En primer lugar, se hace uso del hook [usePrepareContractWrite]("https://wagmi.sh/react/prepare-hooks/usePrepareContractWrite") de Wagmi. Este hook se emplea para preparar los detalles de la transacción, incluyendo la función del contrato, los parámetros necesarios y la dirección del contrato.

2. `useContractWrite`: En segundo lugar, se utiliza el hook [useContractWrite]("https://wagmi.sh/react/hooks/useContractWrite"), el cual aprovecha la configuración previamente preparada con usePrepareContractWrite para ejecutar la transacción en la cadena de bloques.

3. `useWaitForTransaction`: Finalmente, se utiliza el hook [useWaitForTransaction]("https://wagmi.sh/react/hooks/useWaitForTransaction") para esperar la confirmación de la transacción en la cadena de bloques antes de proceder con otras acciones.

   ```jsx
   import { useEffect, useState } from 'react'
   import { toast } from 'react-hot-toast'
   import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
   import { blockmakerTokenABI } from '../contracts/ABIs'
   import { Button, TextInput, Title } from './ui'

   export default function BurnTokensForm() {
     const [amount, setAmount] = useState('')

     const { address } = useAccount()

     const { data } = useContractRead({
       address: import.meta.env.VITE_TOKEN_CONTRACT_ADDRESS,
       abi: blockmakerTokenABI,
       functionName: 'owner'
     })

     // Comprobamos si la cuenta que está conectada es la misma que la del owner
     const isOwner = address === data

     const { config } = usePrepareContractWrite({
       address: import.meta.env.VITE_TOKEN_CONTRACT_ADDRESS,
       abi: blockmakerTokenABI,
       functionName: 'burn',
       enabled: amount > 0,
       args: [BigInt(amount * 10 ** 18)]
     })

     const { data: writeData, write } = useContractWrite(config)

     const {
       isLoading: isTransactionLoading,
       isSuccess: isTransactionSuccess,
       isError: isTransactionError
     } = useWaitForTransaction({
       hash: writeData?.hash
     })

     const handleAmountInputChange = (e) => {
       setAmount(e.target.value)
     }

     useEffect(() => {
       if (isTransactionSuccess) {
         toast.success('Quema de tokens realizada con éxito!🔥')
         setAmount('')
       }
       if (isTransactionError) {
         toast.error('No se ha podido realizar la quema de tokens. Prueba de nuevo mas tarde.')
       }
     }, [isTransactionSuccess, isTransactionError])

     return (
       <section className="p-4 bg-white border shadow rounded-lg text-sm w-[360px] sm:w-[469px]">
         <div className="flex gap-1">
           <Title>Burn</Title>
           <p className="text-zinc-400 p-1">(Only Owner)</p>
         </div>
         <form className="grid gap-4">
           <TextInput
             type="number"
             placeholder="Amount"
             value={amount}
             onChange={handleAmountInputChange}
             disabled={!isOwner || isTransactionLoading}
           />
           <Button
             disabled={!amount || isTransactionLoading || !isOwner}
             isLoading={isTransactionLoading}
             onClick={() => write?.()}
           >
             {isOwner
               ? isTransactionLoading
                 ? 'Burning BM Tokens...'
                 : 'Burn BM Tokens'
               : 'Only Owner Can Burn Tokens'}
           </Button>
         </form>
       </section>
     )
   }
   ```

## Fichero indice de componentes

- Creamos un indice para exportar todos los componentes de la carpeta components

  ```jsx
  export { default as BurnTokensForm } from './BurnTokensForm'
  export { default as Footer } from './Footer'
  export { default as Header } from './Header'
  export { default as MintTokensForm } from './MintTokensForm'
  export { default as Owner } from './Owner'
  export { default as TokenBalance } from './TokenBalance'
  export { default as TokenInfo } from './TokenInfo'
  export { default as TokenInfoItem } from './TokenInfoItem'
  export { default as TokenInfoSkeleton } from './TokenInfoSkeleton'
  export { default as TotalSupply } from './TotalSupply'
  export { default as TransferTokensForm } from './TransferTokensForm'
  ```

# Pàgina Principal

- Una vez ya tenemos todos nuestros componentes necesarios podemos terminar de diseñar nuestra pagina principal en el componente Home.

  ```jsx
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
  ```
