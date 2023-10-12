import { Container } from "@mui/material";
import { useSession } from "next-auth/react";
import Typography from "@mui/material/Typography";

export default function Home() {
  const { data: session } = useSession();
  return (
    <Container className="flex flex-col  p-5">
      <Typography variant="h5" className="self-center">
        Bem vindo {session?.user?.name}
      </Typography>
    </Container>
  );
}
