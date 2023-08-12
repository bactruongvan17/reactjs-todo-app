import { Box, Divider, Typography } from "@mui/material";
import AddTaskForm from "./components/AddTaskForm";
import TaskBar from "./components/TaskBar";
import TaskListSkeleton from "./components/TaskListSkeleton";
import { useEffect } from "react";
import TaskList from "./components/TaskList";
import { getListTasks, isLoadingTasks } from "./taskSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

export default function Task() {
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(isLoadingTasks);

    const handleFilter = () => {
    }

    useEffect(() => {
      dispatch(getListTasks());
    }, []);

    return (
        <Box sx={{
          width: 380,
          background: "#FFFFFF",
          borderRadius: "8px",
          margin: "100px auto auto auto",
          boxShadow: "0 0 10px 0 #a7a7a7",
          padding: "20px 0"
      }}>
          <Typography mb={3} sx={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "26px",
              backgroundColor: "primary",
              backgroundImage: `linear-gradient(to right, #121FCF 0%, #CF1512 100%)`,
              backgroundSize: "100%",
              backgroundRepeat: "repeat",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
          }}>Todo List App</Typography>
  
          <Box mb={1} px={"20px"}>
            <AddTaskForm />
          </Box>
  
          <Box my={2} px={"20px"}>
            <TaskBar onFilter={handleFilter} />
          </Box>
  
          <Divider />
  
          { isLoading ? 
          <Box pt={"20px"} px={"20px"}>
            <TaskListSkeleton />
          </Box> :
          <Box px={"20px"}>
            <TaskList />
          </Box>
          }
          <Typography mt={2} sx={{ textAlign: "center", fontStyle: "italic", fontSize: "12px", color: "#6b6b6b" }}> 
            &copy; Copyright by Bac Truong Van
          </Typography>
      </Box>
    );
}