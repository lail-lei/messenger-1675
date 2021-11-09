import React from "react";
import { Box, Badge } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  badge: {
    borderRadius: 10,
    backgroundColor: "#3F92FF",
    fontWeight: "bold",
    minWidth: 20,
    lineHeight: 1,
    padding: "0 8px",
    height: 20,
    fontSize: 10,
    color: "#FFFFFF",
    letterSpacing: -0.5,
  },
  sidebar: {
    marginRight: 27 // derived from: (sidebar marginLeft + (midWidth/2)) = 17 + (20/2); 
  }
}));

const BadgeNotification  = (props) => {
  const classes = useStyles();
  const { sidebar, count, username } = props;

  return (
    <Box className={sidebar ? classes.sidebar : ""}>
      <Badge
        aria-label={`${count} unread messages from ${username}`}
        classes={{ badge: classes.badge }}
        variant="standard"
        badgeContent={count}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}/>
    </Box>
  );
};

export default BadgeNotification;