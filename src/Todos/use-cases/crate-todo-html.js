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
              <div class="checkbox-wrapper">
  					<input  type="checkbox" class="check checkTodo" id="check1-61" ${
						done ? 'checked=""' : ''
					}>
  					<label for="check1-61" class="label">
    				<svg width="45" height="45" viewBox="0 0 95 95">
      					<rect x="30" y="20" width="50" height="50" stroke="black" fill="none"></rect>
      					<g transform="translate(0,-952.36222)">
        					<path d="m 56,963 c -102,122 6,9 7,9 17,-5 -66,69 -38,52 122,-77 -7,14 18,4 29,-11 45,-43 23,-4" stroke="#ff00e185" stroke-width="3" fill="none" class="path1"></path>
      					</g>
    				</svg>
  					</label>
				</div>
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
