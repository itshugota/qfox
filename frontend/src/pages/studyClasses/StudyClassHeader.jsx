import React from 'react';
import { useSelector } from 'react-redux';

import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const StudyClassHeader = ({
  classes,
  allStudyClassLength,
  createdStudyClassesLength,
  otherStudyClassesLength,
  tabValue,
  handleChangeTab
}) => {
  const authState = useSelector(state => state.auth);

  return (
    <div className={classes.header}>
      <Grid container>
        <Grid item className={classes.leftContainer}>
          <Avatar
            alt="Profile Picture"
            src={authState.userProfile.profilePictureUrl}
            className={classes.headerAvatar}
          />
        </Grid>
        <Grid item className={classes.rightContainer}>
          <Typography variant="h4">{authState.userProfile.name}</Typography>
          <Tabs
            classes={{ indicator: classes.tabIndicator }}
            className={classes.tabs}
            value={tabValue}
            onChange={handleChangeTab}
          >
            <Tab
              className={classes.tab}
              label={`All (${allStudyClassLength})`}
              classes={{ selected: classes.selectedTab }}
            />
            <Tab
              className={classes.tab}
              label={`Created (${createdStudyClassesLength})`}
              classes={{ selected: classes.selectedTab }}
            />
            <Tab
              className={classes.tab}
              label={`Others (${otherStudyClassesLength})`}
              classes={{ selected: classes.selectedTab }}
            />
          </Tabs>
        </Grid>
      </Grid>
    </div>
  );
};

export default StudyClassHeader;
