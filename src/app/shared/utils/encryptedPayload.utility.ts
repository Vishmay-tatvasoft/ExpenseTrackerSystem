import * as CryptoJS from 'crypto-js';

export function encryptedPayload<T extends object>(payload: T, secretKey: string, fieldsToRemove: (keyof T)[] = []) : string {
  const filteredPayload = {...payload};
  fieldsToRemove.forEach((field) => delete filteredPayload[field]);

  const json = JSON.stringify(filteredPayload);
  const key = CryptoJS.SHA256(secretKey);
  const iv = CryptoJS.lib.WordArray.random(16);
  const encrypted = CryptoJS.AES.encrypt(json, key, {
    iv: iv,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC,
  });
  const combined = iv.concat(encrypted.ciphertext);
  return CryptoJS.enc.Base64.stringify(combined);
}