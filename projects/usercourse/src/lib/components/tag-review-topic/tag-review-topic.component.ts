import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Input } from '@angular/core';

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'tag-review-topic',
  templateUrl: './tag-review-topic.component.html',
  styleUrls: ['./tag-review-topic.component.css'],
})
export class TagReviewTopicComponent implements OnInit {
  @Input()
  topic: any;

  @Input()
  isEditable: boolean;

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredTags: Observable<string[]>;
  @Input()
  tags: string[];
  fruits: string[] = [];
  allFruits: string[] = [
    'HTML',
    'JS',
    'Angular',
    'Mock API',
    'REST API',
    'SQL',
    'Testing',
  ];

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(private toastr: ToastrService) {
    this.filteredTags = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => {
        return fruit ? this._filter(fruit) : this.allFruits.slice();
      })
    );
  }
  technologies;
  ngOnInit(): void {
    this.technologies = []; // this.projectService.getTechnologies();
  }

  getTag(tags) {
    return this.technologies.filter((obj) => tags.indexOf(obj.name) != -1);
  }

  getRatingColor(tag) {
    let color = 'green';
    if (tag.rating > 4) {
      color = 'green';
    } else if (tag.rating < 4 && tag.rating >= 3) {
      color = 'orange';
    } else {
      color = 'red';
    }
    return color;
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.fruits.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.fruitCtrl.setValue(null);
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(
      (fruit) => fruit.toLowerCase().indexOf(filterValue) === 0
    );
  }

  removeTag(tag, checked) {
    let tagData = { featureId: this.topic, tag: tag, enabled: false };
    let cfm = confirm('Do you want to remove tag ' + tag + '?');
    if (cfm) {
      this.remove(tag);
      // this.updateTag(this.featureId, tagData).subscribe((res) => {
      //   this.toastr.success('Removed  ' + tag);
      // });
    }
  }

  addTag(tag, checked) {
    let tagData = { featureId: this.topic, tag: tag, enabled: true };
    this.tags.push(tag);
    // this.updateTag(this.featureId, tagData).subscribe((res) => {
    //   this.toastr.success('Added ' + tag);
    // });
  }

  updateTag(featureId, tagData) {
    return; //this.projectService.updateTag(this.featureId, tagData);
  }
}
