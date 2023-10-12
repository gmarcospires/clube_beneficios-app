import { Container } from "@mui/material";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  return (
    <Container className="flex flex-col  p-5">
      <h1 className="self-center">Bem Vindo {session?.user?.name}</h1>
      akjsbdasbjdbajks asdnlksakldnkas asd;kasnbdbasl c
    </Container>
  );
}
