/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { frames } from "../../frames";

import {
  checkIfMintComplete,
  checkTransaction,
  getMintCount,
  getNftMetadatas,
} from "../../nftFunctions";

const handleRequest = frames(async (ctx) => {
  // const startMintCount = await getMintCount();
  // console.log(startMintCount);

  let theHash: `0x${string}` = "0x";

  if (ctx.message?.transactionId) theHash = ctx.message?.transactionId;
  else theHash = ctx.state.hash;

  console.log(theHash);
  console.log(ctx.message?.transactionId);
  console.log(ctx.state.hash);

  try {
    let a = await checkTransaction(theHash);
    console.log(a);

    const mintCount = await getMintCount();

    const jsons = await getNftMetadatas(
      Number(ctx.state.startMintCount) + 1,
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

    console.log("Reached here");
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
        <Button action="link" target={`https://basescan.org/tx/${theHash}`}>
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
  } catch (e: any) {
    console.log("Caught");
    console.log(e);

    if (
      e.message ===
      `Transaction with hash \"${ctx.message?.transactionId}\" could not be found.\n\nVersion: viem@2.9.20`
    ) {
      let state = ctx.state;
      const startMintCount = await getMintCount();
      console.log(startMintCount);

      state = {
        ...state,
        hash: theHash,
        startMintCount: Number(startMintCount),
      };

      console.log("Still waiting!");
      return {
        image: (
          <div tw="bg-[#4ed904] text-white w-full h-full justify-center items-center flex">
            {"Waiting for transaction..."}
          </div>
        ),
        imageOptions: {
          aspectRatio: "1:1",
        },
        buttons: [
          <Button action="link" target={`https://basescan.org/tx/${theHash}`}>
            View on block explorer
          </Button>,
          <Button action="post" target={`./weedies-mint/frames/`}>
            Refresh
          </Button>,
        ],
        state,
      };
    }
  }

  console.log("Incorrect");
  return {
    image: <div tw="flex"></div>,
    imageOptions: {
      aspectRatio: "1:1",
    },
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
