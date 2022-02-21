import React, {FC, ReactElement} from 'react';
import {render, RenderOptions} from '@testing-library/react';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import {createMemoryHistory} from 'history';
// import {thunk} from 'redux-thunk';

export const mockHistory = createMemoryHistory();
const mockStore = configureMockStore();
const initialState = {};
const store = mockStore(initialState);

const AllTheProviders: FC = ({children}) => {
  return (
    <Provider store={store}>
      <Router history={mockHistory}>
        {children}
      </Router>
    </Provider>
  );
};
// eslint-disable-next-line
const customRender = (
    ui: ReactElement,
    options?: Omit<RenderOptions, `wrapper`>,
) => render(ui, {wrapper: AllTheProviders, ...options});

export const timeOut = (delay: number): Promise<void> => new Promise((resolve) => {
  setTimeout(() => resolve(), delay);
});

export * from '@testing-library/react';
export {customRender as render};
