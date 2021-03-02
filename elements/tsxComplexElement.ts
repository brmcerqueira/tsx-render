import { BagWrapper } from "../bagWrapper.ts";
import { TsxElement, TsxProperties } from "../types.ts";

export abstract class TsxComplexElement<T extends TsxProperties = TsxProperties> { 
    
    private bagWrapper?: BagWrapper;
    
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
                    this.initBagWrapper();                  
                    child.bagWrapper = this.bagWrapper;
                }
            }     
        }
    }

    private initBagWrapper() {
        if (this.bagWrapper === undefined) {
            this.bagWrapper = new BagWrapper();
        }
    }

    protected initBag() {
        if (this.bagWrapper !== undefined) {
            this.bagWrapper.init();
        }
    }

    public get bag(): T {
        this.initBagWrapper();
        this.initBag();       
        return <T> this.bagWrapper?.bag;
    }

    public abstract render(): Promise<string>
}