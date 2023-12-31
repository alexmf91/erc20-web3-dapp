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
          {isOwner ? (isTransactionLoading ? 'Burning BM Tokens...' : 'Burn BM Tokens') : 'Only Owner Can Burn Tokens'}
        </Button>
      </form>
    </section>
  )
}
