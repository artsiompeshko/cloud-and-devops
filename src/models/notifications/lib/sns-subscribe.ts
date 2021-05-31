import { SubscribeCommand } from '@aws-sdk/client-sns';
import { isEmailNotification, isSMSNotification } from './notification';
import { snsClient } from './sns-client';

export async function subscribe(notification: Notification) {
  if (isSMSNotification(notification)) {
    await snsClient.send(
      new SubscribeCommand({
        Protocol: 'sms',
        TopicArn: 'arn:aws:sns:eu-west-1:227337062939:notifications',
        Endpoint: notification.phone,
      }),
    );
  }

  if (isEmailNotification(notification)) {
    await snsClient.send(
      new SubscribeCommand({
        Protocol: 'email',
        TopicArn: 'arn:aws:sns:eu-west-1:227337062939:notifications',
        Endpoint: notification.email,
      }),
    );
  }
}
