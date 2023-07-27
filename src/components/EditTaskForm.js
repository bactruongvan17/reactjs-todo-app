import { Box, FormControl, IconButton, TextField } from "@mui/material";
import { useState } from "react";
import ClearIcon from '@mui/icons-material/Clear';

export default function EditTaskForm({ task, onCloseEdit, onEditSubmit }) {
    const [name, setName] = useState(task.name);

    function handleSave(e) {
        if(e.keyCode === 13) {
            if (name === task.name) {
                return;
            }
    
            onEditSubmit({
                ...task,
                name: name
            })
        }
    }

    return (
        <Box sx={{ display: "flex", alignItems: "center", marginLeft: "4px" }}>
            <IconButton aria-label="close" color="error" sx={{ marginRight: "28px" }} onClick={onCloseEdit}>
                <ClearIcon />
            </IconButton>
            <FormControl variant="standard" fullWidth sx={{ marginRight: "28px" }}>
                <TextField
                    id="task-name"
                    value={name}
                    onKeyDown={handleSave}
                    onChange={e => setName(e.target.value)}
                    variant="standard"
                    InputProps={{
                        style: { fontSize: "14px" },
                    }}
                />
            </FormControl>
        </Box>
    );
} 