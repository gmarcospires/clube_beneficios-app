import { Container } from "@mui/material";
import { useSession } from "next-auth/react";
import Typography from "@mui/material/Typography";
import { fetchAPI } from "~/utils/FetchAPI";
import { type GetServerSideProps, type NextPage } from "next";
import { getServerAuthSession } from "~/server/auth";

interface HomeProps {
  user: User & {
    clients: Clients;
  };
}

const Home: NextPage<HomeProps> = ({ user }) => {
  const { data: session } = useSession();
  return (
    <Container className="flex flex-col  p-5">
      <Typography variant="h5" className="self-center">
        Bem vindo {session?.user?.name}
      </Typography>
      {session?.user?.role === "user" && (
        <Typography variant="body1" className="mt-3 self-center">
          Você tem {user?.clients?.points?.toLocaleString("pt-br") ?? 0} pontos
        </Typography>
      )}
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerAuthSession({ req, res });
  const user = await fetchAPI(`users/${session?.user?.id}`).then((res) => {
    if (res.status === 200) {
      return res.json() as unknown as User;
    }
    return null;
  });
  return {
    props: {
      user: user,
    },
  };
};

export default Home;
