import { Container } from "@mui/material";
import { useSession } from "next-auth/react";
import Typography from "@mui/material/Typography";
import { fetchAPI } from "~/utils/FetchAPI";
import { type GetServerSideProps, type NextPage } from "next";
import { getServerAuthSession } from "~/server/auth";
import { QRCodeSVG } from "qrcode.react";
import { env } from "~/env.mjs";

interface CheckoutProps {
  sale?: Sale;
  sale_id?: string;
}

const Checkout: NextPage<CheckoutProps> = ({ sale, sale_id }) => {
  console.log(sale_id);
  return (
    <Container className="flex h-full w-full flex-1 flex-col gap-5">
      <Typography id="title" variant="h5" className="flex-none self-center">
        Checkout
      </Typography>
      <Typography variant="body1" className="flex-none self-center">
        Apresente o QRCode abaixo para o vendedor
      </Typography>
      <QRCodeSVG
        value={env.NEXT_PUBLIC_API_URL + `sales/${sale_id}`}
        className="self-center"
      />
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (!params?.sale_id)
    return {
      props: {},
    };

  const sale = await fetchAPI(`sales/${params.sale_id as string}`).then(
    (res) => {
      if (res.status === 200) {
        return res.json() as unknown as Sale;
      }
      return null;
    },
  );
  return {
    props: {
      sale: sale,
      sale_id: params?.sale_id,
    },
  };
};

export default Checkout;
