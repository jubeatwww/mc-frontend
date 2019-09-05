import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarDrawerComponent } from './sidebar-drawer.component';

describe('SidebarDrawerComponent', () => {
  let component: SidebarDrawerComponent;
  let fixture: ComponentFixture<SidebarDrawerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarDrawerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
