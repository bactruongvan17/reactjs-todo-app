import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CircularProgress from '@mui/material/CircularProgress';
import { useAppDispatch } from '../../../app/hooks';
import { deleteTask } from "../taskSlice";
import { Task } from "../taskType";

type ActionItemProps = {
    task: Task,
    onEdit: Function,
};

export default function ActionItem({ task, onEdit }: ActionItemProps) {
    const dispatch = useAppDispatch();

    const [isLoadingDelete, setIsLoadingDelete] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    async function handleDelete() {
        setIsLoadingDelete(true);
        dispatch(deleteTask(task));
        setIsLoadingDelete(false);
        handleClose();
    }

    return (
        <>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreHorizIcon />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {
                    task.status !== "done" && <MenuItem dense onClick={() => onEdit(true)}>
                        <ListItemIcon>
                            <EditIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Edit</ListItemText>
                    </MenuItem>
                }
                <MenuItem dense onClick={handleDelete} disabled={isLoadingDelete}>
                    <ListItemIcon>
                        {isLoadingDelete ? <CircularProgress size={20} thickness={6} /> : <DeleteIcon fontSize="small" />}
                    </ListItemIcon>
                    <ListItemText>Delete</ListItemText>
                </MenuItem>
            </Menu>
        </>
    );
}