import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFeatureTagsComponent } from './edit-feature-tags.component';

describe('EditFeatureTagsComponent', () => {
  let component: EditFeatureTagsComponent;
  let fixture: ComponentFixture<EditFeatureTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFeatureTagsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFeatureTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
