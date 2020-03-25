import { Pokemon } from './pokemon';

export class NearbyPokemon {
    base: Pokemon;
    long: number;
    lat: number;
    distance: number;

    constructor(base: Pokemon, lat, long) {
        this.base = base;
        this.lat = lat;
        this.long = long;
    }

    calculateDistance(lat2: number, long2: number) {
        var R = 6378.137; // Radius of earth in KM
        var dLat = lat2 * Math.PI / 180 - this.lat * Math.PI / 180;
        var dLon = this.long * Math.PI / 180 - this.long * Math.PI / 180;
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.lat * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c * 1000;
        d = Math.round(d);
        this.distance = d;
        return d; // meters
    }
}
