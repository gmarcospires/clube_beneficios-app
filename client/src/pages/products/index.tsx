import {
  AddShoppingCartRounded,
  ShoppingCartRounded,
} from "@mui/icons-material";
import {
  Badge,
  CardActionArea,
  Container,
  IconButton,
  SpeedDial,
} from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";
import moment from "moment";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Carrinho } from "~/contexts/Cart";
import { fetchAPI } from "~/utils/FetchAPI";

function Products() {
  const [page, setPage] = useState(1);
  const [itensPerPage] = useState(10);
  const [products, setProducts] = useState<Products[]>([]);
  const [totalPagination, setTotalPagination] = useState(0);

  const { produtos, updateProdutos } = useContext(Carrinho);

  const session = useSession();
  const router = useRouter();

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

  const handleClickAddCart = (product: Products) => () => {
    const hasProduct = produtos.find((p) => p.id === product.id);
    if (hasProduct) {
      updateProdutos(
        produtos.map((p) => {
          if (p.id === product.id) {
            return { ...p, qtd: p.qtd + 1 };
          }
          return p;
        }),
      );
    } else {
      updateProdutos([...produtos, { ...product, qtd: 1 }]);
    }
    alert("Produto adicionado ao carrinho");
  };

  return (
    <Container className="flex h-full w-full flex-1 flex-col">
      <Typography id="title" variant="h5" className="flex-none self-center">
        Produtos
      </Typography>
      <SpeedDial
        onClick={() => router.push("/cart")}
        ariaLabel="SpeedDial basic example"
        sx={{ position: "fixed", bottom: 100, right: 30 }}
        icon={
          <Badge
            badgeContent={
              produtos.length ? produtos.reduce((a, b) => a + b.qtd, 0) : 0
            }
            color="secondary"
          >
            <ShoppingCartRounded />
          </Badge>
        }
      ></SpeedDial>
      <Box
        id="box"
        className="my-5 flex h-full w-full flex-auto flex-row flex-wrap items-stretch justify-center gap-4"
      >
        {products.map((product) => (
          <Card
            key={product.id}
            className="flex-basis-[20rem] max-h-[30rem] max-w-[20rem] flex-shrink-[1]"
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
                {session.data?.user?.role === "user" ? (
                  <Box className="flex flex-row flex-wrap items-center justify-center gap-5 py-5 pl-2 align-middle">
                    <Box>
                      {product.discount &&
                      product.discount?.status === "active" &&
                      moment(product.discount?.valid_until).isAfter(
                        moment(),
                      ) ? (
                        <>
                          <Typography variant="body1" color="error">
                            OFERTA!!!
                          </Typography>
                          <Box className="flex flex-row gap-3">
                            <Typography
                              variant="body1"
                              color="text.secondary"
                              className="line-through"
                            >
                              {product.price.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              })}
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                              por
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                              {(
                                product.price *
                                (1 - product.discount.discount / 100)
                              ).toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              })}
                            </Typography>
                          </Box>
                        </>
                      ) : (
                        <Typography variant="body1" color="text.secondary">
                          {product.price.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </Typography>
                      )}
                    </Box>
                    <IconButton
                      color="primary"
                      aria-label="add to shopping cart"
                      className="self-end"
                      onClick={handleClickAddCart(product)}
                    >
                      <AddShoppingCartRounded />
                    </IconButton>
                  </Box>
                ) : null}
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
