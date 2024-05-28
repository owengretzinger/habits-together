import colors from "@/src/constants/colors";
import {
  IconBarbell,
  IconBook,
  IconBottle,
  IconCode,
  IconExclamationCircle,
  IconMoodTongue,
  IconMusic,
  Icon as TablerIcon,
} from "@tabler/icons-react-native";
import { numWeeksToDisplayInMonthlyView } from "../constants/constants";
import { fetchSingleUserThumbnail } from "./getRandomProfilePics";

export type HabitGoalPeriod = "daily" | "weekly";
export type Habit = {
  id: number;
  title: string;
  description: string;
  color: keyof typeof colors.habitColors;
  icon: TablerIcon;
  goal: {
    period: HabitGoalPeriod;
    completionsPerPeriod: number;
  };
};

export function getNumberOfDaysInLastWeek() {
  const currDay = new Date().getDay();
  return currDay === 0 ? 7 : currDay;
}

export function getMockHabitMonthData(
  numberOfDays: number,
  targetNumberOfCompletionsPerDay: number,
) {
  const activityData: HabitCompletion[] = new Array(numberOfDays);

  let date = new Date();
  date.setDate(date.getDate() - numberOfDays);

  for (let i = 0; i < numberOfDays; i++) {
    let numCompletions = Math.floor(
      Math.random() * (targetNumberOfCompletionsPerDay + 1),
    );
    activityData[i] = {
      numberOfCompletions: numCompletions,
      dayOfTheWeek: date.toLocaleString("en-US", { weekday: "short" }),
      dayOfTheMonth: date.getDate().toString(),
    };
    date.setDate(date.getDate() + 1);
  }

  return activityData;
}

export const mockHabitData: Habit[] = [
  {
    title: "Read for 15 minutes",
    icon: IconBook,
    color: "orange",
    id: 1,
    description: "Let's expand our mind capacity",
    goal: {
      period: "daily",
      completionsPerPeriod: 1,
    },
  },
  {
    title: "Work out",
    icon: IconBarbell,
    color: "green",
    id: 2,
    description: "Working out is better together",
    goal: {
      period: "weekly",
      completionsPerPeriod: 4,
    },
  },
  {
    title: "Drink water",
    icon: IconBottle,
    color: "violet",
    id: 3,
    description: "Stay hydrated",
    goal: {
      period: "daily",
      completionsPerPeriod: 5,
    },
  },
];

export type FriendRequestData = {
  id: number;
  displayName: string;
  mutualCount: number;
  profilePicUrl: string;
};

export async function getMockFriendInvites() {
  const pic1 = await fetchSingleUserThumbnail();
  const pic2 = await fetchSingleUserThumbnail();

  const mockFriendInvites: FriendRequestData[] = [
    {
      id: 1,
      displayName: "Someone else",
      mutualCount: 3,
      profilePicUrl: pic1.imgurl,
    },
    {
      id: 2,
      displayName: "Eduardo",
      mutualCount: 5,
      profilePicUrl: pic2.imgurl,
    },
  ];

  return mockFriendInvites;
}

export type HabitInviteData = {
  id: number; // unique id for each invite
  title: string;
  color: keyof typeof colors.habitColors;
  icon: TablerIcon;
  numberOfParticipants: number;
  displayName: string;
  profilePicUrl: string;
};

export async function getMockHabitInvites() {
  const pic1 = await fetchSingleUserThumbnail();
  const pic2 = await fetchSingleUserThumbnail();

  const mockHabitInvites: HabitInviteData[] = [
    {
      id: 1,
      title: "Play Guitar",
      color: "purple",
      icon: IconMusic,
      numberOfParticipants: 3,
      displayName: "Kush Blaze",
      profilePicUrl: pic1.imgurl,
    },
    {
      id: 2,
      title: "Yum Yum",
      color: "red",
      icon: IconMoodTongue,
      numberOfParticipants: 10,
      displayName: "Blaze Kush",
      profilePicUrl: pic2.imgurl,
    },
  ];
  return mockHabitInvites;
}

export type HabitReminderData = {
  id: number; // unique id for each reminder
  title: string;
  color: keyof typeof colors.habitColors;
  icon: TablerIcon;
  timeSent: number; // this will be hours stored as a number, can be changed to proper time after we decide on the format in the db
  displayName: string;
  profilePicUrl: string;
};

