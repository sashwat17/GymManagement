import React from 'react';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { ProgressBar } from '../components/ProgressBar';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Calendar, AlertCircle, TrendingUp, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTraineeProfile } from '../hooks/useTrainees';
import { useWorkoutActivity } from '../hooks/useWorkouts';
import { useTraineeNotifications } from '../hooks/useNotifications';

export function Dashboard() {
  const { user } = useAuth();
  const profileQuery = useTraineeProfile();
  const activityQuery = useWorkoutActivity();
  const notificationsQuery = useTraineeNotifications();
  const profile = profileQuery.data;
  const workoutData = activityQuery.data ?? [];
  const notifications = (notificationsQuery.data ?? []).slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/30">
          <span className="text-2xl">💪</span>
        </div>
        <div>
          <h1 className="text-foreground">Welcome back, {profile?.fullName ?? user?.fullName ?? 'Trainee'}!</h1>
          <p className="text-muted-foreground">Ready to crush your goals today?</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 md:col-span-2 lg:col-span-1">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-foreground mb-1">Subscription Status</h3>
              <Badge variant={profile?.subscription.status === 'active' ? 'success' : 'warning'}>
                {profile?.subscription.status ?? 'Loading'}
              </Badge>
            </div>
            <Calendar className="w-6 h-6 text-primary" />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Days Remaining</span>
              <span className="text-foreground">{profile?.subscription.daysRemaining ?? '--'} days</span>
            </div>
            <ProgressBar
              value={profile?.subscription.daysRemaining ?? 0}
              max={profile?.subscription.totalDays ?? 1}
            />
            <p className="text-xs text-muted-foreground">
              {profile?.subscription.renewsOn
                ? `Renews on ${new Date(profile.subscription.renewsOn).toLocaleDateString()}`
                : 'Subscription details unavailable'}
            </p>
          </div>
        </Card>

        <Card>
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-foreground mb-1">Today's Workout</h3>
              <p className="text-sm text-muted-foreground">Upper Body Strength</p>
            </div>
            <Activity className="w-6 h-6 text-secondary" />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Duration</span>
              <span className="text-foreground">45 mins</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Calories</span>
              <span className="text-foreground">320 kcal</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Trainer</span>
              <span className="text-foreground">Sarah Johnson</span>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-foreground mb-1">Weekly Progress</h3>
              <p className="text-sm text-muted-foreground">{profile?.stats.totalWorkouts ?? '--'} workouts completed</p>
            </div>
            <TrendingUp className="w-6 h-6 text-primary" />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Attendance rate</span>
              <span className="text-sm text-primary">{profile?.stats.attendanceRate ?? 0}%</span>
            </div>
            <ProgressBar value={profile?.stats.attendanceRate ?? 0} max={100} />
            <p className="text-xs text-muted-foreground">
              {profileQuery.isLoading ? 'Loading your progress...' : 'Progress from your training history'}
            </p>
          </div>
        </Card>
      </div>

      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-foreground">Workout Activity</h3>
          <Badge variant="primary">This Week</Badge>
        </div>

        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={workoutData}>
            <CartesianGrid key="grid" strokeDasharray="3 3" stroke="#e8e3dd" />
            <XAxis key="xaxis" dataKey="day" stroke="#797979" />
            <YAxis key="yaxis" stroke="#797979" />
            <Tooltip
              key="tooltip"
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid #e8e3dd',
                borderRadius: '8px',
                color: '#3d3d3d',
              }}
            />
            <Line
              key="line-workouts"
              type="monotone"
              dataKey="workouts"
              stroke="#a67c52"
              strokeWidth={3}
              dot={{ fill: '#a67c52', r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-foreground">Recent Notifications</h3>
          <Badge variant="warning">{notifications.filter((notification) => notification.isUnread).length} New</Badge>
        </div>

        <div className="space-y-3">
          {notificationsQuery.isLoading && <p className="text-sm text-muted-foreground">Loading notifications...</p>}
          {notificationsQuery.isError && <p role="alert" className="text-sm text-destructive">{notificationsQuery.error.message}</p>}
          {notifications.map((notification) => (
            <div key={notification.id} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
              <AlertCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-foreground">{notification.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
              </div>
              <Clock className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
            </div>
          ))}
          {!notificationsQuery.isLoading && !notificationsQuery.isError && notifications.length === 0 && (
            <p className="text-sm text-muted-foreground">No recent notifications.</p>
          )}
        </div>
      </Card>
    </div>
  );
}
