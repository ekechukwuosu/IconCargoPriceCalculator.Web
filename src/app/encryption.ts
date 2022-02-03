
import * as CryptoJS from 'crypto-js';

const key = CryptoJS.enc.Utf8.parse('7812938475658774');
const iv = CryptoJS.enc.Utf8.parse('7812938475658774');

// Methods for the encrypt and decrypt Using AES
export const encrypt = (data: string) =>{
    var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(data), key, {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    //debugger;
    return encrypted.toString().trim();
}

export const decrypt = (data: string) => {
    var decrypted = CryptoJS.AES.decrypt(data, key, {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    //debugger;
    return decrypted.toString(CryptoJS.enc.Utf8).trim();

}
