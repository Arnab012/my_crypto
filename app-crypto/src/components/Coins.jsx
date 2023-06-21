import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../index";
import { HStack, Container, Button, RadioGroup, Radio } from "@chakra-ui/react";

import Loader from "./Loader";
import Error from "./Error";
import CoinCard from "./CoinCard";
const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPages] = useState(1);
  const [currency, setCurrency] = useState("inr");

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const changepage = (page) => {
    setPages(page);
    setLoading(true);
  };

  const btns = new Array(132).fill(1);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=${currency}&page=${page}`
        );
        setCoins(data);

        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCoins();
  }, [currency, page]);

  if (error) return <Error message={"Error While Fetching Coins"} />;

  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
        <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
          <HStack spacing={"4"}>
            <Radio  value={"inr"}>₹ INR</Radio>
            <Radio  value={"usd"}>$ USD</Radio>
            <Radio  value={"eur"}>€ EUR</Radio>

          </HStack>
        </RadioGroup>
          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {coins.map((i) => (
              <CoinCard
                id={i.id}
                price={i.current_price}
                key={i.id}
                name={i.name}
                img={i.image}
                symbol={i.symbol}
                currencySymbol={currencySymbol}
              />
            ))}
          </HStack>
          <HStack  w={"full"} overflowX={"auto"} p={"8"}>

            {btns.map((iteam,index ) => (
              <Button
              key={index}
                onClick={() => changepage(index+1)}
                bgColor={"blackAlpha.900"}
                color={"white"}
              >
                {index+1}
              </Button>
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
};

export default Coins;
