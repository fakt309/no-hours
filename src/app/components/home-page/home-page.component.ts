import { Component, HostListener, OnInit, OnDestroy } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {

  intervalCurrentTime: any = setTimeout(() => {}, 0)
  currentTime$: BehaviorSubject<string> = new BehaviorSubject<string>(this.getCurrentTimeSeconds())
  currentDate$: BehaviorSubject<string> = new BehaviorSubject<string>(this.getCurrentTimeSeconds())

  constructor(

  ) {}

  // @HostListener('window:wheel', ['$event']) onWheel(e: any): void {
  //   console.log(e)
  // }

  leadingZero(n: number, l: number): string {
    let str = n.toString()
    while (str.length < l) {
      str = '0'+str
    }
    return str
  }

  getCurrentDate(): Date {
    return new Date()
  }

  getCurrentTimeSeconds(): string {
    let d = new Date()

    let seconds = d.getHours()*60*60+d.getMinutes()*60+d.getSeconds()

    return `${this.leadingZero(Math.floor(seconds/1000), 2)}.${this.leadingZero(seconds-Math.floor(seconds/1000)*1000, 3)}`
  }

  ngOnInit(): void {
    this.intervalCurrentTime = setInterval(() => {
      this.currentTime$.next(this.getCurrentTimeSeconds())
    }, 1000)
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalCurrentTime)
  }


}
