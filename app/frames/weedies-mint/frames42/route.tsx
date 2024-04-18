/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { frames } from "./frames";

import {
  checkIfMintComplete,
  getMintCount,
  getNftMetadata,
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
      console.log(mintCount);

      const jsons = await getNftMetadatas(
        Number(startMintCount) + 1,
        Number(mintCount)
      );

      let jsonComponents = jsons.map((json: any, index: number) => {
        return (
          <div key={index} tw="flex flex-col justify-center items-center m-1">
            <img src={json.image} tw="w-[128px] h-[128px]" />
          </div>
        );
      });

      return {
        image: (
          <div tw="bg-[#4ed904] text-white w-full h-full justify-center items-center flex flex-wrap">
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
