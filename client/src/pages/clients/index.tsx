import { CardActionArea, Container } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { fetchAPI } from "~/utils/FetchAPI";

function Clients() {
  const [page, setPage] = useState(1);
  const [itensPerPage] = useState(10);
  const [clients, setClients] = useState<Clients[]>([]);
  const [totalPagination, setTotalPagination] = useState(0);

  useEffect(() => {
    fetchAPI(`clients?page=${page}`)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error("Erro ao carregar produtos");
        }
      })
      .then((res: API_PAGE_RESPONSE<Clients>) => {
        setTotalPagination(res.last_page);
        setClients(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [page, itensPerPage]);

  useEffect(() => {
    return () => {
      setClients([]);
      setPage(1);
      //   setItensPerPage(10);
      setTotalPagination(0);
    };
  }, []);
  return (
    <Container className="flex h-full w-full flex-1 flex-col">
      <Typography variant="h5" className="flex-none self-center">
        Produtos
      </Typography>

      <Box className="my-5 flex h-full w-full flex-auto flex-row flex-wrap justify-center gap-4">
        {clients.map((client) => (
          <Card
            key={client.id}
            className="flex-basis-[20rem] max-h-[10rem] max-w-[20rem] flex-shrink-[1] flex-grow-[1]"
          >
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {client.user?.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {client.points.toLocaleString("pt-BR")} pontos
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
      <Box className="flex flex-none justify-center">
        <Pagination
          count={totalPagination}
          shape="rounded"
          className="self-center"
          color="primary"
          page={page}
          onChange={(e, value) => setPage(value)}
        />
      </Box>
    </Container>
  );
}

// export async function getServerSideProps(context) {
//     const clients = fetchAPI("/clients");
// }

export default Clients;
