import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { InputRequest } from '../../../Models/inputRequest.model';
import { GlobalConfigurationService } from '../../../Services/global-configuration.service';
import { PriceCalculatorService } from '../../../Services/price-calculator/price-calculator.service';

@Component({
  selector: 'app-price-calculator',
  templateUrl: './price-calculator.component.html',
  styleUrls: ['./price-calculator.component.css']
})
export class PriceCalculatorComponent implements OnInit {
  hasFormErrors = false;
  priceCalculatorForm!: FormGroup;
  constructor(private fb: FormBuilder,
    private globalConfigurationService : GlobalConfigurationService,
    private priceCalculatorService: PriceCalculatorService,
    private toastr: ToastrService,
    private spinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.initForm();
  }
  initForm(){
    this.priceCalculatorForm = this.fb.group({
      height:['', Validators.compose([
				Validators.required, 	
			])
			],
      width: ['', Validators.compose([
				Validators.required,	
			])
			],
      depth: ['', Validators.compose([
				Validators.required,	
			])
			],
      weight: ['', Validators.compose([
				Validators.required,	
			])
			],
		});
  }
 
  submit(){
    this.showSpinner();
    this.hasFormErrors = false;
		const controls = this.priceCalculatorForm.controls;
		/** check form */
		if (this.priceCalculatorForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			this.hasFormErrors = true;
      this.hideSpinner();
      this.toastr.info('Your details are invalid. Please check and try again', 'Price Calculator!',{
        timeOut: 5000,
      });
      return;
		}

		const _request = new InputRequest();
    _request.width = controls['width'].value;
    _request.height = controls['height'].value;
    _request.depth = controls['depth'].value;
    _request.weight = controls['weight'].value;
   

    this.globalConfigurationService.GetToken().subscribe(
      data => {
        
                const tokenData = JSON.stringify(data);
                const access_token = JSON.parse(tokenData)['access_token'];
                const token_type = JSON.parse(tokenData)['token_type'];
                const token = `${token_type} ${access_token}`;
                this.priceCalculatorService.calculatePrice(_request ,token).subscribe(
                  res => {
                            var result = JSON.parse(JSON.stringify(res));
                            this.hideSpinner();
                            this.globalConfigurationService.swalSuccess(`We have found you the best price for your package. The best price is EUROS ${result['calculatedPrice']}`,"Price Calculator");
                            this.initForm();
                        },
                          error => {
                            this.hideSpinner();
                            this.toastr.error('Something happened calculating the best price for you. We are working on it', 'Price Calculator!',{
                              timeOut: 5000,
                            });
                            console.log("error ="+ error);
                          });
                        },
              error => {
                this.hideSpinner();
                this.toastr.error('Something happened calculating the best price for you. We are working on it', 'Price Calculator!',{
                  timeOut: 5000,
                });
                console.log("error ="+ error);
              });
  }
  public showSpinner(): void {
    this.spinnerService.show();
  }
  public hideSpinner(): void {
    this.spinnerService.hide();
  }
}
