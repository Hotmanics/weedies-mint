import { createPublicClient, http } from "viem";
import { address, abi } from "./smartContract";
import { base } from "viem/chains";
import { vercelURL } from "../utils";

export async function checkIfMintComplete(hash: `0x${string}`) {
  const publicClient = createPublicClient({
    chain: base,
    transport: http(),
  });

  const transaction = await publicClient.waitForTransactionReceipt({ hash });
  return transaction;
}

export async function checkTransaction(hash: `0x${string}`) {
  const publicClient = createPublicClient({
    chain: base,
    transport: http(),
  });

  const transaction = await publicClient.getTransaction({ hash });
  return transaction;
}

export async function getMintPrice() {
  const publicClient = createPublicClient({
    chain: base,
    transport: http(),
  });

  let value = BigInt(0);
  try {
    value = (await publicClient.readContract({
      address: address as `0x${string}`,
      abi,
      functionName: "getMintPrice",
    })) as bigint;
  } catch (err) {
    console.error(err);
  }

  return value;
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

export async function getNftMetadata(tokenId: bigint) {
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
      args: [tokenId],
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

export async function getNftMetadatas(
  startIndex: number,
  endIndex: number,
  isCached: boolean = false
) {
  const publicClient = createPublicClient({
    chain: base,
    transport: http(),
  });

  let jsons = [];

  for (let i = startIndex; i <= endIndex; i++) {
    let j: any = {};

    if (!isCached) {
      let tokenURI = "";
      try {
        tokenURI = (await publicClient.readContract({
          address: address as `0x${string}`,
          abi,
          functionName: "tokenURI",
          args: [BigInt(i)],
        })) as string;
      } catch (err) {
        console.error(err);
      }

      tokenURI =
        "ipfs://bafybeicpvzgkhgyhwggrtctzvztuk2mftmt56xogv6pi7mx2v42go35ltu/" +
        i;

      tokenURI = tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/");

      console.log(tokenURI);

      let result = await fetch(tokenURI);
      let json = await result.json();

      json.image = json.image.replace("ipfs://", "https://ipfs.io/ipfs/");

      j = json;
    } else {
      j.name = "#" + i;
      j.image = (vercelURL() || "http://localhost:3000") + "/art/" + i + ".png";
    }

    jsons.push(j);
  }

  return jsons;
}
