import { Box, Tabs, Tab, Badge, Chip, Avatar } from "@mui/material";
import ClearTaskButton from "./ClearTaskButton";
import { useState } from "react";

export default function TaskBar({ totalPending, totalCompleted, onClear }) {
    const tabs = [
        { id: 'all', label: 'All' },
        { id: 'pending', label: <Chip color="info" label="Pending" avatar={<Avatar sx={{ bgcolor: "#ff4c4b", fontWeight: "bold" }} >{totalPending}</Avatar>} /> },
        { id: 'done', label: <Chip color="success" label="Completed" avatar={<Avatar sx={{ bgcolor: "#56d92d",  fontWeight: "bold" }}>{totalCompleted}</Avatar>} /> },
    ];

    const [currTab, setCurrTab] = useState('all');

    function handleSwitchTab(tab) {
        setCurrTab(tab);
    }

    return (
        <Box sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
        }}>
            <Tabs value={currTab} aria-label="task-bar">
                { tabs.map(tab => <Tab
                    onClick={() => handleSwitchTab(tab.id)}
                    key={tab.id}
                    label={tab.label}
                    value={tab.id}
                    sx={{
                        textTransform: "none",
                        cursor: "pointer",
                        minWidth: "fit-content"
                    }} /> 
                )}
            </Tabs>
            {/* <ClearTaskButton onClick={onClear}/> */}
        </Box>
    );
}