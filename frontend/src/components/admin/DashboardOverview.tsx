import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Users, UserCheck, Calendar, Image, TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function DashboardOverview() {
  const stats = [
    {
      icon: Users,
      label: 'Total Members',
      value: '2,547',
      change: '+12%',
      trend: 'up',
      color: 'bg-blue-100 text-blue-800',
    },
    {
      icon: UserCheck,
      label: 'Pending Approvals',
      value: '23',
      change: '-5%',
      trend: 'down',
      color: 'bg-orange-100 text-orange-800',
    },
    {
      icon: Calendar,
      label: 'Upcoming Events',
      value: '8',
      change: '+2',
      trend: 'up',
      color: 'bg-green-100 text-green-800',
    },
    {
      icon: Image,
      label: 'Gallery Images',
      value: '456',
      change: '+38',
      trend: 'up',
      color: 'bg-purple-100 text-purple-800',
    },
  ];

  const memberGrowthData = [
    { month: 'Jan', members: 2100 },
    { month: 'Feb', members: 2200 },
    { month: 'Mar', members: 2300 },
    { month: 'Apr', members: 2350 },
    { month: 'May', members: 2400 },
    { month: 'Jun', members: 2547 },
  ];

  const eventAttendanceData = [
    { event: 'Jan Events', attendance: 450 },
    { event: 'Feb Events', attendance: 520 },
    { event: 'Mar Events', attendance: 380 },
    { event: 'Apr Events', attendance: 610 },
    { event: 'May Events', attendance: 490 },
    { event: 'Jun Events', attendance: 720 },
  ];

  const memberDistributionData = [
    { name: 'Hyderabad', value: 850, color: '#FF6B35' },
    { name: 'Bangalore', value: 650, color: '#FFD700' },
    { name: 'Mumbai', value: 480, color: '#F4E6D7' },
    { name: 'Delhi', value: 320, color: '#D4B896' },
    { name: 'Others', value: 247, color: '#8B6F47' },
  ];

  const recentActivities = [
    { id: 1, type: 'member', message: '12 new members joined', time: '2 hours ago' },
    { id: 2, type: 'event', message: 'Annual Sammelan 2025 created', time: '5 hours ago' },
    { id: 3, type: 'approval', message: '8 members approved', time: '1 day ago' },
    { id: 4, type: 'gallery', message: '15 new images uploaded', time: '2 days ago' },
    { id: 5, type: 'announcement', message: 'New announcement posted', time: '3 days ago' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown;
          return (
            <Card key={index}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardDescription>{stat.label}</CardDescription>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${stat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between">
                  <h2 className="text-foreground">{stat.value}</h2>
                  <div className={`flex items-center gap-1 text-sm ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <TrendIcon className="w-4 h-4" />
                    <span>{stat.change}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Member Growth Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Member Growth</CardTitle>
            <CardDescription>Monthly member registration trend</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={memberGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F4E6D7" />
                <XAxis dataKey="month" stroke="#6B5345" />
                <YAxis stroke="#6B5345" />
                <Tooltip />
                <Line type="monotone" dataKey="members" stroke="#FF6B35" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Event Attendance Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Event Attendance</CardTitle>
            <CardDescription>Monthly event participation</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={eventAttendanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F4E6D7" />
                <XAxis dataKey="event" stroke="#6B5345" />
                <YAxis stroke="#6B5345" />
                <Tooltip />
                <Bar dataKey="attendance" fill="#FFD700" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Member Distribution */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Member Distribution</CardTitle>
            <CardDescription>By city</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={memberDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {memberDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates and actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 pb-3 border-b last:border-0">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-foreground">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
