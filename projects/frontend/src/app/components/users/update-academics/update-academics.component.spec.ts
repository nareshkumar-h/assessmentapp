import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAcademicsComponent } from './update-academics.component';

describe('UpdateAcademicsComponent', () => {
  let component: UpdateAcademicsComponent;
  let fixture: ComponentFixture<UpdateAcademicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateAcademicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAcademicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
