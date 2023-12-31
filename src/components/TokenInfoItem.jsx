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
