import React from "react"

function Pressure({ pressure = "нет данных", width = 20 }) {
	return (
		<div>
			<img src="../../public/images/pressure.svg" alt="" width={width} />
			{pressure} мм рт.ст.
		</div>
	)
}

export default Pressure
