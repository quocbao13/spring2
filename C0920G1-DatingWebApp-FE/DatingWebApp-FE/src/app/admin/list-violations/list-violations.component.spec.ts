import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListViolationsComponent } from './list-violations.component';

describe('ListViolationsComponent', () => {
  let component: ListViolationsComponent;
  let fixture: ComponentFixture<ListViolationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListViolationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListViolationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
