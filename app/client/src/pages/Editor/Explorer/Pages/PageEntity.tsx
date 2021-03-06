import React, { useCallback, memo } from "react";
import { Page } from "constants/ReduxActionConstants";
import { WidgetTree } from "../Widgets/WidgetEntity";
import Entity, { EntityClassNames } from "../Entity";
import { pageIcon, homePageIcon } from "../ExplorerIcons";
import { useParams } from "react-router";
import { ExplorerURLParams } from "../helpers";
import { getActionGroups } from "../Actions/helpers";
import { BUILDER_PAGE_URL } from "constants/routes";
import history from "utils/history";
import { updatePage } from "actions/pageActions";
import PageContextMenu from "./PageContextMenu";
import ExplorerWidgetGroup from "../Widgets/WidgetGroup";
import { DataTreeAction } from "entities/DataTree/dataTreeFactory";
import { resolveAsSpaceChar } from "utils/helpers";

type ExplorerPageEntityProps = {
  page: Page;
  isCurrentPage: boolean;
  widgets?: WidgetTree;
  actions: DataTreeAction[];
  step: number;
  searchKeyword?: string;
};
export const ExplorerPageEntity = memo((props: ExplorerPageEntityProps) => {
  const params = useParams<ExplorerURLParams>();
  const switchPage = useCallback(() => {
    if (!!params.applicationId) {
      history.push(BUILDER_PAGE_URL(params.applicationId, props.page.pageId));
    }
  }, [props.page.pageId, params.applicationId]);

  const contextMenu = (
    <PageContextMenu
      key={props.page.pageId}
      applicationId={params.applicationId}
      pageId={props.page.pageId}
      name={props.page.pageName}
      className={EntityClassNames.CONTEXT_MENU}
      isDefaultPage={props.page.isDefault}
    />
  );
  const icon = props.page.isDefault ? homePageIcon : pageIcon;
  return (
    <Entity
      icon={icon}
      name={props.page.pageName}
      className="page"
      step={props.step}
      action={switchPage}
      entityId={props.page.pageId}
      active={props.isCurrentPage}
      isDefaultExpanded={props.isCurrentPage || !!props.searchKeyword}
      updateEntityName={updatePage}
      contextMenu={contextMenu}
      nameTransformFn={resolveAsSpaceChar}
    >
      {!(!props.widgets && props.searchKeyword) && (
        <ExplorerWidgetGroup
          step={props.step + 1}
          searchKeyword={props.searchKeyword}
          widgets={props.widgets || null}
          pageId={props.page.pageId}
        />
      )}
      {getActionGroups(
        props.page,
        props.actions,
        props.step + 1,
        props.searchKeyword,
      )}
    </Entity>
  );
});

ExplorerPageEntity.displayName = "ExplorerPageEntity";

export default ExplorerPageEntity;
