import React from 'react';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Bell, AlertCircle, Activity, Calendar, CheckCircle, Info } from 'lucide-react';
import { useTraineeNotifications, useMarkNotificationRead } from '../hooks/useNotifications';
import type { TraineeNotificationType } from '../types/notification';

const getNotificationIcon = (type: TraineeNotificationType) => {
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
  const notificationsQuery = useTraineeNotifications();
  const markRead = useMarkNotificationRead();
  const notifications = notificationsQuery.data ?? [];
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
        {notificationsQuery.isLoading && <p className="text-muted-foreground">Loading notifications...</p>}
        {notificationsQuery.isError && <p role="alert" className="text-destructive">{notificationsQuery.error.message}</p>}
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
                  <p className="text-xs text-muted-foreground">{new Date(notification.createdAt).toLocaleString()}</p>
                  {notification.isUnread && (
                    <button
                      className="text-xs text-primary hover:underline disabled:opacity-50"
                      disabled={markRead.isPending}
                      onClick={() => markRead.mutate(notification.id)}
                    >
                      Mark as read
                    </button>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {!notificationsQuery.isLoading && !notificationsQuery.isError && notifications.length === 0 && <Card>
        <div className="text-center py-8">
          <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">You're all caught up!</p>
          <p className="text-sm text-muted-foreground mt-1">No more notifications to show</p>
        </div>
      </Card>}
    </div>
  );
}
