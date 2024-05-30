import twilio from 'twilio'
import dotenv from 'dotenv'

dotenv.config('../../.env')
console.log(process.env.PORT)
const accountSid = 'AC15348005c01c70ebc173790de1402153';
const authToken = '732900a7da68798bfd317f1b7900581b';
const serviceId = "VAb5c43750fcb1e66d79f4ac888fef0218";

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