import { TsxFragmentElement } from "./tsxFragmentElement.ts";
import { TsxSetup, TsxElement, TsxProperties } from "../types.ts";

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

export class TsxPrimitiveElement extends TsxFragmentElement {
    constructor(private name: string, properties: TsxProperties, children: TsxElement[]) {
        super(properties, children);
    }

    public async render(setup?: TsxSetup): Promise<string> {
        let renderedProperties = "";

        const keys = Object.keys(this.properties).filter(key => {
            const value = this.properties[key];
            return (
                typeof value === "string" ||
                typeof value === "number" ||
                value === true
            );
        }).map(key => {
            if (!/^[a-zA-Z0-9-:\._]+$/.test(key)) {
                throw new Error(`Invalid attribute name format ${key}`);
            }

            const value = this.properties[key];
            return value === true || value === "" ? key : 
            `${key}="${value.toString().replace(/"/g, "&quot;")}"`;
        });

        if (keys.length > 0) {
            renderedProperties = ` ${keys.join(" ")}`;
        }

        const renderedChildren = await super.render(setup);

        return renderedChildren || !voidElements.has(this.name)
            ? `<${this.name}${renderedProperties}>${renderedChildren || ""}</${this.name}>`
            : `<${this.name}${renderedProperties} />`;
    }
}