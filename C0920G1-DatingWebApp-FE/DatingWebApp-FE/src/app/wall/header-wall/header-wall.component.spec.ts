import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderWallComponent } from './header-wall.component';

describe('HeaderWallComponent', () => {
  let component: HeaderWallComponent;
  let fixture: ComponentFixture<HeaderWallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderWallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderWallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
