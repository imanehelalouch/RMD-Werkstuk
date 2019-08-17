import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  introText1 = 'This website allows you to create your own Fleet with your chosen starships.';
  introText2 = 'You can also select the planets you have already visited.';
  introText3 = 'Please select Fleet to get started!';

  constructor() {
  }

  ngOnInit() {
  }

  showText() {
    if (window.location.href === 'http://localhost:4200/fleet-component') {
      return false;
    } else if (window.location.href === 'http://localhost:4200/travel-component') {
      return false;
    } else {
      return true;
    }
  }
}
