import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagReviewTopicComponent } from './tag-review-topic.component';

describe('TagReviewTopicComponent', () => {
  let component: TagReviewTopicComponent;
  let fixture: ComponentFixture<TagReviewTopicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagReviewTopicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TagReviewTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
