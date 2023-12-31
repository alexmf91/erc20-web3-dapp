import PropTypes from 'prop-types'

export default function Title({ children }) {
  return <h3 className="font-bold text-lg mb-2 w-fit text-slate-700">{children}</h3>
}

Title.propTypes = {
  children: PropTypes.node.isRequired
}
