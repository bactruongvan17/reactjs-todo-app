import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from './../../app/store';
import { Task, TaskFilter, TaskStatus } from './taskType';
import { fetchTasks, saveTask, updateTask, destroyTask, destroyAllTask } from './taskAPI';

interface TaskState {
    data: Task[],
    totalPending: number,
    totalCompleted: number,
    isLoadingTasks: boolean,
}

const initialState: TaskState = {
    data: [],
    totalPending: 0,
    totalCompleted: 0,
    isLoadingTasks: false,
};

export const getListTasks = createAsyncThunk(
    'task/fetchTasks',
    async (filters?: TaskFilter) => {
        return await fetchTasks(filters);
    }
);

export const addTask = createAsyncThunk(
    'task/addTask',
    async (task: Task) => {
        await saveTask(task);
        return task;
    }
);

export const editTask = createAsyncThunk(
    'task/editTask',
    async (task: Task) => {
        await updateTask(task);
        return task;
    }
);

export const changeStatusTask = createAsyncThunk(
    'task/changeStatusTask',
    async (task: Task) => {
        await updateTask(task);
        return task;
    }
);

export const deleteTask = createAsyncThunk(
    'task/deleteTask',
    async (task: Task) => {
        await destroyTask(task);
        return task;
    }
);

export const clearAllTasks = createAsyncThunk(
    'task/clearTasks',
    async () => {
        return await destroyAllTask();
    }
);


export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        clearAllTasks: (state) => {
            state.data = [];
        }
    },
    extraReducers: (builder) => {
        builder
            // list tasks
            .addCase(getListTasks.pending, (state) => {
                state.isLoadingTasks = true;
            })
            .addCase(getListTasks.fulfilled, (state, action) => {
                state.data = action.payload.data;
                state.totalPending = action.payload.totalPending;
                state.totalCompleted = action.payload.totalCompleted;
                state.isLoadingTasks = false;
            })
            .addCase(getListTasks.rejected, (state) => {
                state.isLoadingTasks = false;
            })
            // add task
            .addCase(addTask.pending, (state) => {
                state.isLoadingTasks = true;
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state.data.unshift(action.payload)
                state.isLoadingTasks = false;
                state.totalPending++;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
            })
            // edit task
            .addCase(editTask.fulfilled, (state, action) => {
                const taskEditedIndexes = state.data.findIndex(task => task.id === action.payload.id);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
                if (taskEditedIndexes === -1) {
                    return;
                }

                state.data[taskEditedIndexes] = action.payload;
            })
            // change status task
            .addCase(changeStatusTask.fulfilled, (state, action) => {
                const taskEditedIndexes = state.data.findIndex(task => task.id === action.payload.id);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
                if (taskEditedIndexes === -1) {
                    return;
                }

                state.data[taskEditedIndexes] = action.payload;

                if (action.payload.status === TaskStatus.Pending) {
                    state.totalPending++;
                    state.totalCompleted--;
                } else {
                    state.totalPending--;
                    state.totalCompleted++;
                }
            })
            // delete task
            .addCase(deleteTask.fulfilled, (state, action) => {
                const taskDeletedIndexes = state.data.findIndex(task => task.id === action.payload.id);
                if (taskDeletedIndexes === -1) {
                    return;
                }

                state.data.splice(taskDeletedIndexes, 1);

                if (action.payload.status === TaskStatus.Pending) {
                    state.totalPending--;
                } else {
                    state.totalCompleted--;
                }
            })
            // clear tasks
            .addCase(clearAllTasks.fulfilled, (state) => {
                state.data = [];
                state.totalPending = 0;
                state.totalCompleted = 0;
            })
    },
});

export const selectTasks = (state: RootState) => state.task.data;
export const selectTotalPendingTasks = (state: RootState) => state.task.totalPending;
export const selectTotalCompletedTasks = (state: RootState) => state.task.totalCompleted;

export const isLoadingTasks = (state: RootState): boolean => state.task.isLoadingTasks;

export default taskSlice.reducer;
