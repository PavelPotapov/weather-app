import React from "react"

function WindSpeed({ wind = "", width = 20 }) {
	return (
		<div>
			<img src="../../public/images/windspeed.svg" alt="" width={width} />
			<span>{wind} </span>
			м/с
		</div>
	)
}

export default WindSpeed
