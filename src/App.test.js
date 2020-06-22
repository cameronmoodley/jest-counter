import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import App from './App';

Enzyme.configure({ adapter: new EnzymeAdapter() });

// The setup is a factory function to create a shallow wrapper for the app component
const setup = (props = {}, state = null) => {
	const wrapper = shallow(<App {...props} />);
	state && wrapper.setState(state);
	return wrapper;
};

const findByTestAttribute = (wrapper, value) => {
	return wrapper.find(`[data-test='${value}']`);
};

test('renders without an error', () => {
	const wrapper = setup();
	const appComponent = findByTestAttribute(wrapper, 'component-app');
	expect(appComponent.length).toBe(1);
});

test('renders increment button', () => {
	const wrapper = setup();
	const incrementButton = findByTestAttribute(wrapper, 'increment-button');
	expect(incrementButton.length).toBe(1);
});

test('renders a decrement button', () => {
	const wrapper = setup();
	const decrementButton = findByTestAttribute(wrapper, 'decrement-button');
	expect(decrementButton.length).toBe(1);
});

test('renders counter display', () => {
	const wrapper = setup();
	const counterDisplay = findByTestAttribute(wrapper, 'counter-display');
	expect(counterDisplay.length).toBe(1);
});

test('counter starts at 0 ', () => {
	const wrapper = setup();
	const initialCounterState = wrapper.state('counter');
	expect(initialCounterState).toBe(0);
});

test('clicking button increments counter', () => {
	const counter = 7;
	const wrapper = setup(null, { counter });

	//find button and click
	const incrementButton = findByTestAttribute(wrapper, 'increment-button');
	incrementButton.simulate('click');

	// find test value
	const counterDisplay = findByTestAttribute(wrapper, 'counter-display');
	expect(counterDisplay.text()).toContain(counter + 1);
});

test('clicking button decrements counter', () => {
	const counter = 7;
	const wrapper = setup(null, { counter });

	const decrementButton = findByTestAttribute(wrapper, 'decrement-button');
	decrementButton.simulate('click');

	const counterDisplay = findByTestAttribute(wrapper, 'counter-display');
	expect(counterDisplay.text()).toContain(counter - 1);
});
