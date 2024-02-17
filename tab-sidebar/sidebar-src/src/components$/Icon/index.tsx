import cn from 'classnames';


export type IconProps = {
  sizeType?: 'small' | 'medium' | 'regular' |'large';
  iconName: string;
  iconSize?: string;
}


const Icon = (
  props : IconProps
) => {

  const getClassName = () => {
    if (typeof props.iconSize !== 'undefined') {
      return '';
    }

    return props.sizeType ?? 'small';

  };


  const getInlineStyleForIconSize = () => {
    return {
      fontSize: props.iconSize
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
    {props.iconName}
  </span>;
};

export default Icon;
