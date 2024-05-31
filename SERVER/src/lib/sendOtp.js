import twilio from 'twilio'
import dotenv from 'dotenv'

dotenv.config('../../.env')
console.log(process.env.PORT)
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceId = process.env.TWILIO_SERVICE_SID;

console.log(accountSid, authToken, serviceId)
if (!accountSid || !authToken || !serviceId) {
    throw new Error('TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_SERVICE_ID must be provided.');
}
const client = twilio(accountSid, authToken);

export const sendOtp = () => {
    client.verify.v2.services(serviceId)
      .verifications
      .create({to: '+9779816362629', channel: 'sms'})
      .then(verification => console.log(verification.sid));
}

sendOtp()