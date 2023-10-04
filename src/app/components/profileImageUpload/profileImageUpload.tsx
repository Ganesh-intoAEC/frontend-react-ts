import React, { useState } from 'react';
import {
  IconButton,
  Tooltip,
} from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import UserImageUpload from '../../../assets/icons/userImageUpload';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Image from 'next/image'




const ImageUpload: React.FC = () => {

  const [image, setImage] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteImgModal, setdeleteImgModal] = React.useState(false);


  const defaultUserIcon = <UserImageUpload style={{ fontSize: '50px' }} />;
  const editIcon = isEditing ? (
    <CancelIcon style={{ fontSize: '20px', color: '#3CA2FF' }} />
  ) : (
    <EditIcon style={{ fontSize: '20px', color: '#3CA2FF' }} />
  );
  
  const replaceIcon = (
    <label htmlFor="image-upload-input">
      <IconButton
      style={{ backgroundColor: 'rgb(255 255 255)',
      borderRadius: '50%',
      position: 'absolute',
      right: '0',bottom: '0',
      filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.08))'}}
        component="span"
      >
        <PhotoCameraIcon style={{ fontSize: '20px', color: '#3CA2FF' }} />
      </IconButton>
    </label>
  );

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
 
      if (file) {
        // Process the uploaded image
        const reader = new FileReader();
        reader.onload = (e) => {
          const uploadedImage = e.target?.result as string;
          setImage(uploadedImage);
        };
        reader.readAsDataURL(file);
        setIsEditing(false);
        setIsEditMode(false);
      }
    }
  };

  const handleEditClick = () => {
    if (!image) {
      setIsEditing(true);
    }
    setIsEditMode(!isEditMode);
  };

  const handleDeleteClick = () => {
    // if(value == 'delete'){
    //   setdeleteImgModal(true);
    // }
    // setdeleteImgModal(true);
    setdeleteImgModal(true);
 
    setIsEditing(false);
    setIsEditMode(false);
    
  };

  const handleClose = () => {
    setdeleteImgModal(false);
  };

  const confirmImgDelete = () => {
    setImage(null);
    setdeleteImgModal(true);
    setdeleteImgModal(false);
  };

  const deleteIcon = (
    <IconButton
      onClick={handleDeleteClick}
      style={{ backgroundColor: 'rgb(255 255 255)',
      borderRadius: '50%',
      position: 'absolute',
      right: '0',top: '0',
      filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.08))'}}
    >
      <DeleteIcon style={{ fontSize: '20px', color: '#3CA2FF' }} />
    </IconButton>
  );

  return (
    <div style={{ position: 'relative', display: 'inline-block' ,border: '3px solid #3CA2FF', borderRadius: '70px'}} className='mt-2'>
      <div
        style={{
        //   position: 'relative',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          overflow: 'hidden',
        }}
      >
        {image ? (
          <Image
            src={image}
            alt="User"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            loading="lazy"
          />
        ) : (
          defaultUserIcon
        )}
        {isEditMode && (
          <div>
            {isEditing ? (
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
                id="image-upload-input"
              />
            ) : null}
            {replaceIcon}
            {deleteIcon}
          </div>
        )}
      </div>
      {!isEditMode && (
        <Tooltip title="Edit">
          <IconButton
            onClick={handleEditClick}
            style={{ backgroundColor: 'rgb(255 255 255)',
      borderRadius: '50%',
      position: 'absolute',
      right: '0',bottom: '0',
      filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.08))'}}
          >
            {editIcon}
          </IconButton>
        </Tooltip>
      )}

<div>
      
      <Dialog
        open={deleteImgModal}
        onClose={handleDeleteClick}
        maxWidth={'xs'}
        sx={{textAlign:'center'}}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to remove this Profile image?"}
        </DialogTitle>
        <DialogContent>
          
        </DialogContent>
        <DialogActions className="justify-content-center mb-2">
            <Button
              variant="contained"
              color="primary"
              sx={{ width: "174px", height: "48px", background: "#109CF1" }}
              onClick={handleClose}
            >
              {"No"}
            </Button>
            <Button
              variant="outlined"
              color= "error"
              sx={{
                width: "174px",
                height: "48px",
                color: "#FF3C5F",
              }}
              onClick={confirmImgDelete}
            >
              Yes
            </Button>
          </DialogActions>
      </Dialog>
    </div>
    </div>
  );
};

export default ImageUpload;
