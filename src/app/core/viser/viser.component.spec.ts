import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViserComponent } from './viser.component';

describe('ViserComponent', () => {
  let component: ViserComponent;
  let fixture: ComponentFixture<ViserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
