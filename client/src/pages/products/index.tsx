import { CardActionArea, Container } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import { useEffect, useState } from "react";
import { fetchAPI } from "~/utils/FetchAPI";

function Products() {
  const [page, setPage] = useState(1);
  const [itensPerPage] = useState(10);
  const [products, setProducts] = useState<Products[]>([]);
  const [totalPagination, setTotalPagination] = useState(0);

  useEffect(() => {
    fetchAPI(`products?page=${page}`)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error("Erro ao carregar produtos");
        }
      })
      .then((res: API_PAGE_RESPONSE<Products>) => {
        setTotalPagination(res.last_page);
        setProducts(res.data);
      })
      .finally(() => {
        document
          ?.getElementById("title")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      })
      .catch((err) => {
        console.error(err);
      });
  }, [page, itensPerPage]);

  useEffect(() => {
    return () => {
      setProducts([]);
      setPage(1);
      setTotalPagination(0);
      //   setItensPerPage(10);
    };
  }, []);

  return (
    <Container className="flex h-full w-full flex-1 flex-col">
      <Typography id="title" variant="h5" className="flex-none self-center">
        Produtos
      </Typography>

      <Box
        id="box"
        className="my-5 flex h-full w-full flex-auto flex-row flex-wrap items-stretch justify-center gap-4"
      >
        {products.map((product) => (
          <Card
            key={product.id}
            className="flex-basis-[20rem] max-h-[20rem] max-w-[20rem] flex-shrink-[1]"
          >
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={product.image}
                alt={product.name + " image"}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
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
//     const products = fetchAPI("/products");
// }

export default Products;
