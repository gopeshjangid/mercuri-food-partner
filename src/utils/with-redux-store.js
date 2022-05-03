import { createWrapper } from 'next-redux-wrapper';

import store from './configure-store';

export default (BaseComponent) => {
  const wrapper = createWrapper(store, { debug: false });
  return wrapper.withRedux(BaseComponent);
};
