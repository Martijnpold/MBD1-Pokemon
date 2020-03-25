import { TestBed } from '@angular/core/testing';

import { NearbypokemonService } from './nearbypokemon.service';

describe('NearbypokemonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NearbypokemonService = TestBed.get(NearbypokemonService);
    expect(service).toBeTruthy();
  });
});
