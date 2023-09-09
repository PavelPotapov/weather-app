import { useEffect, useState } from "react"
import cities from "../../russian-cities.json"
import styles from "./SearchCity.module.css"
import "./SearchCity.module.css"
import InfoAboutCity from "../InfoAboutCity/InfoAboutCity"
import {
	Input,
	Stack,
	InputGroup,
	InputLeftElement,
	InputRightElement,
	CloseButton,
	Flex,
} from "@chakra-ui/react"
import Hint from "./Hint"

/* пробегаемся по json файлу и проверяем, есть ли такие города, которые ввел пользователь*/
function searchCity(city) {
	let res = []
	for (let i of cities) {
		if (i.name.toLowerCase().includes(city.toLowerCase()) && city.length >= 2) {
			res.push(i.name)
		}
	}
	return res /* возвращаем список совпадений */
}

/* По названию города получаем его географические координаты */
function getCoordinate(city) {
	let res = { lat: 0, lon: 0 }
	for (let i of cities) {
		if (i.name.toLocaleLowerCase() === city.toLocaleLowerCase()) {
			res.lat = i.coords.lat
			res.lon = i.coords.lon
			return res
		}
	}
	return null
}

function isEmpty(obj) {
	return Object.keys(obj).length === 0 && obj.constructor === Object
}

function SearchCityInput() {
	/* название города в строке поиска */
	const [cityName, setCity] = useState("")

	/* название города в выводимой инфрмации о городе*/
	const [cityNameTitle, setCityNameTitle] = useState("")

	/* координаты города (lat и lon) */
	const [cityCoord, setCityCoord] = useState({})
	const [cityList, setCityList] = useState([])
	/*  данные о погоде */
	const [dataWeather, setDataWeather] = useState({})
	const [dataWeatherTitle, setDataWeatherTitle] = useState([])

	/* показана ли информация о погоде в выбранном городе */
	const [isShownWeatherData, setShownWeatherData] = useState(false)

	/* 1 вариант запроса городов на сервер */
	// useEffect(() => {
	// 	fetch("http://localhost:5173/russian-cities.json", {
	// 		headers: { Accept: "application/json" },
	// 	})
	// 		.then((res) => res.json())
	// 		.then((data) => console.log(data))
	// 		.catch((err) => console.error(err))
	// }, [])

	/* был ли клик по городу из списка вспомогательных городов  */
	const [isClick, setIsClick] = useState(false)

	/* функция для запрос данных погоды */
	async function getDataWeather(lat, lon) {
		try {
			let data = await fetch(
				"http://api.openweathermap.org/data/2.5/forecast?" +
					new URLSearchParams({
						units: "metric",
						lat: lat,
						lon: lon,
						appid: import.meta.env.VITE_API_KEY_WEATHER,
					})
			)
			data = await data.json()
			setDataWeather(data)
		} catch (e) {
			console.log(e, "!!!!!")
			setDataWeather({})
		}
	}

	/* обработка ENTER на input*/
	const onKeyDown = (event) => {
		if (event.code == "Enter") {
			let coord = getCoordinate(cityName)
			/* если координаты найдены*/
			if (coord) {
				setCityCoord(coord)
			} else {
				setCityCoord({})
			}
			/*очищаем список найденных городов */
			setCityList([])
		}
	}

	const removeCityName = (e) => {
		setCity("")
		setCityList([])
	}

	/* изменение input */
	const onChangeInput = (e) => {
		setCity(e.target.value)
		setCityList(searchCity(cityName))
	}

	/* клик по списку городов */
	const handleClickItem = (e) => {
		setCity(e.target.innerText)
		setCityList([])
		setIsClick(true)
	}

	useEffect(() => {
		/* не очень нравится это решение, пока считаю это костылем  */
		if (cityName.length < 1) {
			setCityList([])
		}

		/* если бы клик мышкой, делаем то же, что и при нажатии на enter */
		if (isClick) {
			setIsClick(false) /* обработали клик по городу */
			let coord = getCoordinate(cityName)
			/* если координаты найдены*/
			if (coord) {
				setCityCoord(coord)
			} else {
				setCityCoord({})
			}
			/*очищаем список найденных городов */
			setCityList([])
		}
	}, [cityName])

	useEffect(() => {
		// console.log("cityList", cityList)
	}, [cityList])

	useEffect(() => {
		/* если объект не пустой и не произошла ошибка запроса*/
		if (!(isEmpty(dataWeather) || dataWeather.code >= 400)) {
			console.log("ВСе нормально, данные корректные", dataWeather)
			/* надо показать данные о погоде в выбранном городе */
			setShownWeatherData(true)
			setDataWeatherTitle(dataWeather?.list)
		} else {
			console.log("Данные некорректные)")
			setShownWeatherData(false)
		}
	}, [dataWeather])

	useEffect(() => {
		console.log("cityCoord", cityCoord)
		/* координаты города известны, можно отправлять запрос на сервер */
		if (!isEmpty(cityCoord)) {
			getDataWeather(cityCoord.lat, cityCoord.lon)
			setCityNameTitle(cityName)
		} else {
			console.log("Координаты меняются")
		}
	}, [cityCoord])

	useEffect(() => {}, [dataWeatherTitle])
	return (
		<div className={styles.cities} style={{ fontFamily: "Roboto Mono" }}>
			<Stack marginTop={"10%"}>
				<InputGroup>
					<InputLeftElement pointerEvents="none">
						<img src="../../../public/images/city.svg" />
					</InputLeftElement>
					<Input
						variant="flushed"
						className={styles.cities__search}
						type="text"
						placeholder="Поиск города"
						onChange={onChangeInput}
						value={cityName}
						onKeyDown={onKeyDown}
						focusBorderColor="#4F6C77"
					/>
					<InputRightElement>
						<CloseButton
							color={"#718096"}
							_hover={{ backgroundColor: "#F6E8DA" }}
							_active={{ backgroundColor: "#FEB2B2" }}
							onClick={removeCityName}
						/>
					</InputRightElement>
				</InputGroup>

				<Hint cityList={cityList} handleClickItem={handleClickItem} />

				<InfoAboutCity
					CityName={cityNameTitle}
					DataWeather={dataWeatherTitle}
					isShownWeatherData={isShownWeatherData}
				/>
			</Stack>
		</div>
	)
}

export default SearchCityInput
