import React, {FC} from 'react';
import {render, screen, mockHistory} from '../../../tests/utils';
import * as store from '../../../store/store';
import PrivateRoute from './private-route';
import {AppPaths, AuthorizationStatuses} from '../../../constants';

const mockPreloader = jest.fn(() => '');
jest.mock(
  '../preloader/preloader.tsx',
  () => jest.fn(() => mockPreloader())
);

const MockComponent:FC<{a: string}> = ({a}) => <>{a}{''}</>;

const mockAuthSelector = jest.spyOn(store, 'useAppSelector');
mockAuthSelector.mockReturnValue(AuthorizationStatuses.authorized);

const mockSetBackUrl = jest.fn();
jest.mock(
  '../../../services/session-storage.ts',
  () => {
    const mockLoginBackUrl = {set: () => mockSetBackUrl()};
    return {loginBackUrl: mockLoginBackUrl};
  }
);

describe('PrivatRoute component', () => {
  it('handles path correctly', () => {
    mockHistory.push('/wrong-path');
    render(<PrivateRoute path={'/test-path'} exact render={() => 'Path is matching'} />);

    expect(screen.queryByText('Path is matching')).toBeNull();

    mockHistory.push('/test-path');

    expect(screen.queryByText('Path is matching')).toBeInTheDocument();
  });

  it('renders recieved component correctly', () => {
    render(<PrivateRoute render={() => <MockComponent a='Test-string' />} />);

    expect(screen.getByText('Test-string')).toBeInTheDocument();
  });

  it('renders Preloader when authorization status is unknown', () => {
    mockAuthSelector.mockReturnValue(null);
    render(<PrivateRoute render={() => 'Never'}/>);

    expect(mockPreloader).toBeCalledTimes(1);
    expect(screen.queryByText('Never')).toBeNull();
  });

  it('redirects to Login page when user is not authorized', () => {
    mockAuthSelector.mockReturnValue(AuthorizationStatuses.notAuthorized);
    render(<PrivateRoute render={() => 'Never'}/>);


    expect(mockHistory.location.pathname).toBe(AppPaths.LOGIN);
    expect(screen.queryByText('Never')).toBeNull();
  });

  it('calls url-storage servise before redirecting', () => {
    mockAuthSelector.mockReturnValue(AuthorizationStatuses.notAuthorized);
    render(<PrivateRoute render={() => 'Never'}/>);

    expect(mockSetBackUrl).toBeCalledTimes(1);
  });
});
