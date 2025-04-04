import emailjs from '@emailjs/browser';

// Constants for EmailJS
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

// Constants for Telegram
const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN || '';
const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID || '';

// EmailJS notification function
export const sendEmailNotification = async (data: Record<string, any>): Promise<boolean> => {
  if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
    console.warn('EmailJS configuration not complete. Email notification not sent.');
    return false;
  }

  try {
    const result = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      data,
      EMAILJS_PUBLIC_KEY
    );
    
    console.log('Email notification sent!', result.text);
    return true;
  } catch (error) {
    console.error('Failed to send email notification:', error);
    return false;
  }
};

// Telegram notification function (client-side proxy via server)
export const sendTelegramNotification = async (
  message: string
): Promise<boolean> => {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.warn('Telegram configuration not complete. Telegram notification not sent.');
    return false;
  }

  try {
    // For client-side, we proxy through our server endpoint
    const response = await fetch('/api/telegram/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error('Failed to send Telegram notification');
    }

    console.log('Telegram notification sent!');
    return true;
  } catch (error) {
    console.error('Failed to send Telegram notification:', error);
    return false;
  }
};

/*
 * NOTE: This function is only for documentation purposes.
 * The actual implementation is on the server side.
 */
export const sendTelegramServer = async (message: string): Promise<boolean> => {
  console.warn('This function is only intended for server-side use.');
  return false;
};

// Helper to format inquiry data for notifications
export const formatInquiryNotification = (data: any): string => {
  return `
🔔 NEW CASE INQUIRY 🔔

👤 Name: ${data.name}
📧 Email: ${data.email}
📱 Phone: ${data.phone}
🏷️ Case Type: ${data.caseType}
📝 Message:
${data.message}

Submitted: ${new Date().toLocaleString()}
`;
};