import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-bar',
  templateUrl: './search-bar.component.html',
  styles: [
  ]
})
export class SearchBarComponent implements OnInit{

  ngOnInit(): void {
    this.debouncer
    .pipe( debounceTime(300) )
    .subscribe(value => {
      this.onValuetoSearch.emit(value)
    })
  }

  private debouncer: Subject<string> = new Subject<string>();

  @Output() public onValuetoSearch : EventEmitter<string> = new EventEmitter<string>()

  funcionrara( value: string ){
    this.debouncer.next(value);

  }

}
