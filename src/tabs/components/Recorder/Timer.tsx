import React, { useEffect } from 'react';

function Timer({ status, seconds, setSeconds, minutes, setMinutes, hours, setHours, isRunning, setIsRunning }) {
	useEffect(() => {
		let timerInterval;

		if (status === 'recording') {
			timerInterval = setInterval(() => {
				setSeconds((prevSeconds) => prevSeconds + 1);

				if (seconds === 59) {
					setSeconds(0);
					setMinutes((prevMinutes) => prevMinutes + 1);

					if (minutes === 59) {
						setMinutes(0);
						setHours((prevHours) => prevHours + 1);
					}
				}
			}, 1000);
		} else {
			clearInterval(timerInterval);
		}

		return () => clearInterval(timerInterval);
	}, [isRunning, seconds, minutes, setHours, setMinutes, setSeconds, status]);

	return (
		<div className='text-center'>
			<div className='text-4xl font-bold mb-4'>
				{hours?.toString()?.padStart(2, '0')}:{minutes?.toString()?.padStart(2, '0')}:{seconds?.toString()?.padStart(2, '0')}
			</div>
		</div>
	);
}

export default Timer;
