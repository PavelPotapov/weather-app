import ReactDOM from "react-dom/client"
import App from "./App"

import { ChakraProvider } from "@chakra-ui/react"
import { extendTheme } from "@chakra-ui/react"
import "./css/font.css"

const colors = {
	brand: {
		900: "#1a365d",
		800: "#153e75",
		700: "#2a69ac",
	},
}
const theme = extendTheme({ colors })

ReactDOM.createRoot(document.getElementById("root")).render(
	<ChakraProvider theme={theme}>
		<App />
	</ChakraProvider>
)
