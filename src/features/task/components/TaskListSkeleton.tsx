import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default function TaskListSkeleton() {
  return (
    <>
      {
        [...Array(5).keys()].map((i) => {
            return <Box key={`skeleton-${i}`} sx={{ display: "flex", gap: "10px" }}>
            <Skeleton animation="wave" width={"10%"} height={"40px"} />
            <Skeleton animation="wave" width={"80%"} height={"40px"} />
            <Skeleton animation="wave" width={"10%"} height={"40px"} />
          </Box>;
        })
      }
    </>
  );
}