/*
 * Copyright 2022 steadybit GmbH. All rights reserved.
 */

import React, { useEffect } from 'react';


export default function useHeap() {
    const canUseDOM = !!((typeof window !== 'undefined' &&window.document && window.document.createElement));

    const injectScript = React.useCallback((appId) => {
        if (!canUseDOM) {
            return;
        }
        /* eslint-disable */
        (function(window, document, appId) {
            window.heap = window.heap || [], heap.load = function(e, t) {
                window.heap.appid = e, window.heap.config = t = t || {};
                var r = t.forceSSL || 'https:' === document.location.protocol, a = document.createElement('script');
                a.type = 'text/javascript', a.async = !0, a.src = (r ? 'https:' : 'http:') + '//platform.steadybit.io/hio/js/heap-' + e + '.js';
                var n = document.getElementsByTagName('script')[0];
                n.parentNode.insertBefore(a, n);
                for (var o = function(e) {
                    return function() {
                        heap.push([e].concat(Array.prototype.slice.call(arguments, 0)));
                    };
                }, p = ['addEventProperties', 'addUserProperties', 'clearEventProperties', 'identify', 'removeEventProperty', 'setEventProperties', 'track', 'unsetEventProperty'], c = 0; c < p.length; c++) heap[p[c]] = o(p[c]);
            };
            heap.load(appId, {
                trackingServer: 'https://platform.steadybit.io/hio',
            });
        })(window, document, appId);
        /* eslint-enable  */
    },[canUseDOM]);

    useEffect(() => {
        if (window.location.hostname === 'docs.steadybit.io') {
            // injectScript('3088044314');
            injectScript('509101816'); //Platform PROD
        } else if (window.location.hostname === 'docs-preview.steadybit.io') {
            // injectScript('759657587');
            injectScript('1264786490'); // Platform DEV
        } else if (window.location.hostname === 'localhost') {
            // injectScript('759657587');
            injectScript('1191672482'); // Platform localhost
        }
    }, [injectScript]);
}
