import React from 'react';
import { shallow } from "enzyme";

import AsyncLoader from './component';

const data = { loaded: 'abc' };
const error = { error: 'xyz' };

const revolvingService = () => {
    return new Promise((resolve, reject) => {
        resolve(data);
    });
};

const rejectingService = () => {
    return new Promise((resolve, reject) => {
        reject(error);
    });
};

const mockLoaded = jest.fn();

describe('AsyncLoader', () => {
    describe('when mounted with resolving service,', () => {
        let wrapper
        beforeEach(() => {
            wrapper = shallow(<AsyncLoader service={revolvingService} loaded={mockLoaded} />);
        })
        afterEach(() => {
            // jest.clearAllMocks();
        });

        it('has initial state', () => {
            expect(wrapper.state()).toEqual({
                data: undefined,
                error: undefined,
                inAsync: false
            });
        });

        it('has inAsync in state when the service is invoked', () => {
            wrapper.instance().load();
            expect(wrapper.state()).toEqual({
                data: undefined,
                error: undefined,
                inAsync: true
            });
        });

        it('has data in state when the service is resolved', async () => {
            await wrapper.instance().load();
            expect(wrapper.state()).toEqual({
                data,
                error: undefined,
                inAsync: false
            });
        });

        it('has data loaded handle invoked when the service is resolved', async () => {
            await wrapper.instance().load();
            expect(mockLoaded).toHaveBeenCalledWith(data);
        });
    });

    describe('when mounted with rejecting service,', () => {
        let wrapper
        beforeEach(() => {
            wrapper = shallow(<AsyncLoader service={rejectingService} loaded={mockLoaded} />);
        })
        afterEach(() => {
            // jest.clearAllMocks();
        });

        it('has initial state', () => {
            expect(wrapper.state()).toEqual({
                data: undefined,
                error: undefined,
                inAsync: false
            });
        });

        it('has inAsync in state when the service is invoked', () => {
            wrapper.instance().load();
            expect(wrapper.state()).toEqual({
                data: undefined,
                error: undefined,
                inAsync: true
            });
        });

        it('has error in state when the service is rejected', async () => {
            await wrapper.instance().load();
            await setTimeout(() => {
                expect(wrapper.state()).toEqual({
                    data: undefined,
                    error,
                    inAsync: false
                });
            }, 0);
        });

        it('has cleared state after invocation of clear', async () => {
            await wrapper.instance().load();
            await setTimeout(() => {
                wrapper.instance().clear();
                expect(wrapper.state()).toEqual({
                    data: undefined,
                    error: undefined,
                    inAsync: false
                });
            }, 0);
        });
    });
});