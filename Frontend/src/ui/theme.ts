import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  shape: { borderRadius: 16 },
  typography: {
    fontFamily: ["Inter", "system-ui", "Segoe UI", "Roboto", "Arial"].join(",")
  },
  components: {
    MuiButton: { styleOverrides: { root: { textTransform: "none", borderRadius: 14 } } },
    MuiPaper: { styleOverrides: { root: { borderRadius: 18 } } }
  }
});