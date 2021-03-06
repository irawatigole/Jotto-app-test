import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr, storeFactory } from './Test/TestUtils';
import Input, { UnconnectedInput } from './Input';

const setup = (initialState={}) => {
    const store = storeFactory(initialState);
    const wrapper = shallow(<Input store={store}/>).dive().dive();
    return wrapper;
}

describe('render', () => {
    describe('word has not been guessed', () => {
        let wrapper;
        beforeEach(() => {
            const initialState = { success: false };
            wrapper = setup(initialState);
        })
        test('renders component without error', () => {
            const component = findByTestAttr(wrapper, 'component-input');
            expect(component.length).toBe(1);
        });

        test('renders input box', () => {
            const inputBox = findByTestAttr(wrapper, 'input-box');
            expect(inputBox.length).toBe(1);
        });

        test('renders submit button', () => {
            const submitButton = findByTestAttr(wrapper, 'submit-button');
            expect(submitButton.length).toBe(1);
        });
    });

    describe('word has been guessed', () => {
        let wrapper;
        beforeEach(() => {
            const initialState = { success: true };
            wrapper = setup(initialState);
        })
        test('renders component without error', () => {
            const component = findByTestAttr(wrapper, 'component-input');
            expect(component.length).toBe(1);
        });

        test('renders input box', () => {
            const inputBox = findByTestAttr(wrapper, 'input-box');
            expect(inputBox.length).toBe(0);
        });

        test('renders submit button', () => {
            const submitButton = findByTestAttr(wrapper, 'submit-button');
            expect(submitButton.length).toBe(0);
        });
    });
});

describe('redux props', () => {
    test('has success piece of state as props', () => {
        const success = true;
        const wrapper = setup({ success });
        const succesProp = wrapper.instance().props.success;
        expect(succesProp).toBe(success);
    });

    test('`guessWord` action creator is a function prop', () => {
        const wrapper = setup();
        const guessWordProp = wrapper.instance().props.guessWord;
        expect(guessWordProp).toBeInstanceOf(Function);
    });
});

describe('`guessWord` action creator call', () => {
    test('calls `guessword` when button is clicked', () => {
        const guessWordMock = jest.fn();

        const props = {
            guessWord: guessWordMock
        }

        const wrapper = shallow(<UnconnectedInput {...props} />);
        const submitButton = findByTestAttr(wrapper, 'submit-button');
        submitButton.simulate('click');

        const guessWordCallCount = guessWordMock.mock.calls.length;
        expect(guessWordCallCount).toBe(1);
    });
});
