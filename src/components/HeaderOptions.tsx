import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { IconEdit } from "@tabler/icons-react-native";
import { useGlobalSearchParams } from "expo-router";
import { Pressable } from "react-native";
import colors from "../constants/colors";
import DotsMenu from "./DotsMenu";
import HeaderBackButton from "./HeaderBackButton";
import Icon from "./Icon";
import { Text, View } from "./Themed";

function sharedOptions(colorScheme: string) {
  return {
    headerShown: true,
    headerShadowVisible: false,
    headerStyle: {
      backgroundColor:
        colorScheme === "dark" ? colors.stone.base : colors.white,
    },
  };
}

export function viewHabitOptions(
  colorScheme: string,
): NativeStackNavigationOptions {
  return {
    headerLeft: () => <HeaderBackButton showText={true} />,
    headerTitle: () => <></>,
    headerRight: () => (
      <View className="flex-row items-center">
        <Pressable className="mr-2" onPress={() => alert(`Edit habit`)}>
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
  const { userName } = useGlobalSearchParams<{ userName: string }>();

  return {
    presentation: "modal",
    headerLeft: () => <HeaderBackButton chevronDirection="down" />,
    headerTitle: () => (
      <Text className="text-base font-semibold text-black dark:text-white">
        {userName}
      </Text>
    ),
    headerRight: () => (
      <DotsMenu
        options={[
          {
            label: "Remove friend",
            color: colors.black,
            action: () => alert("Remove friend"),
          },
        ]}
      />
    ),
    headerTitleAlign: "center",
    ...sharedOptions(colorScheme),
  };
}