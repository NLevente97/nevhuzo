const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

var nevek = ["Julcsi", "Kálmán", "Zsolti", "Ricsi", "Léna"];
let huztak = [];

app.post("/nevek", (req, res) => {
	let got_nev = JSON.stringify(req.body.nev);
	let nev = got_nev.substring(1, got_nev.length - 1);
	if (huztak.includes(nev)) {
		let o = {
			huzott: "HIBA!! Te már húztál!",
		};
		res.status(400).send(JSON.stringify(o));
	} else if (nev.length === 0) {
		let o = {
			huzott: "HIBA!! Nem adtál meg nevet!",
		};
		res.status(400).send(JSON.stringify(o));
	} else {
		var huzott = "";
		huzott = nevek[Math.floor(Math.random() * nevek.length)];
		while (huzott === nev) {
			huzott = nevek[Math.floor(Math.random() * nevek.length)];
		}
		let o = {
			huzott: huzott,
		};
		nevek = nevek.filter((item) => {
			return item !== huzott;
		});

		huztak.push(nev);

		res.status(200).send(JSON.stringify(o));
	}
});

app.get("/", (req, res) => {
	res.send({
		message: "hello",
	});
});

app.listen(5000, () => {
	//console.log("listening on port 5000");
});
