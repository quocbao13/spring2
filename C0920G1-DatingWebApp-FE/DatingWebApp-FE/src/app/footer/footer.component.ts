import {Component, OnDestroy, OnInit} from '@angular/core';
import {TokenService} from '../security/login-service/token.service';
import {DataService} from '../service/data.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {

  isLogged: boolean;
  token: string;
  message: string;
  subscription: Subscription;

  constructor(
    private tokenService: TokenService,
    private dataService: DataService

  ) {
  }

  ngOnInit(): void {
    this.subscription = this.dataService.currentMessage.subscribe(message => this.message = message);
    // if (this.message) {
      // this.token = this.tokenService.getToken();
      // this.isLogged = true;
    // }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
