import {
  AssignmentRounded,
  HomeRounded,
  LogoutRounded,
  PriceChangeRounded,
} from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Navigation() {
  const session = useSession();
  const router = useRouter();
  const [value, setValue] = useState(0);

  if (session?.status === "unauthenticated") return null;

  const handleSingOut = async () => {
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
      path: "/produtos",
      icon: <AssignmentRounded />,
      role: "",
    },
    {
      label: "Promoções",
      path: "/promocoes",
      icon: <PriceChangeRounded />,
      role: "admin",
    },
    {
      label: "Logout",
      handleClick: handleSingOut,
      icon: <LogoutRounded />,
    },
  ];

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          console.log(newValue);
          setValue(+newValue);
        }}
      >
        {routes.map((route, index) => {
          if (route.role && session.data?.user?.role !== route.role)
            return null;
          if (route.handleClick)
            return (
              <BottomNavigationAction
                key={index}
                label={route.label}
                onClick={route.handleClick}
                icon={route.icon}
              />
            );
          return (
            <BottomNavigationAction
              key={index}
              label={route.label}
              onClick={() => router.push(route.path)}
              icon={route.icon}
            />
          );
        })}
      </BottomNavigation>
    </Paper>
  );
}
