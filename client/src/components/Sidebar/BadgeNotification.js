import React from "react";
import { Box, Badge } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
 
  badge: {
    height: 13,
    width: 13,
    borderRadius: "50%",
    border: "2px solid white",
    fontSize: "100px",
    backgroundColor: "#3A8DFF"
  },
  online: {
    backgroundColor: "#1CED84"
  },
  sidebar: {
    marginRight: 17
  }
}));

const BadgeNotification  = (props) => {
  const classes = useStyles();
  const { sidebar, count } = props;

  return (
    <Box className={sidebar ? classes.sidebar : ""}>
      <Badge
        classes={{ badge: classes.badge }}
        variant="string"
        badgeContent={count}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        overlap="circle">
      </Badge>
    </Box>
  );
};

export default BadgeNotification;