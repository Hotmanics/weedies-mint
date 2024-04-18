import { createFrames } from "frames.js/next";

type State = {
  mintCount: number;
};

export const frames = createFrames<State>({
  basePath: "/frames",
  initialState: { mintCount: 0 },
});
