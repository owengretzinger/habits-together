import { habitColorAtom } from "@/src/atoms/atoms";
import colors from "@/src/constants/colors";
import { HabitIdT } from "@/src/lib/db_types";
import { IconCheck } from "@tabler/icons-react-native";
import { useAtomValue } from "jotai";
import React from "react";
import { View } from "react-native";
import Icon from "../Icon";

export default function WeekGoalMetCheckmark({
  habitId,
  weekGoalMet,
}: {
  habitId: HabitIdT;
  weekGoalMet: boolean;
}) {
  const color = useAtomValue(habitColorAtom(habitId));

  return (
    <View className="mx-[1.5px] h-[13px] w-[13px]">
      {weekGoalMet && (
        <Icon
          icon={IconCheck}
          size={12}
          strokeWidth={4}
          lightColor={colors.habitColors[color].base}
          darkColor={colors.habitColors[color].base}
        />
      )}
    </View>
  );
}
