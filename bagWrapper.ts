import { TsxProperties } from "./types.ts";

export class BagWrapper {
    private _bag?: TsxProperties;

    public init() {
        if (this._bag === undefined) {
            this._bag = {};
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