import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Divider, CircularProgress, Fab, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Select, MenuItem, InputLabel, FormControl, IconButton, DialogContentText } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import QuestionCard from './QuestionCard';
import {
  getAllQuestions,
  createQuestion,
  deleteQuestion,
  getRelatedQuestions,
  updateChoiceAnswerOptions
} from '../services/questionService';

const questionTypes = [
  { label: "Single String Input", value: 0 },
  { label: "Multiple String Inputs", value: 1 },
  { label: "Single Choice", value: 2 },
  { label: "Multiple Choice", value: 3 },
  { label: "Answer With Explanation", value: 4 },
  { label: "Multiple File Uploads", value: 5 }
];

const Questions = () => {
  const [open, setOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [relatedQuestionsDialogOpen, setRelatedQuestionsDialogOpen] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState(null);
  const [questionToViewRelated, setQuestionToViewRelated] = useState(null);
  const [newQuestion, setNewQuestion] = useState({
    questionClass: '',
    quesiton: '',
    questionType: '',
    description: ''
  });
  const [questions, setQuestions] = useState([]);
  const [relatedQuestions, setRelatedQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const data = await getAllQuestions();
      setQuestions(data);
    } catch (error) {
      setError('Failed to fetch questions.');
    } finally {
      setLoading(false);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setNewQuestion({ ...newQuestion, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    try {
      await createQuestion(newQuestion);
      fetchQuestions();
      handleClose();
    } catch (error) {
      setError('Failed to create question.');
    }
  };

  const handleDeleteOpen = (question) => {
    setQuestionToDelete(question);
    setDeleteDialogOpen(true);
  };

  const handleDeleteClose = () => {
    setQuestionToDelete(null);
    setDeleteDialogOpen(false);
  };

  const handleDelete = async () => {
    try {
      await deleteQuestion(questionToDelete.questionId);
      fetchQuestions();
      handleDeleteClose();
    } catch (error) {
      setError('Failed to delete question.');
    }
  };

  const handleViewRelatedOpen = async (question) => {
    setQuestionToViewRelated(question);
    try {
      const data = await getRelatedQuestions(question.questionId);
      setRelatedQuestions(data ? JSON.parse(data.answerInfo) : []);
      setRelatedQuestionsDialogOpen(true);
    } catch (error) {
      setError('Failed to fetch related questions.');
    }
  };

  const handleRelatedQuestionsClose = () => {
    setQuestionToViewRelated(null);
    setRelatedQuestions([]);
    setRelatedQuestionsDialogOpen(false);
  };

  const handleAddRelatedQuestion = () => {
    setRelatedQuestions([...relatedQuestions, '']);
  };

  const handleRelatedQuestionChange = (index, value) => {
    const newRelatedQuestions = [...relatedQuestions];
    newRelatedQuestions[index] = value;
    setRelatedQuestions(newRelatedQuestions);
  };

  const handleRemoveRelatedQuestion = (index) => {
    const newRelatedQuestions = relatedQuestions.filter((_, i) => i !== index);
    setRelatedQuestions(newRelatedQuestions);
  };

  const handleSaveRelatedQuestions = async () => {
    if (questionToViewRelated) {
      try {
        await updateChoiceAnswerOptions(questionToViewRelated.questionId, relatedQuestions);
        handleRelatedQuestionsClose();
      } catch (error) {
        setError('Failed to save related questions.');
      }
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  const groupedQuestions = questions.reduce((acc, question) => {
    if (!acc[question.questionClass]) {
      acc[question.questionClass] = [];
    }
    acc[question.questionClass].push(question);
    return acc;
  }, {});

  return (
    <Container>
      <Box sx={{ my: 4, position: 'relative' }}>
        <Fab color="primary" aria-label="add" onClick={handleClickOpen} sx={{ position: 'absolute', right: 0, top: -20 }}>
          <AddIcon />
        </Fab>
        {Object.keys(groupedQuestions).map((questionClass, index) => (
          <Box key={index} sx={{ my: 4 }}>
            <Typography variant="h4" color="secondary" sx={{ mb: 2 }}>
              {questionClass}
            </Typography>
            {groupedQuestions[questionClass].map((question) => (
              <QuestionCard
                key={question.questionId}
                question={question}
                onDelete={handleDeleteOpen}
                onViewRelated={handleViewRelatedOpen}
              />
            ))}
            <Divider sx={{ mt: 4, mb: 4 }} />
          </Box>
        ))}
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Yeni Soru Oluştur</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="questionClass"
            label="Soru Sınıfı"
            type="text"
            fullWidth
            variant="standard"
            value={newQuestion.questionClass}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="quesiton"
            label="Soru"
            type="text"
            fullWidth
            variant="standard"
            value={newQuestion.quesiton}
            onChange={handleChange}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel id="questionType-label">Soru Türü</InputLabel>
            <Select
              labelId="questionType-label"
              name="questionType"
              value={newQuestion.questionType}
              onChange={handleChange}
              label="Soru Türü"
            >
              {questionTypes.map((type) => (
                <MenuItem key={type.value} value={type.value}>
                  {type.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            name="description"
            label="Açıklama"
            type="text"
            fullWidth
            variant="standard"
            value={newQuestion.description}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>İptal</Button>
          <Button onClick={handleCreate}>Oluştur</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={deleteDialogOpen} onClose={handleDeleteClose}>
        <DialogTitle>Soruyu Sil</DialogTitle>
        <DialogContent>
          <DialogContentText>
            "{questionToDelete?.quesiton}" sorusunu silmek istediğinize emin misiniz?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose}>İptal</Button>
          <Button onClick={handleDelete} color="error">Sil</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={relatedQuestionsDialogOpen} onClose={handleRelatedQuestionsClose}>
        <DialogTitle>İlgili Sorular</DialogTitle>
        <DialogContent>
          {relatedQuestions.map((question, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <TextField
                fullWidth
                variant="outlined"
                value={question}
                onChange={(e) => handleRelatedQuestionChange(index, e.target.value)}
                sx={{ mr: 1 }}
              />
              <IconButton onClick={() => handleRemoveRelatedQuestion(index)} color="error">
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
          <Button onClick={handleAddRelatedQuestion}>Soru Ekle</Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRelatedQuestionsClose}>İptal</Button>
          <Button onClick={handleSaveRelatedQuestions}>Kaydet</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Questions;