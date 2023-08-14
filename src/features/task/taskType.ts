export type Task = {
    id: number,
    name: string,
    status: TaskStatus,
};

export enum TaskStatus {
    Pending = 'pending',
    Completed = 'done',
}

export enum TaskStatusFilter {
    All = 'all',
    Pending = TaskStatus.Pending,
    Completed = TaskStatus.Completed,
}

export type TaskFilter = {
    status: TaskStatusFilter
}