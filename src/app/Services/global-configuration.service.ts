import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class GlobalConfigurationService {

  constructor(private http: HttpClient) { }
  readonly API_URL = 'https://localhost:44336/api/';

    //PriceCalculator Endpoints
    readonly price_calculator_url = `${this.API_URL}PriceCalculator/CalculatePrice`;

    //token endpoints
    readonly get_token_url = 'https://dev-opcncvs8.us.auth0.com/oauth/token';

    GetToken() {
      const body = JSON.stringify(this.getCallCredentials());
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };
            return this.http.post(this.get_token_url, body , httpOptions)
            .pipe(catchError(this.errorHandler))
      }
     getCallCredentials() {
       let data = { client_id: 'zUs49O3k3Hvm13u7ho83WkhaEg9xJvDm', client_secret: 'zNsMuHzScNVJ0v-tWR4-DQbnaiA8w2e9a5mXzo3PdyT_-mXiR4HqmcZa0dCRJlUL', audience: 'https://IconCargoCalculator.com', grant_type: 'client_credentials' };
         return data;
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
      swalInfo(message: any, header: any){

       
        Swal.fire({
          title: header,
          text: message,
          icon: 'info',
          confirmButtonText: 'Cool'
        })
    
    }
    swalSuccess(message: any, header: any){
    
     
        Swal.fire({
          title: header,
          text: message,
          icon: 'success',
          confirmButtonText: 'Cool',
          
        })
    
    }
    swalError(message: any, header: any){
    
        Swal.fire({
          title: header,
          text: message,
          icon: 'error',
          confirmButtonText: 'Cool',
          
        })
    
    }
}
