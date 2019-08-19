/*
    Collected LoaderAsync.

    Copyright (c) 2019 Riverside Software Engineering Ltd. All rights reserved.

    Licensed under the MIT License. See LICENSE file in the project root for full license information.
*/

import { withCollector } from 'r-socs-core';

import LoaderAsyncCollector from './collector';
import LoaderAsync from './component';

const CollectedLoaderAsync = withCollector(LoaderAsyncCollector)(LoaderAsync);

export default CollectedLoaderAsync;
