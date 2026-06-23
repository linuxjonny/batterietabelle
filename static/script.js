/*
 * Copyright (c) 2026 YOUR_COMPANY_NAME LLC.
 * All rights reserved.
 * This code is proprietary and confidential.
 */
document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('add-todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    const emptyState = document.getElementById('empty-state');
    const template = document.getElementById('todo-item-template');

    // API Base URL
    const API_URL = '/api/todos';

    // Fetch and render initial todos
    fetchTodos();

    // Event Listeners
    todoForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const taskText = todoInput.value.trim();
        if (taskText) {
            await addTodo(taskText);
            todoInput.value = '';
            todoInput.focus();
        }
    });

    // Delegate events for dynamically added items
    todoList.addEventListener('change', async (e) => {
        if (e.target.classList.contains('todo-checkbox')) {
            const li = e.target.closest('.todo-item');
            const id = li.dataset.id;
            await toggleTodo(id, li);
        }
    });

    todoList.addEventListener('click', async (e) => {
        const deleteBtn = e.target.closest('.delete-btn');
        if (deleteBtn) {
            const li = deleteBtn.closest('.todo-item');
            const id = li.dataset.id;
            await deleteTodo(id, li);
        }
    });

    // API Functions
    async function fetchTodos() {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error('Failed to fetch todos');
            
            const todos = await response.json();
            renderTodos(todos);
        } catch (error) {
            console.error('Error fetching todos:', error);
            // Optionally show a toast notification here
        }
    }

    async function addTodo(task) {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ task }),
            });
            
            if (!response.ok) throw new Error('Failed to add todo');
            
            const newTodo = await response.json();
            renderTodoItem(newTodo, true); // true = prepend
            updateEmptyState();
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    }

    async function toggleTodo(id, listItemElement) {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT'
            });
            
            if (!response.ok) throw new Error('Failed to toggle todo');
            
            const updatedTodo = await response.json();
            
            // Visual update
            if (updatedTodo.completed) {
                listItemElement.classList.add('completed');
            } else {
                listItemElement.classList.remove('completed');
            }
        } catch (error) {
            console.error('Error toggling todo:', error);
            // Revert state visually if API fails
            const checkbox = listItemElement.querySelector('.todo-checkbox');
            checkbox.checked = !checkbox.checked;
        }
    }

    async function deleteTodo(id, listItemElement) {
        try {
            // Optimistic UI updates
            listItemElement.classList.add('fade-out');
            
            // Wait for animation to complete
            await new Promise(resolve => setTimeout(resolve, 300));
            listItemElement.remove();
            updateEmptyState();

            // Actual API call
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });
            
            if (!response.ok) throw new Error('Failed to delete todo');
            
        } catch (error) {
            console.error('Error deleting todo:', error);
            // Re-render list if deletion failed
            fetchTodos();
        }
    }

    // Rendering Functions
    function renderTodos(todos) {
        todoList.innerHTML = ''; // Clear current list
        
        todos.forEach(todo => {
            renderTodoItem(todo);
        });
        
        updateEmptyState();
    }

    function renderTodoItem(todo, prepend = false) {
        const clone = template.content.cloneNode(true);
        const li = clone.querySelector('.todo-item');
        const textSpan = clone.querySelector('.todo-text');
        const checkbox = clone.querySelector('.todo-checkbox');
        
        li.dataset.id = todo.id;
        textSpan.textContent = todo.task;
        
        if (todo.completed) {
            li.classList.add('completed');
            checkbox.checked = true;
        }
        
        if (prepend) {
            todoList.prepend(clone);
        } else {
            todoList.appendChild(clone);
        }
    }

    function updateEmptyState() {
        if (todoList.children.length === 0) {
            emptyState.classList.remove('hidden');
        } else {
            emptyState.classList.add('hidden');
        }
    }
});
