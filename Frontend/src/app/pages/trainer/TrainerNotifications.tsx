import React from 'react';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';
import { Activity, Users, Calendar, AlertCircle, Award, TrendingUp, Clock } from 'lucide-react';

interface Notification {
  id: number;
  type: 'activity' | 'request' | 'schedule' | 'alert' | 'achievement' | 'progress';
  title: string;
  message: string;
  time: string;
  isNew: boolean;
}

const notifications: Notification[] = [
  {
    id: 1,
    type: 'activity',
    title: 'Workout Completed',
    message: 'Alex Johnson completed "Upper Body Strength" with excellent form',
    time: '2 mins ago',
    isNew: true,
  },
  {
    id: 2,
    type: 'request',
    title: 'New Trainee Requests',
    message: '3 new members are requesting to join your training program',
    time: '15 mins ago',
    isNew: true,
  },
  {
    id: 3,
    type: 'schedule',
    title: 'Session Scheduled',
    message: 'Michelle Davis scheduled a session for tomorrow at 9:00 AM',
    time: '1 hour ago',
    isNew: true,
  },
  {
    id: 4,
    type: 'achievement',
    title: 'Milestone Reached',
    message: 'Robert Chen achieved a new personal record in bench press!',
    time: '2 hours ago',
    isNew: false,
  },
  {
    id: 5,
    type: 'alert',
    title: 'Low Activity Alert',
    message: 'David Park has not logged any activity in 3 days',
    time: '3 hours ago',
    isNew: false,
  },
  {
    id: 6,
    type: 'progress',
    title: 'Progress Update',
    message: 'Emily Watson completed 80% of her monthly workout goal',
    time: '5 hours ago',
    isNew: false,
  },
  {
    id: 7,
    type: 'activity',
    title: 'Workout Feedback',
    message: 'Sophia Martinez rated "HIIT Cardio Blast" 5 stars',
    time: '6 hours ago',
    isNew: false,
  },
  {
    id: 8,
    type: 'schedule',
    title: 'Schedule Conflict',
    message: 'Two trainees scheduled for the same time slot tomorrow',
    time: '1 day ago',
    isNew: false,
  },
];

export function TrainerNotifications() {
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

  const newCount = notifications.filter((n) => n.isNew).length;

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
        {notifications.map((notification) => (
          <Card
            key={notification.id}
            className={notification.isNew ? 'border-l-4 border-l-primary' : ''}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">{getIcon(notification.type)}</div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex items-center gap-2">
                    <h4 className="text-foreground">{notification.title}</h4>
                    {notification.isNew && (
                      <Badge variant="primary" className="text-xs">
                        New
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground flex-shrink-0">
                    <Clock className="w-3 h-3" />
                    <span className="text-xs">{notification.time}</span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">{notification.message}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {notifications.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No notifications at the moment</p>
        </div>
      )}
    </div>
  );
}
