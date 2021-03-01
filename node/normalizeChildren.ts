import { NullableChildType,ChildNodeType } from "../types.ts";
import { ComponentNode } from "./componentNode.ts";
import { ElementNode } from "./elementNode.ts";
import { TextNode } from "./textNode.ts";

export function normalizeChildren(children: NullableChildType[]): ChildNodeType[] {
    const result = [];

    for (const child of children) {
        if (child && typeof child !== "boolean") {
            if (typeof child === "string" || typeof child === "number") {
                result.push(new TextNode(`${child}`));
            } else if (Array.isArray(child)) {
                result.push(...normalizeChildren(child));
            } else if (
                child instanceof ElementNode ||
                child instanceof TextNode ||
                child instanceof ComponentNode
            ) {
                result.push(child);
            } else {
                throw new TypeError(`Unrecognized node type: ${typeof child}`);
            }
        }
    }

    return result;
}