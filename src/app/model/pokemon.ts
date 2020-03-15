export class Pokemon {
    id: number;
    name: string;
    sprites: [string, string];
    types: any[];
    deleted: boolean = false;

    test() {
        console.log("a")
    }
}
