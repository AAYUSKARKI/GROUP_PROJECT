import CryptoJS from "crypto-js";

export default function esewa(req, res) {
    const hash = CryptoJS.HmacSHA256("Message", "secret");
const hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
res.send(hashInBase64)
}
const hash = CryptoJS.HmacSHA256("Message", "secret");
const hashInBase64 = CryptoJS.enc.Base64.stringify(hash);

console.log(hashInBase64)