import { IconDots } from "@tabler/icons-react-native";
import { Text } from "react-native";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";
import Icon from "./Icon";
import { View } from "./Themed";

export type Option = {
  label: string;
  color: string;
  action: () => void;
};

export default function DotsMenu({ options }: { options: Option[] }) {
  return (
    <Menu>
      <MenuTrigger>
        <View className="bg-transparent p-2">
          <Icon icon={IconDots} />
        </View>
      </MenuTrigger>
      <MenuOptions>
        {options.map((item) => (
          <MenuOption onSelect={item.action} key={item.label}>
            <Text style={{ color: item.color }}>{item.label}</Text>
          </MenuOption>
        ))}
      </MenuOptions>
    </Menu>
  );
}