import './App.css';
import AddTaskForm from './components/AddTaskForm';
import TaskBar from './components/TaskBar';
import TaskList from './components/TaskList';
import { Box, Divider, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress'; 
import { getListTasks, saveTask, updateTask, destroyTask, destroyAllTask } from './apis/task';

function App() {
  const [tasks, setTasks] = useState([]);
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
  async function handleToggleCheckedTask(task) {
    
    const taskIndex = tasks.findIndex(tsk => tsk.id === task.id);
    if (taskIndex === -1) {
      return;
    }

    
    const taskToUpdate = {
      ...task,
      status: task.status === "pending" ? "done" : "pending"
    };

    const newTasks = [...tasks];
    newTasks[taskIndex] = taskToUpdate;
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
  async function handleAddNewTask(value) {
    if (!value) {
      return;
    }

    const newTask = {
      id: (new Date()).getTime(),
      name: value,
      status: "pending",
    };

    const newTasks = [...tasks, newTask];
    setTasks(newTasks.sort((a, b) => b.id - a.id));

    setTotalPending(totalPending + 1);

    await saveTask(newTask);
  }

  /**
   * Handle filter task
   * @param {string} status 
   */
  function handleFilter(status) {
    setFilters({
      ...filters,
      status,
    });
  }

  /**
   * Handle delete a task
   * @param {object} task 
   */
  async function handleDeleteTask(task) {
    await destroyTask(task);
    setIsForceReload(!isForceReload);
  }

  /**
   * Handle edit a task
   * @param {string} task 
   * @returns 
   */
  async function handleEditTask(task) {    
    await updateTask(task);
  }

  return (
    <Box sx={{
      width: 400,
      background: "#FFFFFF",
      borderRadius: "8px",
      margin: "100px auto auto auto",
      boxShadow: "0 0 10px 0 #a7a7a7",
      padding: "20px 0"
  }}>
      <Typography mb={3} sx={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "20px"
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
      <Box pt={"20px"} sx={{ textAlign: "center" }}>
        <CircularProgress />
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
  </Box>
  );
}

export default App;