export async function getMockReminderInvites() {
  const pic1 = await fetchSingleUserThumbnail();
  const pic2 = await fetchSingleUserThumbnail();

  const mockReminderInvites: HabitReminderData[] = [
    {
      id: 1,
      title: "Work on Habit",
      color: "purple",
      icon: IconCode,
      timeSent: 4,
      displayName: "Guy One",
      profilePicUrl: pic1.imgurl,
    },
    {
      id: 2,
      title: "Yum Yum",
      color: "red",
      icon: IconMoodTongue,
      timeSent: 12,
      displayName: "Dude Two",
      profilePicUrl: pic2.imgurl,
    },
  ];
  return mockReminderInvites;
}

export interface FriendData {
  id: number;
  displayName: string;
  userName: string;
  profilePicUrl: string;
  commonHabits: Habit[];
}

export async function getMockFriends() {
  const mockFriends: FriendData[] = [
    {
      id: 1,
      displayName: "Someone else",
      userName: "some1else",
      profilePicUrl: "",
      commonHabits: mockHabitData,
    },
    {
      id: 2,
      displayName: "Eduardo",
      userName: "eduardo_012003",
      profilePicUrl: "",
      commonHabits: [],
    },
  ];
  return mockFriends;
}

export const mockHabitFriendData = [
  { id: 1, friendIds: [1, 2, 3, 4] },
  { id: 2, friendIds: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] },
  { id: 3, friendIds: [21, 22] },
];

export type HabitCompletion = {
  numberOfCompletions: number;
  dayOfTheWeek: string;
  dayOfTheMonth: string;
};

export function getMockHabitData(habitId: number) {
  const habit = mockHabitData.find((habit) => habit.id === habitId);

  if (!habit) {
    throw `Could not find habit with id ${habitId}`;
  }

  const targetNumberOfCompletionsPerDay =
    habit.goal.period === "daily" ? habit.goal.completionsPerPeriod : 1;

  return getMockHabitMonthData(
    (numWeeksToDisplayInMonthlyView - 1) * 7 + getNumberOfDaysInLastWeek(),
    targetNumberOfCompletionsPerDay,
  );
}

export type NotificationData = {
  id: number; // unique id for each reminder
  type: "friendRequest" | "habitInvite" | "habitReminder";
  displayName: string;
  mutualCount: number; // only for friend requests
  profilePicUrl: string;
  title: string;
  color: keyof typeof colors.habitColors;
  icon: TablerIcon;
  numberOfParticipants: number; // only for habit invites
  timeSent: number; // this will be hours stored as a number, can be changed to proper time after we decide on the format in the db
};

export async function getMockNotifications() {
  const pic1 = await fetchSingleUserThumbnail();
  const pic2 = await fetchSingleUserThumbnail();
  const pic3 = await fetchSingleUserThumbnail();
  const pic4 = await fetchSingleUserThumbnail();
  const pic5 = await fetchSingleUserThumbnail();
  const pic6 = await fetchSingleUserThumbnail();

  const mockNotifications: NotificationData[] = [
    {
      id: 1,
      type: "friendRequest",
      displayName: "Someone else",
      mutualCount: 3,
      profilePicUrl: pic1.imgurl,
      title: "",
      color: "red",
      icon: IconExclamationCircle,
      numberOfParticipants: 0,
      timeSent: 0,
    },
    {
      id: 2,
      type: "habitReminder",
      displayName: "Guy One",
      mutualCount: 0,
      profilePicUrl: pic2.imgurl,
      title: "Work on Habit",
      color: "red",
      icon: IconCode,
      numberOfParticipants: 0,
      timeSent: 0,
    },
    {
      id: 3,
      type: "habitInvite",
      displayName: "Kush Blaze",
      mutualCount: 0,
      profilePicUrl: pic3.imgurl,
      title: "Play Guitar",
      color: "purple",
      icon: IconMusic,
      numberOfParticipants: 3,
      timeSent: 0,
    },
    {
      id: 4,
      type: "friendRequest",
      displayName: "Eduardo",
      mutualCount: 5,
      profilePicUrl: pic4.imgurl,
      title: "",
      color: "red",
      icon: IconExclamationCircle,
      numberOfParticipants: 0,
      timeSent: 0,
    },
    {
      id: 5,
      type: "habitInvite",
      displayName: "Blaze Kush",
      mutualCount: 0,
      profilePicUrl: pic5.imgurl,
      title: "Yum Yum",
      color: "red",
      icon: IconMoodTongue,
      numberOfParticipants: 10,
      timeSent: 0,
    },
    {
      id: 6,
      type: "habitReminder",
      displayName: "Dude Two",
      mutualCount: 0,
      profilePicUrl: pic6.imgurl,
      title: "Yum Yum",
      color: "red",
      icon: IconMoodTongue,
      numberOfParticipants: 0,
      timeSent: 12,
    },
  ];
  return mockNotifications;
}
