import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Index.module.css";
import Link from "next/link";
import { useEffect } from "react";
import { getSession, useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status: loading } = useSession();
  console.log(session);
  return (
    <>
      {session && loading === "authenticated" && (
        <h1 className={styles.heading}>Welocme {session.user?.name}</h1>
      )}
      <Link href="/Store">
        <div className={styles.content}>
          <h1>Store</h1>
        </div>
      </Link>
      <Link href="/handbag">
        <div className={styles.content}>
          <h1>Handbag</h1>
        </div>
      </Link>
    </>
  );
}
