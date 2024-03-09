import { supabase } from "./client";
import { useState, useEffect } from "react";

function App() {
	const [todos, setTodos] = useState([]);
	const [todo, setTodo] = useState({ task: "", content: "" });
	const { task, content } = todo;

	useEffect(() => {
		fetchTodos();
	}, []);

	async function fetchTodos() {
		const { data } = await supabase.from("todos").select("*");
		setTodos(data);
		console.log("data: ", data);
	}

	async function createTodo() {
		await supabase.from("todos").insert([{ task, content }]).single();
		setTodos([...todos, { task, content }]);
		setTodo({ task: "", content: "" });
	}

	return (
		<div className='App'>
			<h1>Todo-test-app</h1>
			<input
				placeholder='task'
				value={task}
				onChange={(e) => setTodo({ ...todo, task: e.target.value })}
			/>
			<input
				placeholder='content'
				value={content}
				onChange={(e) => setTodo({ ...todo, content: e.target.value })}
			/>
			<button onClick={createTodo}>Create todo</button>
			<div className='todos'>
				{todos.map((todo) => (
					<div key={todo.id}>
						<h3>{todo.task}</h3>
						<p>{todo.content}</p>
						<hr />
					</div>
				))}
			</div>
		</div>
	);
}

export default App;
