import {Component, EventEmitter,Input, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-searchbar',
  imports: [
    FormsModule
  ],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.css'
})
export class SearchbarComponent {
 @Input() searchText: string="";
 @Output() searchButtonClicked: EventEmitter<void> = new EventEmitter();
 @Output() searchTextChange:EventEmitter<string> = new EventEmitter();

  searchClick() {
    this.searchButtonClicked.emit();
  }

  updateSearchText(value: string) {
    this.searchTextChange.emit(value);
  }

}
