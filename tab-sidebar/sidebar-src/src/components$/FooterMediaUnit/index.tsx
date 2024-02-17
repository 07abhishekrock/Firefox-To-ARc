import { FlowProps } from 'solid-js';
import Icon from '../Icon';
import { limitToMaxChars } from 'utils/helpers';

export const FooterMediaButton = (props: {
  onClick: ()=>void;
  whatItDoes: string;
  icon: string;
}) => {


  return <button class="footer-media-unit__button"
    title={props.whatItDoes}
    onClick={props.onClick}
  >
    <Icon iconName={props.icon}
      sizeType='regular'
    />
  </button>;


};


const FooterMediaUnit = (props: FlowProps<{
  footerPrimaryIcon: string;
  currentPlayingText: string;
  hidden?: boolean;
}>) => {
  return <div class={!props.hidden ? 'footer-media-unit' : 'footer-media-unit hidden'}>
    <div class="footer-media-unit__top-container">
      <Icon iconName={props.footerPrimaryIcon}
        sizeType='medium'
      />
      <span class="footer-media-unit__top-container__title">{limitToMaxChars(props.currentPlayingText, 25)}</span>
    </div>
    <div class="footer-media-unit__bottom-container">
      {props.children}
    </div>
  </div>;
};

export default FooterMediaUnit;
