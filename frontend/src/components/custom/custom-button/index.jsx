import { Button, CircularProgress } from "@mui/material";

const CustomButton = ({
  text,
  variant,
  color,
  onClick,
  isLoading,
  ...others
}) => {
  return (
    <Button
      variant={variant || "contained"}
      color={color || "success"}
      onClick={onClick}
      disabled={isLoading}
      {...others}
    >
      {isLoading ? <CircularProgress size={15} /> : text}
    </Button>
  );
};

export default CustomButton;
