import { Logout, PersonAdd, Settings } from "@mui/icons-material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SearchIcon from "@mui/icons-material/Search";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import { ListItemIcon, Menu, MenuItem } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { CSSObject, Theme, styled } from "@mui/material/styles";
import router, { useRouter } from "next/router";
import * as React from "react";
import NextImage from "../NextImage";
import { signOut } from "next-auth/react";

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
  const isActive = (path: string) => asPath.startsWith(path);
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

  //Profile dropdown
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const profileOpen = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  //logout
  const handleLogout = () => {
    // Assuming you want to set isLoggedIn to true upon login
    signOut({ callbackUrl: "/auth/signIn" });
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
              <NextImage
                width={"100%"}
                src={"/images/logo.png"}
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

            <React.Fragment>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Tooltip title="Account settings">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={profileOpen ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={profileOpen ? "true" : undefined}
                  >
                    <Avatar
                      alt="Remy Sharp"
                      src="https://mui.com/static/images/avatar/1.jpg"
                    />
                  </IconButton>
                </Tooltip>
              </Box>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={profileOpen}
                onClose={handleClose}
                onClick={handleClose}
                disableScrollLock
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={handleClose}>
                  <Avatar /> Profile
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Avatar /> My account
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <PersonAdd fontSize="small" />
                  </ListItemIcon>
                  Add another account
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Settings
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </React.Fragment>
          </Box>
        </Box>
      </AppBar>

      <Drawer variant="permanent" sx={{ height: "100vh" }} open={open}>
        <DrawerHeader sx={{ position: "absolute", bottom: "0" }}></DrawerHeader>
        <Divider />

        <List sx={{ marginTop: "80px" }}>
          {[
            {
              text: "Dashboard",
              icon: <DashboardIcon />,
              to: "/dashboard",
              path: "/dashboard",
            },
            {
              text: "Lead",
              icon: <PeopleAltIcon />,
              to: `/leads/master?isActive=true&leadStatus=%5B"New"%2C"Connected"%2C"Followed-Up"%2C"Scheduled+Meeting"%2C"Estimate+Sent"%5D`,
              path: "/leads",
            },
          ].map((item) => (
            <Tooltip title={item.text} arrow placement="right" key={item.text}>
              <ListItemButton
                onClick={() => {
                  push(item.to, undefined, { shallow: true });
                }}
                style={{
                  textDecoration: "none",
                  color: isActive(item.path) ? "#3CA2FF" : "#334D6E",
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
                        color: isActive(item.path) ? "#3CA2FF" : "#334D6E",
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
