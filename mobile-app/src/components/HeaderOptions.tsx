import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { IconCheck, IconEdit, IconX } from "@tabler/icons-react-native";
import { router, useGlobalSearchParams } from "expo-router";
import { useAtom, useAtomValue } from "jotai";
import { Pressable } from "react-native";
<<<<<<< HEAD
import { getUserInfoAtom, profileFormDataAtom } from "../atoms/atoms";
import { currentUserAtom } from "../atoms/currentUserAtom";
import colors from "../constants/colors";
import { newUsernameIsUnique, updateProfileDataInDB } from "../firebase/api";
=======
import { getUserInfoAtom, removeFriendAtom } from "../atoms/atoms";
import colors from "../constants/colors";
import { HabitIdT, UserIdT } from "../lib/db_types";
>>>>>>> main
import DotsMenu from "./DotsMenu";
import HeaderBackButton from "./HeaderBackButton";
import Icon from "./Icon";
import RoundedButton from "./RoundedButton";
import { Text, View } from "./Themed";
import { userT, userWithIdT } from "../lib/db_types";

function sharedOptions(colorScheme: string): NativeStackNavigationOptions {
  return {
    headerShown: true,
    headerShadowVisible: false,
    headerStyle: {
      backgroundColor:
        colorScheme === "dark" ? colors.stone.base : colors.white,
    },
    headerBackVisible: false,
  };
}

export function viewHabitOptions(
  colorScheme: string,
): NativeStackNavigationOptions {
  const { habitId } = useGlobalSearchParams<{ habitId: HabitIdT }>();
  if (!habitId) {
    return sharedOptions(colorScheme);
  }
  return {
    headerLeft: () => <HeaderBackButton showText={true} />,
    headerTitle: () => <></>,
    headerRight: () => (
      <View className="flex-row items-center">
        <Pressable
          className="mr-2"
          onPress={() =>
            router.push({
              pathname: "/habits/edithabit",
              params: { habitidStr: habitId },
            })
          }
        >
          <Icon icon={IconEdit} />
        </Pressable>
        <DotsMenu
          options={[
            {
              label: "Add friends to habit",
              color: colors.black,
              action: () => alert("Add friends to habit"),
            },
            {
              label: "Share join link",
              color: colors.black,
              action: () => alert("Share join link"),
            },
            {
              label: "Edit habit",
              color: colors.black,
              action: () => alert("Edit habit"),
            },
            {
              label: "Leave habit",
              color: colors.black,
              action: () => alert("Leave habit"),
            },
          ]}
        />
      </View>
    ),
    ...sharedOptions(colorScheme),
  };
}

export function viewProfileOptions(
  colorScheme: string,
): NativeStackNavigationOptions {
  const { theirUserId } = useGlobalSearchParams<{ theirUserId: UserIdT }>();
  if (!theirUserId) {
    return sharedOptions(colorScheme);
  }
  const username = useAtomValue(getUserInfoAtom(theirUserId)).username;
  const [, removeFriend] = useAtom(removeFriendAtom);

  return {
    presentation: "modal",
    headerLeft: () => <HeaderBackButton chevronDirection="down" />,
    headerTitle: () => (
      <Text className="text-base font-semibold text-black dark:text-white">
        {username}
      </Text>
    ),
    headerRight: () => (
      <DotsMenu
        options={[
          {
            label: "Remove friend",
            color: colors.black,
            action: () => {
              removeFriend(theirUserId);
              router.back();
            },
          },
        ]}
      />
    ),
    headerTitleAlign: "center",
    ...sharedOptions(colorScheme),
  };
}

export function inviteFriendsOptions(
  colorScheme: string,
): NativeStackNavigationOptions {
  return {
    presentation: "modal",
    headerLeft: () => <HeaderBackButton chevronDirection="down" />,
    headerTitle: () => (
      <Text className="text-base font-semibold text-black dark:text-white">
        Invite friends
      </Text>
    ),
    headerRight: () => (
      <RoundedButton
        text="Done"
        icon={IconCheck}
        strokeWidth={4}
        onPress={() => {
          router.back();
        }}
      />
    ),
    headerTitleAlign: "center",
    ...sharedOptions(colorScheme),
  };
}

export function emailSignUpOptions(
  colorScheme: string,
): NativeStackNavigationOptions {
  return {
    headerShown: true,
    // make header center
    headerTitleAlign: "center",
    headerTitle: () => (
      <Text className="text-center text-base font-semibold text-black dark:text-white">
        Sign Up
      </Text>
    ),
    headerLeft: () => <HeaderBackButton showText={true} />,
    ...sharedOptions(colorScheme),
  };
}

export function emailLoginOptions(
  colorScheme: string,
): NativeStackNavigationOptions {
  return {
    headerShown: true,
    // make header center
    headerTitleAlign: "center",
    headerTitle: () => (
      <Text className="text-center text-base font-semibold text-black dark:text-white">
        Login
      </Text>
    ),
    headerLeft: () => <HeaderBackButton showText={true} />,
    ...sharedOptions(colorScheme),
  };
}

export function forgotPasswordOptions(
  colorScheme: string,
): NativeStackNavigationOptions {
  return {
    headerShown: true,
    // make header center
    headerTitleAlign: "center",
    headerTitle: () => (
      <Text className="text-center text-base font-semibold text-black dark:text-white">
        Password reset
      </Text>
    ),
    headerLeft: () => <HeaderBackButton showText={true} />,
    ...sharedOptions(colorScheme),
  };
}

export function editProfileOptions(
  colorScheme: string,
): NativeStackNavigationOptions {
<<<<<<< HEAD
  const { userName } = useGlobalSearchParams<{ userName: string }>();
  const [profileFormData, setProfileFormData] = useAtom(profileFormDataAtom);
  const [userData, setUserData] = useAtom(currentUserAtom);
=======
>>>>>>> main
  return {
    headerLeft: () => (
      <RoundedButton
        text="Cancel"
        icon={IconX}
        onPress={() => {
          //change back to actual profile data
          setProfileFormData({
            displayName: userData.displayName,
            username: userData.displayName,
          });
          router.back();
        }}
      />
    ),
    headerTitle: () => (
      <Text className="text-base font-semibold text-black dark:text-white">
        Edit profile
      </Text>
    ),
    headerRight: () => (
      <RoundedButton
        text="Done"
        icon={IconCheck}
        onPress={async () => {
          const cond = await newUsernameIsUnique(userData.username, profileFormData.username)
          if (cond) {
            //on success
            const newDataForAtom: userWithIdT = {
              ...userData,
              ...profileFormData,
            };

            const newDataForDb: userT = {
              username: profileFormData.username,
              displayName: profileFormData.displayName,
              picture: userData.picture,
              createdAt: userData.createdAt,
            };

            await updateProfileDataInDB(userData.id, newDataForDb)
            setUserData(newDataForAtom); //update atom to match db
            router.back();
          }
          else {
            profileFormData.username = userData.username // reset their form data 
            setProfileFormData(profileFormData)
          }
        }
        }
      />
    ),
    headerTitleAlign: "center",
    ...sharedOptions(colorScheme),
  };
}

export function addFriendsOptions(
  colorScheme: string,
): NativeStackNavigationOptions {
  return {
    presentation: "modal",
    headerLeft: () => <HeaderBackButton chevronDirection="down" />,
    headerTitle: () => (
      <Text className="text-base font-semibold text-black dark:text-white">
        Add friends
      </Text>
    ),
    headerTitleAlign: "center",
    ...sharedOptions(colorScheme),
  };
}
