/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { frames } from "./frames";

const frameHandler = frames(async (ctx) => {
  return {
    image: (
      <div tw="bg-purple-800 text-white w-full h-full justify-center items-center text-8xl">
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
        target="./weedies-mint/mint2/"
        post_url="./weedies-mint/frames2/"
      >
        Mint 2
      </Button>,
      <Button
        action="tx"
        target="./weedies-mint/mint4/"
        post_url="./weedies-mint/frames4/"
      >
        Mint 4
      </Button>,
    ],
  };
});

export const GET = frameHandler;
export const POST = frameHandler;
