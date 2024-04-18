import { createPublicClient, http } from "viem";
import { address, abi } from "../txdata/contracts/storage-registry";
import { base } from "viem/chains";

export async function checkIfMintComplete(hash: `0x${string}`) {
  const publicClient = createPublicClient({
    chain: base,
    transport: http(),
  });

  const transaction = await publicClient.waitForTransactionReceipt({ hash });
  return transaction;
}

export async function getMintCount() {
  const publicClient = createPublicClient({
    chain: base,
    transport: http(),
  });

  let mintCount = BigInt(0);
  try {
    mintCount = (await publicClient.readContract({
      address: address as `0x${string}`,
      abi,
      functionName: "getMintCount",
    })) as bigint;
  } catch (err) {
    console.error(err);
  }

  return mintCount;
}

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
