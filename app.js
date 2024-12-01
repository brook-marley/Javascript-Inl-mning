
const API_BASE_URL = "https://js1-todo-api.vercel.app/api/todos?apikey=da52d20d-5fa4-4365-b0e5-4e303af412eb"
const todoId = "https://js1-todo-api.vercel.app/api/todos/{id}?apikey=da52d20d-5fa4-4365-b0e5-4e303af412eb"
const fetchErrorMessage = document.getElementById("fetchErrorMessage")
const inputErrorMessage = document.getElementById("inputErrorMessage")

const taskInput = document.querySelector("input[type='text']")
const addTaskButton = document.querySelector("button")
const taskList = document.getElementById("taskList")
const errorMessage = document.getElementById("errorMessage")

async function fetchTodos() {
    try {
        const response = await fetch(`${API_BASE_URL}?_limit=10`)
        if (!response.ok) {
            throw new Error(`Failed to fetch todos. Status: ${response.status}`)
        }
        const todos = await response.json()
        console.log("Fetched todos:", todos)
        return todos
    } catch (error) {
        console.error("Error:", error.message)
    }
}

fetchTodos()



function addTodoToDOM(todo) {
    const taskContainer = document.createElement("div")
    taskContainer.className = "task-container"

    const taskText = document.createElement("span")
    taskText.textContent = todo.title

    const deleteButton = document.createElement("button")
    deleteButton.textContent = "Delete"
    deleteButton.className = "delete-btn"
    deleteButton.addEventListener("click", () => deleteTodo(todo.id, taskContainer))

    taskContainer.appendChild(taskText)
    taskContainer.appendChild(deleteButton)
    taskList.appendChild(taskContainer)
}

async function addTodo() {
    const taskText = taskInput.value.trim()

    if (!taskText) {
        errorMessage.textContent = "Please enter a valid task."
        return
    }

    errorMessage.textContent = "" 

    const newTodo = { title: taskText, completed: false }

    try {
        const response = await fetch(API_BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTodo)
        })

        if (!response.ok) throw new Error("Failed to add todo.")

        const savedTodo = await response.json()
        addTodoToDOM(savedTodo) 
        taskInput.value = "" 
    } catch (error) {
        errorMessage.textContent = error.message
    }
}


async function deleteTodo(todoId, taskElement) {
    try {
        taskList.removeChild(taskElement) 
        console.log(`Todo with ID ${todoId} removed.`)
    } catch (error) {
        errorMessage.textContent = "Failed to delete todo."
    }
}


addTaskButton.addEventListener("click", addTodo)

fetchTodos()
