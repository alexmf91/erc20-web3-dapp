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
