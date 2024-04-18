/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { frames } from "./frames";
import {
  Abi,
  createPublicClient,
  encodeFunctionData,
  getContract,
  http,
} from "viem";
import { base } from "viem/chains";
import { abi } from "../txdata/contracts/storage-registry";
import { getNftMetadata } from "./getNftMetadata";

const handleRequest = frames(async (ctx) => {
  if (ctx.message?.transactionId) {
    const jsons = await getNftMetadata(2);
    console.log(jsons);

    let allAttributes = [];

    if (jsons[0].attributes) {
      allAttributes = jsons[0].attributes.map(
        (attribute: any, index: number) => {
          return (
            <div key={index} tw="flex space-x-2 bg-[#033900] rounded-lg p-1">
              <p tw="text-yellow-500">{attribute["trait_type"]}:</p>
              <p tw="">{attribute["value"]}</p>
            </div>
          );
        }
      );
    }

    return {
      image: (
        <div tw="bg-purple-800 text-white w-full h-full justify-center items-center flex flex-col">
          <img src={jsons[0].image} tw="w-[512px] h-[512px]" />
          <p tw="text-white text-center">{jsons[0].name}</p>
          <div tw="flex flex-wrap space-x-2 space-y-1 items-center justify-center">
            {allAttributes}
          </div>
        </div>
      ),
      imageOptions: {
        aspectRatio: "1:1",
      },
      buttons: [
        <Button
          action="link"
          target={`https://basescan.org/tx/${ctx.message.transactionId}`}
        >
          View on block explorer
        </Button>,
      ],
    };
  }

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
      <Button action="tx" target="/txdata" post_url="/frames">
        Mint
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
