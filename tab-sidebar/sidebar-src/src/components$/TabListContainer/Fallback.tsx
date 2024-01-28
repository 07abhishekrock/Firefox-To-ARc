import Icon from '../Icon';
import PrimaryButton from '../PrimaryButton';
import { useSearchBar } from '../SearchBar/useSearchBar';


const Fallback = () => {

  const [ , setSearchString ] = useSearchBar();

  return <div class="empty-list-fallback">
    <Icon sizeType="large"
      iconName="empty_dashboard"
    />
    <h4 class="empty-list-fallback__title">No Tabs Found</h4>
    <PrimaryButton onClick={
      () => {
        setSearchString('');
      }
    }
    >Reset Search</PrimaryButton>
  </div>;
};

export default Fallback;
