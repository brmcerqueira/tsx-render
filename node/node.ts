export abstract class Node {
    public abstract render(): Promise<string>;

    protected doubleQuoteEncode(text: string): string {
        return text.replace(/"/g, "&quot;");
    }
}