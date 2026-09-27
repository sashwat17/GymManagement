import React from 'react';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';
import { Users, Activity, Calendar, TrendingUp, Award, Clock } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const weeklyData = [
  { id: 1, day: 'Mon', sessions: 8, completion: 95 },
  { id: 2, day: 'Tue', sessions: 6, completion: 88 },
  { id: 3, day: 'Wed', sessions: 10, completion: 92 },
  { id: 4, day: 'Thu', sessions: 7, completion: 85 },
  { id: 5, day: 'Fri', sessions: 9, completion: 90 },
  { id: 6, day: 'Sat', sessions: 5, completion: 100 },
  { id: 7, day: 'Sun', sessions: 3, completion: 100 },
];

export function TrainerDashboard() {
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
              <h2 className="text-foreground">42</h2>
            </div>
            <Users className="w-6 h-6 text-primary" />
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary">+5 this month</span>
          </div>
        </Card>

        <Card>
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Active Trainees</p>
              <h2 className="text-foreground">38</h2>
            </div>
            <Activity className="w-6 h-6 text-secondary" />
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="success">90% Active Rate</Badge>
          </div>
        </Card>

        <Card>
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Workouts Assigned</p>
              <h2 className="text-foreground">156</h2>
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
              <h2 className="text-foreground">12</h2>
            </div>
            <Clock className="w-6 h-6 text-secondary" />
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="primary">8 Completed</Badge>
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
            <Badge variant="success">92% Average</Badge>
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
                dataKey="completion"
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
          <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
            <Activity className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm text-foreground">Alex completed "Upper Body Strength"</p>
                <span className="text-xs text-muted-foreground">2 mins ago</span>
              </div>
              <p className="text-xs text-muted-foreground">Personal best achieved!</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
            <Users className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm text-foreground">3 new trainee requests</p>
                <span className="text-xs text-muted-foreground">15 mins ago</span>
              </div>
              <p className="text-xs text-muted-foreground">Review and accept new members</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
            <Calendar className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm text-foreground">Michelle scheduled for tomorrow</p>
                <span className="text-xs text-muted-foreground">1 hour ago</span>
              </div>
              <p className="text-xs text-muted-foreground">Morning session at 9:00 AM</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
