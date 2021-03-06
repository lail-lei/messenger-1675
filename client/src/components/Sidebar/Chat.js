import React from "react";
import { Box } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { makeStyles } from "@material-ui/core/styles";
import { assignActiveChat } from "../../store/utils/thunkCreators";
import { connect } from "react-redux";
import BadgeNotification from "./BadgeNotification";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: "0 2px 10px 0 rgba(88,133,196,0.05)",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "grab"
    }
  }
}));

const Chat = (props) => {
  const classes = useStyles();
  const { conversation } = props;
  const { otherUser, unread } = conversation;

  const handleClick = async (conversation) => {
    const { id, otherUser, unread, messages } = conversation;
    const lastMessage = messages.length > 0 ? messages[messages.length-1].id : null;
    await props.setActiveChat(otherUser.username, id, unread, lastMessage);
  };

  return (
    <Box onClick={() => handleClick(conversation)} className={classes.root}>
      <BadgeAvatar
        photoUrl={otherUser.photoUrl}
        username={otherUser.username}
        online={otherUser.online}
        sidebar={true}
      />
      <ChatContent conversation={conversation} />
      {unread > 0 &&
       <BadgeNotification sidebar={true} count={`${unread}`} username={otherUser.username}/> }
    </Box>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveChat: (username, id, unread, last) => {
      dispatch(assignActiveChat(username, id, unread, last));
    }
  };
};

export default connect(null, mapDispatchToProps)(Chat);
