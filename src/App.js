import "./App.css";
import React from "react";
import Todo from "./components/Todo";
import axios from "axios";

function App() {
	const [todo, setTodo] = React.useState([]);
	const [task, setTask] = React.useState("");
	const [page, setPage] = React.useState(1);
	const [totalpages, setTotalpages] = React.useState(0);

	function postonserver() {
		fetch(" http://localhost:8080/todos", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				task: task,
			}),
		});
		setTask("");
	}

	React.useEffect(() => {
		axios
			.get(`http://localhost:8080/todos?_page=${page}&_limit=5`)
			.then((r) => {
				setTodo(r.data);
				setTotalpages(Number(r.headers["x-total-count"]));
			});
	}, [page]);

	return (
		<div className="App">
			<input
				type="text"
				value={task}
				placeholder="enter a task"
				onChange={(e) => setTask(e.target.value)}
			/>
			<button onClick={postonserver}>Add task to server</button>
			<div>
				<Todo todo={todo} />
			</div>
			<button
				disabled={page <= 1}
				onClick={() => setPage(page - 1)}
			>{`<`}</button>
			<button
				disabled={totalpages <= page * 5}
				onClick={() => setPage(page + 1)}
			>{`>`}</button>
		</div>
	);
}

export default App;
