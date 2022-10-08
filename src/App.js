import { useEffect, useState } from "react";
import "./app.css";
import Timer from "./components/Timer";
import { moneyPyramid, questions } from "./data";
import Trivia from "./components/Trivia";
import Start from "./components/Start";

function App() {
	const [questionNumber, setQuestionNumber] = useState(1);
	const [stop, setStop] = useState(false);
	const [earned, setEarned] = useState("₹ 0");
	const [username, setUsername] = useState(null);

	useEffect(() => {
		questionNumber > 1 &&
			setEarned(moneyPyramid.find((m) => m.id === questionNumber - 1).amount);
	}, [questionNumber]);

	return (
		<div className="app">
			{username ? (
				<>
					<div className="main">
						{stop ? (
							<h1 className="endText">
								You Earned: {questionNumber > 15 ? "₹ 1,00,00,000" : earned}
							</h1>
						) : (
							<>
								<div className="top">
									<div className="timer">
 										<Timer setStop={setStop} questionNumber={questionNumber} />
									</div>
								</div>
								<div className="bottom">
									<Trivia
										data={questions}
										setStop={setStop}
										questionNumber={questionNumber}
										setQuestionNumber={setQuestionNumber}
									/>
								</div>
							</>
						)}
					</div>
					<div className="pyramid">
						<ul className="moneyList">
							{moneyPyramid.map((i) => (
								<li
									className={
										"moneyListItem " + (questionNumber === i.id && "active")
									}
									key={i.id}
								>
									<span className="moneyListItemNumber">{i.id}</span>
									<span className="moneyListItemAmount">{i.amount}</span>
								</li>
							))}
						</ul>
					</div>
				</>
			) : (
				<Start setUsername={setUsername} />
			)}
		</div>
	);
}

export default App;
