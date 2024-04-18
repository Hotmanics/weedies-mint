/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { frames } from "./frames";

const frameHandler = frames(async (ctx) => {
  const userAddress = ctx?.message?.connectedAddress;

  // console.log(userAddress);

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
        target="./weedies-mint/txdata/"
        post_url="./weedies-mint/frames/"
      >
        Mint
      </Button>,
    ],

    // buttons: [

    //   <Button
    //     action="post"
    //     target={{
    //       pathname: "./weedies-mint/frames/",
    //       query: { op: "+" },
    //     }}
    //   >
    //     Mint
    //   </Button>,

    //   // <Button action="tx" target="/txdata" post_url="/frames">
    //   //   Mint
    //   // </Button>,
    // ],
  };
});

export const GET = frameHandler;
export const POST = frameHandler;
