import { ListSubscriptionsByTopicCommand } from '@aws-sdk/client-sns';
import { snsClient } from './sns-client';

export async function list() {
  return snsClient.send(
    new ListSubscriptionsByTopicCommand({
      TopicArn: 'arn:aws:sns:eu-west-1:227337062939:notifications',
    }),
  );
}
