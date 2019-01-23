import { Component, OnInit } from '@angular/core';
import { LoaderState } from './loader-state';
import { LoaderService } from './loader.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  show = false;

  private subscription: Subscription;

  constructor(
    private loaderService: LoaderService
  ) { }

  ngOnInit() {
    this.subscription = this.loaderService.loaderState
      .subscribe((state: LoaderState) => {
        this.show = state.show;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
