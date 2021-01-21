import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Shop-Recipes';
  currFeature='recipe';
  onNavigate(event :any)
  {
    this.currFeature=event;
  }
}
