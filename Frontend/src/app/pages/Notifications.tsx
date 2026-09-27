import React from 'react';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Bell, AlertCircle, Activity, Calendar, CheckCircle, Info } from 'lucide-react';
 import type { Notification } from '../types/notification';

const notifications: Notification[] = [
  {
    id: 1,
    type: 'trainer_absence',
    title: 'Trainer Absence Alert',
    message: 'Santosh Guru will be unavailable on April 5th. Your session has been rescheduled to April 6th at 10:00 AM.',
    time: '2 hours ago',
    isUnread: true,
  },
  {
    id: 2,
    type: 'workout_reminder',
    title: 'Upcoming Workout',
    message: 'Your leg day workout starts in 2 hours. Don\'t forget to bring your water bottle!',
    time: '3 hours ago',
    isUnread: true,
  },
  {
    id: 3,
    type: 'subscription',
    title: 'Subscription Renewal',
    message: 'Your premium subscription will renew automatically on April 16th, 2026.',
    time: '5 hours ago',
    isUnread: true,
  },
  {
    id: 4,
    type: 'achievement',
    title: 'Milestone Achieved!',
    message: 'Congratulations! You\'ve completed 150 workouts. Keep up the amazing work!',
    time: '1 day ago',
    isUnread: false,
  },
  {
    id: 5,
    type: 'workout_reminder',
    title: 'Rest Day Reminder',
    message: 'Tomorrow is your scheduled rest day. Recovery is just as important as training!',
    time: '1 day ago',
    isUnread: false,
  },
  {
    id: 6,
    type: 'info',
    title: 'New Workout Available',
    message: 'Check out the new "Advanced Core Strength" program added by trainer Mike Chen.',
    time: '2 days ago',
    isUnread: false,
  },
  {
    id: 7,
    type: 'trainer_absence',
    title: 'Schedule Change',
    message: 'Your HIIT session on March 30th has been moved to 3:00 PM due to facility maintenance.',
    time: '3 days ago',
    isUnread: false,
  },
  {
    id: 8,
    type: 'achievement',
    title: 'Weekly Goal Completed',
    message: 'Amazing! You\'ve reached your goal of 15 workouts this week.',
    time: '4 days ago',
    isUnread: false,
  },
];

const getNotificationIcon = (type: Notification['type']) => {
  switch (type) {
    case 'trainer_absence':
      return <AlertCircle className="w-5 h-5 text-secondary" />;
    case 'workout_reminder':
      return <Activity className="w-5 h-5 text-primary" />;
    case 'subscription':
      return <Calendar className="w-5 h-5 text-primary" />;
    case 'achievement':
      return <CheckCircle className="w-5 h-5" style={{ color: '#8fa68a' }} />;
    case 'info':
      return <Info className="w-5 h-5" style={{ color: '#9b8f7e' }} />;
    default:
      return <Bell className="w-5 h-5 text-muted-foreground" />;
  }
};

export function Notifications() {
  const unreadCount = notifications.filter((n) => n.isUnread).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-foreground">Notifications</h1>
          <p className="text-muted-foreground">Stay updated with your fitness journey</p>
        </div>
        {unreadCount > 0 && (
          <Badge variant="warning">{unreadCount} Unread</Badge>
        )}
      </div>

      <div className="space-y-3">
        {notifications.map((notification) => (
          <Card
            key={notification.id}
            className={`${
              notification.isUnread
                ? 'border-l-4 border-l-primary bg-card/80'
                : 'opacity-80 hover:opacity-100'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                {getNotificationIcon(notification.type)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="text-foreground">{notification.title}</h3>
                  {notification.isUnread && (
                    <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-3">{notification.message}</p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">{notification.time}</p>
                  {notification.isUnread && (
                    <button className="text-xs text-primary hover:underline">
                      Mark as read
                    </button>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <div className="text-center py-8">
          <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">You're all caught up!</p>
          <p className="text-sm text-muted-foreground mt-1">No more notifications to show</p>
        </div>
      </Card>
    </div>
  );
}
