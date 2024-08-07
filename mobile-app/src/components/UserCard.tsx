import { Text, View } from "@/src/components/Themed";
import { IconCheck, IconPlus } from "@tabler/icons-react-native";
import { Link } from "expo-router";
import { useAtom, useAtomValue } from "jotai";
import { useColorScheme } from "nativewind";
import React from "react";
import { Pressable } from "react-native";
import {
  commonHabitIdsAtom,
  friendAtom,
  habitColorAtom,
  habitIconAtom,
  habitTitleAtom,
  inviteUserToHabitAtom,
  mutualFriendsPfpsListAtom,
  removeFriendAtom,
  sendFriendRequestAtom,
} from "../atoms/atoms";

import colors from "../constants/colors";
import { HabitIdT, UserIdT, userWithIdT } from "../lib/db_types";
import DotsMenu from "./DotsMenu";
import HorizontalProfilePicsList from "./HorizontalProfilePicsList";
import Icon, { HabitIcon } from "./Icon";
import { MediumProfilePicture } from "./ProfilePicture";

type InviteAddButtonProps =
  | {
      theirUserId: UserIdT;
      habitId: HabitIdT;
      type: "inviteFriendsToHabit";
    }
  | {
      theirUserId: UserIdT;
      type: "addFriends";
    };

export function InviteAddButton({
  theirUserId,
  type,
  ...props
}: InviteAddButtonProps) {
  const [alreadySent, send] = useAtom(
    type === "inviteFriendsToHabit" && "habitId" in props
      ? inviteUserToHabitAtom({
          habitId: props.habitId,
          theirUserId,
        })
      : sendFriendRequestAtom(theirUserId),
  );

  return alreadySent ? (
    <View className="flex-row items-center self-start pr-5 pt-2">
      <Icon icon={IconCheck} size={16} strokeWidth={3} />
      <Text className="ml-1 text-xs font-semibold">Sent</Text>
    </View>
  ) : (
    <View className="self-start">
      {type === "inviteFriendsToHabit" && <InviteButton inviteFunc={send} />}
      {type === "addFriends" && <AddButton sendRequest={send} />}
    </View>
  );
}

export function FriendCard({
  friendId,
  displayType,
}: {
  friendId: UserIdT;
  displayType: "friendsList" | "inviteFriendsToHabit";
}) {
  const friend = useAtomValue(friendAtom(friendId));

  return (
    <UserCard
      userInfo={{ id: friendId, ...friend }}
      displayType={displayType}
    />
  );
}

export default function UserCard({
  userInfo,
  displayType,
}: {
  userInfo: userWithIdT;
  displayType: "friendsList" | "inviteFriendsToHabit" | "addFriends";
}) {
  const { id: userId, displayName, username, picture } = userInfo;
  const [, removeFriend] = useAtom(removeFriendAtom);
  return (
    <Link
      push
      href={{
        pathname: "/modals/viewprofile",
        params: {
          theirUserId: userId,
        },
      }}
      asChild
    >
      <Pressable className="my-1 flex grow-0 flex-col rounded-3xl border border-stone-300 p-2">
        <View className="flex flex-row items-center">
          <MediumProfilePicture picUrl={picture} />
          <View className="ml-2 flex flex-1 flex-col">
            <Text className="text-base font-semibold">{displayName}</Text>
            <Text className="text-xs font-semibold text-stone-400">
              {username}
            </Text>
          </View>
          {displayType === "friendsList" && (
            <View className="self-start">
              <DotsMenu
                options={[
                  {
                    label: "Remove Friend",
                    color: colors.black,
                    action: () => {
                      removeFriend(userId);
                    },
                  },
                ]}
              />
            </View>
          )}
          {displayType === "inviteFriendsToHabit" && (
            <InviteAddButton
              theirUserId={userId}
              habitId={"habit1" as HabitIdT}
              type={displayType}
            />
          )}
          {displayType === "addFriends" && (
            <InviteAddButton theirUserId={userId} type={displayType} />
          )}
        </View>

        {displayType !== "addFriends" && <CommonHabits friendId={userId} />}
        {displayType === "addFriends" && <MutualFriends userId={userId} />}
      </Pressable>
    </Link>
  );
}

