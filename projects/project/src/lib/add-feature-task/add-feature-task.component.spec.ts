import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFeatureTaskComponent } from './add-feature-task.component';

describe('AddFeatureTaskComponent', () => {
  let component: AddFeatureTaskComponent;
  let fixture: ComponentFixture<AddFeatureTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFeatureTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFeatureTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
