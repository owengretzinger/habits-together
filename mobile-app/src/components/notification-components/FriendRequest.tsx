import {
  acceptFriendRequestAtom,
  deleteNotificationAtom,
  friendNotificationAtom,
  getUserInfoAtom,
} from "@/src/atoms/atoms";
import { numberOfMutualFriendsAtom } from "@/src/atoms/friendsAtom";
import { useAtomValue } from "jotai";
import { NotifProfilePicture } from "../ProfilePicture";
import { Text, View } from "../Themed";
import { ConfirmButton, DeleteButton } from "./ConfirmDeleteButton";

export function FriendRequest({ notifId }: { notifId: string }) {
  const notifData = useAtomValue(friendNotificationAtom(notifId));
  const personData = useAtomValue(getUserInfoAtom(notifData.senderId));
  const numberOfMutualFriends = useAtomValue(
    numberOfMutualFriendsAtom(notifData.senderId),
  );
  console.log(
    `inside comp -> ${notifData.senderId} -> ${numberOfMutualFriends}`,
  );

  return (
    <View className="mt-2 flex grow-0 flex-row items-center rounded-3xl px-0 py-2">
      <View className="items-top flex flex-row">
        <NotifProfilePicture picUrl={personData.picture} />
        <View className="ml-4 flex flex-1 flex-col">
          <Text className="flex-row">
            <Text className="text-base font-semibold">
              {personData.displayName}
            </Text>
            <Text className="text-base"> sent you a friend request</Text>
          </Text>
          <Text className="text-xs text-stone-400">
            {numberOfMutualFriends} mutual friend
            {numberOfMutualFriends > 1 ? "s" : ""}
          </Text>
          <View className="mt-2 flex flex-row bg-transparent">
            <ConfirmButton
              atomToSetOnClick={acceptFriendRequestAtom(notifId)}
            />
            <DeleteButton atomToSetOnClick={deleteNotificationAtom(notifId)} />
          </View>
        </View>
      </View>
    </View>
  );
}
