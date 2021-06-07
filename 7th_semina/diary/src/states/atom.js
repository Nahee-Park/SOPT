import { atom } from "recoil";

// 불러온 userData저장할 Atom
export const userDataAtom = atom({
  key: "userAtom",
  default: null,
});
