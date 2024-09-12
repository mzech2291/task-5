// Simulating Local Database with User Information
const users = [
    { username: "admin", password: "admin123", role: "admin" },
    { username: "employee", password: "employee123", role: "employee" }
];

// Display login page by default
document.getElementById('loginPage').style.display = 'block';

// Function to handle login
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        document.getElementById('loginPage').style.display = 'none';
        if (user.role === 'admin') {
            document.getElementById('adminDashboard').style.display = 'block';
        } else {
            document.getElementById('employeeDashboard').style.display = 'block';
            loadEmployeeTasks();
        }
    } else {
        document.getElementById('errorMessage').innerText = "Invalid credentials. Please try again.";
    }
}

// Function to logout
function logout() {
    document.getElementById('loginPage').style.display = 'block';
    document.getElementById('adminDashboard').style.display = 'none';
    document.getElementById('employeeDashboard').style.display = 'none';
}

// Task Management for Admin
let tasks = [];

function addTask() {
    const task = document.getElementById('newTask').value;
    if (task) {
        tasks.push(task);
        document.getElementById('newTask').value = '';
        displayTasks();
        saveTasks();
    }
}

function displayTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        taskList.innerHTML += <li>${task}</li>;
    });
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadEmployeeTasks() {
    tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const employeeTaskList = document.getElementById('employeeTaskList');
    employeeTaskList.innerHTML = '';
    tasks.forEach(task => {
        employeeTaskList.innerHTML += <li>${task}</li>;
    });
}