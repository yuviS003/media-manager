"use client";
import { useGlobalContext } from "@/context/GlobalContext";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";

const drawerWidth = 240;

const DashboardAppbarAndSidebar = () => {
  const { setUser, setToken } = useGlobalContext();

  const logout = () => {
    localStorage.removeItem("user_token");
    sessionStorage.removeItem("user_token");
    setUser(null);
    setToken(null);
    window.location.href = "/";
  };
  return (
    <>
      <CssBaseline />
      <AppBar
        position="fixed"
        color="success"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={"Manager"} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
        <Button sx={{ mt: "auto" }} color="error" onClick={logout}>
          Logout
        </Button>
      </Drawer>
    </>
  );
};

export default DashboardAppbarAndSidebar;
