import Icon, { IconProps } from '../Icon';


const IconButton = ({
  sizeType,
  iconName,
  iconSize,
  onIconClick
}: IconProps & {
  onIconClick: ()=>void;
}) => {
  return <button class="icon_button"
    onClick={onIconClick}
  >
    <Icon iconName={iconName}
      iconSize={iconSize}
      sizeType={sizeType}
    />
  </button>;
};

export default IconButton;
