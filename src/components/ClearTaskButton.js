import { Button } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';

export default function ClearTaskButton({ onClick }) {
    return (
        <Button size="small" color="error" variant="outlined" startIcon={<ClearIcon />} onClick={onClick} sx={{
            textTransform: "none"
        }}>Clear All</Button>
    );
}