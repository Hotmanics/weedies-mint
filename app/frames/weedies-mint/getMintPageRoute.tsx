import { Button } from "frames.js/next";

export function getMintPageRoute(theHash: `0x${string}`, jsonComponents: any) {
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
      <Button action="link" target={`https://opensea.io/collection/test-5606`}>
        View on OpenSea
      </Button>,
    ],
  };
}
