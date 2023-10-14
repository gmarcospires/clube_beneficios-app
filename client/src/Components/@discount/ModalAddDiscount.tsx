import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Skeleton,
  Stack,
  TextField,
  type SelectChangeEvent,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { fetchAPI } from "~/utils/FetchAPI";
import SelectComponent from "../SelectComponent";
interface PropsModalDiscount {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalAddDiscount: React.FC<PropsModalDiscount> = ({
  isOpen,
  setIsOpen,
}) => {
  const session = useSession();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Products[]>([]);
  const [disabledButton, setDisabledButton] = useState(false);

  //INPUTS
  const [productInput, setProductInput] = useState("");
  const [discountInput, setDiscountInput] = useState("");
  const [dateInput, setDateInput] = useState<Date | null>(null);

  const handleClose = () => {
    setIsOpen(false);
  };

  const fetchData = async () => {
    let pages = 1;
    let totalPages = 0;
    setLoading(true);

    do {
      await fetchAPI(`products?page=${pages}`)
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          } else {
            throw new Error("Erro ao carregar produtos");
          }
        })
        .then((res: API_PAGE_RESPONSE<Products>) => {
          setProducts((prev) => [...prev, ...res.data]);
          totalPages = res.last_page;
          pages++;
        })
        .catch((err) => {
          console.error(err);
        });
    } while (pages <= totalPages);
  };

  const handleSubmit = async () => {
    if (!productInput || !discountInput) return;
    console.log({
      user_id: Number(session.data?.user?.id),
      product_id: Number(productInput),
      discount: Number(discountInput.replace(",", ".")),
      valid_until: dateInput ? dateInput.toISOString() : null,
    });
    const resp = await fetchAPI("discount", {
      method: "POST",
      body: JSON.stringify({
        user_id: session.data?.user?.id,
        product_id: Number(productInput),
        discount: Number(discountInput.replace(",", ".")),
        valid_until: dateInput ? dateInput.toISOString() : null,
      }),
    });
    if (resp.status === 201) {
      handleClose();
    } else {
      alert("Erro ao criar promoção");
    }
    setDisabledButton(false);
  };

  useEffect(() => {
    if (!isOpen) return;
    fetchData()
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));

    return () => {
      setProducts([]);
      setProductInput("");
      setDiscountInput("");
      setDateInput(null);
      setDisabledButton(false);
    };
  }, [isOpen]);

  useEffect(() => {
    return () => {
      setProducts([]);
      setProductInput("");
      setDiscountInput("");
      setDateInput(null);
      setDisabledButton(false);
    };
  }, []);

  return (
    <Dialog open={isOpen} disableEscapeKeyDown={false}>
      <DialogTitle>Adicionar Promoção</DialogTitle>
      <DialogContent>
        {loading ? (
          <>
            <Skeleton />
          </>
        ) : (
          <Stack
            component="form"
            spacing={2}
            noValidate
            autoComplete="on"
            className="my-5"
          >
            <SelectComponent
              label="Produto"
              value={productInput}
              handleChange={(event: unknown) => {
                const event1 = event as SelectChangeEvent;
                setProductInput(event1.target.value || "");
              }}
              options={products.map((product) => ({
                value: product.id.toString(),
                label: product.name,
              }))}
            />
            <TextField
              label="Desconto (%)"
              value={discountInput}
              onChange={(event) => {
                const pattern = /^[,|0-9\b]+$/;
                if (
                  event.target.value !== "" &&
                  !pattern.test(event.target.value)
                ) {
                  return;
                }
                setDiscountInput(event.target.value);
              }}
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            />

            <DateTimePicker
              label="Válido Até"
              views={["day", "month", "year"]}
              value={dateInput}
              onChange={(newValue) => {
                setDateInput(newValue);
              }}
              disablePast
            />
          </Stack>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Fechar</Button>
        <Button
          disabled={disabledButton}
          variant="contained"
          onClick={async () => {
            setDisabledButton(true);
            await handleSubmit();
          }}
        >
          Criar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalAddDiscount;
