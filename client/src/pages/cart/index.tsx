import {
  AddRounded,
  AssignmentRounded,
  RemoveRounded,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  Container,
  IconButton,
  Typography,
} from "@mui/material";
import moment from "moment";
import { type GetServerSideProps, type NextPage } from "next";
import { useRouter } from "next/router";
import { useContext } from "react";
import { Carrinho } from "~/contexts/Cart";
import { getServerAuthSession } from "~/server/auth";
import { fetchAPI } from "~/utils/FetchAPI";

interface CartProps {
  user: User & {
    clients: Clients;
  };
}

const Cart: NextPage<CartProps> = ({ user }) => {
  const { produtos, updateProdutos, somatorio } = useContext(Carrinho);
  const router = useRouter();

  const handleClickFinalizarCompra = async () => {
    if (user.clients.points < somatorio) {
      alert("Você não tem pontos suficientes");
      return;
    }

    const saleResp = await fetchAPI("sales", {
      method: "POST",
      body: JSON.stringify({
        client_id: user.clients.id,
        total: somatorio,
      }),
    })
      .then((res) => {
        if (res.status === 201) {
          return res.json();
        }
        throw new Error("Erro ao criar venda");
      })
      .then((resp: Sale) => {
        return resp;
      })
      .catch((err) => {
        console.error(err);
        return null;
      });

    if (!saleResp) {
      alert("Erro ao criar venda");
      return;
    }

    const saleId = saleResp.id;
    const salesProductsResp: boolean[] = [];
    // const salesProductsResp = await Promise.all(
    for await (const p of produtos) {
      const resp = await fetchAPI("sales_products", {
        method: "POST",
        body: JSON.stringify({
          sale_id: saleId,
          product_id: p.id,
          quantity: p.qtd,
          price:
            p.discount?.status === "active" &&
            moment(p.discount?.valid_until).isAfter(moment())
              ? p.price * (1 - p.discount?.discount / 100)
              : p.price,
        }),
      })
        .then((res) => {
          if (res.status === 201) {
            return res.json();
          }
          throw new Error("Erro ao atribuir produtos a venda");
        })
        .then((resp: SalesProducts) => {
          return resp;
        })
        .catch((err) => {
          console.error(err);
          return null;
        });
      if (!resp) {
        salesProductsResp.push(false);
      } else {
        salesProductsResp.push(true);
      }
    }

    if (!salesProductsResp.length || salesProductsResp.includes(false)) {
      alert("Erro ao atribuir um ou mais produtos a venda");
      return;
    }

    const points = user.clients.points - somatorio;

    const clientResp = await fetchAPI(`clients/${user.clients.id}`, {
      method: "PUT",
      body: JSON.stringify({
        points,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        throw new Error("Erro ao atualizar pontos do cliente");
      })
      .then((resp: Clients) => {
        return resp;
      })
      .catch((err) => {
        console.error(err);
        return null;
      });

    if (!clientResp) {
      alert("Erro ao atualizar pontos do cliente");
      return;
    }

    updateProdutos([]);

    await router.push("/checkout/" + saleId);
  };
  return (
    <Container className="flex h-full w-full flex-1 flex-col">
      <Typography id="title" variant="h5" className="flex-none self-center">
        Carrinho
      </Typography>
      <Box className="mt-5 flex flex-1 flex-col gap-5 align-middle">
        {!produtos.length ? (
          <Box className="flex flex-col items-center justify-center gap-5 align-middle">
            <Typography variant="body1">Carrinho vazio </Typography>

            <Button
              variant="outlined"
              className="cursor flex items-center gap-3"
              onClick={() => router.push("/products")}
            >
              Ir para produtos
              <IconButton color="inherit">
                <AssignmentRounded />
              </IconButton>
            </Button>
          </Box>
        ) : (
          <>
            {produtos.map((p) => (
              <Card key={p.id}>
                <CardActionArea className="m-5 flex flex-row flex-wrap items-center justify-between align-middle">
                  <div className="flex flex-1 flex-col">
                    <Typography variant="h6">{p.name}</Typography>
                    <Typography variant="body1">
                      {p.discount?.status === "active" &&
                      moment(p.discount?.valid_until).isAfter(moment())
                        ? (
                            p.price *
                            (1 - p.discount?.discount / 100)
                          ).toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })
                        : p.price.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                    </Typography>
                  </div>
                  <div className="flex flex-1 flex-row flex-wrap items-center align-middle">
                    <Typography variant="body1">Quantidade: {p.qtd}</Typography>
                    <Box>
                      <IconButton
                        onClick={() => {
                          updateProdutos(
                            produtos.map((p1) => {
                              if (p1.id === p.id) {
                                return { ...p1, qtd: p1.qtd + 1 };
                              }
                              return p1;
                            }),
                          );
                        }}
                      >
                        <AddRounded />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          const qtdAtual = produtos.find((p1) => p1.id === p.id)
                            ?.qtd;
                          if (qtdAtual && qtdAtual == 1) {
                            updateProdutos(
                              produtos.filter((p1) => p1.id !== p.id),
                            );
                          } else {
                            updateProdutos(
                              produtos.map((p1) => {
                                if (p1.id === p.id) {
                                  return { ...p1, qtd: p1.qtd - 1 };
                                }
                                return p1;
                              }),
                            );
                          }
                        }}
                      >
                        <RemoveRounded />
                      </IconButton>
                    </Box>
                  </div>
                </CardActionArea>
              </Card>
            ))}

            <hr />

            <Box className="flex flex-row justify-between gap-5 align-middle">
              <Box>
                <Typography variant="h6">Total</Typography>
                <Typography variant="body1">
                  {somatorio.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </Typography>
              </Box>
              <Button
                variant="contained"
                className="cursor flex items-center gap-3"
                onClick={handleClickFinalizarCompra}
              >
                Finalizar compra
                <IconButton color="inherit">
                  <AssignmentRounded />
                </IconButton>
              </Button>
            </Box>
            {user && (
              <Typography variant="body1" className="mt-3 self-center">
                Você tem {user?.clients?.points?.toLocaleString("pt-br") ?? 0}{" "}
                pontos
              </Typography>
            )}
          </>
        )}
      </Box>
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

export default Cart;
