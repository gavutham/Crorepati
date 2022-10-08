import React, { useEffect, useState } from "react";
import useSound from "use-sound";
import play from "../assets/play.mp3";
import correct from "../assets/correct.mp3";
import wrong from "../assets/wrong.mp3";

const Trivia = ({ data, setStop, questionNumber, setQuestionNumber }) => {
	const [question, setQuestion] = useState(null);
	const [selectedAnswer, setSelectedAnswer] = useState(null);
	const [className, setClassName] = useState("answer");
	const [letsPlay] = useSound(play);
	const [correctAnswer] = useSound(correct);
	const [wrongAnswer] = useSound(wrong);

	useEffect(() => {
		console.log(1);
		letsPlay();
	}, [letsPlay]);

	const delay = (duration, callback) => {
		setTimeout(() => {
			callback();
		}, duration);
	};

	useEffect(() => {
		setQuestion(data[questionNumber - 1]);
	}, [questionNumber, data]);

	const handleClick = (answer) => {
		setSelectedAnswer(answer);
		setClassName("answer active");
		delay(1500, () =>
			setClassName(answer.correct ? "answer correct" : "answer wrong")
		);
		delay(3500, () => {
			if (answer.correct) {
				correctAnswer();
				delay(1000, () => {
					if (questionNumber < 15) {
						setQuestionNumber((prev) => prev + 1);
						setSelectedAnswer(null);
					} else {
						delay(1000, () => {
							setQuestionNumber((prev) => prev + 1);
							setStop(true);
						});
					}
				});
			} else {
				wrongAnswer();
				delay(1000, () => {
					setStop(true);
				});
			}
		});
	};
	return (
		<div className="trivia">
			<div className="question">{question?.question}</div>
			<div className="answers">
				{question?.answers.map((a) => (
					<div
						className={selectedAnswer === a ? className : "answer"}
						onClick={() => handleClick(a)}
					>
						{a.text}
					</div>
				))}
			</div>
		</div>
	);
};

export default Trivia;
