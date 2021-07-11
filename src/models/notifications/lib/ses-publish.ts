import { SendEmailCommand } from '@aws-sdk/client-ses';
import { isEmailNotification } from './notification';
import { sesClient } from './ses-client';

async function publishEmail(notification: EmailNotification) {
  console.log('Publishing Email to ', notification.email);

  try {
    const data = await sesClient.send(
      new SendEmailCommand({
        Source: 'peshkoartembsu@gmail.com',
        Destination: {
          ToAddresses: [notification.email],
        },
        Message: {
          Subject: {
            Data: 'cloud and devops',
          },
          Body: {
            Text: {
              Data: notification.quote.text,
            },
          },
        },
      }),
    );

    console.log('Successfully published email.');

    return data;
  } catch (e) {
    console.error('Failed email sending ', e);

    throw e;
  }
}

async function publish(notification: Notification) {
  if (isEmailNotification(notification)) {
    await publishEmail(notification);
  }
}

export default {
  publish,
};
