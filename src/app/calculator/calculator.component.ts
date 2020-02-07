import { Component, OnInit , Input ,Output} from '@angular/core';
import { Calculator } from './calculator.model';
import { NumericButton } from '../numeric-button/numeric-button.model';
import { OperatorButton } from '../operator-button/operator-button.model';
import { Display } from '../display/display.model';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

   @Input()
   id:string;
   options:any;
   calculator: Calculator;
   display: Display;

   @Output()
   displayText:string ="";

   numericButtons: NumericButton[] = new Array() ; // for initializing
   operatorButtons: OperatorButton[] =new Array() ;

   constructor() { // called first
   }

   setDisplay(){
      let displayId = "display"+this.id;
      this.display = new Display(displayId);
   }
   setNumericButtons(){
      let id ,value ,options ;
      for(let i = 0;i<this.calculator.options.numericButtons.length;i++){
          id = "numBtn"+i;
          value = this.calculator.options.numericButtons[i];
          var btnCtl:NumericButton = new NumericButton(id , value , options);
          this.numericButtons.push(btnCtl);
      }
   }
   setOperatorButtons(){
      let id ,value ,options;
      for(let i = 0;i<this.calculator.options.operatorButtons.length;i++){
          id = "opBtn"+i;
          value = this.calculator.options.operatorButtons[i];
          if(value == "reset") value = "C";
          if(value == "back") value = "←";
          var btnCtl: OperatorButton = new OperatorButton(id , value , options);
          this.operatorButtons.push(btnCtl);
      }
   }
   onClickHandler(event){

      let clickedBtn = event.target;
      let value = clickedBtn.value;
      if(value!='=' && value!='C' && value!='←'){
        this.displayClickedButton(value);
      }
      else if(value == 'C'){ // clear display
          this.reset();
      }
      else if(value == '←' || event.keyCode == '8'){ // one back button
          this.back();
      }
      else {
          this.calculate();
      }
   }
   keyPressHandler(event){
      let val = event.key;
      if(this.calculator.options.numericButtons.includes(parseInt(val))){
        this.onClickHandler(event);
      }
   }
   reset(){
      this.displayText = "0";
   }
   back(){
      var expr = this.displayText;
      this.displayText = expr.substring(0,expr.length-1);
   }
   displayClickedButton(value){
      if(this.displayText!='0'){
        this.displayText += value;
      }
      else{
        this.displayText = value;
      }
   }
   calculate(){
      let expr = this.displayText;
      let ans = eval(expr); // returns a number
      this.displayText = ans.toString(); //parse to a string
   }
   renderCalculator(){
      this.calculator = new Calculator(this.id);
      this.setDisplay();
      this.setNumericButtons();
      this.setOperatorButtons();
   }
   getFocus(event){
      //this.focus = true;
   }
   ngOnInit() { // called after constructor
      this.renderCalculator();
   }
}
