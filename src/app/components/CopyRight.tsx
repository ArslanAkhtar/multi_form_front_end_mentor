import { Typography, Link } from "@mui/material";

const CopyRight = () => {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://muhammadarslan.nl/#home">
        Muhammad Arslan
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default CopyRight;
