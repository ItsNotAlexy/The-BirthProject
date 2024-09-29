const express = require('express');
const axios = require('axios');
const router = express.Router();

const {
	getNextBirthday,
	getZodiacSign,
	capitalizeFirstLetter,
	returnSignEmoji
} = require('../utils/helpers');


router.get('/birth', (req, res) => {
	res.render('birth');
});

router.post('/birth', async (req, res) => {
	const {
		day,
		month,
		year
	} = req.body;
	const birthDate = new Date(`${year}-${month}-${day}`);
	const today = new Date();

	const diff = today - birthDate;
	const age = Math.floor(diff / 31536000000);

	const zodiacSign = getZodiacSign(parseInt(day), parseInt(month));
	const {
		nextBirthday,
		eta
	} = getNextBirthday(parseInt(day), parseInt(month));
	const HoroscopeapiUrl = `https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily?sign=${zodiacSign.toLowerCase()}&day=TODAY`;
	const zodiacPersonalityapiUrl = `https://zodiac-sign-api1.p.rapidapi.com/search?sign=${capitalizeFirstLetter(zodiacSign)}`;

	try {
		const horoscopeResponse = await axios.get(HoroscopeapiUrl);
		const zodiacPersonalityResponse = await axios.get(zodiacPersonalityapiUrl, {
			headers: {
				'x-rapidapi-key': process.env.RAPIDAPI_KEY,
				'x-rapidapi-host': 'zodiac-sign-api1.p.rapidapi.com'
			}
		});
		const horoscope = horoscopeResponse.data.data.horoscope_data;
		const zodiacPersonality = zodiacPersonalityResponse.data.personality;
		const zodiacSignEmoji = returnSignEmoji(capitalizeFirstLetter(zodiacSign));
		res.render('birth-result', {
			birthDate,
			age,
			birthDate,
			zodiacSign,
			eta,
			nextBirthday,
			horoscope,
			zodiacPersonality,
			zodiacSignEmoji
		});
	} catch (error) {
		console.error('Error fetching horoscope:', error);
		res.render('birth-result', {
			age,
			zodiacSign,
			eta,
			nextBirthday,
			horoscope: 'Unable to fetch horoscope at this time.'
		});
	}
});

module.exports = router;