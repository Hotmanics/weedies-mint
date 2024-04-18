import { createPublicClient, http } from "viem";
import { address, abi } from "../txdata/contracts/storage-registry";
import { base } from "viem/chains";

export async function getNftMetadata(tokenId: number) {
  const publicClient = createPublicClient({
    chain: base,
    transport: http(),
  });

  let jsons = [];

  let tokenURI = "";
  try {
    tokenURI = (await publicClient.readContract({
      address: address as `0x${string}`,
      abi,
      functionName: "tokenURI",
      args: [BigInt(tokenId)],
    })) as string;
  } catch (err) {
    console.error(err);
  }

  tokenURI = tokenURI.replace("ipfs://", "https://nftstorage.link/ipfs/");

  let result = await fetch(tokenURI);
  let json = await result.json();

  json.image = json.image.replace("ipfs://", "https://nftstorage.link/ipfs/");

  jsons.push(json);

  return jsons;
}
