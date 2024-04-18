import { TransactionTargetResponse } from "frames.js";
import { getFrameMessage } from "frames.js/next/server";
import { NextRequest, NextResponse } from "next/server";
import {
  Abi,
  createPublicClient,
  encodeFunctionData,
  getContract,
  http,
} from "viem";
import { base } from "viem/chains";
import { address, abi } from "./contracts/storage-registry";
export async function POST(
  req: NextRequest
): Promise<NextResponse<TransactionTargetResponse>> {
  const json = await req.json();

  const frameMessage = await getFrameMessage(json);

  if (!frameMessage) {
    throw new Error("No frame message");
  }

  const publicClient = createPublicClient({
    chain: base,
    transport: http(),
  });

  const storageRegistry = getContract({
    address: address,
    abi,
    client: publicClient,
  });

  //
  const mintPrice = 0; //= await storageRegistry.read.getMintPrice();

  const calldata = encodeFunctionData({
    abi,
    functionName: "mint",
    args: [json.untrustedData.address, BigInt(1)],
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
