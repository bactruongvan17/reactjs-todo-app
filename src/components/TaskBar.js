import { Box, Tabs, Tab } from "@mui/material";
import ClearTaskButton from "./ClearTaskButton";
import { useState } from "react";

export default function TaskBar() {
    const tabs = [
        { id: 'all', label: 'All' },
        { id: 'pending', label: 'Pending' },
        { id: 'completed', label: 'Completed' }
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
                        minWidth: "fit-content"
                    }} /> 
                )}
            </Tabs>
            <ClearTaskButton />
        </Box>
    );
}