import { Button, Container, Modal } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { fetchAPI } from "~/utils/FetchAPI";
import Skeleton from "@mui/material/Skeleton";
import { AddRounded } from "@mui/icons-material";
import ModalAddDiscount from "~/Components/@discount/ModalAddDiscount";

function Discount() {
  const [page, setPage] = useState(0);
  const [itensPerPage] = useState(10);
  const [discount, setDiscount] = useState<Discount[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handlePageChange = (event: unknown, newPage: number) => {
    setLoading(true);
    console.log(newPage);
    fetchAPI(`discount?page=${newPage + 1}`)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error("Erro ao carregar produtos");
        }
      })
      .then((res: API_PAGE_RESPONSE<Discount>) => {
        setDiscount(res.data);
        setTotal(res.total);
      })
      .finally(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  useEffect(() => {
    handlePageChange(null, page);
  }, [page]);

  useEffect(() => {
    document.title = "Promoções | E-commerce Admin";

    return () => {
      setDiscount([]);
      setPage(0);
      //   setItensPerPage(10);
      setTotal(0);
    };
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 70, sortable: false },
    {
      field: "product",
      headerName: "Produto",
      width: 160,
      sortable: false,
      filterable: false,
    },
    {
      field: "discount",
      headerName: "Porcentagem",
      width: 160,
      sortable: false,
      filterable: false,
    },
    {
      field: "padrao",
      headerName: "Valor Padrão",
      width: 130,
      sortable: false,
    },
    {
      field: "total",
      headerName: "Valor Final",
      width: 130,
      sortable: false,
    },
    {
      field: "valid_until",
      headerName: "Validade",
      width: 100,
      sortable: false,
    },
    {
      field: "status",
      headerName: "Status",
      type: "number",
      width: 80,
      sortable: false,
      filterable: false,
    },
    {
      align: "right",
      field: "user",
      headerName: "Criado Por",
      sortable: false,
      filterable: false,
      width: 160,
      minWidth: "auto",
    },
  ];

  return (
    <Container className="flex h-full w-full flex-1 flex-col overflow-x-auto">
      <Typography variant="h5" className="flex-none self-center">
        Promoções
      </Typography>
      <Button
        variant="contained"
        id="login-button"
        type="button"
        endIcon={<AddRounded />}
        className="mt-5 max-w-min self-end"
        onClick={() => setIsOpenModal(true)}
      >
        Adicionar Promoção
      </Button>
      {loading ? (
        <>
          <Skeleton height={350} />
        </>
      ) : discount.length > 0 ? (
        <TableContainer component={Paper} className="mt-5">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.field}
                    align={"left"}
                    style={{ minWidth: column.minWidth ?? "auto" }}
                  >
                    {column.headerName}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {discount.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="left">{row.product?.name}</TableCell>
                  <TableCell align="left">
                    {row.discount.toLocaleString("pt-br")} %
                  </TableCell>
                  <TableCell align="left">
                    {row.product?.price?.toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    }) ?? "-"}
                  </TableCell>
                  <TableCell align="left">
                    {(
                      (row.product?.price ?? 0) *
                      (1 - row.discount / 100)
                    ).toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    }) ?? "-"}
                  </TableCell>
                  <TableCell align="left">
                    {new Date(row.valid_until).toLocaleDateString("pt-br") ??
                      ""}
                  </TableCell>
                  <TableCell align="left">
                    {row.status === "active" ? "Ativo" : "Inativo"}
                  </TableCell>
                  <TableCell align="left">{row.user?.name ?? ""}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[10]}
            component="div"
            count={total}
            rowsPerPage={itensPerPage}
            page={page}
            onPageChange={(e, page) => setPage(page)}
            // onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      ) : null}
      <ModalAddDiscount isOpen={isOpenModal} setIsOpen={setIsOpenModal} />
    </Container>
  );
}

// export async function getServerSideProps(context) {
//     const discount = fetchAPI("/discount");
// }

export default Discount;
