/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { frames } from "./frames";

import {
  checkIfMintComplete,
  getMintCount,
  getNftMetadatas,
} from "../../nftFunctions";

const handleRequest = frames(async (ctx) => {
  const startMintCount = await getMintCount();
  console.log(startMintCount);

  if (ctx.message?.transactionId) {
    let receipt = await checkIfMintComplete(ctx.message?.transactionId);
    console.log(receipt);

    if (receipt.status === "success") {
      const mintCount = await getMintCount();

      const jsons = await getNftMetadatas(
        Number(startMintCount) + 1,
        Number(mintCount)
      );

      let jsonComponents = jsons.map((json: any, index: number) => {
        return (
          <div key={index} tw="flex flex-col justify-center items-center">
            <img src={json.image} tw="w-[720px] h-[720px]" />
            <p tw="text-center">{json.name}</p>
            <div tw="flex flex-wrap items-center justify-center">
              {json.attributes.map((attribute: any, index: number) => {
                return (
                  <div
                    key={index}
                    tw="flex space-x-5 bg-[#033900] rounded-lg mx-1 my-1"
                  >
                    <p tw="text-3xl text-yellow-500 px-1 my-1">
                      {attribute["trait_type"]}:
                    </p>
                    <p tw="text-3xl px-1 my-1">{attribute["value"]}</p>
                  </div>
                );
              })}
            </div>
          </div>
        );
      });

      return {
        image: (
          <div tw="bg-[#4ed904] text-white w-full h-full justify-center items-center flex">
            {jsonComponents}
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
          <Button
            action="link"
            target={`https://opensea.io/collection/test-5606`}
          >
            View on OpenSea
          </Button>,
        ],
      };
    }
  }

  return {
    image: <div tw="flex"></div>,
    imageOptions: {
      aspectRatio: "1:1",
    },
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
