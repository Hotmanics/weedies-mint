import { Button } from "frames.js/next";

export function getMintPageRoute(
  theHash: `0x${string}`,
  jsonComponents: any,
  flavorText?: string
) {
  return {
    image: (
      <div tw="bg-[#4ed904] text-white w-full h-full justify-center items-center flex flex-wrap">
        {jsonComponents}
        {flavorText ? (
          <p tw="text-8xl text-center px-1 my-1">{flavorText}</p>
        ) : (
          <></>
        )}
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
