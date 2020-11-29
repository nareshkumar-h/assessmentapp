import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureSkillsComponent } from './feature-skills.component';

describe('FeatureSkillsComponent', () => {
  let component: FeatureSkillsComponent;
  let fixture: ComponentFixture<FeatureSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeatureSkillsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
