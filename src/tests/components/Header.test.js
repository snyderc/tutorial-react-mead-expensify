// import ReactShallowRenderer from 'react-test-renderer/shallow';
// as opposed to full DOM rendering
// Here, not concerned about user interaction
// or lifecycle events, just what's
// getting rendered

import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../../components/Header';

test('should render header correctly', () => {
    const wrapper = shallow(<Header startLogout={ () => {} }/>);
    expect(wrapper).toMatchSnapshot();

    // expect(wrapper.find('h1').text()).toBe('Expensify');

    // ReactShallowRenderer Snapshot code:
    // const renderer = new ReactShallowRenderer();
    // renderer.render(<Header />);
    // expect(renderer.getRenderOutput()).toMatchSnapshot();
});

test('should call startLogout on button click', () => {
    const startLogout = jest.fn();
    const wrapper = shallow(<Header startLogout={ startLogout }/>);
    wrapper.find('button').simulate('click');
    expect(startLogout).toHaveBeenCalled();
});

// Snapshot Testing
// to keep track of changes
// 1st time run test case, will pass
// b/c no existing snapshot of <Header />
// It saves snapshots in components/__snapshots__
// 2nd time run test case, will compare w/ existing snapshot

// Enzyme has more features in its API
// than react-test-renderer does

// Note: An Enzyme shallow(<Header />) call
// includes more than just what you'd get in a snapshot.
// enzyme-to-json library helps us get a better snapshot.
// and it can be done automatically instead of
// having to call toJSON(wrapper) every time.
// We've done that in jest.config.json
// which is in turn wired into "yarn test" in package.json