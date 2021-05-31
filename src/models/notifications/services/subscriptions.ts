import { ListSubscriptionsByTopicCommandOutput } from '@aws-sdk/client-sns';
import { isEmailNotification, isSMSNotification } from '../lib/notification';
import { list } from '../lib/sns-list-subscriptions';
import { subscribe } from '../lib/sns-subscribe';

async function isSusbcribed(endpoint: string) {
  const output: ListSubscriptionsByTopicCommandOutput = await list();

  return output.Subscriptions.some(
    ({ Endpoint }) => Endpoint.toLowerCase() === endpoint.toLowerCase(),
  );
}

async function subscribeIfNeeded(notification: Notification) {
  let isAlreadySubscripbed = false;

  if (isSMSNotification(notification)) {
    isAlreadySubscripbed = await isSusbcribed(notification.phone);
  }

  if (isEmailNotification(notification)) {
    isAlreadySubscripbed = await isSusbcribed(notification.email);
  }

  if (isAlreadySubscripbed) {
    console.log('Reciever is already subscribed. Skipping subscribe actions.');

    return;
  }

  console.log('Reciever is not subscribed. Trying to subscribe.');

  const subscription = await subscribe(notification);

  console.log('Successfully subscribed.', subscription);
}

export default {
  isSusbcribed,
  subscribeIfNeeded,
};
