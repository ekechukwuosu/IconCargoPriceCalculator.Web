
export class CallCredentials {
    client_id!: string;
    client_secret! :string;
    audience!: string;
    grant_type! :string;

    clear() {
        this.client_id = '';
        this.client_secret = '';
        this.audience = '';
        this.grant_type = '';
    }
}


