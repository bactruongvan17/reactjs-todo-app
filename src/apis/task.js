export const getListTasks = (filter = {}) => {
    const localData = localStorage.getItem('tasks');
    const data = localData ? JSON.parse(localData) : [];

    const totalPending = data.filter(tsk => tsk.status === "pending").length;
    const totalCompleted = data.filter(tsk => tsk.status === "done").length;

    if (filter.status && filter.status !== 'all') {
        return {
            data: data.filter(tsk => tsk.status === filter.status),
            totalPending,
            totalCompleted,
        }
    }

    return {
        data,
        totalPending,
        totalCompleted,
    };
}

export const saveTasks = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
} 