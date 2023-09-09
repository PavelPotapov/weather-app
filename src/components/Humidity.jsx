import React from "react"

function Humidity({ humidity = "нет данных", width = 20 }) {
	return (
		<div>
			<img src="../../public/images/humidity.svg" alt="" width={width} />
			{humidity}%
		</div>
	)
}

export default Humidity
