const fetch = require('node-fetch');

const API_KEY = process.env.POAP_API_KEY;

async function comparePoaps(address1, address2) {
	const data1 = await fetch(`https://api.poap.tech/actions/scan/${address1}`, {
		headers: {
			'Content-Type': 'application/json',
			'x-api-key': API_KEY,
		},
	});

	const res1 = await data1.json();

	const data2 = await fetch(`https://api.poap.tech/actions/scan/${address2}`, {
		headers: {
			'Content-Type': 'application/json',
			'x-api-key': API_KEY,
		},
	});

	const res2 = await data2.json();

	const obj1 = {};

	for (const el in res1) {
		if (res1.hasOwnProperty(el)) {
			let id = res1[el].event.id;
			obj1[id] = {
				id: id,
				name: res1[el].event.name,
				description: res1[el].event.description,
				image_url: res1[el].event.image_url,
			};
		}
	}

	const obj2 = {};

	for (const el in res2) {
		if (res2.hasOwnProperty(el)) {
			let id = res2[el].event.id;
			obj2[id] = {
				id: id,
				name: res2[el].event.name,
				description: res2[el].event.description,
				image_url: res2[el].event.image_url,
			};
		}
	}

	const common = [];

	if (Object.keys(obj1).length >= Object.keys(obj2).length) {
		for (let el in obj1) {
			if (obj2.hasOwnProperty(el)) {
				common.push(obj1[el]);
			}
		}
	} else {
		for (let el in obj2) {
			if (obj1.hasOwnProperty(el)) {
				common.push(obj2[el]);
			}
		}
	}

	return {
		address: address1,
		follower: address2,
		sharedPoaps: common,
	};
}

module.exports = { comparePoaps };
