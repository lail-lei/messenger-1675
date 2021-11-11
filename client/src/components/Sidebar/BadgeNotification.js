import React from "react";
import { Box, Badge } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  badge: {
    backgroundColor: theme.palette.primary.light,
    ...theme.typography.notification,
    ...theme.typography.bold,
  },
  sidebar: {
    marginRight: theme.spacing(3)
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