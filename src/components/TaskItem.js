import { ListItem } from "@mui/material";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import ActionItem from "./ActionItem";
import EditTaskForm from "./EditTaskForm";
import { useState } from "react";

export default function TaskItem({ task, handleToggle, handleDeleteTask, onEditTask }) {
  const labelId = `checkbox-list-label-${task.id}`;
  const [isEdit, setIsEdit] = useState(false);

  function handleEditTask(task) {
    onEditTask(task);
    setIsEdit(false);
  }

  return (
    <>
      {isEdit ? <EditTaskForm task={task} onCloseEdit={() => setIsEdit(false)} onEditSubmit={handleEditTask} /> :
        <ListItem
          key={task.id}
          secondaryAction={
            <ActionItem task={task} handleDeleteTask={handleDeleteTask} onEdit={(flag) => setIsEdit(flag)} />
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
                textDecoration: task.status === "done" ? "line-through" : "none"
              }}
            />
          </ListItemButton>
        </ListItem>
      }
    </>
  );
}