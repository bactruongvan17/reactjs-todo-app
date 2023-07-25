import { Button } from "@mui/material";

export default function ClearTaskButton() {
    return (
        <Button variant="contained" sx={{
            textTransform: "none"
        }}>Clear All</Button>
    );
}