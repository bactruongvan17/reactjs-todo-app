import { useState } from 'react';
import './App.css';
import AddTaskForm from './components/AddTaskForm';
import TaskBar from './components/TaskBar';
import TaskList from './components/TaskList';
import { Box, Divider, Typography } from '@mui/material';

function App() {
  const [tasks, setTasks] = useState([
    { id: 8, name: "CheckList 8", status: "pending" },
    { id: 7, name: "CheckList 7", status: "done" },
    { id: 6, name: "CheckList 6", status: "pending" },
    { id: 5, name: "CheckList 5", status: "pending" },
    { id: 4, name: "CheckList 4", status: "done" },
    { id: 3, name: "CheckList 3", status: "done" },
    { id: 2, name: "CheckList 2", status: "done" },
    { id: 1, name: "CheckList 1", status: "pending" },
  ]);

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
      id: newTasks[0].id + 1,
      name: value,
      status: "pending",
    };
    newTasks.unshift(newTask);
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
      <Typography mb={2} sx={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "20px"
      }}>Todo App</Typography>

      <Box mb={1} px={"20px"}>
        <AddTaskForm handleSubmit={handleAddNewTask} />
      </Box>

      <Box my={2} px={"20px"}>
        <TaskBar
          onClear={handleClearAllTask}
          totalPending={totalPending}
          totalCompleted={totalCompleted}
        />
      </Box>

      <Divider />

      <Box px={"20px"}>
        <TaskList tasks={tasks} handleToggle={handleToggleCheckedTask} />
      </Box>

  </Box>
  );
}

export default App;
