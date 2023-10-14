import {
  AssignmentRounded,
  GroupRounded,
  HomeRounded,
  LogoutRounded,
  PriceChangeRounded,
} from "@mui/icons-material";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useContext, useState } from "react";

import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Carrinho } from "~/contexts/Cart";

export default function Navigation() {
  const session = useSession();
  const router = useRouter();

  //MENU
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    const anchorElement =
      event.currentTarget ?? document.getElementById("app_bar");
    setAnchorEl(anchorElement);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { updateProdutos } = useContext(Carrinho);

  if (session?.status === "unauthenticated") {
    if (!router.pathname.includes("login")) {
      router.push("/login").catch((e) => console.log(e));
    }
    return null;
  }

  if (session.status === "loading") return null;

  const handleSingOut = async () => {
    updateProdutos([]);
    await signOut();
  };

  const routes = [
    {
      label: "Home",
      path: "/",
      icon: <HomeRounded />,
      role: "",
    },
    {
      label: "Produtos",
      icon: <AssignmentRounded />,
      role: "",
      children: [
        {
          label: "Produtos",
          path: "/products",
          icon: <AssignmentRounded />,
          role: "",
        },
        {
          label: "Promoções",
          path: "/discount",
          icon: <PriceChangeRounded />,
          role: "admin",
        },
      ],
    },
    {
      label: "Clientes",
      path: "/clients",
      icon: <GroupRounded />,
      role: "admin",
    },
    {
      label: "Logout",
      handleClick: handleSingOut,
      icon: <LogoutRounded />,
    },
  ];

  return (
    <AppBar
      position="fixed"
      color="primary"
      sx={{ top: "auto", bottom: 0 }}
      id={"app_bar"}
    >
      <Toolbar className="flex justify-around">
        {routes.map((route, index) => {
          let attributes = {};
          if (route.role === "admin" && session?.data?.user?.role !== "admin") {
            return null;
          }
          if (route.children) {
            attributes = {
              "aria-controls": open ? "basic-menu" : undefined,
              "aria-haspopup": "true",
              "aria-expanded": open ? "true" : undefined,
            };
          }
          return (
            <>
              <IconButton
                {...attributes}
                key={index}
                color="inherit"
                onClick={(event) =>
                  route.children
                    ? open
                      ? handleClose()
                      : handleOpen(event)
                    : route.handleClick
                    ? route.handleClick()
                    : router.push(route.path)
                }
              >
                <Box className="flex flex-col items-center justify-center align-middle">
                  {route.icon}
                  <Typography variant="caption" gutterBottom>
                    {route.label}
                  </Typography>
                </Box>
              </IconButton>
              {route.children && (
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  className="-mx-5 -mt-12"
                  open={open}
                  onClose={handleClose}
                >
                  {route.children.map((child, index) => {
                    if (
                      child.role === "admin" &&
                      session?.data?.user?.role !== "admin"
                    ) {
                      return null;
                    }
                    return (
                      <MenuItem
                        key={index}
                        onClick={() => {
                          handleClose();
                          router.push(child.path).catch((err) => {
                            console.error(err);
                          });
                        }}
                      >
                        <Box className="flex flex-row items-center gap-2">
                          {child.icon}
                          {child.label}
                        </Box>
                      </MenuItem>
                    );
                  })}
                </Menu>
              )}
            </>
          );
        })}
      </Toolbar>
    </AppBar>
  );
}
