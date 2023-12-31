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
