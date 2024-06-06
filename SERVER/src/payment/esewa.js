import CryptoJS from "crypto-js";

export default function esewa(req, res) {
    const hash = CryptoJS.HmacSHA256("Message", "8gBm/:&EnhH.1/qsecret");
const hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
res.send(hashInBase64)
}
