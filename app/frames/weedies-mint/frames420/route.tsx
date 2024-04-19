/* eslint-disable react/jsx-key */
import { frames } from "../../frames";

import { getNftMetadatas } from "../../nftFunctions";
import { waitForTransaction } from "../transactionLoader";
import { grabHashFromContext } from "../utils";
import { getMintPageRoute } from "../getMintPageRoute";

const handleRequest = frames(async (ctx) => {
  const theHash = grabHashFromContext(ctx);
  let result = await waitForTransaction(
    ctx,
    theHash,
    `./weedies-mint/frames420/`
  );
  if (result) return result as any;

  const jsons = await getNftMetadatas(
    Number(ctx.state.startMintCount) + 1,
    Number(ctx.state.startMintCount) + 42,
    true
  );

  let jsonComponents = jsons.map((json: any, index: number) => {
    return (
      <div key={index} tw="flex flex-col justify-center items-center m-1">
        <img src={json.image} tw="w-[128px] h-[128px]" />
      </div>
    );
  });

  return getMintPageRoute(theHash, jsonComponents);
});

export const GET = handleRequest;
export const POST = handleRequest;
