import React, { useEffect, useState } from "react";
import styles from "../styles/Handbag.module.css";
import Image from "next/image";
import { getSession, signIn } from "next-auth/react";

type dataType = {
  basePrice: string;
  brand: string;
  category: string;
  color: string;
  currency: string;
  deliveryInfo: string;
  discount: string;
  freeShipping: string;
  groupPrices: string;
  hideAddToCart: string;
  hideGroupPrices: string;
  id: string;
  image: string;
  imageHover: string;
  imageUrl: string;
  inStock: string;
  itemGroupId: string;
  klevu_category: string;
  name: string;
  price: string;
  product_type: string;
  salePrice: string;
  shortDesc: string;
  size: string;
  sku: string;
  startPrice: string;
  storeBaseCurrency: string;
  swatchesInfo: string;
  tags: string;
  toPrice: string;
  totalVariants: number;
  type: string;
  typeOfRecord: string;
  url: string;
  weight: string;
};

type propsType = {
  data: dataType[];
};

const handbag = (props: propsType) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const securePage = async () => {
      const session = await getSession();
      console.log(session);
      if (!session) {
        signIn("", { callbackUrl: "http://localhost:3000" });
      } else {
        setLoading(false);
      }
    };
    securePage();
  }, []);
  if (loading) {
    return <h1>Loading ...</h1>;
  }
  return (
    <div>
      <h1 className={styles.heading}>HANDBAG STORE</h1>
      <div className={styles.container}>
        {props.data.map((bag) => {
          return (
            <div className={styles.content}>
              <Image
                src={bag.imageUrl}
                alt="This is image"
                width="200"
                height="200"
              />
              <h4>{bag.brand}</h4>
              <p>
                Price - {bag.price} {bag.currency}
              </p>
              <p>Category - {bag.category}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export async function getServerSideProps(context: any) {
  const response = await fetch("https://eucs23v2.ksearchnet.com/cs/v2/search", {
    method: "POST",
    body: JSON.stringify({
      context: { apiKeys: ["klevu-160320037354512854"] },
      recordQueries: [
        {
          id: "configLayoutProducts564",
          typeOfRequest: "SEARCH",
          settings: {
            query: { term: "bags" },
            typeOfRecords: ["KLEVU_PRODUCT"],
            limit: 12,
            typeOfSearch: "WILDCARD_AND",
          },
        },
      ],
    }),
  });
  const rec = await response.json();
  const data = rec.queryResults[0].records;
  return {
    props: { data }, // will be passed to the page component as props
  };
}

export default handbag;
