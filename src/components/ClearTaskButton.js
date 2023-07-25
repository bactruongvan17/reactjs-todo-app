import { Button } from "@mui/material";

export default function ClearTaskButton({ onClick }) {
    return (
        <Button variant="contained" onClick={onClick} sx={{
            textTransform: "none"
        }}>Clear All</Button>
    );
}