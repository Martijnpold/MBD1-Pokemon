import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CaughtpokemonComponent } from './caughtpokemon.component';

describe('CaughtpokemonComponent', () => {
  let component: CaughtpokemonComponent;
  let fixture: ComponentFixture<CaughtpokemonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaughtpokemonComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CaughtpokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
