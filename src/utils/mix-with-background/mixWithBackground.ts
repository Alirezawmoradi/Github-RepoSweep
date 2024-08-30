import {colord, extend} from "colord";
import mixPlugin from "colord/plugins/mix";

extend([mixPlugin]);

export const mixWithBackground = (color: string) => {
    return colord(color).mix("#090A1D", 0.8).toHex();
};