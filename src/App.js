import './App.css';
import AddTaskForm from './components/AddTaskForm';
import TaskBar from './components/TaskBar';
import TaskList from './components/TaskList';
import { Box, Divider, Typography } from '@mui/material';

function App() {
  return (
    <Box sx={{
      width: 360,
      background: "#FFFFFF",
      borderRadius: "4px",
      padding: "20px",
      margin: "100px auto auto auto",
      boxShadow: "0 0 10px 0 #a7a7a7"
  }}>
      <Typography mb={2} sx={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "20px"
      }}>Todo App</Typography>

      <Box mb={1}>
        <AddTaskForm />
      </Box>

      <Box mb={1}>
        <TaskBar />
      </Box>

      <Divider />

      <Box>
        <TaskList />
      </Box>

  </Box>
  );
}

export default App;
