import { createFrames } from "frames.js/next";

type State = {
  hash: `0x${string}`;
  startMintCount: number;
};

export const frames = createFrames<State>({
  basePath: "/frames",
  initialState: { hash: "0x", startMintCount: 0 },
});
