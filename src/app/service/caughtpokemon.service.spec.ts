import { TestBed } from '@angular/core/testing';

import { CaughtpokemonService } from './caughtpokemon.service';

describe('CaughtpokemonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CaughtpokemonService = TestBed.get(CaughtpokemonService);
    expect(service).toBeTruthy();
  });
});
