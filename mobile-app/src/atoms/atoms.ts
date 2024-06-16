import AsyncStorage from "@react-native-async-storage/async-storage";
// import { atom } from "jotai";
import { atom } from "jotai";
import { atomFamily, createJSONStorage } from "jotai/utils";
import { fetchallHabitsInfoFromDB } from "../firebase/betterApi";
import { allHabitsInfoT } from "../lib/db_types";
// import { atomFamily, atomWithStorage, createJSONStorage } from "jotai/utils";
// import { AsyncStorage as AsyncStorageType } from "jotai/vanilla/utils/atomWithStorage";
// import {
//   acceptFriendRequestInDB,
//   acceptHabitInviteInDB,
//   createNewHabitInDB,
//   deleteNotificationInDB,
//   fetchFriends,
//   fetchHabits,
//   fetchNotifications,
// getCurrentUserIdFromDB,
// getMutualFriendsInDB,
// searchForFriendsInDB,
//   updateHabitCompletionsInDB,
//   updateHabitInfoInDB,
//   updateHabitParticipantsInDB,
// } from "../firebase/api";
// import { genMockHabitCompletionData } from "../lib/mockData";
// import {
//   AllFriendsDataType,
//   AllHabitsDataType,
//   Habit,
//   HabitCompletion,
//   HabitDisplayType,
//   UserNotificationsDataType,
// } from "../lib/types";

// using Jotai atoms: https://jotai.org/docs/introduction
// we especially use the atomFamily atom: https://jotai.org/docs/utilities/family

const storage = createJSONStorage(() => AsyncStorage);

const allHabitsInfoAtom = atom<allHabitsInfoT>({});
allHabitsInfoAtom.onMount = (set) => {
  fetchallHabitsInfoFromDB().then(set);
};
export const habitIdsAtom = atom((get) => Object.keys(get(allHabitsInfoAtom)));
const habitInfoAtom = atomFamily((id: string) =>
  atom((get) => get(allHabitsInfoAtom)[id]),
);
export const habitColorAtom = atomFamily((id: string) =>
  atom((get) => get(habitInfoAtom(id)).color),
);
export const habitDescriptionAtom = atomFamily((id: string) =>
  atom((get) => get(habitInfoAtom(id)).description),
);
export const habitTitleAtom = atomFamily((id: string) =>
  atom((get) => get(habitInfoAtom(id)).title),
);
export const habitOwnerAtom = atomFamily((id: string) =>
  atom((get) => get(habitInfoAtom(id)).owner_id),
);
export const habitGoalPeriodAtom = atomFamily((id: string) =>
  atom((get) => get(habitInfoAtom(id)).goal_period),
);
export const habitGoalCompletionsPerPeriodAtom = atomFamily((id: string) =>
  atom((get) => get(habitInfoAtom(id)).goal_completions_per_period),
);
export const habitIconAtom = atomFamily((id: string) =>
  atom((get) => get(habitInfoAtom(id)).icon),
);
export const habitParticipantIdsAtom = atomFamily((id: string) =>
  atom((get) => get(habitInfoAtom(id)).participants),
);


const allUsersInfoAtom = atom<allHabitsInfoT>({});

// // HABITS -------------------------------------------------------------------------
// const habitsAtom = atom<AllHabitsDataType>([]);
// habitsAtom.onMount = (set) => {
//   fetchHabits().then(set);
// };

// // habit info
// export const habitInfoAtom = atomFamily((id: number) =>
//   atom((get) => get(habitsAtom)[id].habitInfo),
// );
// export const editHabitInfoAtom = atomFamily((id: number) =>
//   atom(null, (_get, set, newValue: Habit) => {
//     updateHabitInfoInDB(id, newValue);
//     set(habitsAtom, (prev) => {
//       return {
//         ...prev,
//         [id]: {
//           ...prev[id],
//           habitInfo: newValue,
//         },
//       };
//     });
//   }),
// );
// export const createNewHabitAtom = atom(
//   null,
//   async (_get, set, newHabitInfo: Habit) => {
//     const newId = await createNewHabitInDB(newHabitInfo);
//     console.log("creating!");
//     let date = new Date();
//     date.setDate(date.getDate());
//     set(habitsAtom, (prev) => {
//       return {
//         ...prev,
//         [newId]: {
//           habitInfo: { ...newHabitInfo, id: newId },
//           habitCompletionData: genMockHabitCompletionData(
//             newHabitInfo.goal.period === "daily"
//               ? newHabitInfo.goal.completionsPerPeriod
//               : 1,
//           ),
//           habitParticipants: [69], // This should be current user id, type should also be a string from auth.curentUser.uid
//         },
//       };
//     });
//   },
// );

// export const habitIdAtom = atom((get) =>
//   Object.keys(get(habitsAtom)).map(Number),
// );
// export const habitColorAtom = atomFamily((id: number) =>
//   atom((get) => get(habitInfoAtom(id)).color),
// );
// export const habitGoalAtom = atomFamily((id: number) =>
//   atom((get) => get(habitInfoAtom(id)).goal),
// );
// export const targetNumberOfCompletionsPerDayAtom = atomFamily((id: number) =>
//   atom((get) => {
//     const habitGoal = get(habitInfoAtom(id)).goal;
//     return habitGoal.period === "daily" ? habitGoal.completionsPerPeriod : 1;
//   }),
// );
// export const targetNumberOfCompletionsPerWeekAtom = atomFamily((id: number) =>
//   atom((get) => {
//     const habitGoal = get(habitInfoAtom(id)).goal;
//     return habitGoal.period === "weekly"
//       ? habitGoal.completionsPerPeriod
//       : habitGoal.completionsPerPeriod * 7;
//   }),
// );

