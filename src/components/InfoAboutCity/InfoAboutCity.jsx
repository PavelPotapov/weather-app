import CurrentTime from "../CurrentTime"
import Temperature from "../Temperature"
import WeatherImage from "../WeatherImage"
import classes from "./InfoAboutCity.module.css"
import "./InfoAboutCity.module.css"
import WindSpeed from "../WindSpeed"
import Humidity from "../Humidity"
import Pressure from "../Pressure"
import {
	Flex,
	Card,
	CardHeader,
	Heading,
	Text,
	CardBody,
	CardFooter,
	Button,
} from "@chakra-ui/react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/scrollbar"

const getPressureMMRT = (gpa) => {
	return ((757.5643929734 / 1010) * gpa).toFixed(2)
}

const getDateAndHourFromString = (str) => {
	let mass = str.split(" ")
	let month = mass[0].slice(-5, -3) /* получаем месяц */
	console.log(month)
	let day = mass[0].slice(-2) /* получаем день */
	const time = mass[1].slice(0, 5) /* получаем часы:минуты*/
	const data = {
		"01": "янв",
		"02": "фев",
		"03": "мар",
		"04": "апр",
		"05": "май",
		"06": "июн",
		"07": "июл",
		"08": "авг",
		"09": "сен",
		10: "окт",
		11: "ноя",
		12: "дек",
	}
	month = data[month]
	console.log(month)
	if (!month) {
		month = "нет месяца"
	}
	return [day + " " + month + ".", time]
}

function InfoAboutCity({
	CityName,
	DataWeather,
	isShownWeatherData = false,
	NumberElement = 0,
}) {
	return (
		<div style={{ display: isShownWeatherData ? "block" : "none" }}>
			<div className={classes.city_name}>
				<Flex direction={"column"} gap={"20px"}>
					<div>
						Погода в городе: <strong>{CityName}</strong>
					</div>
					<hr className={classes.hr} />
					<CurrentTime />
					<Flex>
						<Temperature
							temperature={Math.floor(DataWeather[NumberElement]?.main?.temp)}
							fontSize={40}
						/>
						<WeatherImage
							imageName={DataWeather[NumberElement]?.weather[0]?.main}
							size={80}
						/>
					</Flex>
					<div>
						Ощущается как&nbsp;
						<strong>
							<Temperature
								temperature={Math.floor(
									DataWeather[NumberElement]?.main?.feels_like
								)}
								fontSize={20}
							/>
						</strong>
					</div>
					<Flex gap={"50px"}>
						<WindSpeed
							wind={DataWeather[NumberElement]?.wind?.speed}
							width={20}
						/>
						<Humidity
							humidity={DataWeather[NumberElement]?.main?.humidity}
							width={20}
						/>
						<Pressure
							pressure={getPressureMMRT(
								DataWeather[NumberElement]?.main?.pressure
							)}
						/>
					</Flex>
					<hr className={classes.hr} />

					<div>
						<Swiper
							modules={[Navigation, Pagination, Scrollbar, A11y]}
							spaceBetween={5}
							slidesPerView={5}
							navigation
							mousewheel={true}
							onSwiper={(swiper) => console.log(swiper)}
							onSlideChange={() => console.log("slide change")}
							breakpoints={{
								250: {
									slidesPerView: 1,
								},
								320: {
									slidesPerView: 2,
								},
								480: {
									slidesPerView: 3,
								},
								640: {
									slidesPerView: 5,
								},
							}}
						>
							{DataWeather.map((element, index) => {
								return (
									<SwiperSlide key={index}>
										<Card className={classes.weather_card}>
											<Flex direction={"column"} gap={"10px"}>
												<div>
													<Flex
														alignItems={"center"}
														
													>
														<span className={classes.weather_card__title}>
															{getDateAndHourFromString(element.dt_txt)[0]}
														</span>
														<span className={classes.weather_card__title}>
															{getDateAndHourFromString(element.dt_txt)[1]}
														</span>
													</Flex>
												</div>
												<Flex>
													<strong>
														<Temperature
															temperature={Math.floor(element.main.temp)}
															fontSize={20}
														></Temperature>
													</strong>
													<WeatherImage imageName={element?.weather[0]?.main} />
												</Flex>
											</Flex>
										</Card>
									</SwiperSlide>
								)
							})}
						</Swiper>
					</div>
				</Flex>
			</div>
		</div>
	)
}

export default InfoAboutCity
