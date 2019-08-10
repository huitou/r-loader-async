/*
    Collected AsyncLoader.

    Copyright (c) 2019 Riverside Software Engineering Ltd. All rights reserved.

    Licensed under the MIT License. See LICENSE file in the project root for full license information.
*/

import { withCollector } from 'r-socs-core';

import AsyncLoaderCollector from './collector';
import AsyncLoader from './component';

const CollectedAsyncLoader = withCollector(AsyncLoaderCollector)(AsyncLoader);

export default CollectedAsyncLoader;