function InviteButton({ inviteFunc }: { inviteFunc: () => void }) {
  return (
    <Pressable
      className="mr-1 mt-1 flex flex-row items-center justify-center rounded-full border border-stone-300 px-3 py-1"
      android_ripple={{ color: colors.stone["300"], radius: 55 }}
      onPress={inviteFunc}
    >
      <Icon icon={IconPlus} size={16} strokeWidth={2.5} />
      <Text className="ml-1 text-xs font-semibold">Invite</Text>
    </Pressable>
  );
}

function AddButton({ sendRequest }: { sendRequest: () => void }) {
  return (
    <Pressable
      className="mr-1 mt-1 flex flex-row items-center justify-center rounded-full border border-stone-300 px-3 py-1"
      android_ripple={{ color: colors.stone["300"], radius: 55 }}
      onPress={sendRequest}
    >
      <Icon icon={IconPlus} size={16} strokeWidth={2.5} />
      <Text className="ml-1 text-xs font-semibold">Add</Text>
    </Pressable>
  );
}

function CommonHabits({ friendId }: { friendId: UserIdT }) {
  const { colorScheme } = useColorScheme();
  const commonHabitIds = useAtomValue(commonHabitIdsAtom(friendId));

  return (
    <View className="mt-1 flex flex-row flex-wrap">
      {commonHabitIds.map((habitId) => (
        <HabitTag key={habitId} habitId={habitId} />
      ))}

      {commonHabitIds.length == 0 && (
        <View
          className="mx-0.5 mt-1 flex flex-row items-center justify-center rounded-3xl px-2 py-1"
          style={{
            backgroundColor:
              colorScheme === "dark" ? colors.stone.light : colors.stone[100],
          }}
        >
          <Text
            numberOfLines={1}
            className="text-xs font-semibold"
            style={{
              color:
                colorScheme === "dark" ? colors.stone[400] : colors.stone[800],
            }}
          >
            No habits together
          </Text>
        </View>
      )}
    </View>
  );
}

function MutualFriends({ userId }: { userId: UserIdT }) {
  const maxPfps = 8;
  const mutualFriendsPictures = useAtomValue(mutualFriendsPfpsListAtom(userId));
  return (
    <View className="ml-1 mr-auto mt-2 flex flex-row">
      <HorizontalProfilePicsList
        profilePics={mutualFriendsPictures}
        maxPics={maxPfps}
        borderColor={colors.stone[300]}
      />
      {mutualFriendsPictures.length > 0 && (
        <Text className="my-auto ml-3 text-xs font-semibold text-stone-400">
          {mutualFriendsPictures.length} Mutual Friends
        </Text>
      )}
      {mutualFriendsPictures.length == 0 && (
        <Text className="pb-2 pl-1 text-xs font-semibold text-stone-400">
          No mutual friends
        </Text>
      )}
    </View>
  );
}

function HabitTag({ habitId }: { habitId: HabitIdT }) {
  const { colorScheme } = useColorScheme();
  const title = useAtomValue(habitTitleAtom(habitId));
  const icon = useAtomValue(habitIconAtom(habitId));
  const color = useAtomValue(habitColorAtom(habitId));
  return (
    <View
      className="mx-0.5 mt-1 flex flex-row items-center justify-center rounded-3xl border px-1.5 py-1"
      style={{
        backgroundColor:
          colorScheme === "dark"
            ? "transparent"
            : colors.habitColors[color].light,
        borderColor:
          colorScheme === "dark"
            ? colors.habitColors[color].base
            : "transparent",
      }}
    >
      <HabitIcon
        icon={icon}
        size={12}
        darkColor={colors.habitColors[color].light}
        lightColor={colors.black}
      />
      <Text
        numberOfLines={1}
        className="ml-1 text-xs font-semibold"
        style={{
          color:
            colorScheme === "dark"
              ? colors.habitColors[color].light
              : colors.black,
        }}
      >
        {title}
      </Text>
    </View>
  );
}
