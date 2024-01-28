import cn from 'classnames';


export type IconProps = {
  sizeType?: 'small' | 'medium' | 'regular' |'large';
  iconName: string;
  iconSize?: string;
}


const Icon = (
  { sizeType, iconName = 'small', iconSize } : IconProps
) => {

  const getClassName = () => {
    if (typeof iconSize !== 'undefined') {
      return '';
    }

    return sizeType;

  };


  const getInlineStyleForIconSize = () => {
    return {
      fontSize: iconSize
    };
  };

  return <span class={
    cn(
      'icon',
      getClassName()
    )
  }
  style={getInlineStyleForIconSize()}
  >
    {iconName}
  </span>;
};

export default Icon;
