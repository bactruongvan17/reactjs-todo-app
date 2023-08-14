import { Box, Tabs, Tab, Badge } from "@mui/material";
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import ChecklistIcon from '@mui/icons-material/Checklist';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ClearTaskButton from "./ClearTaskButton";
import { useState } from "react";
import { useAppSelector } from '../../../app/hooks';
import { selectTotalPendingTasks, selectTotalCompletedTasks } from "../taskSlice";
import { TaskStatusFilter } from "../taskType";

type TaskBarProps = {
    onFilter: Function,
};

export default function TaskBar({ onFilter }: TaskBarProps) {
    const totalPending = useAppSelector(selectTotalPendingTasks);
    const totalCompleted = useAppSelector(selectTotalCompletedTasks);

    const tabs = [
        { id: TaskStatusFilter.All, label: <Badge title="All" color="primary"><FormatListBulletedIcon color="primary" /></Badge> },
        { id: TaskStatusFilter.Pending, label: <Badge title="Pending" badgeContent={totalPending} color="secondary"><PendingActionsIcon sx={{ color: "#afb50b" }} /></Badge> },
        { id: TaskStatusFilter.Completed, label: <Badge title="Completed" badgeContent={totalCompleted} color="success"><ChecklistIcon color="success" /></Badge> },
    ];

    const [currTab, setCurrTab] = useState('all');

    function handleSwitchTab(tab: TaskStatusFilter) {
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
            <ClearTaskButton />
        </Box>
    );
}