import { NodePropsType, NullableChildType } from "../types.ts";
import { FragmentNode } from "./fragmentNode.ts";

const voidElements = new Set<string>([
    "area",
    "base",
    "br",
    "col",
    "command",
    "embed",
    "hr",
    "img",
    "input",
    "keygen",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr",
]);

export class ElementNode extends FragmentNode<NullableChildType> {
    constructor(
        public name: string,
        public props: NodePropsType,
        children: NullableChildType[],
    ) {
        super(children);
    }

    public async render(): Promise<string> {
        let renderedProps = "";

        const keys = Object.keys(this.props).filter(key => {
            const value = this.props[key];
            return (
                typeof value === "string" ||
                typeof value === "number" ||
                value === true
            );
        }).map(key => {
            if (!/^[a-zA-Z0-9-:\._]+$/.test(key)) {
                throw new Error(`Invalid attribute name format ${key}`);
            }

            const value = this.props[key];
            return value === true || value === "" ? key : 
            `${key}="${this.doubleQuoteEncode(value.toString())}"`;
        });

        if (keys.length > 0) {
            renderedProps = ` ${keys.join(" ")}`;
        }

        const renderedChildren = await super.render();

        return renderedChildren || !voidElements.has(this.name)
            ? `<${this.name}${renderedProps}>${renderedChildren || ""}</${
                  this.name
              }>`
            : `<${this.name}${renderedProps} />`;
    }
}
