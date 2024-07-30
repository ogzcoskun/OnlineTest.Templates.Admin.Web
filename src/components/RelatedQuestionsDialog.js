import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const RelatedQuestionsDialog = ({ open, relatedQuestions, onClose, onAdd, onChange, onRemove, onSave }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>İlgili Sorular</DialogTitle>
      <DialogContent>
        {relatedQuestions.map((question, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              value={question}
              onChange={(e) => onChange(index, e.target.value)}
              sx={{ mr: 1 }}
            />
            <IconButton onClick={() => onRemove(index)} color="error">
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
        <Button onClick={onAdd}>Soru Ekle</Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>İptal</Button>
        <Button onClick={onSave}>Kaydet</Button>
      </DialogActions>
    </Dialog>
  );
};

export default RelatedQuestionsDialog;