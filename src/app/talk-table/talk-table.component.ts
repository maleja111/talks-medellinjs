import { Component, OnInit } from '@angular/core';
import { TalkService } from '../shared/services/talk.service';
import { ITalk } from '../shared/talk';

@Component({
  selector: 'app-talk-table',
  templateUrl: './talk-table.component.html',
  styleUrls: ['./talk-table.component.css']
})
export class TalkTableComponent implements OnInit {
  talk: ITalk[];
  filteredTals: ITalk[];
  errorMessage: string;
  pageTitle = 'List Of Talks';

  _listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredTals = this.listFilter ? this.performFilter(this.listFilter) : this.talk;
  }

  constructor(
    private talkService: TalkService
  ) { }

  performFilter(filterBy: string): ITalk[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.talk.filter((talk: ITalk) =>
      talk.firstName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  ngOnInit() {
    this.getListOfTalks();
  }

  getListOfTalks() {
    this.talkService.getTalks()
      .subscribe(
      talk => this.talk = talk.map(this.matchResultToFront.bind(this)),
      error => this.errorMessage = <any>error);
  }

  matchResultToFront(result) {
    return {
      firstName: result.speakers[0].name,
      lastName: result.speakers[0].name,
      email: result.speakers[0].email,
      twitterUser: result.speakers[0].twitterUser,
      titleTalk: result.title,
      duration: result.duration,
      shirtSize: result.size,
      talkDescription: result.description,
      speakerDescription: result.speakers[0].description,
      necessaryResources: result.speakers[0].name,
    }
  }

}
