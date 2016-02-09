# [react-throttle](https://www.npmjs.com/package/react-throttle)
[![Build Status](https://travis-ci.org/gmcquistin/react-throttle.svg?branch=master)](https://travis-ci.org/gmcquistin/react-throttle)
[![codecov.io](https://codecov.io/github/gmcquistin/react-throttle/coverage.svg?branch=master)](https://codecov.io/github/gmcquistin/react-throttle?branch=master)
[![Dependency Status](https://david-dm.org/gmcquistin/react-throttle.svg)](https://david-dm.org/gmcquistin/react-throttle)
[![devDependency Status](https://david-dm.org/gmcquistin/react-throttle/dev-status.svg)](https://david-dm.org/gmcquistin/react-throttle#info=devDependencies)
[![bitHound Overall Score](https://www.bithound.io/github/gmcquistin/react-throttle/badges/score.svg)](https://www.bithound.io/github/gmcquistin/react-throttle)
[![Known Vulnerabilities](https://snyk.io/test/npm/react-throttle/badge.svg)](https://snyk.io/test/npm/react-throttle)

react-throttle is an npm package which contains two React components: `Throttle` and `Debounce`. These components can be wrapped around a child component, the event handlers of which will be either throttled or debounced depending on which component you choose.

## Problem

Oftentimes, events are fired more often than we really care about. For example, when scrolling down a page, the `onScroll` event will fire many times per second. If our event handler is even slightly complex, this will result in [jank](https://www.chromium.org/developers/how-tos/trace-event-profiling-tool/anatomy-of-jank#TOC-High-scrolling-latency-or-delays-beginning-scrolling-when-the-document-has-touch-event-handlers).

Pages which employ incremental searches are quite common on the Web. Typically an `<input>` element is used with an `onChange` handler, which sends an XHR to the server to request results. If the user is typing quickly, we don't want to bombard the server with a request for each keystroke, as this is a waste of resources.

## Solution

By throttling or debouncing our event handlers, we can dramatically reduce the amount of times the handler is called. By using these methods, we are able to choose the frequency with which we respond to events.

There are two methods by which we can lower the frequency of our event handler calls:

- _Throttling_

    This method revolves around a time interval. For example, by specifying a time interval of 100ms, this will ensure that the event handler is not called more than once per 100 milliseconds. This is handy for use cases such as the scrolling example above, where the handler may be called dozens of times in a 100 millisecond timeframe. Using the throttling method, we drastically cut down how often the handler is called.

- _Debouncing_

   Sometimes we only want to respond to an input when it is, or seems to be, complete. Again, we specify a time interval, but this time it has a different meaning. If we specify 100ms in this case, it means that our event handler will only be called if at least 100ms have passed since the last event. In the case of the incremental search box, this means that the typed input will only be processed 100ms after the user's last keystroke.

## Usage

The components are both used in a similar manner:

**Throttle**

```javascript
import { Throttle } from 'react-throttle';

<Throttle time="200" handler="onChange">
    <input onChange={() => console.log('input')} />
</Throttle>
```

**Debounce**

```javascript
import { Debounce } from 'react-throttle';

<Debounce time="400" handler="onChange">
    <input onChange={() => console.log('input')} />
</Debounce>
```

Both these components take a prop called `handler` which specifies the handler on the child component to throttle or debounce. An array of handler names can also be passed through `handlers` if the need arises.

## License

MIT

## Bug Reports

Please file bug reports using GitHub [issues](https://github.com/gmcquistin/react-throttle/issues). Thank you!

## Pull Requests

If you would like to contribute to this project, feel free. Clean, well-tested, well-documented code is appreciated. Thanks!
