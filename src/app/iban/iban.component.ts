import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ValidatorService} from 'angular-iban';
import { DataService } from '../data.service';
import {  HttpResponse } from "@angular/common/http";
import {  takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CommonModule, CurrencyPipe} from '@angular/common';


@Component({
  selector: 'app-iban',
  templateUrl: './iban.component.html',
  styleUrls: ['./iban.component.css']
})
export class IbanComponent implements OnInit,OnDestroy  {
	

  public reactiveForm: FormGroup;
 
  public ibanReactive: FormControl;
  
  country="AE";
  
  public amount: FormControl;
  
  bankObj = {};
  
  totalBalance= 100000;
  
  currentBalance; 
  
  destroy$: Subject<boolean> = new Subject<boolean>();
  
  submitted = false;
 
  constructor(private fb: FormBuilder,private dataService: DataService,private currencyPipe : CurrencyPipe
  ) {
	  
  }
  
 
  public ngOnInit(): void {
	  
	
    this.ibanReactive = new FormControl(
      null,
        [
          Validators.required,
		  ValidatorService.validateIban
        ]
    );
	
	this.amount = new FormControl('', [
			Validators.required,
			Validators.pattern("^[0-9]*$"),
			Validators.minLength(4),
			Validators.max(100000), 
			Validators.min(1000)
	]);
	
	if(this.ibanReactive.valid)
	{
		this.country = (this.ibanReactive.value).substring(0,2);
		console.log(this.country)
	}
	
    this.reactiveForm = this.fb.group({
      ibanReactive: this.ibanReactive,
	  amount: this.amount
    });
  }
  
  getBankDetails()
  {
	if(this.ibanReactive.value)
	{
		this.dataService.getBankDetails(this.ibanReactive.value).pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<any>)=>{
		console.log(res.body);
		this.bankObj = res.body;
    }) 
	}
  }
  
  getTotalBalance()
  {
	this.dataService.getAccountBalance().pipe(takeUntil(this.destroy$)).subscribe((res: any)=>{
		console.log(res);
		this.totalBalance = res;
    }) 
  }
  
  onSubmit() {
        this.submitted = true;
			
        // stop here if form is invalid
        if (this.reactiveForm.invalid) {
            return;
        }
		this.currentBalance = this.totalBalance - this.amount.value;
        alert('Successfully Transferred:'+this.amount.value+' Your Current Outstanding Balance is:'+this.currentBalance);
		this.totalBalance = this.currentBalance;
		
		this.reactiveForm.reset();
    }
  
  public ngOnDestroy():void {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }
}
