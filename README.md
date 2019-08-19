# r-loader-async

This is a logic unit which loads a dataset provided by a service through an async call.

And it is based on r-socs-core (https://github.com/huitou/r-socs-core.git).

## Usage:

1. install r-socs-core and this library:

`$ npm install --save git+https://github.com/huitou/r-socs-core.git`

`$ npm install --save git+https://github.com/huitou/r-loader-async.git`


2. import r-loader-async logic unit and connect it to any consumer component:

```javascript
// MyComponent.js
import { connect } from 'r-socs-core';
import { CollectedLoaderAsync } from 'r-loader-async';

class MyComponent extends React.Component {
    ...
}
...
export default connect(CollectedLoaderAsync, 'myloader')(MyComponent);
```


3. props injected to connected component by r-loader-async logic unit:

  * data: any - the loaded data,
  * error: any - eventual loading error,
  * inAsync: bool - flag of in async loading operation,
  * clear: () => void - clear the loader,
  * load: (params) => void - start loading,


4. props expected by r-loader-async logic unit:

  * service: (params) => Promise - service function, required.
  * onLoading: () => void - handle to collect start loading event, optional.
  * onLoaded: (data) => void - handle to collect data loaded event, optional.
  * onError: (error) => void - handle to collect loading error event, optional.
  * onCleared: () => void - handle to collect loader clear event, optional.
