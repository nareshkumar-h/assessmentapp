import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFeatureTaskComponent } from './edit-feature-task.component';

describe('EditFeatureTaskComponent', () => {
  let component: EditFeatureTaskComponent;
  let fixture: ComponentFixture<EditFeatureTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFeatureTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFeatureTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
