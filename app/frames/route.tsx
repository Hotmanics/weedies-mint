/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { frames } from "./frames";

const frameHandler = frames(async (ctx) => {
  return {
    image: (
      <div tw="bg-[#4ed904] text-white w-full h-full justify-center items-center text-8xl">
        Mint A Weedie
      </div>
    ),
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
        target="./weedies-mint/mint42/"
        post_url="./weedies-mint/frames42/"
      >
        Mint 42
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
