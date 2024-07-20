/** @format */

import React, { useEffect, useState } from 'react';
import quizQuestionsGenerator from '../functions/quizQuestionsGenerator';
import useSWAPIData from '../hooks/useSWAPIData';

const Quiz = () => {
	const { data, isLoading, error } = useSWAPIData();

	const [selectedAnswer, setSelectedAnswer] = useState('');
	const [questionsCounter, setQuestionsCounter] = useState(0);
	const [score, setScore] = useState(0);
	const [quizDone, setQuizDone] = useState(false);
	const [questions, setQuestions] = useState([]);

	useEffect(() => {
		if (data) {
			const generatedQuestions = quizQuestionsGenerator(data);
			setQuestions(generatedQuestions);
		}
	}, [data]);

	const handleAnswerChange = (event) => {
		setSelectedAnswer(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		// Check the answer and update score
		if (selectedAnswer === questions[questionsCounter].answer) {
			setScore(score + 1); // Increment score
		}

		// Move to the next question or finish the quiz
		if (questionsCounter < questions.length - 1) {
			setQuestionsCounter(questionsCounter + 1);
			setSelectedAnswer('');
		} else {
			// Quiz is done
			setQuizDone(true);
			setSelectedAnswer('');
		}
	};

	const handlePlayAgain = () => {
		setQuizDone(false);
		setQuestionsCounter(0);
		setScore(0);
		setSelectedAnswer('');
		setQuestions(quizQuestionsGenerator(data));
	};

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div className='flex flex-col items-center justify-center h-full p-6 text-white'>
			<h1 className='mb-4 text-3xl font-bold'>Star Wars Quiz</h1>
			<form
				className='w-full max-w-md p-4 bg-gray-800 rounded shadow-lg'
				onSubmit={handleSubmit}
			>
				{!quizDone ? (
					<div>
						<h2 className='mb-4 text-xl'>
							{questions[questionsCounter]?.question}
						</h2>
						<div className='flex flex-col space-y-2'>
							{questions[questionsCounter]?.choices.map((choice, index) => (
								<label
									key={index}
									className={`flex items-center p-2 rounded cursor-pointer ${
										selectedAnswer === choice
											? 'bg-yellow-500'
											: 'bg-gray-700 hover:bg-yellow-500'
									}`}
								>
									<input
										type='radio'
										name='quiz'
										value={choice}
										checked={selectedAnswer === choice}
										onChange={handleAnswerChange}
										className='hidden'
									/>
									<span className='ml-2'>{choice}</span>
								</label>
							))}
						</div>
						<button
							type='submit'
							className='px-4 py-2 mt-4 text-black bg-yellow-500 rounded hover:bg-yellow-600'
						>
							Submit
						</button>
					</div>
				) : (
					<div className='flex flex-col items-center'>
						<p className='mb-4 text-xl'>
							Your score is {score}/{questions.length}
						</p>
						<div className='flex gap-5'>
							<button
								className='p-2 bg-red-600 rounded-lg'
								onClick={handlePlayAgain}
							>
								Play Again
							</button>
							<button className='p-2 bg-blue-600 rounded-lg'>
								Leaderboards
							</button>
						</div>
					</div>
				)}
			</form>
		</div>
	);
};

export default Quiz;
