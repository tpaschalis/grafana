import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ExploreId, ExploreQueryParams } from 'app/types/explore';
import { ErrorBoundaryAlert } from '@grafana/ui';
import { lastSavedUrl, resetExploreAction, richHistoryUpdatedAction } from './state/main';
import { getRichHistory } from '../../core/utils/richHistory';
import { ExplorePaneContainer } from './ExplorePaneContainer';
import { GrafanaRouteComponentProps } from 'app/core/navigation/types';
import { Branding } from '../../core/components/Branding/Branding';

import { getNavModel } from '../../core/selectors/navModel';
import { StoreState } from 'app/types';

interface RouteProps extends GrafanaRouteComponentProps<{}, ExploreQueryParams> {}
interface OwnProps {}

type Props = OwnProps & RouteProps;

const useExploreTitle = () => {
  const navModel = useSelector((state: StoreState) => getNavModel(state.navIndex, 'explore'));
  const exploreTitle = useSelector((state: StoreState) =>
    [state.explore.left.datasourceInstance?.name, state.explore.right?.datasourceInstance?.name]
      .filter(Boolean)
      .join(' | ')
  );

  if (exploreTitle) {
    document.title = `${navModel.main.text} - ${exploreTitle} - ${Branding.AppTitle}`;
  }
};

const useRichHistoryUpdater = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const richHistory = getRichHistory();
    dispatch(richHistoryUpdatedAction({ richHistory }));

    return () => {
      dispatch(resetExploreAction({}));
    };
  }, [dispatch]);
};

const Wrapper = (props: Props) => {
  useExploreTitle();
  useRichHistoryUpdater();

  useEffect(() => {
    lastSavedUrl.left = undefined;
    lastSavedUrl.right = undefined;
  }, []);

  const { state } = props.queryParams;
  const { left, right } = JSON.parse(state || '{}');

  const hasSplit = Boolean(left) && Boolean(right);

  return (
    <div className="page-scrollbar-wrapper">
      <div className="explore-wrapper">
        <ErrorBoundaryAlert style="page">
          <ExplorePaneContainer split={hasSplit} exploreId={ExploreId.left} urlQuery={JSON.stringify(left)} />
        </ErrorBoundaryAlert>
        {hasSplit && (
          <ErrorBoundaryAlert style="page">
            <ExplorePaneContainer split={hasSplit} exploreId={ExploreId.right} urlQuery={JSON.stringify(right)} />
          </ErrorBoundaryAlert>
        )}
      </div>
    </div>
  );
};

export default Wrapper;
