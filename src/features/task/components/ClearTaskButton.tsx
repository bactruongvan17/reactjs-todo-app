import { Button } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import { useAppDispatch } from "../../../app/hooks";
import { clearAllTasks } from "../taskSlice";

export default function ClearTaskButton() {
    const dispatch = useAppDispatch();

    return (
        <Button
            size="small"
            color="error"
            variant="outlined"
            startIcon={<ClearIcon />}
            onClick={() => dispatch(clearAllTasks())}
            sx={{
                textTransform: "none"
            }}
        >
            Clear All
        </Button>
    );
}