import { TransactionTargetResponse } from "frames.js";
import { getFrameMessage } from "frames.js/next/server";
import { NextRequest, NextResponse } from "next/server";
import { encodeFunctionData } from "viem";
import { address, abi } from "../../smartContract";
import { getMintPrice } from "../../nftFunctions";
export async function POST(
  req: NextRequest
): Promise<NextResponse<TransactionTargetResponse>> {
  const json = await req.json();

  const frameMessage = await getFrameMessage(json);

  if (!frameMessage) {
    throw new Error("No frame message");
  }

  let amountToMint = 10;

  const mintPrice = Number(await getMintPrice()) * amountToMint;

  const calldata = encodeFunctionData({
    abi,
    functionName: "mint",
    args: [json.untrustedData.address, BigInt(amountToMint)],
  });

  return NextResponse.json({
    chainId: "eip155:8453", // OP Mainnet 10
    method: "eth_sendTransaction",
    params: {
      abi,
      to: address,
      data: calldata,
      value: mintPrice.toString(),
    },
  });
}
