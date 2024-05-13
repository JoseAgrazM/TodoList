import todoStore, { Filters } from './src/Store/store.todos';
import { renderPending } from './src/Todos/use-cases/render-pending';
import { renderTodos } from './src/Todos/use-cases/render-todos';

const ElementsIDs = {
	TodoList: '.list-items',
	PendingCount: '#pendig-count',
	ValueInput: '.input-todo',
	ClearCompleted: '.clear-completed',
	TodoFilters: '.filtro',
	CheckAll: '#checkAll',
};

export const App = () => {
	const displayTodos = () => {
		const todos = todoStore.getTodos(todoStore.getCurrentFilter());
		renderTodos(ElementsIDs.TodoList, todos);
		updatePendingCount();
	};
	const updatePendingCount = () => {
		renderPending(ElementsIDs.PendingCount);
	};

	(() => {
		displayTodos();
	})();

	// Referencias HTML

	const inputValue = document.querySelector(ElementsIDs.ValueInput);
	const todoListUL = document.querySelector(ElementsIDs.TodoList);
	const ClearCompletedButton = document.querySelector(
		ElementsIDs.ClearCompleted
	);
	const filtersLIs = document.querySelectorAll(ElementsIDs.TodoFilters);

	const checkedAll = document.querySelector(ElementsIDs.CheckAll);

	// Events Listeners

	inputValue.addEventListener('keyup', event => {
		if (event.keyCode !== 13) return;
		if (event.target.value.trim().length === 0) return;
		todoStore.addTodo(event.target.value);
		displayTodos();
		event.target.value = '';
	});

	todoListUL.addEventListener('click', event => {
		const element = event.target.closest('[data-id]');
		todoStore.toggleTodo(element.getAttribute('data-id'));
		displayTodos();
	});

	ClearCompletedButton.addEventListener('click', event => {
		todoStore.deleteCompleted();
		displayTodos();
	});

	todoListUL.addEventListener('click', event => {
		const element = event.target.closest('.close');
		displayTodos();
	});

	todoListUL.addEventListener('click', event => {
		const isDestroyElement = event.target.className === 'close';
		const element = event.target.closest('[data-id]');

		if (!isDestroyElement || !element) return;

		todoStore.deleteTodo(element.getAttribute('data-id'));
		displayTodos();
	});

	filtersLIs.forEach(element => {
		element.addEventListener('click', element => {
			filtersLIs.forEach(el => el.classList.remove('selected'));

			const elementId = element.target.getAttribute('id');
			element.target.classList.add('selected');

			switch (elementId) {
				case 'All':
					todoStore.setFilter(Filters.All);
					break;
				case 'Completed':
					todoStore.setFilter(Filters.Completed);
					break;
				case 'Pending':
					todoStore.setFilter(Filters.Pending);
					break;
			}
			displayTodos();
		});
	});

	checkedAll.addEventListener('click', event => {
		const isCheckedAll = event.target.checked;

		todoStore.getTodos().forEach(element => {
			element.done = isCheckedAll;
		});

		displayTodos();
	});
};
