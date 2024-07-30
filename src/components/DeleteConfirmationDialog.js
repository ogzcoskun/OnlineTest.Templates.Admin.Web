import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

const DeleteConfirmationDialog = ({ open, handleClose, handleDelete, question }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Soruyu Sil</DialogTitle>
      <DialogContent>
        <DialogContentText>
          "{question.quesiton}" sorusunu silmek istediğinizden emin misiniz?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          İptal
        </Button>
        <Button onClick={handleDelete} color="secondary">
          Sil
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;