import { useEffect, useState } from "react";

const Timer = ({ questionNumber, setStop }) => {
	const [timer, setTimer] = useState(30);
	useEffect(() => {
		if (timer === 0) {
			setStop(true);
		}
		const interval = setInterval(() => {
			setTimer((prev) => prev - 1);
		}, 1000);
		return () => clearInterval(interval);
	}, [setStop, timer]);
	useEffect(() => {
		setTimer(30);
	}, [questionNumber]);
	return timer;
};

export default Timer;
