import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProjectListComponent } from './my-project-list.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('MyProjectListComponent', () => {
  let component: MyProjectListComponent;
  let fixture: ComponentFixture<MyProjectListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyProjectListComponent ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
