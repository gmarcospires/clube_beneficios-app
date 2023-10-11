import Image from 'next/image';
import { Inter } from 'next/font/google';
import Container from '@mui/material/Container';
import { useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  useEffect(() => {
    // const resp = fetch('/api/users');

    const resp2 = fetch('api/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error('Falha ao buscar dados da API');
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <Container>asdsa</Container>
    </main>
  );
}
