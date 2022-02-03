import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { decrypt } from '../encryption';
import { CallCredentials } from '../Models/callCredentials.model';

@Injectable({
  providedIn: 'root'
})
export class GlobalConfigurationService {
  private _jsonURL = 'assets/auth.json';
  constructor(private http: HttpClient) { }
  readonly API_URL = 'https://localhost:44336/api/';

    //PriceCalculator Endpoints
    readonly price_calculator_url = `${this.API_URL}PriceCalculator/CalculatePrice`;

    //token endpoints
    readonly get_token_url = 'https://dev-opcncvs8.us.auth0.com/oauth/token';

    GetToken() {
      const body = localStorage.getItem("body");
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };
            return this.http.post(this.get_token_url, body , httpOptions)
            .pipe(catchError(this.errorHandler))
      }
     loadStorage() {
      this.getJSON().subscribe(data => {
        const credentialData = new CallCredentials();
        credentialData.client_id = decrypt(data['enc_c_id']);
        credentialData.client_secret = decrypt(data['enc_c_sec']);
        credentialData.audience = data['audience'];
        credentialData.grant_type = data['grant_type'];
        localStorage.setItem("body", JSON.stringify(credentialData));
        return credentialData;
       });
        
      }
      public getJSON(): Observable<any> {
        return this.http.get(this._jsonURL);
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
