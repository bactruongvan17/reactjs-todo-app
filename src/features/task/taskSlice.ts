import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from './../../app/store';
import { Task } from './taskType';
import { fetchTasks, saveTask, updateTask, destroyTask, destroyAllTask } from './taskAPI';

interface TaskState {
    data: Task[],
    isLoadingTasks: boolean,
}

const initialState: TaskState = {
    data: [],
    isLoadingTasks: false,
};

export const getListTasks = createAsyncThunk(
    'task/fetchTasks',
    async () => {
        return await fetchTasks();
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
                state.data = action.payload;
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
                state.data.push(action.payload);
                state.isLoadingTasks = false;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
            })
            // edit task
            .addCase(editTask.fulfilled, (state, action) => {
                const taskEditedIndexes = state.data.findIndex(task => task.id === action.payload.id);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
                if (taskEditedIndexes === -1) {
                    return;
                }

                state.data[taskEditedIndexes] = action.payload;
            })
            // delete task
            .addCase(deleteTask.fulfilled, (state, action) => {
                const taskDeletedIndexes = state.data.findIndex(task => task.id === action.payload.id);
                if (taskDeletedIndexes === -1) {
                    return;
                }

                state.data.splice(taskDeletedIndexes, 1);
            })
            // clear tasks
            .addCase(clearAllTasks.fulfilled, (state) => {
                state.data = [];
            })
    },
});

export const selectTasks = (state: RootState) => state.task.data;

export const selectTotalPendingTasks = (state: RootState): number => state.task.data.filter(task => task.status === "pending").length;
export const selectTotalCompletedTasks = (state: RootState): number => state.task.data.filter(task => task.status === "done").length;

export const isLoadingTasks = (state: RootState): boolean => state.task.isLoadingTasks;

export default taskSlice.reducer;
