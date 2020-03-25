import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RadarComponent } from './radar.component';

describe('RadarComponent', () => {
  let component: RadarComponent;
  let fixture: ComponentFixture<RadarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadarComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RadarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
