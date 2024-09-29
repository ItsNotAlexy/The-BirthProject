function updateCountdown(nextBirthday) {
	const countdownElement = document.getElementById('countdown');
	const birthdayDate = new Date(nextBirthday).getTime();

	const interval = setInterval(() => {
		const now = new Date().getTime();
		const distance = birthdayDate - now;


		const days = Math.floor(distance / (1000 * 60 * 60 * 24));
		const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		const seconds = Math.floor((distance % (1000 * 60)) / 1000);

		countdownElement.innerHTML = `
            ${days}d ${hours}h ${minutes}m ${seconds}s
        `;
		if (distance < 0) {
			clearInterval(interval);
			countdownElement.innerHTML = "It's your birthday!";
		}
	}, 1000);
}