import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import { Chart, LinearScale, CategoryScale } from "chart.js/auto";
import { ArrayContext } from "../App";
import "../styles/Chart.css";

const MyChart = () => {
	const [array, _] = useContext(ArrayContext);
	const [ageGroups, setAgeGroups] = useState([]);
	const [averageSalaries, setAverageSalaries] = useState([]);

	//Function for creating the chart content
	useEffect(() => {
		const ageGroupsArray = [];
		const averageSalariesArray = [];

		for (let i = 1; i <= 10; i++) {
			const lowerBound = (i - 1) * 10 + 1;
			const upperBound = i * 10;
			const filteredData = array.filter((item) => item.Age >= lowerBound && item.Age <= upperBound);
			const salaries = filteredData.map((item) => item.Salary);
			const averageSalary = salaries.reduce((acc, curr) => acc + curr, 0) / salaries.length;
			ageGroupsArray.push(`${lowerBound}-${upperBound}`);
			averageSalariesArray.push(averageSalary);
		}

		setAgeGroups(ageGroupsArray);
		setAverageSalaries(averageSalariesArray);
	}, [array]);

	return (
		<div className="chart-container">
			<Link to="/home">
				<Button className="chart-button"> Go Back </Button>
			</Link>
			<Bar
				data={{
					labels: ageGroups,
					datasets: [
						{
							label: "Age-Salary Comparison",
							data: averageSalaries,
						},
					],
				}}
			/>
		</div>
	);
};

export default MyChart;
