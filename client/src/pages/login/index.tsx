import {
  AccountCircleRounded,
  KeyRounded,
  LoginRounded,
  VisibilityOffRounded,
  VisibilityRounded,
} from "@mui/icons-material";
import {
  Alert,
  AlertTitle,
  Button,
  Container,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import { type GetServerSideProps, type NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { z } from "zod";

interface LoginProps {
  callbackUrl: string | null;
}
const Login: NextPage<LoginProps> = ({ callbackUrl }) => {
  const router = useRouter();
  const session = useSession();

  //   useEffect(() => {
  //     if (router.query.callbackUrl) {
  //       void router.push(router.pathname);
  //     }
  //   }, [router, callbackUrl]);

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  if (
    session.status === "authenticated" &&
    new Date(session.data.expires) > new Date()
  ) {
    if (callbackUrl && !callbackUrl.includes("/login"))
      router.push(callbackUrl).catch((e) => console.log(e));
    else router.push("/").catch((e) => console.log(e));
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!login || !password) return;
    const validationSchema = z.object({
      login: z.string(),
      password: z.string(),
    });

    try {
      const validatedSchema = validationSchema.parse({
        login: login,
        password: password,
      });
      const res = await signIn("credentials", {
        ...validatedSchema,
        redirect: false,
      });

      if (res?.ok) {
        <Alert
          severity="success"
          onClose={() => {
            console.log();
          }}
        >
          <AlertTitle>Success</AlertTitle>
          Logado com <strong>sucesso!</strong>
        </Alert>;
      } else {
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          <strong>Erro ao logar!</strong>
          Verifique seu usuário e senha.
        </Alert>;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container
      className="custom-container h-full w-full flex-col
       !items-center !justify-center  p-5 !align-middle"
    >
      <h1 className="text-4xl font-bold">Login</h1>
      <Stack
        onSubmit={handleSubmit}
        component="form"
        spacing={2}
        noValidate
        autoComplete="on"
        className="my-5"
      >
        <TextField
          id="user"
          label="E-mail"
          value={login}
          onChange={(e) => setLogin(e.target.value.trim().toLowerCase())}
          variant="outlined"
          InputProps={{
            startAdornment: <AccountCircleRounded className="mr-2" />,
          }}
        />
        <TextField
          id="password"
          label="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value.trim())}
          variant="outlined"
          type={showPassword ? "text" : "password"}
          InputProps={{
            startAdornment: <KeyRounded className="mr-2" />,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? (
                    <VisibilityOffRounded />
                  ) : (
                    <VisibilityRounded />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          variant="contained"
          id="login-button"
          type="submit"
          endIcon={<LoginRounded />}
        >
          Logar
        </Button>
      </Stack>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { req } = ctx;
  await fetch("https://example.com"); // example await expression

  return {
    props: {
      callbackUrl: req.cookies["next-auth.callback-url"] ?? null,
    },
  };
};

export default Login;
