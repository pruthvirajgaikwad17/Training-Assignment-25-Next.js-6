import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import Link from "next/link";
const inter = Inter({ subsets: ["latin"] });
import { getSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";

type dataType = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
};

type propsType = { data: dataType[] };

export default function Store(props: propsType) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const securePage = async () => {
      const session = await getSession();
      console.log(session);
      if (!session) {
        signIn();
      } else {
        setLoading(false);
      }
    };
    securePage();
  }, []);

  if (loading) {
    return <h1>Loading ...</h1>;
  }

  const prodData = props.data;
  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.storeHeading}>Store</h1>
        {prodData.map((prod) => {
          return (
            <div className={styles.content}>
              <img
                src={prod.image}
                alt="this is alternative"
                width="200"
                height="200"
              />
              <h4>{prod.title}</h4>
              <p>Price - {prod.price}</p>
              <p>category - {prod.category}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const response = await fetch("https://fakestoreapi.com/products");
  const data = await response.json();

  return {
    props: { data }, // will be passed to the page component as props
  };
}
