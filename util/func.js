'use strict';

const assert = require('assert');

function groupBy (arr, key) {
    assert.ok(Array.isArray(arr), 'arr must be an array');
    assert.ok(key && typeof key === 'string', 'key must be a string');
    if (!arr.length) return null;
    return arr.reduce((resu, val, index) => {
        if (!resu[val[key]]) {
            resu[val[key]] = [val];
        } else {
            resu[val[key]].push(val);
        }
        return resu;
    }, {});
};

function minItem (arr, key) {
    assert.ok(Array.isArray(arr), 'arr must be an array');
    assert.ok(key && typeof key === 'string', 'key must be a string');
    if (!arr.length) return null;
    let min = arr[0];
    arr.forEach(item => {
        if (item[key] < min[key]) {
            min = item;
        }
    });
    return min;
}

module.exports = { groupBy, minItem };
