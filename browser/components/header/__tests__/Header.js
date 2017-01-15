import { shallow } from 'enzyme';
import Header from '../Header.jsx';

describe('Header', () => {
  it('should hide add-post button when not logged in', () => {
    const wrapper = shallow(<Header isLogged={false} isFetching={false} />);
    expect(wrapper.find('#add-post')).toHaveStyle('display', 'none');
  });
  it('should display login button when not logged in', () => {
    const wrapper = shallow(<Header isLogged={false} isFetching={false} />);
    expect(wrapper.find('#login')).toHaveStyle('display', 'initial');
  });
  it('should display add-post button when logged in', () => {
    const wrapper = shallow(<Header isLogged isFetching={false} />);
    expect(wrapper.find('#add-post')).toHaveStyle('display', 'initial');
  });
  it('should hide login button when logged in', () => {
    const wrapper = shallow(<Header isLogged isFetching={false} />);
    expect(wrapper.find('#login')).toHaveStyle('display', 'none');
  });
  it('should display progress indicator when fetching', () => {
    const wrapper = shallow(<Header isLogged={false} isFetching />);
    expect(wrapper.find('.progress-indicator')).toHaveStyle('display', 'block');
  });
  it('should hide progress indicator when not fetching', () => {
    const wrapper = shallow(<Header isLogged={false} isFetching={false} />);
    expect(wrapper.find('.progress-indicator')).toHaveStyle('display', 'none');
  });
});
