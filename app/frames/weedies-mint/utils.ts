export function grabHashFromContext(ctx: any) {
  let theHash: `0x${string}` = "0x";

  if (ctx.message?.transactionId) theHash = ctx.message?.transactionId;
  else theHash = ctx.state.hash;

  return theHash;
}
