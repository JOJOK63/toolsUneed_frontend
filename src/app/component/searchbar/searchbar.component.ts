import {
  Component,
  Directive,
  EventEmitter,
  input,
  Input,
  InputSignal,
  output,
  Output,
  model,
  OutputEmitterRef
} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [
    FormsModule,NgIf
  ],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.css'
})

export class SearchbarComponent {
 searchText = model<string>('');
 searchButtonClicked:OutputEmitterRef<void> = output();

  searchClick() {
    this.searchButtonClicked.emit();
  }

  clearSearch() {
    this.searchText.set("");
  }

}
