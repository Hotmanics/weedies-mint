/* eslint-disable react/jsx-key */
import { frames } from "../../frames";

import { getNftMetadatas } from "../../nftFunctions";
import { waitForTransaction } from "../transactionLoader";
import { grabHashFromContext } from "../utils";
import { getMintPageRoute } from "../getMintPageRoute";

const handleRequest = frames(async (ctx) => {
  const theHash = grabHashFromContext(ctx);
  let result = await waitForTransaction(ctx, theHash, `./weedies-mint/frames/`);
  if (result) return result as any;

  const jsons = await getNftMetadatas(
    Number(ctx.state.startMintCount) + 1,
    Number(ctx.state.startMintCount) + 1,
    true
  );

  let jsonComponents = jsons.map((json: any, index: number) => {
    return (
      <div key={index} tw="flex flex-col justify-center items-center">
        <img src={json.image} tw="w-[720px] h-[720px] m-10" />
        <p tw="text-center text-8xl">{json.name}</p>
        {/* 
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
        </div> */}
      </div>
    );
  });

  return getMintPageRoute(theHash, jsonComponents);
});

export const GET = handleRequest;
export const POST = handleRequest;
