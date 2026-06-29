import express, { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';

export interface LogNotification {
  stack: string;
  level: 'error' | 'warn' | 'info';
  package: string;
  message: string;
}

const viewedNotifications = new Set<string>();

export function notificationLoggingMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {

  if (!req.body || !req.body.message) {
    return next();
  }

  const notification = req.body as LogNotification;
  const timestamp = new Date().toISOString();

  const notificationString = JSON.stringify(notification);
  const notificationHash = crypto
    .createHash('md5')
    .update(notificationString)
    .digest('hex');


  const isNew = !viewedNotifications.has(notificationHash);

  if (isNew) {
    viewedNotifications.add(notificationHash);
    console.log(`\n[${timestamp}] 🔴 [NEW NOTIFICATION]`);
  } else {
    console.log(`\n[${timestamp}] 👁️  [ALREADY VIEWED]`);
  }


  console.log(`Stack:   ${notification.stack}`);
  console.log(`Level:   ${notification.level?.toUpperCase()}`);
  console.log(`Package: ${notification.package}`);
  console.log(`Message: ${notification.message}`);

  next();
}

const app = express();
const PORT = 3000;


app.use(express.json());


app.use(notificationLoggingMiddleware);


app.post('/api/notifications', (req: Request, res: Response) => {
  res.status(200).json({ 
    status: "processed",
    received: req.body 
  });
});
