
    function updateAge(creationDateString) {
        const creationDate = new Date(creationDateString);
        const currentDate = new Date();

        const ageInMilliseconds = currentDate - creationDate;
        const seconds = Math.floor(ageInMilliseconds / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const months = Math.floor(days / 30.44); // Average number of days in a month
        const years = Math.floor(days / 365);

        const remainingMonths = Math.floor((days % 365) / 30.44); // Remaining months
        const remainingDays = Math.floor(days % 30.44); // Remaining days
        const remainingHours = Math.floor(hours % 24); // Remaining hours
        const remainingMinutes = Math.floor(minutes % 60); // Remaining minutes
        const remainingSeconds = Math.floor(seconds % 60); // Remaining seconds

        let ageString = '';

        if (years > 0) {
            ageString += `${years} YEAR${years > 1 ? 'S' : ''}, `;
        }

        if (months > 0 && years < 1) {
            ageString += `${months} MONTH${months > 1 ? 'S' : ''}, `;
        }

        ageString += `${remainingDays} DAY${remainingDays !== 1 ? 'S' : ''}, ${remainingHours} HOUR${remainingHours !== 1 ? 'S' : ''}, ${remainingMinutes} MINUTE${remainingMinutes !== 1 ? 'S' : ''}, ${remainingSeconds} SECOND${remainingSeconds !== 1 ? 'S' : ''}`;

        document.getElementById('runtime').innerText = ageString;
    }

    var date = '2024-05-06T08:00:00';
    updateAge(date);
    setInterval(() => updateAge(date), 1000);