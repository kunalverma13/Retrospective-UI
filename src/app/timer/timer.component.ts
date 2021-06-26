import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit, OnDestroy {

  @Output("countDownEnded") countDownEnded: EventEmitter<void> = new EventEmitter(); 
  @Output("countDownStarted") countDownStarted: EventEmitter<void> = new EventEmitter(); 

  countDown:Subscription = new Subscription();
  counter = 60;
  tick = 1000;
  hasTimerEnded: boolean = true;
  minutes: number = 5;
  seconds: number = 0;

  constructor() { }

  ngOnDestroy(): void {
    this.countDown.unsubscribe();
  }

  ngOnInit(): void {
  }

  start(): void {
    if(this.minutes !== 0 || this.seconds !== 0) {
      this.counter = this.minutes*60 + this.seconds;

      this.hasTimerEnded = false;
      this.countDownStarted.emit();
      this.countDown = timer(0, this.tick)
      .subscribe(() => {
        --this.counter
        if(this.counter === 0) {
          this.countDownEnded.emit();
          this.hasTimerEnded = true;
          this.countDown.unsubscribe();
        }
      })
    } else {
      alert("Please enter a timer value" );
    }
  }

  stop(): void {
    this.counter = 0;
    this.countDownEnded.emit();
    this.hasTimerEnded = true;
    this.countDown.unsubscribe();
  }

}
