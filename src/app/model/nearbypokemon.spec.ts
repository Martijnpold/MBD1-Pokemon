import { NearbyPokemon } from './nearbypokemon';

describe('Nearbypokemon', () => {
  it('should create an instance', () => {
    expect(new NearbyPokemon(null, 0, 0)).toBeTruthy();
  });
});
