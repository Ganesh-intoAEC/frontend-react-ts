import * as React from "react";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import Tooltip from "@mui/material/Tooltip";
import { useRouter } from "next/router";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  boxShadow: "6px 0px 18px 0px rgba(0, 0, 0, 0.06)",
  borderRight: "none",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  boxShadow: "6px 0px 18px 0px rgba(0, 0, 0, 0.06)",
  borderRight: "none",
});

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar)<MuiAppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const [open, setOpen] = React.useState(false);
  const { asPath, push } = useRouter();

  // const [openSearchMaster, setOpenSearchMaster] = React.useState(false);
  // const handleClose = () => {
  //   setOpenSearchMaster(false);
  // };
  // const handleOpen = () => {
  //   setOpenSearchMaster(true);
  // };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{ backgroundColor: "#ffffff", boxShadow: "0 0 1px 0px #00000047" }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ width: "180px", padding: "10px" }}>
              <img
                src={"images/logo.png"}
                srcSet={"images/logo.png"}
                style={{ width: "100%", height: "auto" }}
                alt={"logo"}
                loading="lazy"
              />
            </Box>
            <Button
              // onClick={handleOpen}
              sx={{
                m: "20px",
                ml: "80px",
                pr: "100px",
                color: "#575757",
                border: "1px solid #57575742",
                textTransform: "capitalize",
              }}
              variant="outlined"
              startIcon={<SearchIcon />}
            >
              Search
            </Button>
          </Box>

          <Box sx={{ p: 2, display: "flex" }}>
            <IconButton>
              <NotificationsNoneIcon />
            </IconButton>
            <Stack direction="row" spacing={2}>
              <Avatar
                alt="Remy Sharp"
                src="https://mui.com/static/images/avatar/1.jpg"
              />
            </Stack>
          </Box>
        </Box>
      </AppBar>

      <Drawer variant="permanent" sx={{ height: "100vh" }} open={open}>
        <DrawerHeader sx={{ position: "absolute", bottom: "0" }}></DrawerHeader>
        <Divider />

        <List sx={{ marginTop: "80px" }}>
          {[
            { text: "Dashboard", icon: <DashboardIcon />, to: "/" },
            { text: "Lead", icon: <PeopleAltIcon />, to: "/create-lead" },
          ].map((item) => (
            <Tooltip title={item.text} arrow placement="right" key={item.text}>
              <ListItemButton
                onClick={() => {
                  push(item.to, undefined, { shallow: true });
                }}
                style={{
                  textDecoration: "none",
                  color: item.to === asPath ? "#3CA2FF" : "#334D6E",
                }}
              >
                <ListItem disablePadding sx={{ display: "block" }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                        color: item.to === asPath ? "#3CA2FF" : "#334D6E",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              </ListItemButton>
            </Tooltip>
          ))}
        </List>

        <List
          sx={{ position: "absolute", bottom: "0", p: "0", width: "inherit" }}
        >
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={open ? handleDrawerClose : handleDrawerOpen}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <SpaceDashboardIcon />
              </ListItemIcon>
              <ListItemText>
                <Typography
                  variant="caption"
                  sx={!open ? { display: "none" } : null}
                >
                  Toggle sidebar
                </Typography>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}
