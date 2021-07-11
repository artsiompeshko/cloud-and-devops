import {
  handleNotification,
  validateNotification,
} from '../services/notification';

exports.handler = async (event) => {
  const notification: Notification = JSON.parse(event.body);

  console.log('Recieved event', notification);

  if (!validateNotification(notification)) {
    console.log('Invalid notification', notification);

    return {
      statusCode: 400,
      message: 'Notification should contain phone or email and qoute',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
    };
  }
  try {
    await handleNotification(notification);
  } catch (e) {
    console.error(e);

    return {
      statusCode: 500,
      message: `Not handled. Reason: ${e.toString()}`,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
    };
  }

  return {
    statusCode: 200,
    message: 'success',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
  };
};
