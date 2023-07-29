import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CircularProgress from '@mui/material/CircularProgress';
import { Task } from "../types/tasks";

type ActionItemProps = {
    task: Task,
    handleDeleteTask: Function,
    onEdit: Function,
};

export default function ActionItem({ task, handleDeleteTask, onEdit }: ActionItemProps) {
    const [isLoadingDelete, setIsLoadingDelete] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    function handleEdit() {
        onEdit(true);
    }

    async function handleDelete() {
        setIsLoadingDelete(true);
        await handleDeleteTask(task);
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
                    task.status !== "done" && <MenuItem dense onClick={handleEdit}>
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