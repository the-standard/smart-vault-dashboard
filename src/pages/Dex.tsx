import { useLayoutEffect, useRef } from "react";
import {
  usePositionStore,
} from "../store/Store.ts";

import Exchange from "./Exchange";
import { arbitrum } from "wagmi/chains";

import Card from "../components/Card";

const Dex = () => {
  const rectangleRef = useRef<HTMLDivElement | null>(null);
  const setPosition = usePositionStore((state) => state.setPosition);

  useLayoutEffect(() => {
    function updatePosition() {
      if (rectangleRef.current) {
        const { right, top } = rectangleRef.current.getBoundingClientRect();
        setPosition({ right, top });
      }
    }

    window.addEventListener("resize", updatePosition);
    updatePosition();

    return () => window.removeEventListener("resize", updatePosition);
  }, [setPosition]);

  return (
    <Card
      sx={{
        margin: { xs: "3% 3%", sm: "3% 12%" },
        padding: "5%",
        minHeight: "300px",
        height: "100%",
      }}
      ref={rectangleRef}
    >
      <Exchange toChain={arbitrum.id} toToken='0xf5A27E55C748bCDdBfeA5477CB9Ae924f0f7fd2e' />
    </Card>
  );
};

export default Dex;
