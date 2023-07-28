export const getListTasks = async (filter = {}) => {
    return new Promise(resolve => {
        setTimeout(() => {
            const localData = localStorage.getItem('tasks');
            const data = localData ? JSON.parse(localData) : [];

            const totalPending = data.filter(tsk => tsk.status === "pending").length;
            const totalCompleted = data.filter(tsk => tsk.status === "done").length;

            if (filter.status && filter.status !== 'all') {
                resolve({
                    data: data.filter(tsk => tsk.status === filter.status).sort((a, b) => b.id - a.id),
                    totalPending,
                    totalCompleted,
                });
                return;
            }

            resolve({
                data: data.sort((a, b) => b.id - a.id),
                totalPending,
                totalCompleted,
            });
        }, 0)
    });
}

export const saveTask = async (task) => {
    return new Promise((resolve) => {
        setTimeout(async () => {
            const allTasksReq = await getListTasks();
            const tasks = allTasksReq.data;

            tasks.push(task);

            localStorage.setItem('tasks', JSON.stringify(tasks));

            resolve(true);

        }, 0);
    });
} 

export const destroyTask = async (task) => {
    return new Promise((resolve) => {
        setTimeout(async () => {
            const allTasksReq = await getListTasks();
            const tasks = allTasksReq.data;

            const taskIndex = tasks.findIndex(tsk => tsk.id === task.id);
            if (taskIndex === -1) {
                return;
            }

            tasks.splice(taskIndex, 1);

            localStorage.setItem('tasks', JSON.stringify(tasks));

            resolve(true);

        }, 0);
    });
}

export const destroyAllTask = async () => {
    return new Promise((resolve) => {
        setTimeout(async () => {
            localStorage.setItem('tasks', JSON.stringify([]));
            resolve(true);
        }, 0);
    });
}

export const updateTask = async (task) => {
    return new Promise((resolve) => {
        setTimeout(async () => {
            const allTasksReq = await getListTasks();
            const tasks = allTasksReq.data;

            const taskIndex = tasks.findIndex(tsk => tsk.id === task.id);
            if (taskIndex === -1) {
                return;
            }

            tasks[taskIndex] = task;

            localStorage.setItem('tasks', JSON.stringify(tasks));

            resolve(true);

        }, 0);
    });
}