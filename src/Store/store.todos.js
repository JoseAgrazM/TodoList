import { Todo } from '../Todos/Models/todo.model';

export const Filters = {
	All: 'All',
	Completed: 'Completed',
	Pending: 'Pending',
};

const state = {
	todos: [],
	filter: Filters.All,
};

const initStore = () => {
	loadStore();
};

const loadStore = () => {
	if (!localStorage.getItem('state')) return;

	const { todos = [], filter = Filters.All } = JSON.parse(
		localStorage.getItem('state')
	);

	state.todos = todos;
	state.filter = filter;
};

const saveToLocalStorage = () => {
	localStorage.setItem('state', JSON.stringify(state));
};

const getTodos = (filter = Filters.All) => {
	switch (filter) {
		case Filters.All:
			return [...state.todos];
		case Filters.Completed:
			return state.todos.filter(todo => todo.done);
		case Filters.Pending:
			return state.todos.filter(todo => !todo.done);
		default:
			throw new Error(`Option ${filter} is not valid.`);
	}
};

const addTodo = description => {
	if (!description) throw new Error('Description is requiered');
	state.todos.push(new Todo(description));

	saveToLocalStorage();
};

const deleteTodo = todoId => {
	state.todos = state.todos.filter(todo => todo.id !== todoId);
	saveToLocalStorage();
};

const toggleTodo = todoId => {
	state.todos = state.todos.map(todo => {
		if (todoId === todo.id) {
			todo.done = !todo.done;
		}
		return todo;
	});
	saveToLocalStorage();
};

const deleteCompleted = () => {
	state.todos = state.todos.filter(todo => !todo.done);
	saveToLocalStorage();
};

const setFilter = (newFilter = Filters.All) => {
	state.filter = newFilter;
	saveToLocalStorage();
};

const getCurrentFilter = () => {
	return state.filter;
};

export default {
	addTodo,
	deleteCompleted,
	deleteTodo,
	getCurrentFilter,
	getTodos,
	initStore,
	loadStore,
	setFilter,
	toggleTodo,
};
