export class Pokemon {
    id: number;
    name: string;
    sprites: [string, string];
    types: any[];
    deleted: boolean = false;

    validate() {
        let valid = this.name && this.name.length > 0;
        valid = valid && this.sprites['front_default'] && this.sprites['front_default'].length > 0;
        valid = valid && this.types[0].type.name && this.types[0].type.name.length > 0;
        return valid;
    }

    capitalizedName() {
        return this.name.charAt(0).toUpperCase() + this.name.slice(1);
    }
}
