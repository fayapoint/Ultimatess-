import React, { useEffect, useState } from 'react';
import { Home, CheckSquare, List, MessageCircle, Bell, Settings, ChevronLeft, ChevronRight, Plus, LogOut } from 'lucide-react';
import { getUserByEmail, updateLastLogin } from '../services/airtableService';
import { Box, Button, VStack, HStack, Avatar, Text, Heading, Progress, Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom'; // Corrected import from react-router-dom

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

interface Task {
  id: string;
  title: string;
  time: string;
  type: string;
}

interface Skill {
  name: string;
  percentage: number;
  color: string;
}

export default function Dashboard() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const navigate = useNavigate(); // Use useNavigate from react-router-dom

  const tasks: Task[] = [
    { id: '1', title: 'UX/UI Design', time: '10:00', type: 'App Design' },
    { id: '2', title: 'Research & Optimisation', time: '16:00', type: 'R&D Design' },
    { id: '3', title: 'Design Team Meeting', time: '18:00', type: 'Design Process' },
  ];

  const skills: Skill[] = [
    { name: 'UX Design', percentage: 99, color: 'green.500' },
    { name: 'UI Design', percentage: 100, color: 'yellow.500' },
    { name: 'Animation', percentage: 99, color: 'blue.500' },
    { name: 'Illustration', percentage: 79, color: 'orange.500' },
    { name: 'Logo Design', percentage: 75, color: 'pink.500' },
  ];

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

  const handleLogout = () => {
    localStorage.removeItem('email');
    navigate('/login'); // Navigate to login page using useNavigate
  };

  const renderCalendar = () => {
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const lastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
    const calendar = [];

    for (let i = 0; i < firstDay.getDay(); i++) {
      calendar.push(<Box key={`empty-${i}`} textAlign="center" p={2}></Box>);
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      calendar.push(
        <Box
          key={i}
          textAlign="center"
          p={2}
          bg={i === 5 ? 'green.500' : undefined}
          color={i === 5 ? 'white' : undefined}
          borderRadius={i === 5 ? 'full' : undefined}
        >
          {i}
        </Box>
      );
    }

    return (
      <Box borderWidth="1px" borderRadius="lg" p={4}>
        <Flex justify="space-between" align="center" mb={4}>
          <Heading size="md" color="green.500">
            {currentMonth.toLocaleString('default', { month: 'long' })} {currentMonth.getFullYear()}
          </Heading>
          <HStack spacing={2}>
            <Button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}>
              <ChevronLeft />
            </Button>
            <Button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}>
              <ChevronRight />
            </Button>
          </HStack>
        </Flex>
        <Box display="grid" gridTemplateColumns="repeat(7, 1fr)" gap={2}>
          {days.map(day => (
            <Text key={day} textAlign="center" fontWeight="bold" color="gray.500">
              {day}
            </Text>
          ))}
          {calendar}
        </Box>
      </Box>
    );
  };

  if (isLoading) {
    return <Flex justifyContent="center" alignItems="center" height="100vh">Loading...</Flex>;
  }

  if (!userData) {
    return <Flex justifyContent="center" alignItems="center" height="100vh">No user data available.</Flex>;
  }

  return (
    <Flex height="100vh">
      {/* Sidebar */}
      <VStack
        w="20"
        bg="white"
        shadow="lg"
        alignItems="center"
        py={8}
        spacing={8}
      >
        <Avatar src={userData.profilePictureUrl || '/placeholder.svg?height=50&width=50'} size="lg" />
        <Button variant="ghost" onClick={() => setActiveTab('home')} colorScheme={activeTab === 'home' ? 'green' : 'gray'}>
          <Home />
        </Button>
        <Button variant="ghost" onClick={() => setActiveTab('tasks')} colorScheme={activeTab === 'tasks' ? 'green' : 'gray'}>
          <CheckSquare />
        </Button>
        <Button variant="ghost" onClick={() => setActiveTab('lists')} colorScheme={activeTab === 'lists' ? 'green' : 'gray'}>
          <List />
        </Button>
        <Button variant="ghost" onClick={() => setActiveTab('messages')} colorScheme={activeTab === 'messages' ? 'green' : 'gray'}>
          <MessageCircle />
        </Button>
        <Button variant="ghost" onClick={() => setActiveTab('notifications')} colorScheme={activeTab === 'notifications' ? 'green' : 'gray'}>
          <Bell />
        </Button>
        <Button variant="ghost" onClick={() => setActiveTab('settings')} colorScheme={activeTab === 'settings' ? 'green' : 'gray'}>
          <Settings />
        </Button>
        <Button variant="ghost" colorScheme="gray" mt="auto" onClick={handleLogout}>
          <LogOut />
        </Button>
      </VStack>

      {/* Main Content */}
      <Flex flex="1" p={8} flexDirection="column" overflowY="auto">
        <Flex justify="space-between" mb={8}>
          <Box>
            <Heading size="lg">{userData.givenName} {userData.familyName}</Heading>
            <Text color="gray.500">{userData.subscriptionPlan === 'premium' ? 'Pro Member' : 'Free Member'}</Text>
          </Box>
          {userData.subscriptionPlan !== 'premium' && (
            <Button colorScheme="yellow">Upgrade to Pro</Button>
          )}
        </Flex>

        <Flex gridGap={8} mb={8}>
          {/* Task Lists */}
          <Box flex="2" borderWidth="1px" borderRadius="lg" p={4}>
            <Flex justify="space-between">
              <Heading size="md">Task Lists</Heading>
              <Text color="gray.500" fontSize="sm">February 5th</Text>
            </Flex>
            <VStack spacing={4} mt={4}>
              {tasks.map((task) => (
                <Flex key={task.id} align="center" gridGap={4}>
                  <Box w={8} h={8} bg="green.100" borderRadius="full" display="flex" alignItems="center" justifyContent="center">
                    <Text fontSize="xl" color="green.500">⚙️</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold">{task.title}</Text>
                    <Text fontSize="sm" color="gray.500">{task.time} - {task.type}</Text>
                  </Box>
                </Flex>
              ))}
            </VStack>
          </Box>

          {/* Top Skills */}
          <Box flex="1" borderWidth="1px" borderRadius="lg" p={4}>
            <Flex justify="space-between">
              <Heading size="md">Top Skills</Heading>
              <Button variant="ghost" size="sm">
                <Plus />
              </Button>
            </Flex>
            <VStack spacing={4} mt={4}>
              {skills.map((skill) => (
                <Box key={skill.name} w="100%">
                  <Flex justify="space-between">
                    <Text>{skill.name}</Text>
                    <Text fontWeight="bold" color={skill.color}>{skill.percentage}%</Text>
                  </Flex>
                  <Progress value={skill.percentage} colorScheme={skill.color} size="sm" mt={1} />
                </Box>
              ))}
            </VStack>
          </Box>
        </Flex>

        {/* Weekly Activity */}
        <Box borderWidth="1px" borderRadius="lg" p={4}>
          <Flex justify="space-between" align="center" mb={4}>
            <Heading size="md">Weekly Activity</Heading>
            <HStack spacing={2}>
              <Text color="gray.500" fontSize="sm">FEBRUARY 23 - 29th</Text>
              <Button variant="ghost" size="sm">
                <ChevronLeft />
              </Button>
              <Button variant="ghost" size="sm">
                <ChevronRight />
              </Button>
            </HStack>
          </Flex>
          <Box height="64" bg="gray.100" borderRadius="lg" display="flex" alignItems="center" justifyContent="center">
            {/* Placeholder for the chart */}
            <Text color="gray.500">Weekly activity chart goes here</Text>
          </Box>
          <Flex justify="space-between" mt={4}>
            <HStack>
              <Box w={3} h={3} bg="green.500" borderRadius="full"></Box>
              <Text fontSize="sm">UX Design</Text>
            </HStack>
            <HStack>
              <Box w={3} h={3} bg="yellow.500" borderRadius="full"></Box>
              <Text fontSize="sm">UI Design</Text>
            </HStack>
            <HStack>
              <Box w={3} h={3} bg="blue.500" borderRadius="full"></Box>
              <Text fontSize="sm">Animation</Text>
            </HStack>
            <HStack>
              <Box w={3} h={3} bg="orange.500" borderRadius="full"></Box>
              <Text fontSize="sm">Illustration</Text>
            </HStack>
            <HStack>
              <Box w={3} h={3} bg="pink.500" borderRadius="full"></Box>
              <Text fontSize="sm">Logo Design</Text>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
}

