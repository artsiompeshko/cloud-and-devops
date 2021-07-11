import { SNSClient } from '@aws-sdk/client-sns';
// Set the AWS Region.
const REGION = 'eu-west-1';

// Create SNS service object.
const snsClient = new SNSClient({
  region: REGION,
});

export { snsClient };
