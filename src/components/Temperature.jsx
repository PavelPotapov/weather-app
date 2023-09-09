import PropTypes from "prop-types"

function Temperature({ temperature, fontSize = 10 }) {
	return <span style={{ fontSize: fontSize }}>{temperature}°</span>
}

Temperature.propTypes = {
	temperature: PropTypes.number,
	fontSize: PropTypes.number,
}

export default Temperature
