import subscriptions from './subscriptions';
import snsPublish from '../lib/sns-publish';
import { isEmailNotification, isSMSNotification } from '../lib/notification';
import sesPublish from '../lib/ses-publish';

// very primitive validation
export function validateNotification(notification: Notification) {
  if (isSMSNotification(notification)) {
    return notification.phone && notification.quote;
  }

  if (isEmailNotification(notification)) {
    return notification.email && notification.quote;
  }

  return false;
}

export async function handleNotification(notification: Notification) {
  try {
    if (isSMSNotification(notification)) {
      await subscriptions.subscribeIfNeeded(notification);
      await snsPublish.publish(notification);
    }

    if (isEmailNotification(notification)) {
      await sesPublish.publish(notification);
    }
  } catch (err) {
    console.log('Error', err);

    throw err;
  }
}
