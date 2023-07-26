import './App.css';
import AddTaskForm from './components/AddTaskForm';
import TaskBar from './components/TaskBar';
import TaskList from './components/TaskList';
import { Box, Divider, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { getListTasks, saveTasks } from './apis/task';

function App() {
  const [tasks, setTasks] = useState(getListTasks());

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const totalPending = tasks.filter(a => a.status === "pending").length;
  const totalCompleted = tasks.filter(a => a.status === "done").length;

  function handleClearAllTask() {
    setTasks([]);
  }

  function handleToggleCheckedTask(task) {
    const newTasks = [...tasks];
    const taskToUpdate = newTasks.find(
      a => a.id === task.id
    );
    taskToUpdate.status = taskToUpdate.status === "done" ? "pending" : "done";
    setTasks(newTasks);
  }

  function handleAddNewTask(value) {
    if (!value) {
      return;
    }
    const newTasks = [...tasks];
    const newTask = {
      id: newTasks.length ? newTasks[0].id + 1 : 1,
      name: value,
      status: "pending",
    };
    newTasks.unshift(newTask);
    setTasks(newTasks);
  }

  function handleFilter(status) {
    if (status === 'all') {
      setTasks([...tasks]);
      return;
    }

    const newTasks = [...tasks].filter(task => task.status === status);
    setTasks(newTasks);
  }

  function handleDeleteTask(task) {
    const newTasks = [...tasks].filter(tsk => tsk.id !== task.id);
    setTasks(newTasks);
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

      <Box px={"20px"}>
        <TaskList
          tasks={tasks}
          handleToggle={handleToggleCheckedTask}
          handleDeleteTask={handleDeleteTask}
        />
      </Box>

  </Box>
  );
}

export default App;
