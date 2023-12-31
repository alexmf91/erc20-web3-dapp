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
