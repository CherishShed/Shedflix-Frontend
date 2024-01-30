import Snackbar from "@mui/material/Snackbar";
import { snackBarStore } from "../context/states";
import { Alert, AlertColor } from "@mui/material";

export default function MySnackbar() {
  const open = snackBarStore((store) => store.open);
  const message = snackBarStore((store) => store.message);
  const handleClose = snackBarStore((store) => store.closeSnackBar);
  const severity = snackBarStore((store) => store.severity as AlertColor);
  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
