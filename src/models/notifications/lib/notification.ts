export function isSMSNotification(data: any): data is SMSNotification {
  return 'phone' in data;
}

export function isEmailNotification(data: any): data is EmailNotification {
  return 'email' in data;
}
