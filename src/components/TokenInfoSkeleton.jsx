export default function TokenInfoSkeleton() {
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
