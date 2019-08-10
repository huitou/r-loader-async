import React from 'react';
import { shallow } from "enzyme";

import AsyncLoader, { initialState } from './component';

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

const onLoadingMock = jest.fn();
const onLoadedMock = jest.fn();
const onErrorMock = jest.fn();
const onClearedMock = jest.fn();

describe('AsyncLoader', () => {
    describe('when mounted with resolving service,', () => {
        let wrapper
        beforeEach(() => {
            wrapper = shallow(
                <AsyncLoader
                    service={revolvingService}
                    onLoading={onLoadingMock}
                    onLoaded={onLoadedMock}
                    onError={onErrorMock}
                    onCleared={onClearedMock}
                />
            );
        })
        afterEach(() => {
            jest.clearAllMocks();
        });

        it('has initial state', () => {
            expect(wrapper.state()).toEqual(initialState);
        });

        it('has proper state when the service is invoked', () => {
            wrapper.instance().load();
            expect(wrapper.state()).toEqual({
                data: undefined,
                error: undefined,
                inAsync: true
            });
        });
        it('has proper hifu handles when the service is invoked', () => {
            wrapper.instance().load();
            expect(wrapper.instance().data()).not.toBeDefined();
            expect(wrapper.instance().error()).not.toBeDefined();
            expect(wrapper.instance().inAsync()).toBe(true);
        });
        it('has invoked proper onXxx props when the service is invoked', () => {
            wrapper.instance().load();
            expect(onLoadingMock).toHaveBeenCalled();
            expect(onLoadedMock).not.toHaveBeenCalled();
            expect(onErrorMock).not.toHaveBeenCalled();
            expect(onClearedMock).not.toHaveBeenCalled();
        });

        it('has proper state when the service is resolved', async () => {
            await wrapper.instance().load();
            expect(wrapper.state()).toEqual({
                data,
                error: undefined,
                inAsync: false
            });
        });
        it('has proper hifu handles when the service is resolved', async () => {
            await wrapper.instance().load();
            expect(wrapper.instance().data()).toEqual(data);
            expect(wrapper.instance().error()).not.toBeDefined();
            expect(wrapper.instance().inAsync()).toBe(false);
        });
        it('has invoked proper onXxx props when the service is resolved', async () => {
            await wrapper.instance().load();
            expect(onLoadingMock).toHaveBeenCalled();
            expect(onLoadedMock).toHaveBeenCalledWith(data);
            expect(onErrorMock).not.toHaveBeenCalled();
            expect(onClearedMock).not.toHaveBeenCalled();
        });

        it('has cleared state after invocation of clear', async () => {
            await wrapper.instance().load();
            wrapper.instance().clear();
            expect(wrapper.state()).toEqual(initialState);
        });
        it('has proper hifu handles when cleared', async () => {
            await wrapper.instance().load();
            wrapper.instance().clear();
            expect(wrapper.instance().data()).not.toBeDefined();
            expect(wrapper.instance().error()).not.toBeDefined();
            expect(wrapper.instance().inAsync()).toBe(false);
        });
        it('has invoked proper onXxx props when cleared', async () => {
            await wrapper.instance().load();
            wrapper.instance().clear();
            expect(onLoadingMock).toHaveBeenCalled();
            expect(onLoadedMock).toHaveBeenCalledWith(data);
            expect(onErrorMock).not.toHaveBeenCalled();
            expect(onClearedMock).toHaveBeenCalled();
        });
    });

    describe('when mounted with rejecting service,', () => {
        let wrapper
        beforeEach(() => {
            wrapper = shallow(
                <AsyncLoader
                    service={rejectingService}
                    onLoading={onLoadingMock}
                    onLoaded={onLoadedMock}
                    onError={onErrorMock}
                    onCleared={onClearedMock}
                />
            );
        })
        afterEach(() => {
            jest.clearAllMocks();
        });

        it('has initial state', () => {
            expect(wrapper.state()).toEqual(initialState);
        });

        it('has proper state when the service is invoked', () => {
            wrapper.instance().load();
            expect(wrapper.state()).toEqual({
                data: undefined,
                error: undefined,
                inAsync: true
            });
        });
        it('has proper hifu handles when the service is invoked', () => {
            wrapper.instance().load();
            expect(wrapper.instance().data()).not.toBeDefined();
            expect(wrapper.instance().error()).not.toBeDefined();
            expect(wrapper.instance().inAsync()).toBe(true);
        });
        it('has invoked proper onXxx props when the service is invoked', () => {
            wrapper.instance().load();
            expect(onLoadingMock).toHaveBeenCalled();
            expect(onLoadedMock).not.toHaveBeenCalled();
            expect(onErrorMock).not.toHaveBeenCalled();
            expect(onClearedMock).not.toHaveBeenCalled();
        });

        it('has proper state when the service is rejected', async () => {
            await wrapper.instance().load();
            await setTimeout(() => {
                expect(wrapper.state()).toEqual({
                    data: undefined,
                    error,
                    inAsync: false
                });
            }, 0);
        });
        it('has proper hifu handles when the service is rejected', async () => {
            await wrapper.instance().load();
            await setTimeout(() => {
                expect(wrapper.instance().data()).not.toBeDefined();;
                expect(wrapper.instance().error()).toEqual(error);
                expect(wrapper.instance().inAsync()).toBe(false);
            }, 0);
        });
        it('has invoked proper onXxx props when the service is rejected', async () => {
            await wrapper.instance().load();
            await setTimeout(() => {
                expect(onLoadingMock).toHaveBeenCalled();
                expect(onLoadedMock).not.toHaveBeenCalled();
                expect(onErrorMock).toHaveBeenCalledWith(error);
                expect(onClearedMock).not.toHaveBeenCalled();
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
        it('has proper hifu handles when cleared', async () => {
            await wrapper.instance().load();
            await setTimeout(() => {
                wrapper.instance().clear();
                expect(wrapper.instance().data()).not.toBeDefined();
                expect(wrapper.instance().error()).not.toBeDefined();
                expect(wrapper.instance().inAsync()).toBe(false);
            }, 0);
        });
        it('has invoked proper onXxx props when cleared', async () => {
            await wrapper.instance().load();
            await setTimeout(() => {
                wrapper.instance().clear();
                expect(onLoadingMock).toHaveBeenCalled();
                expect(onLoadedMock).not.toHaveBeenCalled();
                expect(onErrorMock).toHaveBeenCalledWith(error);
                expect(onClearedMock).toHaveBeenCalled();
            }, 0);
        });
    });

    describe('can be mounted without optional props,', () => {
        let wrapper
        beforeEach(() => {
            wrapper = shallow(<AsyncLoader service={revolvingService} />);
        })
        afterEach(() => {
            jest.clearAllMocks();
        });

        it('has initial state', () => {
            expect(wrapper.state()).toEqual(initialState);
        });
    });
});