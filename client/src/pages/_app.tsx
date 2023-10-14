import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { Container } from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import "@fontsource/material-icons";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Navigation from "~/Components/Navigation";
import "~/styles/globals.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { CarrinhoProvider } from "~/contexts/Cart";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <CarrinhoProvider>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <SessionProvider session={session}>
          <Container className="custom-container">
            <Component {...pageProps} />
          </Container>
          <Navigation />
        </SessionProvider>
      </LocalizationProvider>
    </CarrinhoProvider>
  );
};

export default MyApp;
