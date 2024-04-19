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
    `./weedies-mint/frames69/`
  );
  if (result) return result as any;

  const jsons = await getNftMetadatas(
    Number(ctx.state.startMintCount) + 1,
    Number(ctx.state.startMintCount) + 20,
    true
  );
  let jsonComponents = jsons.map((json: any, index: number) => {
    return (
      <div key={index} tw="flex flex-col justify-center items-center m-1">
        <img src={json.image} tw="w-[190px] h-[190px]" />
      </div>
    );
  });

  return getMintPageRoute(
    theHash,
    jsonComponents,
    "...and 49 more unique weedies!"
  );
});

export const GET = handleRequest;
export const POST = handleRequest;

// /* eslint-disable react/jsx-key */
// import { Button } from "frames.js/next";
// import { frames } from "../../frames";

// import {
//   checkIfMintComplete,
//   getMintCount,
//   getNftMetadata,
//   getNftMetadatas,
// } from "../../nftFunctions";

// const handleRequest = frames(async (ctx) => {
//   const startMintCount = await getMintCount();
//   console.log(startMintCount);

//   if (ctx.message?.transactionId) {
//     let receipt = await checkIfMintComplete(ctx.message?.transactionId);
//     console.log(receipt);

//     if (receipt.status === "success") {
//       const mintCount = await getMintCount();
//       console.log(mintCount);

//       const jsons = await getNftMetadatas(
//         Number(startMintCount) + 1,
//         Number(startMintCount) + 9,
//         true
//       );

//       let jsonComponents = jsons.map((json: any, index: number) => {
//         return (
//           <div key={index} tw="flex flex-col justify-center items-center m-1">
//             <img src={json.image} tw="w-[294px] h-[294px]" />
//           </div>
//         );
//       });

//       return {
//         image: (
//           <div tw="bg-[#4ed904] text-white w-full h-full justify-center items-center flex flex-wrap">
//             {jsonComponents}
//             <p tw="text-8xl text-center px-1 my-1">
//               {"...and 60 more unique weedies!"}
//             </p>
//           </div>
//         ),
//         imageOptions: {
//           aspectRatio: "1:1",
//         },
//         buttons: [
//           <Button
//             action="link"
//             target={`https://basescan.org/tx/${ctx.message.transactionId}`}
//           >
//             View on block explorer
//           </Button>,
//           <Button
//             action="link"
//             target={`https://opensea.io/collection/test-5606`}
//           >
//             View on OpenSea
//           </Button>,
//         ],
//       };
//     }
//   }

//   return {
//     image: <div tw="flex"></div>,
//     imageOptions: {
//       aspectRatio: "1:1",
//     },
//   };
// });

// export const GET = handleRequest;
// export const POST = handleRequest;
