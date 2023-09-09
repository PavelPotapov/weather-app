import PropTypes from "prop-types"

function Humidity({ humidity = "нет данных", width = 20 }) {
	return (
		<div>
			<img src="../../public/images/humidity.svg" alt="" width={width} />
			{humidity}%
		</div>
	)
}

Humidity.propTypes = {
	humidity: PropTypes.number | PropTypes.string,
	width: PropTypes.number,
}

export default Humidity
