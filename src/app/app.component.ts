import { AfterContentInit, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
    
    
    
    score = 0;
    timer = 5;
    transformVal= '';

    private screenSize = {
      x: 0,
      y: 0
    }

    private gameInProgress = false;

    @ViewChild('gameBody') gameBody : ElementRef |undefined;


    ngOnInit(): void {
      interval(1000).subscribe(() => {
        if(this.gameInProgress) {
        if(this.timer > 0){
          this.timer--;
        }
        else  {
          this.targetMissed();
        }
      }
      })
    } 


    ngAfterViewInit(): void {
      console.log(this.gameBody);
      this.screenSize.x = this.gameBody?.nativeElement.clientWidth;
      this.screenSize.y = this.gameBody?.nativeElement.clientHeight;
      setTimeout(() => {
        this.generateRandomness();
      });
      
    }



    targetClicked(event : MouseEvent){
      this.score++;
      this.generateRandomness();
      this.gameInProgress = true;
      this.timer = 5;
      event.stopPropagation();
    }

    targetMissed(){
      alert("Game Over. Your score was "+ this.score);
      this.gameInProgress = false;
      this.score = 0;
    }

    private generateRandomness(){
      this.transformVal = this.generateRandomTranslate() + ' ' + this.generateRandomScale()
    }
    private generateRandomScale(){
      let randomScaleValue = Math.random();
      randomScaleValue = randomScaleValue < 0.2 ? 0.2 : randomScaleValue;
      return `scale(${randomScaleValue})`
    }
    
    private generateRandomTranslate(){
      let xval = Math.random() * this.screenSize.x - 300;
      xval = xval < 300 ? 300 : xval;
      let yval = Math.random() * this.screenSize.y - 300;
      yval = yval < 300 ? 300 : yval;

      return `translate(${xval}px,${yval}px)`
    }
}
