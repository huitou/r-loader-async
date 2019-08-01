/*
    Async Loader Collector.

    Copyright (c) 2019 Riverside Software Engineering Ltd. All rights reserved.

    Licensed under the MIT License. See LICENSE file in the project root for full license information.
*/

import { Collector } from 'r-socs-core';

export default class ListCollector extends Collector {
    static handleMap = {
        hfu: {
            hifu: {
                data: 'data',
                error: 'error',
                inAsync: 'inAsync'
            },
            hefu: {
                clear: 'clear',
                load: 'load',
                change: 'change'
            },
        },
    };
}
