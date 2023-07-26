export const getListTasks = () => {
    const localData = localStorage.getItem('tasks');
    return localData ? JSON.parse(localData) : [];
}

export const saveTasks = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
} 