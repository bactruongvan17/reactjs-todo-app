import { ListItem } from "@mui/material";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import ActionItem from "./ActionItem";
import EditTaskForm from "./EditTaskForm";
import { useState } from "react";
import { useAppDispatch } from '../../../app/hooks';
import { changeStatusTask } from "../taskSlice";
import { Task, TaskStatus } from "../taskType";

type TaskItemProps = {
  task: Task,
};

export default function TaskItem({ task }: TaskItemProps) {
  const dispatch = useAppDispatch();

  const labelId = `checkbox-list-label-${task.id}`;
  const [isEdit, setIsEdit] = useState(false);

  const handleToggleCompleteTask = () => {
    dispatch(changeStatusTask({
      ...task,
      status: task.status === TaskStatus.Pending ? TaskStatus.Completed : TaskStatus.Pending,
    }))
  }

  return (
    <>
      {isEdit ? <EditTaskForm task={task} onCloseEdit={() => setIsEdit(false)} /> :
        <ListItem
          key={task.id}
          secondaryAction={
            <ActionItem task={task} onEdit={(flag: boolean) => setIsEdit(flag)} />
          }
          disablePadding
        >
          <ListItemButton role={undefined} onClick={handleToggleCompleteTask} dense>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={task.status === TaskStatus.Completed}
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