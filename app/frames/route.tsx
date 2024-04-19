/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { frames } from "./frames";
import { vercelURL } from "../utils";
const frameHandler = frames(async (ctx) => {
  return {
    image: (vercelURL() || "http://localhost:3000") + "/frame-cover.jpg",
    imageOptions: {
      aspectRatio: "1:1",
    },
    buttons: [
      <Button
        action="tx"
        target="./weedies-mint/mint1/"
        post_url="./weedies-mint/frames/"
      >
        Mint 1
      </Button>,

      <Button
        action="tx"
        target="./weedies-mint/mint10/"
        post_url="./weedies-mint/frames10/"
      >
        Mint 10
      </Button>,
      <Button
        action="tx"
        target="./weedies-mint/mint69/"
        post_url="./weedies-mint/frames69/"
      >
        Mint 69
      </Button>,
      <Button
        action="tx"
        target="./weedies-mint/mint420/"
        post_url="./weedies-mint/frames420/"
      >
        Mint 420
      </Button>,
    ],
  };
});

export const GET = frameHandler;
export const POST = frameHandler;
