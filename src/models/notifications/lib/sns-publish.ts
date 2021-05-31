// Import required AWS SDK clients and commands for Node.js
import { PublishCommand } from '@aws-sdk/client-sns';
import { isSMSNotification } from './notification';
import { snsClient } from './sns-client';

async function publishSMS(notification: SMSNotification) {
  console.log('Publishing SMS to ', notification.phone);

  try {
    const data = await snsClient.send(
      new PublishCommand({
        Message: notification.quote.text,
        PhoneNumber: notification.phone,
      }),
    );

    console.log('Successfully published.');
    return data;
  } catch (err) {
    console.error('Error while publishing', err.stack);

    throw err;
  }
}

async function publish(notification: Notification) {
  if (isSMSNotification(notification)) {
    await publishSMS(notification);
  }
}

export default {
  publish,
  publishSMS,
};
