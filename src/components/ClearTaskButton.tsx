import { Button } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';

type ClearTaskButtonProps = {
    onClick: Function
};

export default function ClearTaskButton({ onClick }: ClearTaskButtonProps) {
    return (
        <Button
            size="small"
            color="error"
            variant="outlined"
            startIcon={<ClearIcon />}
            onClick={() => onClick()}
            sx={{
                textTransform: "none"
            }}
        >
            Clear All
        </Button>
    );
}