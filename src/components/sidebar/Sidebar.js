import { Drawer, List } from "@material-ui/core";
import classNames from "classnames";
import React from "react";
// context
import { useLayoutState } from "../../context/LayoutContext";
import {OTRS_USER_SIDEBAR_LINKS } from "./helpers/SidebarItems";
import SidebarLink from "./helpers/SidebarLink/SidebarLink";
import { useUserState } from "../../context/UserContext";
import styles from "./style";

function Sidebar({ location }) {
  const classes = styles();

  // global
  var { isSidebarOpened } = useLayoutState();


  // local
  let sidebarLinks = OTRS_USER_SIDEBAR_LINKS;

  return (
    // TODO: Sandeep - Add dynamic variant based on the device width. i.e, for mobile devices use variant="temporary"
    <Drawer
      variant="permanent"
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
    >
      <div className={classes.toolbar} />
      <List className={classes.sidebarList}>
        {sidebarLinks.map(link => (
          <SidebarLink
            key={link.id}
            location={location}
            isSidebarOpened={isSidebarOpened}
            {...link}
          />
        ))}
      </List>
    </Drawer>
  );
}

export default Sidebar;
