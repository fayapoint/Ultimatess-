"use client"

import React, { useEffect, useState } from 'react';
import { Home, CheckSquare, List, MessageCircle, Bell, Settings, ChevronLeft, ChevronRight } from 'lucide-react';
import { getUserByEmail, updateLastLogin } from '../services/airtableService';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Progress } from "../components/ui/progress"

interface UserData {
  email: string;
  givenName: string;
  familyName: string;
  subscriptionPlan: string;
  profilePictureUrl?: string;
  bio?: string;
  twitterHandle?: string;
  facebookHandle?: string;
  instagramHandle?: string;
  registrationDate: string;
  lastLogin: string;
  posts: number;
  analytics: number;
}

export default function Dashboard() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const email = localStorage.getItem('email');
        if (email) {
          const user = await getUserByEmail(email);
          if (user) {
            setUserData({
              email: user.fields.email,
              givenName: user.fields.given_name,
              familyName: user.fields.family_name,
              subscriptionPlan: user.fields.subscription_plan,
              profilePictureUrl: user.fields.profile_picture_url?.[0]?.url,
              bio: user.fields.bio,
              twitterHandle: user.fields.twitter_handle,
              facebookHandle: user.fields.facebook_handle,
              instagramHandle: user.fields.instagram_handle,
              registrationDate: user.fields.registration_date,
              lastLogin: user.fields.last_login,
              posts: user.fields.Posts ? user.fields.Posts.length : 0,
              analytics: user.fields.Analytics || 0,
            });
            await updateLastLogin(user.id);
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const renderCalendar = () => {
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const lastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
    const calendar = [];

    for (let i = 0; i < firstDay.getDay(); i++) {
      calendar.push(<div key={`empty-${i}`} className="text-center p-2"></div>);
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      calendar.push(
        <div key={i} className={`text-center p-2 ${i === 5 ? 'bg-primary text-primary-foreground rounded-full' : ''}`}>
          {i}
        </div>
      );
    }

    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {currentMonth.toLocaleString('default', { month: 'long' })} {currentMonth.getFullYear()}
          </CardTitle>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {days.map(day => (
              <div key={day} className="text-center font-bold text-muted-foreground">
                {day}
              </div>
            ))}
            {calendar}
          </div>
        </CardContent>
      </Card>
    );
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!userData) {
    return <div className="flex items-center justify-center h-screen">No user data available.</div>;
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-20 bg-card shadow-lg flex flex-col items-center py-8 space-y-8">
        <img src={userData.profilePictureUrl || '/placeholder.svg?height=50&width=50'} alt="Profile" className="w-12 h-12 rounded-full" />
        <Home className="w-6 h-6 text-primary" />
        <CheckSquare className="w-6 h-6 text-muted-foreground" />
        <List className="w-6 h-6 text-muted-foreground" />
        <MessageCircle className="w-6 h-6 text-muted-foreground" />
        <Bell className="w-6 h-6 text-muted-foreground" />
        <Settings className="w-6 h-6 text-muted-foreground" />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">{userData.givenName} {userData.familyName}</h1>
            <p className="text-sm text-muted-foreground">{userData.subscriptionPlan === 'premium' ? 'Pro Member' : 'Free Member'}</p>
          </div>
          {userData.subscriptionPlan !== 'premium' && (
            <Button className="bg-yellow-400 text-primary-foreground">
              Upgrade to Pro
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="md:col-span-2">
            {renderCalendar()}
          </div>

          {/* Messages */}
          <Card>
            <CardHeader>
              <CardTitle>Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex items-center space-x-2">
                  <img src="/placeholder.svg?height=40&width=40" alt="User" className="w-10 h-10 rounded-full" />
                  <div>
                    <p className="font-bold">John Doe</p>
                    <p className="text-sm text-muted-foreground">Hi Angelina! How are you?</p>
                  </div>
                </li>
                <li className="flex items-center space-x-2">
                  <img src="/placeholder.svg?height=40&width=40" alt="User" className="w-10 h-10 rounded-full" />
                  <div>
                    <p className="font-bold">Jane Smith</p>
                    <p className="text-sm text-muted-foreground">Do you need that design?</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Task Lists */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Task Lists</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-primary text-xl">⚙️</span>
                  </div>
                  <div>
                    <p className="font-bold">UX/UI Design</p>
                    <p className="text-sm text-muted-foreground">10:00 - App Design</p>
                  </div>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <span className="text-yellow-500 text-xl">🔍</span>
                  </div>
                  <div>
                    <p className="font-bold">Research & Optimisation</p>
                    <p className="text-sm text-muted-foreground">16:00 - R&D Design</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Top Skills */}
          <Card>
            <CardHeader>
              <CardTitle>Top Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>
                  <div className="flex justify-between items-center">
                    <span>UX Design</span>
                    <span className="text-primary font-bold">99%</span>
                  </div>
                  <Progress value={99} className="h-2" />
                </li>
                <li>
                  <div className="flex justify-between items-center">
                    <span>UI Design</span>
                    <span className="text-yellow-500 font-bold">80%</span>
                  </div>
                  <Progress value={80} className="h-2 bg-yellow-200" indicatorClassName="bg-yellow-500" />
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Activity */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Weekly Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted rounded flex items-center justify-center">
              Chart placeholder
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}