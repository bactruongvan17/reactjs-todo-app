import { Box, Tabs, Tab, Badge } from "@mui/material";
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import ChecklistIcon from '@mui/icons-material/Checklist';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ClearTaskButton from "./ClearTaskButton";
import { useState } from "react";

type TaskBarProps = {
    totalPending: number,
    totalCompleted: number,
    onClear: Function,
    onFilter: Function,
};

export default function TaskBar({ totalPending, totalCompleted, onClear, onFilter }: TaskBarProps) {
    const tabs = [
        { id: 'all', label: <Badge title="All" color="primary"><FormatListBulletedIcon color="primary" /></Badge> },
        { id: 'pending', label: <Badge title="Pending" badgeContent={totalPending} color="secondary"><PendingActionsIcon sx={{ color: "#afb50b" }} /></Badge> },
        { id: 'done', label: <Badge title="Completed" badgeContent={totalCompleted} color="success"><ChecklistIcon color="success" /></Badge> },
    ];

    const [currTab, setCurrTab] = useState('all');

    function handleSwitchTab(tab: string) {
        if (tab === currTab) {
            return;
        }
        setCurrTab(tab);
        onFilter(tab);
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
            <ClearTaskButton onClick={onClear}/>
        </Box>
    );
}