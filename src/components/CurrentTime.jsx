import { useEffect, useState } from "react"

function CurrentTime() {
	const [time, setTime] = useState(
		new Date().toLocaleTimeString("en-US", {
			hour12: false,
			hour: "numeric",
			minute: "numeric",
		})
	)

	useEffect(() => {
		setInterval(() => {
			setTime(
				new Date().toLocaleTimeString("en-US", {
					hour12: false,
					hour: "numeric",
					minute: "numeric",
				})
			)
		}, 1000)
	}, [])

	return <div>Сейчас {time}</div>
}

export default CurrentTime
