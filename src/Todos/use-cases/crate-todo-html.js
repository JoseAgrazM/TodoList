import todoStore from '../../Store/store.todos';
import { Todo } from '../Models/todo.model';

export const createTodoHTML = todo => {
	const { id, description, done, createAt } = todo;

	if (!todo) throw new Error('A TODO object is required');

	const sinNotas = `
            <div class="todo-item">
              <label>No tienes ninguna nota :( </label>
            </div>
    `;

	const html = `
            <div class="todo-item">
              <input type="checkbox" class="check-box" ${done ? 'checked' : ''}>
              <label>${description}</label>
              <button type="button" class="close" aria-label="Close">
                &times;
              </button>
            </div>
    `;

	const liElement = document.createElement('li');
	if (todoStore.getTodos().length === 0) {
		liElement.innerHTML = sinNotas;
		return liElement;
	}
	liElement.innerHTML = html;
	liElement.setAttribute('data-id', id);

	if (done) liElement.classList.add('completed');

	return liElement;
};
