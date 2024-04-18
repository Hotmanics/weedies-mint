/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { frames } from "./frames";
import { getNftMetadata } from "./weedies-mint/frames/getNftMetadata";

const frameHandler = frames(async (ctx) => {
  const userAddress = ctx?.message?.connectedAddress;

  // console.log(userAddress);

  const jsons = await getNftMetadata(2);
  console.log(jsons);

  let allAttributes = [];

  if (jsons[0].attributes) {
    allAttributes = jsons[0].attributes.map((attribute: any, index: number) => {
      return (
        <div key={index} tw="flex space-x-5 bg-[#033900] rounded-lg mx-1 my-1">
          <p tw="text-3xl text-yellow-500 px-1 my-1">
            {attribute["trait_type"]}:
          </p>
          <p tw="text-3xl px-1 my-1">{attribute["value"]}</p>
        </div>
      );
    });
  }

  return {
    image: (
      <div tw="bg-[#4ed904] text-white w-full h-full justify-center items-center flex flex-col">
        <img src={jsons[0].image} tw="w-[720px] h-[720px]" />
        <p tw="text-center">{jsons[0].name}</p>
        <div tw="flex flex-wrap items-center justify-center">
          {allAttributes}
        </div>
      </div>
    ),
    imageOptions: {
      aspectRatio: "1:1",
    },
    buttons: [
      <Button action="link" target={`https://basescan.org/tx`}>
        View on block explorer
      </Button>,
    ],
  };

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
