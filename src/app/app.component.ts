import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'sleep-calc';

  formGroup!: FormGroup;
  totalSleepTime!: number;
  idealSleepTime!: string;
  isMsg: boolean = false;
  isFalseAge: boolean = false;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      age: ['', Validators.required],
      bedtime: ['', Validators.required],
      wakeUpTime: ['', Validators.required],
    });
  }

  getIdealSleepTime(age: number) {
    if (age < 0 || age > 120) return 'False age!';
    if (age > 0 && age < 1) return '12 - 17';
    if (age >= 1 && age <= 2) return '11 - 14';
    if (age >= 3 && age <= 5) return '10 - 13';
    if (age >= 6 && age <= 12) return '9 - 12';
    if (age >= 13 && age < 18) return '8 - 10';
    if (age >= 18 && age <= 60) return '7 - 10';
    if (age >= 61 && age <= 64) return '7 - 9';
    if (age >= 65 && age <= 120) return '7 - 8';
    return;
  }
  calcSleepTime(bedtime: string, wakeUpTime: string) {
    const bedtimeHoursNum = Number(bedtime.split(':')[0]);
    const bedtimeMinutesNum = Number(bedtime.split(':')[1]);
    const wakeUpTimeHoursNum = Number(wakeUpTime.split(':')[0]);
    const wakeUpTimeMinutesNum = Number(wakeUpTime.split(':')[1]);
    let sleepHours = wakeUpTimeHoursNum - bedtimeHoursNum;
    let sleepMinutes = wakeUpTimeMinutesNum - bedtimeMinutesNum;
    if (sleepHours < 0) sleepHours += 24;
    if (sleepMinutes < 0) sleepMinutes += 60;
    sleepMinutes /= 60; // convert to decimal number
    const sleepMinutesStr = sleepMinutes.toString().split('', 4).join(''); // returns only 2 digits after decimal seperator
    sleepMinutes = Number(sleepMinutesStr);
    const totalSleepTime = sleepHours + sleepMinutes;
    return totalSleepTime;
  }
  getMessage(userSleepTime: number, idealSleepTime: string) {
    const myIdealSleepTime = idealSleepTime.split('-');
    const idealSleepTime1 = Number(myIdealSleepTime[0]);
    const idealSleepTime2 = Number(myIdealSleepTime[1]);
    if (userSleepTime >= idealSleepTime1 && userSleepTime <= idealSleepTime2) {
      return 'You got the perfect amount of sleep.';
    }
    if (userSleepTime < idealSleepTime1) {
      return 'You should get some rest.';
    }
    if (userSleepTime > idealSleepTime2) {
      return 'You got more sleep than you needed.';
    }
    return;
  }
  handleSubmit(formGroup: {
    age: number;
    bedtime: string;
    wakeUpTime: string;
  }) {
    this.idealSleepTime = this.getIdealSleepTime(formGroup.age)!;
    if (this.idealSleepTime === 'False age!') {
      return (this.isFalseAge = true);
    }
    this.isFalseAge = false;
    this.totalSleepTime = this.calcSleepTime(
      formGroup.bedtime,
      formGroup.wakeUpTime
    );
    return (this.isMsg = true);
  }
}
