import FriendRequest from "@/src/components/FriendRequest";
import { Text, View } from "@/src/components/Themed";
import { useEffect, useState } from "react";
import { FriendRequestData, getMockFriendInvites } from "../lib/mockData";
import { NotifProfilePicture } from "./ProfilePicture";
import Divider from "@/src/components/Divider";

export default function FriendRequestList() {
  const [requests, setRequests] = useState<FriendRequestData[]>([]);

  useEffect(() => {
    const fetchFriendRequests = async () => {
      // we would fetch the list from the db and set it here
      const friendRequests = await getMockFriendInvites();
      setRequests(friendRequests);
    };
    fetchFriendRequests();
  }, []);

  const deleteInvite = (id: number) => {
    console.log("Invite deleted");
    // delete in db
    setRequests((prevRequests) => prevRequests.filter((req) => req.id !== id));
  };
  const confirmInvite = (id: number) => {
    console.log("Invite confirmed");
    // confirm in db
    setRequests((prevRequests) => prevRequests.filter((req) => req.id !== id));
  };

  if (requests.length === 0) {
    return <></>;
  }
  return (
    <View className="flex flex-col">
      {requests.map((request, index) => (
        <View>
          <View className="px-4">
            <FriendRequest
              key={index}
              displayName={request.displayName}
              mutualCount={request.mutualCount}
              profilePic={
                <NotifProfilePicture picUrl={request.profilePicUrl} />
              }
              deleteInvite={() => deleteInvite(request.id)}
              confirmInvite={() => confirmInvite(request.id)}
            />
          </View>
          <View className="mt-2.5">
            <Divider />
          </View>
        </View>
      ))}
    </View>
  );
}
