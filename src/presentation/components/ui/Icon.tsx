import {Icon, useTheme} from '@ui-kitten/components';

interface Props {
  name: string;
  color?: string;
  width?: number;
  height?: number;
}

export const MyIcon = ({name, color, width = 32, height = 32}: Props) => {
  const theme = useTheme();    

  if (!color) {
    color = theme['text-basic-color'];
  } else {
    color = theme[color] ?? color;
  }

  return <Icon style={{width, height}} fill={color} name={name} />;
};
