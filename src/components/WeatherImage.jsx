import PropTypes from "prop-types"

const getImageNameForWeather = (weatherName) => {
	if (weatherName) {
		console.log(weatherName)
		const data = ["rain", "snow", "cloud", "sun", "wind", "clear"]
		weatherName = weatherName.toLowerCase()
		for (let i = 0; i < data.length; i++) {
			if (weatherName.includes(data[i])) {
				console.log(data[i] + ".svg")
				return data[i] + ".svg"
			}
		}
	} else {
		return "default.svg"
	}
}

function WeatherImage({ imageName, size = 35 }) {
	return (
		<img
			src={"../weather-icons/" + getImageNameForWeather(imageName)}
			alt=""
			width={size}
		/>
	)
}

WeatherImage.propTypes = {
	imageName: PropTypes.string,
	size: PropTypes.number,
}

export default WeatherImage
