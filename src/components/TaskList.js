import List from '@mui/material/List';
import { Box, Typography } from '@mui/material';
import TaskItem from './TaskItem';

export default function TaskList({ tasks, handleToggle, handleDeleteTask, onEditTask }) {
  return (
    <Box pt={2}>
      { tasks.length ? 
      <List sx={{ width: '100%', maxHeight: 360, overflowY: 'auto' }}>
        {tasks.map((task) => 
          <TaskItem
            key={task.id}
            task={task}
            handleToggle={handleToggle}
            handleDeleteTask={handleDeleteTask}
            onEditTask={onEditTask}
          />
        )}
      </List>
       : <Typography sx={{ textAlign: "center", fontStyle: "italic", fontSize: "14px", color: "#7b7b7b" }}>There's nothing to do.</Typography> }
    </Box>
  );
}