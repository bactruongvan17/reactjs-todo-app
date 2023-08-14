import { Task, TaskFilter, TaskStatus, TaskStatusFilter } from "./taskType";

export const fetchTasks = async (filters?: TaskFilter): Promise<{data: Task[], totalPending: number, totalCompleted: number}> => {
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

            data.sort((a: Task, b: Task) => b.id - a.id);

            const totalPending = data.filter((task: Task) => task.status === TaskStatus.Pending).length;
            const totalCompleted = data.filter((task: Task) => task.status === TaskStatus.Completed).length;
            
            if (filters && filters?.status !== TaskStatusFilter.All.toString()) {
                data = data.filter((task: Task) => task.status.toString() === filters?.status);
            }

            resolve({
                data,
                totalPending,
                totalCompleted,
            });
        }, 500)
    });
}

export const saveTask = async (task: Task): Promise<boolean> => {
    return new Promise((resolve) => {
        setTimeout(async () => {
            const allTasksReq = await fetchTasks();
            const tasks = allTasksReq.data;

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
            const tasks = allTasksReq.data;

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
            const tasks = allTasksReq.data;

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