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

        function property(key: string, value: any): void {
            if (typeof value === "string" || typeof value === "number" || value === true) {
                if (!/^[a-zA-Z0-9-:\._]+$/.test(key)) {
                    throw new Error(`Invalid attribute name format ${key}`);
                }

                renderedProperties += value === true || value === "" ? key 
                : ` ${key}="${value.toString().replace(/"/g, "&quot;")}"`;
            }
        }

        for (const key of Object.keys(this.properties)) {
            const value = this.properties[key];

            if (setup?.primitivePropertyTreat && await setup.primitivePropertyTreat(name, key, value, this.properties, property, setup?.context)) {
                continue;
            }

            property(key, value);
        }

        const renderedChildren = await super.render(setup);

        return renderedChildren || !voidElements.has(this.name)
            ? `<${this.name}${renderedProperties}>${renderedChildren || ""}</${this.name}>`
            : `<${this.name}${renderedProperties} />`;
    }
}