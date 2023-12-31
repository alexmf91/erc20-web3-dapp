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
