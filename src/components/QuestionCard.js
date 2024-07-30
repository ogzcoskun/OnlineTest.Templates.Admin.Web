import React from 'react';
import { Card, CardContent, CardHeader, IconButton, Button, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const questionTypes = [
  { label: "Single String Input", value: 0 },
  { label: "Multiple String Inputs", value: 1 },
  { label: "Single Choice", value: 2 },
  { label: "Multiple Choice", value: 3 },
  { label: "Answer With Explanation", value: 4 },
  { label: "Multiple File Uploads", value: 5 }
];

const getQuestionType = (type) => questionTypes.find(q => q.value === type)?.label || "Unknown Type";

const QuestionCard = ({ question, onDelete, onViewRelated }) => {
  return (
    <Card sx={{ my: 2, boxShadow: 3, borderRadius: 2, position: 'relative' }}>
      <CardHeader
        title={question.quesiton}
        subheader={`Type: ${getQuestionType(question.questionType)}`}
        sx={{ backgroundColor: '#f5f5f5' }}
        action={
          <>
            {(question.questionType === 2 || question.questionType === 3) && (
              <Button onClick={() => onViewRelated(question)}>Soruları Görüntüle</Button>
            )}
            <IconButton onClick={() => onDelete(question)}>
              <DeleteIcon />
            </IconButton>
          </>
        }
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary">
          {question.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default QuestionCard;