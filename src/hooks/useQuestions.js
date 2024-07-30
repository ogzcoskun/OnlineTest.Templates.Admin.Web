import { useState, useEffect } from 'react';
import { getAllQuestions, createQuestion, deleteQuestion, getRelatedQuestions, updateChoiceAnswerOptions } from '../services/questionService';

const useQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedQuestions, setRelatedQuestions] = useState([]);
  const [questionToViewRelated, setQuestionToViewRelated] = useState(null);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const questions = await getAllQuestions();
      setQuestions(questions);
    } catch (error) {
      setError('Failed to fetch questions.');
    } finally {
      setLoading(false);
    }
  };

  const createNewQuestion = async (newQuestion) => {
    try {
      const success = await createQuestion(newQuestion);
      if (success) {
        fetchQuestions();
      } else {
        setError('Failed to create question. Please check the input values.');
      }
    } catch (error) {
      setError(`Failed to create question: ${error.message}`);
    }
  };

  const deleteExistingQuestion = async (question) => {
    try {
      const success = await deleteQuestion(question.questionId);
      if (success) {
        fetchQuestions();
      } else {
        setError('Failed to delete question.');
      }
    } catch (error) {
      setError(`Failed to delete question: ${error.message}`);
    }
  };

  const viewRelatedQuestions = async (question) => {
    setQuestionToViewRelated(question);
    try {
      const data = await getRelatedQuestions(question.questionId);
      setRelatedQuestions(data ? JSON.parse(data.answerInfo) : []);
      return data;
    } catch (error) {
      setRelatedQuestions([]);
      throw error;
    }
  };

  const updateChoiceAnswerOptions = async (questionId, answerInfo) => {
    try {

        console.log("Geldi");

      const success = await updateChoiceAnswerOptions(questionId, answerInfo);
      return success;
    } catch (error) {
      throw new Error('Failed to update choice answer options');
    }
  };

  return {
    questions,
    loading,
    error,
    relatedQuestions,
    createNewQuestion,
    deleteExistingQuestion,
    viewRelatedQuestions,
    updateChoiceAnswerOptions,
    setRelatedQuestions,
    setQuestionToViewRelated
  };
};

export default useQuestions;