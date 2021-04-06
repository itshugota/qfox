/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRedux } from 'react-redux';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import defaultProfilePicture from '/images/profile-default.jpg';

import UpdateProfilePictureDiaglog from './updateProfilePicture/UpdateProfilePictureDialog';

import { userActions } from '../../states/users';

const UpdateProfilePicture = ({ authState, classes }) => {
  const { t } = useTranslation();

  const [profilePictureData, setProfilePictureData] = useState('');
  const [fileInputValue, setFileInputValue] = useState('');
  const [isFileSelected, setIsFileSelected] = useState(false);

  const [userAsyncStatus, { updateUser }] = useRedux(
    state => state.userAsyncStatus,
    {
      updateUser: ({ userId, updateFields }) =>
        userActions.updateUser.pending({ userId, updateFields })
    }
  );

  const handleFileSelected = e => {
    setIsFileSelected(true);
    setFileInputValue(e.target.value);
    setProfilePictureData(e.target.files[0]);
  };

  const handleResetFileSelected = () => {
    setIsFileSelected(false);
    setFileInputValue('');
    setProfilePictureData('');
  };

  const handleSubmitProfilePicture = value => {
    updateUser({
      userId: authState.userProfile.id,
      updateFields: { profile_picture_data: value }
    });
  };

  return (
    <React.Fragment>
      <Grid container direction="row" spacing={1} className={classes.grid}>
        <Grid item xs={3} align="center">
          <Avatar
            className={classes.icon}
            alt="Profile Picture"
            src={
              authState.userProfile.profilePictureUrl || defaultProfilePicture
            }
          />
          <Typography
            variant="h5"
            color="textSecondary"
            className={classes.title}
          >
            {t('Profile Picture')}
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Paper className={classes.paper}>
            <Typography
              variant="h5"
              color="textSecondary"
              className={classes.title}
            >
              {t('Change your profile picture')}
            </Typography>
            <input
              accept="image/*"
              className={classes.fileInput}
              id="contained-button-file"
              multiple
              disabled={userAsyncStatus.isLoading}
              type="file"
              onChange={handleFileSelected}
              value={fileInputValue}
            />
            <label htmlFor="contained-button-file">
              <Button
                variant="contained"
                component="span"
                color="primary"
                disabled={userAsyncStatus.isLoading}
                className={classes.button}
              >
                {t('Upload profile picture')}
              </Button>
            </label>
            {isFileSelected && (
              <UpdateProfilePictureDiaglog
                classes={classes}
                profilePictureData={profilePictureData}
                handleSubmitProfilePicture={handleSubmitProfilePicture}
                handleResetFileSelected={handleResetFileSelected}
              />
            )}
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default UpdateProfilePicture;
