import { TsxProperties } from "./types.ts";

let indexBag = 1;
let indexBagWrapper = 1;

export class BagWrapper {
    private _bag?: TsxProperties;

    constructor() {
        console.log("Create BagWrapper: ", indexBagWrapper++);
    }

    public init() {
        if (this._bag === undefined) {
            this._bag = {
                $index: indexBag++
            };
            console.log("Create Bag: ", this._bag);
        } 
    }

    public set bag(value: TsxProperties) {
        this._bag = value;
    }

    public get bag(): TsxProperties {
        this.init();      
        return <TsxProperties> this._bag;
    }
}