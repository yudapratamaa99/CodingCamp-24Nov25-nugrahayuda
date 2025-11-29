       let tasks = [];

        function addTask() {
            const taskInput = document.getElementById('taskInput');
            const dateInput = document.getElementById('dateInput');
            
            const taskText = taskInput.value.trim();
            const dueDate = dateInput.value;
            
            if (!taskText) {
                alert('Please enter a task!');
                return;
            }
            
            const task = {
                id: Date.now(),
                text: taskText,
                date: dueDate,
                completed: false
            };
            
            tasks.push(task);
            taskInput.value = '';
            dateInput.value = '';
            
            renderTasks();
        }

        function deleteTask(id) {
            tasks = tasks.filter(task => task.id !== id);
            renderTasks();
        }

        function toggleComplete(id) {
            const task = tasks.find(task => task.id === id);
            if (task) {
                task.completed = !task.completed;
                renderTasks();
            }
        }

        function deleteAll() {
            if (confirm('Apakah anda yakin ingin menghapus semua tugas?')) {
                tasks = [];
                renderTasks();
            }
        }

        function filterTasks() {
            renderTasks();
        }

        function formatDate(dateString) {
            if (!dateString) return '-';
            const date = new Date(dateString);
            return date.toLocaleDateString('id-ID', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
            });
        }

        function renderTasks() {
            const tasksList = document.getElementById('tasksList');
            const filter = document.getElementById('filterSelect').value;
            
            let filteredTasks = tasks;
            if (filter === 'pending') {
                filteredTasks = tasks.filter(task => !task.completed);
            } else if (filter === 'completed') {
                filteredTasks = tasks.filter(task => task.completed);
            }
            
            if (filteredTasks.length === 0) {
                tasksList.innerHTML = '<p class="text-center text-gray-500 py-8">No tasks found</p>';
                return;
            }
            
            tasksList.innerHTML = filteredTasks.map(task => `
                <div class="grid grid-cols-12 gap-4 py-4 border-b border-gray-200 items-center hover:bg-gray-50">
                    <div class="col-span-5 flex items-center gap-2">
                        <input 
                            type="checkbox" 
                            ${task.completed ? 'checked' : ''}
                            onchange="toggleComplete(${task.id})"
                            class="w-5 h-5 text-pink-500 rounded focus:ring-pink-500"
                        >
                        <span class="${task.completed ? 'line-through text-gray-500' : ''}">${task.text}</span>
                    </div>
                    <div class="col-span-3 text-gray-600">${formatDate(task.date)}</div>
                    <div class="col-span-2">
                        <span class="px-3 py-1 rounded-full text-sm ${task.completed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}">
                            ${task.completed ? 'Completed' : 'Pending'}
                        </span>
                    </div>
                    <div class="col-span-2">
                        <button 
                            onclick="deleteTask(${task.id})"
                            class="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded transition"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            `).join('');
        }

        // Allow Enter key to add task
        document.getElementById('taskInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addTask();
            }
        });