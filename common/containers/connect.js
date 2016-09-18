import { connect } from 'react-redux';

export default (component, wrapper, mapStateToProps, mapDispatchToProps) => {
  if (!wrapper) {
    wrapper = item => item;
  }
  return wrapper(connect(mapStateToProps, mapDispatchToProps)(component));
};
