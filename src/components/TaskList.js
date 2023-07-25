import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Typography } from '@mui/material';

export default function TaskList({ tasks, handleToggle }) {
  return (
    <Box py={2}>
      <Typography mb={1} ml={2} sx={{ fontSize: "15px", fontWeight: "bold" }}>Total: {tasks.length}</Typography>
      <List sx={{ width: '100%', maxHeight: 360, overflowY: 'auto' }}>
      {tasks.map((task) => {
        const labelId = `checkbox-list-label-${task.id}`;

        return (
          <ListItem
            key={task.id}
            secondaryAction={
              <IconButton edge="end" aria-label="actions">
                <MoreVertIcon />
              </IconButton>
            }
            disablePadding
          >
            <ListItemButton role={undefined} onClick={() => handleToggle(task)} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={task.status === "done"}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText
                id={labelId}
                primary={`${task.name}`}
                sx={{
                  textDecoration: task.status === "done" ? "line-through": "none"
                }}
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
    </Box>
  );
}