function getZodiacSign(day, month) {
    const zodiacSigns = [
        { sign: 'Capricorn', start: { month: 12, day: 22 }, end: { month: 1, day: 19 } },
        { sign: 'Aquarius', start: { month: 1, day: 20 }, end: { month: 2, day: 18 } },
        { sign: 'Pisces', start: { month: 2, day: 19 }, end: { month: 3, day: 20 } },
        { sign: 'Aries', start: { month: 3, day: 21 }, end: { month: 4, day: 19 } },
        { sign: 'Taurus', start: { month: 4, day: 20 }, end: { month: 5, day: 20 } },
        { sign: 'Gemini', start: { month: 5, day: 21 }, end: { month: 6, day: 20 } },
        { sign: 'Cancer', start: { month: 6, day: 21 }, end: { month: 7, day: 22 } },
        { sign: 'Leo', start: { month: 7, day: 23 }, end: { month: 8, day: 22 } },
        { sign: 'Virgo', start: { month: 8, day: 23 }, end: { month: 9, day: 22 } },
        { sign: 'Libra', start: { month: 9, day: 23 }, end: { month: 10, day: 22 } },
        { sign: 'Scorpio', start: { month: 10, day: 23 }, end: { month: 11, day: 21 } },
        { sign: 'Sagittarius', start: { month: 11, day: 22 }, end: { month: 12, day: 21 } }
    ];

    for (const zodiac of zodiacSigns) {
        if (
            (month === zodiac.start.month && day >= zodiac.start.day) ||
            (month === zodiac.end.month && day <= zodiac.end.day)
        ) {
            return zodiac.sign;
        }
    }
    return 'Unknown';
}

function getNextBirthday(day, month) {
    const today = new Date();
    let nextBirthday = new Date(today.getFullYear(), month - 1, day);

    if (nextBirthday < today) {
        nextBirthday.setFullYear(today.getFullYear() + 1);
    }

    const diffInTime = nextBirthday - today;
    const diffInDays = Math.floor(diffInTime / (1000 * 60 * 60 * 24));

    return { nextBirthday, eta: diffInDays };
}

function returnSignEmoji(sign) {
    const zodiacEmojis = {
        Aries: '♈️',
        Taurus: '♉️',
        Gemini: '♊️',
        Cancer: '♋️',
        Leo: '♌️',
        Virgo: '♍️',
        Libra: '♎️',
        Scorpio: '♏️',
        Sagittarius: '♐️',
        Capricorn: '♑️',
        Aquarius: '♒️',
        Pisces: '♓️',
    };
    
    const emoji = zodiacEmojis[sign];
    return emoji;
}

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

module.exports = { getZodiacSign, getNextBirthday, returnSignEmoji, capitalizeFirstLetter};