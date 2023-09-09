import React from "react"
import styles from "./SearchCity.module.css"

function Hint({ cityList, handleClickItem }) {
	return (
		<div
			className={styles.cities__list}
			style={{ display: cityList.length > 0 ? "block" : "none" }}
		>
			<ul>
				{cityList.map((element, index) => {
					return (
						<li
							key={index}
							className={styles.cities__item}
							onClick={handleClickItem}
						>
							{element}
						</li>
					)
				})}
			</ul>
		</div>
	)
}

export default Hint