// // habit completions
// export const habitCompletionsAtom = atomFamily((id: number) =>
//   atom(
//     (get) => get(habitsAtom)[id].habitCompletionData,
//     (_get, set, newValue: HabitCompletion[]) => {
//       set(habitsAtom, (prev) => {
//         updateHabitCompletionsInDB(id, newValue);
//         return {
//           ...prev,
//           [id]: {
//             ...prev[id],
//             habitCompletionData: newValue,
//           },
//         };
//       });
//     },
//   ),
// );
// const habitCompletionsTodayAtom = atomFamily((id: number) =>
//   atom(
//     (get) => get(habitCompletionsAtom(id)).at(-1)!,
//     (get, set, newValue: HabitCompletion) => {
//       const prev = get(habitCompletionsAtom(id));
//       const newCompletionData = [...prev];
//       newCompletionData[newCompletionData.length - 1] = newValue;
//       set(habitCompletionsAtom(id), newCompletionData);
//     },
//   ),
// );
// export const numberOfCompletionsTodayAtom = atomFamily((id: number) =>
//   atom(
//     (get) => get(habitCompletionsTodayAtom(id)).numberOfCompletions,
//     (get, set, newValue: number) => {
//       const prev = get(habitCompletionsTodayAtom(id));
//       set(habitCompletionsTodayAtom(id), {
//         ...prev,
//         numberOfCompletions: newValue,
//       });
//     },
//   ),
// );
// export const incrementNumberOfCompletionsTodayAtom = atomFamily((id: number) =>
//   atom(null, (get, set) => {
//     const currentNumberOfCompletions = get(numberOfCompletionsTodayAtom(id));
//     const targetNumberOfCompletionsPerDay = get(
//       targetNumberOfCompletionsPerDayAtom(id),
//     );
//     set(
//       numberOfCompletionsTodayAtom(id),
//       currentNumberOfCompletions === targetNumberOfCompletionsPerDay
//         ? 0
//         : currentNumberOfCompletions + 1,
//     );
//   }),
// );

// // habit participants
// export const habitParticipantsAtom = atomFamily((id: number) =>
//   atom(
//     (get) => get(habitsAtom)[id].habitParticipants,
//     (_get, set, newValue: number[]) => {
//       updateHabitParticipantsInDB(id, newValue);
//       set(habitsAtom, (prev) => {
//         return {
//           ...prev,
//           [id]: {
//             ...prev[id],
//             habitParticipants: newValue,
//           },
//         };
//       });
//     },
//   ),
// );

// // whether we should display the habit in weekly or monthly view
// export const habitDisplayTypeAtom = atomFamily((id: number) =>
//   atomWithStorage<HabitDisplayType>(
//     `habitDisplayType-${id}`,
//     "weekly-view",
//     storage as AsyncStorageType<HabitDisplayType>,
//     { getOnInit: true },
//   ),
// );

// // FRIENDS
// export const friendsAtom = atom<AllFriendsDataType>([]);
// friendsAtom.onMount = (set) => {
//   fetchFriends().then(set);
// };

// export const friendInfoAtom = atomFamily((id: number) =>
//   atom((get) => get(friendsAtom)[id]),
// );

// export const friendIdsAtom = atom((get) => {
//   return Object.keys(get(friendsAtom)).map(Number);
// });

// // NOTIFICATIONS
// const notificationsAtom = atom<UserNotificationsDataType>([]);
// notificationsAtom.onMount = (set) => {
//   fetchNotifications().then(set);
// };

// export const notificationInfoAtom = atomFamily((id: number) =>
//   atom((get) => get(notificationsAtom)[id]),
// );
// export const notificationTypeAtom = atomFamily((id: number) =>
//   atom((get) => get(notificationInfoAtom(id)).type),
// );

// export const notificationIdsAtom = atom((get) =>
//   Object.keys(get(notificationsAtom)).map(Number),
// );

// export const acceptFriendRequestAtom = atomFamily((id: number) =>
//   atom(
//     (get) => get(notificationsAtom),
//     (_get, set) => {
//       acceptFriendRequestInDB(id);
//       set(notificationsAtom, (prev) => {
//         const { [id]: _, ...remaining } = prev;
//         return remaining;
//       });
//     },
//   ),
// );

// export const acceptHabitInviteAtom = atomFamily((id: number) =>
//   atom(
//     (get) => get(notificationsAtom),
//     (_get, set) => {
//       acceptHabitInviteInDB(id);
//       set(notificationsAtom, (prev) => {
//         const { [id]: _, ...remaining } = prev;
//         return remaining;
//       });
//     },
//   ),
// );

// export const deleteNotificationAtom = atomFamily((id: number) =>
//   atom(
//     (get) => get(notificationsAtom),
//     (_get, set) => {
//       deleteNotificationInDB(id);
//       set(notificationsAtom, (prev) => {
//         const { [id]: _, ...remaining } = prev;
//         return remaining;
//       });
//     },
//   ),
// );

// // friend search
// export const searchQueryAtom = atom("", (_get, set, newValue: string) => {
//   set(searchQueryAtom, newValue);
// });

// export const searchResultsAtom = atom(async (get) => {
//   console.log("searching for friends");
//   return await searchForFriendsInDB(get(searchQueryAtom));
// });

// export const getMutualFriendsAtom = atomFamily((friendId: number) =>
//   atom(async (get) => {
//     try {
//       const uid = get(currentUserIdAttom);
//       const mutualList = await getMutualFriendsInDB(uid, friendId);
//       return mutualList;
//     } catch (error) {
//       console.error("Error fetching mutual friends:", error);
//       return [];
//     }
//   }),
// );

// export const currentUserIdAttom = atom(10);
// currentUserIdAttom.onMount = (set) => {
//   getCurrentUserIdFromDB().then(set);
// };
// // do an onmount to get this