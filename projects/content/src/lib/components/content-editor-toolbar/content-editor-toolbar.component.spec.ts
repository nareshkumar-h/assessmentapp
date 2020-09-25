import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentEditorToolbarComponent } from './content-editor-toolbar.component';

describe('ContentEditorToolbarComponent', () => {
  let component: ContentEditorToolbarComponent;
  let fixture: ComponentFixture<ContentEditorToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentEditorToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentEditorToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
