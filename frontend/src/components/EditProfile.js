import React, { useState, useEffect, useContext } from 'react';
import { styled } from '@mui/material/styles';
import {
  TextField,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
} from '@mui/material';
import { FaEdit, FaSave, FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { toast } from 'react-toastify';

const Root = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(3),
}));

const AvatarWrapper = styled('div')(({ theme }) => ({
  width: theme.spacing(15),
  height: theme.spacing(12),
  marginBottom: theme.spacing(4),
  position: 'relative',
  '&:hover': {
    '& $editIcon': {
      opacity: 1,
    },
  },
}));

const EditIcon = styled(FaEdit)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  right: 0,
  background: theme.palette.background.paper,
  borderRadius: '50%',
  opacity: 0,
  transition: 'opacity 0.3s',
  padding: theme.spacing(0.5),
  '&:hover': {
    cursor: 'pointer',
  },
}));

const Form = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: 300,
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: '100%',
  marginBottom: theme.spacing(1),
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  marginLeft: theme.spacing(0),
}));

const SaveButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  backgroundColor: theme.palette.success.main,
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.success.dark,
  },
}));

const EditButton = styled(StyledIconButton)(({ theme }) => ({
  padding: theme.spacing(1),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  borderRadius: theme.shape.borderRadius,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const EditButtonText = styled(Typography)(({ theme }) => ({
  marginLeft: theme.spacing(1),
}));

const EditProfileModal = () => {
  const { email, updateUserProfile } = useContext(AuthContext);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const handleOpenDialog = () => {
    setOpen(true);
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`http://localhost:8080/login/user-profile/${email}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }
        const data = await response.json();
        setName(data.name);
        setPhoneNo(data.phoneNo);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        toast.error('Failed to fetch user profile');
      }
    };
    fetchUserProfile();
  }, [email]);

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:8080/login/update-profile/${email}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, phoneNo }),
      });
      if (!response.ok) {
        throw new Error('Failed to update user profile');
      }
      setEditMode(false);
      setOpen(false);
      navigate('/profile');
      toast.success('Profile updated successfully!');
      updateUserProfile({ name, phoneNo });
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  const handleCloseDialog = () => {
    setOpen(false);
    navigate('/profile');
  };

  return (
    <Root>
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>
          <Box display="flex" alignItems="center">
            <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
              <FaUserCircle />
            </Avatar>
            <Typography variant="h6">Edit Profile</Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Form>
            <AvatarWrapper>
              <Avatar sx={{ width: 120, height: 120, bgcolor: 'black' }}>
                <FaUserCircle size={64} />
              </Avatar>
              <EditIcon className="editIcon" onClick={handleOpenDialog} />
            </AvatarWrapper>
            <StyledTextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={!editMode}
              variant="outlined"
            />
            <StyledTextField
              label="Phone Number"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              disabled={!editMode}
              variant="outlined"
            />
            {editMode ? (
              <SaveButton onClick={handleSave} variant="contained">
                <FaSave />
                &nbsp; Save
              </SaveButton>
            ) : (
              <EditButton onClick={() => setEditMode(true)}>
                <FaEdit />
                <EditButtonText>Click to edit</EditButtonText>
              </EditButton>
            )}
          </Form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Root>
  );
};

export default EditProfileModal;
