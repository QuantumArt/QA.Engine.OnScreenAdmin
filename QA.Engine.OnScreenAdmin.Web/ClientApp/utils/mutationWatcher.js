import MutationSummary from 'mutation-summary';
import _ from 'lodash';
import { requestComponentsListUpdate } from 'actions/componentTree/actions';

function MutationWatcher(store) {
  const mutationCallback = (summaries) => {
    // const newComponentTree = buildFlatList();
    store.dispatch(requestComponentsListUpdate());
  };

  /* eslint-disable no-new */
  new MutationSummary({
    callback: _.debounce(mutationCallback, 1000),
    queries: [{
      element: 'body',
    }],
  });
}

export default MutationWatcher;

