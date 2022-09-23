import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bulletin-board';
  showFlag: boolean = false;

  constructor(
    private router: Router
  ) {
    this.router.events.forEach((event) => {
      if(event instanceof NavigationStart) {
        if(event['url'] == '/login') {
          this.showFlag = false;
        }
        else {
          this.showFlag = true;
        }
      }
    })
  }
}
