/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import ProLayout from '@ant-design/pro-layout';
import React, { useEffect } from 'react';
import Link from 'umi/link';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
// import Authorized from '@/utils/Authorized';
import RightContent from '@/components/GlobalHeader/RightContent';
// import GlobalFooter from '@/components/GlobalFooter';
import logo from '../assets/logo.png';
import { sendToElectron } from '../utils/utils';
/**
 * use Authorized check all menu item
 */
const menuDataRender = menuList =>
  menuList.filter(item => {
    // if a menu only for electron then don't render it when user open app in browser
    // __electron__ is set in `dia-electron/app/main/preload.ts`
    if (item.electron && !window.__electron__) {
      return false;
    }
    return true;
  });
// menuList.map(item => {
//   const localItem = { ...item, children: item.children ? menuDataRender(item.children) : [] };
//   return Authorized.check(item.authority, localItem, null);
// });

const footerRender = () => '';
// <GlobalFooter/>

const BasicLayout = props => {
  // const { dispatch, children, settings, user } = props;
  const { dispatch, children, settings } = props;
  /**
   * constructor
   */

  useEffect(() => {
    if (dispatch) {
      // dispatch({
      //   type: 'user/fetchCurrent',
      // });
      dispatch({
        type: 'settings/getSetting',
      });
    }
  }, []);
  /**
   * init variables
   */

  const handleMenuCollapse = payload =>
    dispatch &&
    dispatch({
      type: 'global/changeLayoutCollapsed',
      payload,
    });

  // Doc about `ProLayout`: https://prolayout.ant.design/#api
  return (
    <div className="munew-pro-layout-wrapper">
      <ProLayout
        logo={logo}
        onCollapse={handleMenuCollapse}
        menuItemRender={(menuItemProps, defaultDom) => {
          if (menuItemProps.isUrl) {
            return defaultDom;
          }

          if (menuItemProps.path === '/app/#defaultsoi') {
            return (
              <Link
                to="#"
                id="munew_default_soi_menu"
                onClick={() => {
                  sendToElectron('soiEditor/open');
                }}
              >
                {defaultDom}
              </Link>
            );
          }

          if (menuItemProps.path === '/app/#settings') {
            return (
              <Link
                to="#"
                id="munew_default_settings_menu"
                onClick={() => {
                  sendToElectron('settings/open');
                }}
              >
                {defaultDom}
              </Link>
            );
          }
          return <Link to={menuItemProps.path}>{defaultDom}</Link>;
        }}
        breadcrumbRender={(routers = []) => [
          {
            path: '/',
            breadcrumbName: formatMessage({
              id: 'app.common.messages.menu.home',
              defaultMessage: 'Home',
            }),
          },
          ...routers,
        ]}
        itemRender={(route, params, routes, paths) => {
          const first = routes.indexOf(route) === 0;
          return first ? (
            <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
          ) : (
            <span>{route.breadcrumbName}</span>
          );
        }}
        footerRender={footerRender}
        menuDataRender={menuDataRender}
        formatMessage={formatMessage}
        rightContentRender={rightProps => <RightContent {...rightProps} />}
        {...props}
        {...settings}
      >
        {children}
      </ProLayout>
    </div>
  );
};

export default connect(({ global, settings, user }) => ({
  collapsed: global.collapsed,
  settings,
  user: user && user.currentUser,
}))(BasicLayout);
