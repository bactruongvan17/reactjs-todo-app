import { Task } from "./taskType";

export const fetchTasks = async (): Promise<Task[]> => {
    return new Promise(resolve => {
        setTimeout(() => {
            const localData = localStorage.getItem('tasks');
            let data = localData ? JSON.parse(localData) : [];
            data = data.map((tsk: any) => {
                const tk: Task = {
                    id: tsk.id,
                    name: tsk.name,
                    status: tsk.status,
                };

                return tk;
            });

            resolve(data);
        }, 500)
    });
}

export const saveTask = async (task: Task): Promise<boolean> => {
    return new Promise((resolve) => {
        setTimeout(async () => {
            const allTasksReq = await fetchTasks();
            const tasks = allTasksReq;

            tasks.push(task);

            localStorage.setItem('tasks', JSON.stringify(tasks));

            resolve(true);

        }, 500);
    });
} 

export const updateTask = async (task: Task): Promise<boolean> => {
    return new Promise((resolve) => {
        setTimeout(async () => {
            const allTasksReq = await fetchTasks();
            const tasks = allTasksReq;

            const taskIndex = tasks.findIndex(tsk => tsk.id === task.id);
            if (taskIndex === -1) {
                return;
            }

            tasks[taskIndex] = task;

            localStorage.setItem('tasks', JSON.stringify(tasks));

            resolve(true);

        }, 500);
    });
}

export const destroyTask = async (task: Task): Promise<boolean> => {
    return new Promise((resolve) => {
        setTimeout(async () => {
            const allTasksReq = await fetchTasks();
            const tasks = allTasksReq;

            const taskIndex = tasks.findIndex(tsk => tsk.id === task.id);
            if (taskIndex === -1) {
                resolve(false);
                return;
            }

            tasks.splice(taskIndex, 1);

            localStorage.setItem('tasks', JSON.stringify(tasks));

            resolve(true);

        }, 500);
    });
}

export const destroyAllTask = async (): Promise<boolean> => {
    return new Promise((resolve) => {
        setTimeout(async () => {
            localStorage.setItem('tasks', JSON.stringify([]));
            resolve(true);
        }, 0);
    });
}