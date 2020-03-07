import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ValidatorService} from 'angular-iban';
import { DataService } from '../data.service';
import {  HttpResponse } from "@angular/common/http";
import {  takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnDestroy  {
	

  public reactiveForm: FormGroup;
 
  public ibanReactive: FormControl;
  
  bankObj = {};
  
  destroy$: Subject<boolean> = new Subject<boolean>();
 
  constructor(private fb: FormBuilder,private dataService: DataService
  ) {
	  
  }
 
  public ngOnInit(): void {
    this.ibanReactive = new FormControl(
      null,
        [
          Validators.required
        ]
    );
	
	this.dataService.sendGetRequest().pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<any>)=>{
      console.log(res.body);
      this.bankObj = res.body;
    }) 
	
    this.reactiveForm = this.fb.group({
      ibanReactive: this.ibanReactive,
    });
  }
  
  public ngOnDestroy():void {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }
}
