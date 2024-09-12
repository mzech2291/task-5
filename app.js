// Mock users and tasks
const users = [
    { email: 'admin@techwave.com', password: 'admin123', role: 'admin' },
    { email: 'employee@techwave.com', password: 'employee123', role: 'employee' }
];

const tasks = [
    { id: 1, title: 'Complete project report', status: 'pending', assignedTo: 'employee@techwave.com' },
    { id: 2, title: 'Attend team meeting', status: 'completed', assignedTo: 'employee@techwave.com' }
];

// Handle login
function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        localStorage.setItem('loggedIn', true);
        localStorage.setItem('role', user.role);
        showDashboard(user.role);
    } else {
        document.getElementById('login-error').innerText = 'Invalid email or password';
    }
}

// Show dashboard based on role
function showDashboard(role) {
    document.getElementById('login-container').style.display = 'none';
    if (role === 'admin') {
        document.getElementById('admin-dashboard').style.display = 'block';
        loadUserManagement();
    } else if (role === 'employee') {
        document.getElementById('employee-dashboard').style.display = 'block';
        loadTaskList();
    }
}

// Load user management for admin
function loadUserManagement() {
    const userManagement = document.getElementById('user-management');
    userManagement.innerHTML = '<p>Manage users here.</p>';
    // Implement user management features here
}

// Load task list for employee
function loadTaskList() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = tasks.filter(task => task.assignedTo === 'employee@techwave.com')
        .map(task => `<p>${task.title} - ${task.status}</p>`)
        .join('');
}

// Handle logout
function logout() {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('role');
    document.getElementById('admin-dashboard').style.display = 'none';
    document.getElementById('employee-dashboard').style.display = 'none';
    document.getElementById('login-container').style.display = 'block';
}

// Check if user is logged in and show the appropriate dashboard
document.addEventListener('DOMContentLoaded', () => {
    const loggedIn = localStorage.getItem('loggedIn');
    const role = localStorage.getItem('role');
    if (loggedIn) {
        showDashboard(role);
    } else {
        document.getElementById('login-container').style.display = 'block';
    }
});
