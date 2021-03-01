import { NullableChildType } from "../types.ts";
import { Node } from "./node.ts";
import { normalizeChildren } from "./normalizeChildren.ts";
export class FragmentNode<T extends NullableChildType> extends Node {
    constructor(public children: T[]) {
        super();
    }

    public async render(): Promise<string> {
        const result: string[] = [];
        for (const child of normalizeChildren(this.children)) {
            const renderedChild = await child.render();
            if (renderedChild) {
                result.push(renderedChild);
            }
        }
        return result.join("");
    }
}
