import './App.css';
import AddTaskForm from './components/AddTaskForm';
import TaskBar from './components/TaskBar';
import TaskList from './components/TaskList';
import { Box, Divider, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { getListTasks, saveTask, updateTask, destroyTask, destroyAllTask } from './apis/task';
import TaskListSkeleton from './components/TaskListSkeleton';
import { Task } from './types/tasks';

function App() {
  const [tasks, setTasks] = useState(Array<Task>);
  const [totalPending, setTotalPending] = useState(0);
  const [totalCompleted, setTotalCompleted] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isForceReload, setIsForceReload] = useState(true);

  const filterInit = {
    status: "all",
  };
  const [filters, setFilters] = useState(filterInit);

  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true);
      const data = await getListTasks(filters);

      setTasks(data.data);
      setTotalPending(data.totalPending);
      setTotalCompleted(data.totalCompleted);
      
      setIsLoading(false);
    }
    
    fetchTasks().catch(console.error);
  }, [filters, isForceReload]);

  /**
   * Handle Clear All Tasks
   */
  async function handleClearAllTask() {
    setTasks([]);
    setTotalPending(0);
    setTotalCompleted(0);

    await destroyAllTask();

    setFilters({...filterInit});
  }

  /**
   * Handle Toggle Completed Task
   * @param {object} task 
   */
  async function handleToggleCheckedTask(task: Task) {
    
    const taskIndex = tasks.findIndex((tsk: Task) => tsk.id === task.id);
    if (taskIndex === -1) {
      return;
    }

    
    const taskToUpdate = {
      ...task,
      status: task.status === "pending" ? "done" : "pending"
    };

    let newTasks: Array<Task> = [...tasks];

    if (filters.status !== "all" && (filters.status !== taskToUpdate.status)) {
      newTasks.splice(taskIndex, 1);
    } else {
      newTasks[taskIndex] = taskToUpdate;
    }
    setTasks(newTasks);

    if (taskToUpdate.status === "pending") {
      setTotalCompleted(totalCompleted - 1);
      setTotalPending(totalPending + 1);
    } else {
      setTotalCompleted(totalCompleted + 1);
      setTotalPending(totalPending - 1);
    }
    
    await updateTask(taskToUpdate);
  }

  /**
   * Handle Add New Task
   * @param {string} value 
   * @returns 
   */
  async function handleAddNewTask(value: string) {
    if (!value) {
      return;
    }

    const newTask: Task = {
      id: (new Date()).getTime(),
      name: value,
      status: "pending",
    };

    const newTasks: Array<Task> = [...tasks, newTask];
    setTasks(newTasks.sort((a, b) => b.id - a.id));

    setTotalPending(totalPending + 1);

    await saveTask(newTask);
  }

  /**
   * Handle filter task
   * @param {string} status 
   */
  function handleFilter(status: string) {
    setFilters({
      ...filters,
      status,
    });
  }

  /**
   * Handle delete a task
   * @param {Task} task 
   */
  async function handleDeleteTask(task: Task) {
    await destroyTask(task);
    setIsForceReload(!isForceReload);
  }

  /**
   * Handle edit a task
   * @param {Task} task 
   * @returns 
   */
  async function handleEditTask(task: Task) {    
    await updateTask(task);
  }

  return (
    <Box sx={{
      width: 380,
      background: "#FFFFFF",
      borderRadius: "8px",
      margin: "100px auto auto auto",
      boxShadow: "0 0 10px 0 #a7a7a7",
      padding: "20px 0"
  }}>
      <Typography mb={3} sx={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "26px",
          backgroundColor: "primary",
          backgroundImage: `linear-gradient(to right, #121FCF 0%, #CF1512 100%)`,
          backgroundSize: "100%",
          backgroundRepeat: "repeat",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
      }}>Todo List App</Typography>

      <Box mb={1} px={"20px"}>
        <AddTaskForm handleSubmit={handleAddNewTask} />
      </Box>

      <Box my={2} px={"20px"}>
        <TaskBar
          onClear={handleClearAllTask}
          onFilter={handleFilter}
          totalPending={totalPending}
          totalCompleted={totalCompleted}
        />
      </Box>

      <Divider />

      { isLoading ? 
      <Box pt={"20px"} px={"20px"}>
        <TaskListSkeleton />
      </Box> :
      <Box px={"20px"}>
        <TaskList
          tasks={tasks}
          handleToggle={handleToggleCheckedTask}
          handleDeleteTask={handleDeleteTask}
          onEditTask={handleEditTask}
        />
      </Box>
      }
      <Typography mt={2} sx={{ textAlign: "center", fontStyle: "italic", fontSize: "12px", color: "#6b6b6b" }}> 
        &copy; Copyright by Bac Truong Van
      </Typography>
  </Box>
  );
}

export default App;
