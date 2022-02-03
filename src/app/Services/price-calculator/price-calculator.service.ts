import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { GlobalConfigurationService } from '../global-configuration.service';

@Injectable({
  providedIn: 'root'
})
export class PriceCalculatorService {

  constructor(private globalConfigurationService : GlobalConfigurationService,
    private http: HttpClient) { }

    calculatePrice(inputRequest: any, token: any) {
     
      //const httpHeaders = new HttpHeaders();
      // Note: Add headers if needed (tokens/bearer)
      const httpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
      
            return this.http.post(this.globalConfigurationService.price_calculator_url,  inputRequest, { headers: httpHeaders })
            .pipe(catchError(this.errorHandler));
      }
      private errorHandler(error: HttpErrorResponse) {
       
        if (error.status === 0) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong.
          console.error(
            `Backend returned code ${error.status}, body was: `, error.error);
        }
        // Return an observable with a user-facing error message.
        return throwError(
          'Something bad happened; please try again later.');
      }
}
