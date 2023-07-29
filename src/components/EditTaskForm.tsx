import { Box, FormControl, IconButton, TextField } from "@mui/material";
import React, { useState } from "react";
import ClearIcon from '@mui/icons-material/Clear';
import { Task } from "../types/tasks";

type EditTaskProps = {
    task: Task,
    onCloseEdit: Function,  
    onEditSubmit: Function,  
};

export default function EditTaskForm({ task, onCloseEdit, onEditSubmit }: EditTaskProps) {
    const [name, setName] = useState(task.name);

    function handleSave(e: React.KeyboardEvent) {
        if(e.key === "Enter") {
            if (name === task.name) {
                onCloseEdit();
                return;
            }
    
            task.name = name;
            onEditSubmit(task);
        }
    }

    return (
        <Box sx={{ display: "flex", alignItems: "center", marginLeft: "4px" }}>
            <IconButton aria-label="close" color="error" sx={{ marginRight: "28px" }} onClick={() => onCloseEdit()}>
                <ClearIcon />
            </IconButton>
            <FormControl variant="standard" fullWidth sx={{ marginRight: "28px" }}>
                <TextField
                    id="task-name"
                    value={name}
                    onKeyDown={handleSave}
                    onChange={e => setName(e.target.value)}
                    variant="standard"
                    autoFocus
                    InputProps={{
                        style: { fontSize: "14px" },
                    }}
                />
            </FormControl>
        </Box>
    );
} 