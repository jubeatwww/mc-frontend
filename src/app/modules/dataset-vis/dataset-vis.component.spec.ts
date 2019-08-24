import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasetVisComponent } from './dataset-vis.component';

describe('DatasetVisComponent', () => {
  let component: DatasetVisComponent;
  let fixture: ComponentFixture<DatasetVisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatasetVisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasetVisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
