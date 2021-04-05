import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AppConstant } from 'src/app/app-constant';
import { LocalStorageService } from 'src/app/local-storage.service';
import { TextService } from 'src/app/text.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  searchEvent = new Subject<string>();
  term = "";
  constructor(private textService: TextService, private localStorage: LocalStorageService) { }

  ngOnInit(): void {
    this.term = this.localStorage.getDataToSessionStorage(AppConstant.TEXT_SEARCH_SUPPLIER); 
  }

  onClickSearch() {
    this.localStorage.setDataToSessionStorage(AppConstant.TEXT_SEARCH_SUPPLIER, this.term);
    this.textService.sendText(this.term);
  }

}
