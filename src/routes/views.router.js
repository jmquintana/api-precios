import { Router } from "express";
import axios from "axios";

const router = Router();
const PRECIOS_EN_SURTIDOR =
	"/api/3/action/datastore_search?resource_id=80ac25de-a44a-4445-9215-090cf55cfda5";

router.get("/results", async (req, res) => {
	const response = await getRemoteData(req, res);
	res.render("home", { response });
});

router.get("/", async (req, res) => {
	const response = await getRemoteData(req, res);
	// res.render("home", { response });
	res.end(JSON.stringify({ response }, null, 3));
});

let filters = {
	provincia: "CAPITAL FEDERAL",
	idproducto: 2,
	idtipohorario: 2,
};

// check if an object is empty
function isEmptyObj(obj) {
	for (let prop in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, prop)) {
			return false;
		}
	}
	return JSON.stringify(obj) === JSON.stringify({});
}

//generate a string with the filters of the api endpoint
function urlFilters(filters) {
	if (isEmptyObj(filters)) {
		return "";
	} else {
		let string = JSON.stringify(filters);
		return `&filters=${string}#`;
	}
}

function titleCase(str) {
	str = str.toLowerCase().split(" ");
	for (var i = 0; i < str.length; i++) {
		str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
	}
	return str.join(" ");
}

async function getRemoteData(req, res) {
	let filterString = urlFilters(filters);
	let fullUrl = `${PRECIOS_EN_SURTIDOR}${filterString}`;
	const result = axios(`http://datos.energia.gob.ar${fullUrl}`)
		.then((response) => {
			// console.log(response.data.result.records);
			return response.data.result.records;
			// res.end(JSON.stringify(response.data.result.records, null, 3));
		})
		.catch((err) => console.log(err));
	return result;
}

export default router;
