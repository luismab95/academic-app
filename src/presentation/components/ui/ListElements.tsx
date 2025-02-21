import {Icon, IconElement, List, ListItem, Text} from '@ui-kitten/components';

export interface ListElementsProps {
  title: string;
  icon: string;
  styles?: {icon: {color: string}; title: {color: string}};
  onPress?: () => void;
}
interface Props {
  data: ListElementsProps[];
  ListHeaderComponent: any;
}

export const ListElements = ({data, ListHeaderComponent}: Props) => {
  const renderItemIcon = (props: any, item: ListElementsProps): IconElement => (
    <Icon
      {...props}
      name={item.icon}
      fill={item.styles?.icon.color ?? props.style.tintColor}
    />
  );

  const renderTitle = (
    props: any,
    item: ListElementsProps,
  ): React.ReactElement => (
    <Text {...props} style={item.styles?.title}>
      {item.title}
    </Text>
  );

  const renderItem = ({
    item,
  }: {
    item: ListElementsProps;
    index: number;
  }): React.ReactElement => (
    <ListItem
      onPress={item.onPress}
      title={props => renderTitle(props, item)}
      accessoryLeft={props => renderItemIcon(props, item)}
    />
  );
  return (
    <List
      style={{
        marginVertical: 10,
        marginHorizontal: 20,
        backgroundColor: 'transparent',
      }}
      data={data}
      ListHeaderComponent={ListHeaderComponent}
      renderItem={renderItem}
    />
  );
};
