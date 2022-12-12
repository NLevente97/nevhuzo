import "./App.css";
import { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

//require("dotenv").config();

const theme = createTheme();

theme.spacing(2); // `${8 * 2}px` = '16px'

const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
	spacing: 15,
});

function App() {
	const [response, setResponse] = useState(0);
	const [name, setName] = useState("");
	const [huzottNev, setHuzottNev] = useState("");

	const getName = async (name) => {
		let o = {
			nev: name,
		};
		const res = await fetch(
			//process.env.REACT_APP_API_URL
			"http://192.168.1.71/:5000/nevek",
			{
				method: "POST",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify(o),
			}
		);

		const data = await res.json();
		setHuzottNev(data.huzott);
		setResponse(res.status);
	};

	const handleClick = async (event) => {
		getName(name);
	};

	const handleChange = (event) => {
		setName(event.target.value);
	};

	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<div className="App">
				<Typography variant="h2" gutterBottom>
					Karácsonyi név húzás
				</Typography>
				<FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
					<InputLabel id="demo-simple-select-standard-label">
						Ki vagy te?
					</InputLabel>
					<Select
						labelId="demo-simple-select-standard-label"
						id="demo-simple-select-required"
						value={name}
						onChange={handleChange}
						label="Név"
					>
						<MenuItem value={"Zsolti"}>Zsolti</MenuItem>
						<MenuItem value={"Julcsi"}>Julcsi</MenuItem>
						<MenuItem value={"Kálmán"}>Kálmán</MenuItem>
						<MenuItem value={"Léna"}>Léna</MenuItem>
						<MenuItem value={"Ricsi"}>Ricsi</MenuItem>
					</Select>
					<Button variant="outlined" onClick={handleClick}>
						Ez vagyok én!
					</Button>
				</FormControl>
				{response === 0 ? (
					""
				) : (
					<Typography variant="h2" gutterBottom>
						A húzott neved: {huzottNev}
					</Typography>
				)}
			</div>
		</ThemeProvider>
	);
}

export default App;
