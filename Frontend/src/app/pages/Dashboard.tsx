import React from 'react';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { ProgressBar } from '../components/ProgressBar';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Calendar, AlertCircle, TrendingUp, Clock } from 'lucide-react';

const workoutData = [
  { id: 1, day: 'Mon', workouts: 2 },
  { id: 2, day: 'Tue', workouts: 1 },
  { id: 3, day: 'Wed', workouts: 3 },
  { id: 4, day: 'Thu', workouts: 2 },
  { id: 5, day: 'Fri', workouts: 4 },
  { id: 6, day: 'Sat', workouts: 1 },
  { id: 7, day: 'Sun', workouts: 0 },
];

export function Dashboard() {
  const subscriptionDaysRemaining = 15;
  const subscriptionTotalDays = 30;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/30">
          <span className="text-2xl">💪</span>
        </div>
        <div>
          <h1 className="text-foreground">Welcome back, Shishir!</h1>
          <p className="text-muted-foreground">Ready to crush your goals today?</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 md:col-span-2 lg:col-span-1">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-foreground mb-1">Subscription Status</h3>
              <Badge variant="success">Active</Badge>
            </div>
            <Calendar className="w-6 h-6 text-primary" />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Days Remaining</span>
              <span className="text-foreground">{subscriptionDaysRemaining} days</span>
            </div>
            <ProgressBar
              value={subscriptionDaysRemaining}
              max={subscriptionTotalDays}
            />
            <p className="text-xs text-muted-foreground">
              Renews on April 16, 2026
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
              <p className="text-sm text-muted-foreground">13 workouts completed</p>
            </div>
            <TrendingUp className="w-6 h-6 text-primary" />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Goal: 15 workouts</span>
              <span className="text-sm text-primary">87%</span>
            </div>
            <ProgressBar value={13} max={15} />
            <p className="text-xs text-muted-foreground">
              Keep going! 2 more workouts to reach your goal
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
          <Badge variant="warning">3 New</Badge>
        </div>

        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
            <AlertCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-foreground">Trainer Absence Alert</p>
              <p className="text-xs text-muted-foreground mt-1">
                Sarah Johnson will be unavailable on April 5th
              </p>
            </div>
            <Clock className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
          </div>

          <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
            <Activity className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-foreground">Workout Reminder</p>
              <p className="text-xs text-muted-foreground mt-1">
                Your leg day workout starts in 2 hours
              </p>
            </div>
            <Clock className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
          </div>

          <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
            <Calendar className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-foreground">Subscription Reminder</p>
              <p className="text-xs text-muted-foreground mt-1">
                Your subscription renews in 15 days
              </p>
            </div>
            <Clock className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
          </div>
        </div>
      </Card>
    </div>
  );
}
