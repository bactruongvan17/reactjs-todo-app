import { ListItem } from "@mui/material";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import ActionItem from "./ActionItem";

export default function TaskItem({ task, handleToggle, handleDeleteTask }) {
    const labelId = `checkbox-list-label-${task.id}`;

    return (
        <ListItem
            key={task.id}
            secondaryAction={
              <ActionItem task={task} handleDeleteTask={handleDeleteTask} />
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
                title={task.name}
                primary={task.name}
                sx={{
                  textDecoration: task.status === "done" ? "line-through": "none"
                }}
              />
            </ListItemButton>
          </ListItem>
    );
}