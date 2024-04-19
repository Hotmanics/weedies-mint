import { checkTransaction, getMintCount } from "../nftFunctions";
import { Button } from "frames.js/next";

export async function waitForTransaction(
  ctx: any,
  theHash: `0x${string}`,
  refreshTarget: string
) {
  try {
    await checkTransaction(theHash);
  } catch (e: any) {
    if (
      e.message ===
      `Transaction with hash \"${theHash}\" could not be found.\n\nVersion: viem@2.9.20`
    ) {
      let state = ctx.state;
      const startMintCount = await getMintCount();
      console.log(startMintCount);

      state = {
        ...state,
        hash: theHash,
        startMintCount: Number(startMintCount),
      };

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
          <Button action="post" target={refreshTarget}>
            Refresh
          </Button>,
        ],
        state,
      };
    }
  }
}
