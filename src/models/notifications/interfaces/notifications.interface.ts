interface Notification {
  quote: QuoteDto;
}

interface SMSNotification extends Notification {
  phone: string;
}

interface EmailNotification extends Notification {
  email: string;
}
