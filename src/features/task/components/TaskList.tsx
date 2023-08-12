import List from '@mui/material/List';
import { Box, Typography } from '@mui/material';
import TaskItem from './TaskItem';
import { useAppSelector } from '../../../app/hooks';
import { selectTasks } from '../taskSlice';
import { Task } from '../taskType';

export default function TaskList() {
  const tasks = useAppSelector(selectTasks);

  return (
    <Box pt={2}>
      { tasks.length ? 
      <List sx={{ width: '100%', maxHeight: 360, overflowY: 'auto' }}>
        {tasks.map((task: Task) => 
          <TaskItem
            key={task.id}
            task={task}
          />
        )}
      </List>
       : <Typography sx={{ textAlign: "center", fontStyle: "italic", fontSize: "14px", color: "#7b7b7b" }}>There's nothing to do.</Typography> }
    </Box>
  );
}