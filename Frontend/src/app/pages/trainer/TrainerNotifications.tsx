import React from 'react';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';
import { Activity, Users, Calendar, AlertCircle, Award, TrendingUp, Clock } from 'lucide-react';
import { useTrainerNotifications } from '../../hooks/useNotifications';

export function TrainerNotifications() {
  const notificationsQuery = useTrainerNotifications();
  const notifications = notificationsQuery.data ?? [];
  const getIcon = (type: string) => {
    switch (type) {
      case 'activity':
        return <Activity className="w-5 h-5 text-primary" />;
      case 'request':
        return <Users className="w-5 h-5 text-secondary" />;
      case 'schedule':
        return <Calendar className="w-5 h-5 text-primary" />;
      case 'alert':
        return <AlertCircle className="w-5 h-5 text-destructive" />;
      case 'achievement':
        return <Award className="w-5 h-5 text-accent" />;
      case 'progress':
        return <TrendingUp className="w-5 h-5 text-primary" />;
      default:
        return <Activity className="w-5 h-5 text-primary" />;
    }
  };

  const newCount = notifications.filter((n) => n.isUnread).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-foreground mb-2">Notifications</h1>
          <p className="text-muted-foreground">Stay updated with your trainees' activities</p>
        </div>
        {newCount > 0 && <Badge variant="warning">{newCount} New</Badge>}
      </div>

      <div className="space-y-3">
        {notificationsQuery.isLoading && <p className="text-muted-foreground">Loading notifications...</p>}
        {notificationsQuery.isError && <p role="alert" className="text-destructive">{notificationsQuery.error.message}</p>}
        {notifications.map((notification) => (
          <Card
            key={notification.id}
            className={notification.isUnread ? 'border-l-4 border-l-primary' : ''}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">{getIcon(notification.type)}</div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex items-center gap-2">
                    <h4 className="text-foreground">{notification.title}</h4>
                    {notification.isUnread && (
                      <Badge variant="primary" className="text-xs">
                        New
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground flex-shrink-0">
                    <Clock className="w-3 h-3" />
                    <span className="text-xs">{new Date(notification.createdAt).toLocaleString()}</span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">{notification.message}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {!notificationsQuery.isLoading && !notificationsQuery.isError && notifications.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No notifications at the moment</p>
        </div>
      )}
    </div>
  );
}
