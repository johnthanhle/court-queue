import React from "react";
import { Box, Button, Container } from "@material-ui/core";
import { Add, Remove } from "@material-ui/icons";

import PlayerList from "./PlayerList";
import PlayerInfo from "./PlayerInfo";
import CourtList from "./CourtList";

const DEFAULT_USER = { uid: -1, name: undefined, uid2: -1, name2: "No partner name provided" };

const PlayerView = props => {
  const {user, users} = props;

  const handleJoinQueue = () => {
    const msg = { type: "action", action: "add", value: user };
    props.wsSend(JSON.stringify(msg));
  };
  const handleLeaveQueue = () => {
    const msg = { type: "action", action: "remove", value: user };
    props.wsSend(JSON.stringify(msg));
  };

  const updateCourtStatus = courts => {
    const msg = { type: "action", action: "courtStatusUpdate", value: courts};
    props.wsSend(JSON.stringify(msg));
  }

  return (
    <Container maxWidth="sm">
      <h1><center>Open Gym Queue</center></h1>
      {user && (
        <PlayerInfo
          user={user}
          defaultUser={DEFAULT_USER}
          updateFunction={props.userUpdateFunction}
        />
      )}
      <PlayerList users={users} />
      <Box display="flex" flexDirection="row" justifyContent="center">
        <Box p={1}>
          <Button
            onClick={handleJoinQueue}
            color="primary"
            variant="contained"
            startIcon={<Add />}
          >
            Join Queue
          </Button>
        </Box>
        <Box p={1}>
          <Button
            onClick={handleLeaveQueue}
            color="secondary"
            variant="contained"
            startIcon={<Remove />}
          >
            Leave Queue
          </Button>
        </Box>
      </Box>
      <CourtList 
        courtStatus={props.courtStatus} 
        updateBackend={updateCourtStatus}
        updateCookie={props.courtUpdateFunction} />
    </Container>
  );
};

export default PlayerView;
