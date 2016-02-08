import _ from 'lodash';

export default function(func) {
    return _.isFunction(func) && func.name === 'debounced';
}
