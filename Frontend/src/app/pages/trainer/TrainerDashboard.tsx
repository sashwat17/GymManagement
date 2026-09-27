import React from 'react';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';
import { Users, Activity, Calendar, TrendingUp, Award, Clock } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTrainerDashboard } from '../../hooks/useTrainees';

export function TrainerDashboard() {
  const dashboardQuery = useTrainerDashboard();
  const dashboard = dashboardQuery.data;
  const weeklyData = dashboard?.weeklySessions ?? [];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/30">
          <Award className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-foreground">Welcome, Coach Sarah!</h1>
          <p className="text-muted-foreground">Here's your training overview</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Trainees</p>
              <h2 className="text-foreground">{dashboard?.totalTrainees ?? '--'}</h2>
            </div>
            <Users className="w-6 h-6 text-primary" />
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary">+{dashboard?.totalTraineesDeltaThisMonth ?? 0} this month</span>
          </div>
        </Card>

        <Card>
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Active Trainees</p>
              <h2 className="text-foreground">{dashboard?.activeTrainees ?? '--'}</h2>
            </div>
            <Activity className="w-6 h-6 text-secondary" />
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="success">{dashboard?.activeRate ?? 0}% Active Rate</Badge>
          </div>
        </Card>

        <Card>
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Workouts Assigned</p>
              <h2 className="text-foreground">{dashboard?.workoutsAssignedThisWeek ?? '--'}</h2>
            </div>
            <Calendar className="w-6 h-6 text-primary" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">This week</span>
          </div>
        </Card>

        <Card>
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Today's Sessions</p>
              <h2 className="text-foreground">{dashboard?.todaysSessions ?? '--'}</h2>
            </div>
            <Clock className="w-6 h-6 text-secondary" />
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="primary">{dashboard?.todaysSessionsCompleted ?? 0} Completed</Badge>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-foreground">Weekly Sessions</h3>
            <Badge variant="primary">Last 7 Days</Badge>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={weeklyData}>
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
              <Bar key="bar-sessions" dataKey="sessions" fill="#a67c52" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-foreground">Completion Rate</h3>
            <Badge variant="success">{dashboard?.averageCompletionRate ?? 0}% Average</Badge>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={weeklyData}>
              <CartesianGrid key="grid-completion" strokeDasharray="3 3" stroke="#e8e3dd" />
              <XAxis key="xaxis-completion" dataKey="day" stroke="#797979" />
              <YAxis key="yaxis-completion" stroke="#797979" domain={[80, 100]} />
              <Tooltip
                key="tooltip-completion"
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e8e3dd',
                  borderRadius: '8px',
                  color: '#3d3d3d',
                }}
              />
              <Line
                key="line-completion"
                type="monotone"
                dataKey="completionRate"
                stroke="#c4866b"
                strokeWidth={3}
                dot={{ fill: '#c4866b', r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-foreground">Recent Activity</h3>
          <Badge variant="warning">5 New</Badge>
        </div>
        <div className="space-y-3">
          {dashboardQuery.isLoading && <p className="text-muted-foreground">Loading dashboard...</p>}
          {dashboardQuery.isError && <p role="alert" className="text-destructive">{dashboardQuery.error.message}</p>}
          {(dashboard?.recentActivity ?? []).map((item) => (
            <div key={item.id} className="flex items-start gap-3 p-4 bg-muted rounded-lg">
              <Activity className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm text-foreground">{item.message}</p>
                  <span className="text-xs text-muted-foreground">{item.timeLabel}</span>
                </div>
                <p className="text-xs text-muted-foreground">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
