import { TsxElement, TsxProperties } from "../types.ts";

let index = 1;
let indexBag = 1;

export abstract class TsxComplexElement { 
    
    private bagWrapper?: {
        index: number,
        bag?: TsxProperties
    };
    
    constructor(protected properties: TsxProperties, protected children: TsxElement[]) {
        this.adjustBag(this.children);         
    }

    private adjustBag(elements: TsxElement[]) {
        for (const child of elements) {
            if (Array.isArray(child)) {
                this.adjustBag(child);
            }
            else if (child instanceof TsxComplexElement) {
                if (this.bagWrapper !== undefined) {                   
                    if (child.bagWrapper !== undefined) {
                        this.bagWrapper.bag = child.bag;
                    }
                    else {
                        child.bagWrapper = this.bagWrapper;            
                    }
                }
                else if (child.bagWrapper !== undefined) {
                    this.bagWrapper = child.bagWrapper;               
                }
                else {
                    this.bagWrapper = {
                        index: indexBag++
                    };
                    child.bagWrapper = this.bagWrapper;
                }
            }     
        }
    }

    public print() {
        console.log("bagWrapper: ", this.bagWrapper); 
    }

    public get bag(): TsxProperties {
        if (this.bagWrapper === undefined) {
            this.bagWrapper = {
                index: indexBag++
            };
        }

        if (this.bagWrapper.bag === undefined) {
            const i = index++;
            this.bagWrapper.bag = {
                index: i
            };
        } 

        return this.bagWrapper.bag;
    }

    public abstract render(): Promise<string>
}