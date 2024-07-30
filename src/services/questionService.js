import axios from 'axios';

const API_URL = 'https://localhost:44352/api/Questions';

export const getAllQuestions = async () => {
  try {
    const response = await axios.get(`${API_URL}/GetAllQuestions`, {
      headers: {
        'Accept': '*/*'
      }
    });
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to fetch questions');
  }
};

export const createQuestion = async (newQuestion) => {
  try {
    const response = await axios.post(`${API_URL}/CreateQuestion`, newQuestion, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*'
      }
    });
    return response.status === 200;
  } catch (error) {
    throw new Error('Failed to create question');
  }
};

export const deleteQuestion = async (questionId) => {
  try {
    const response = await axios.post(`${API_URL}/DeleteQuestion?id=${questionId}`, null, {
      headers: {
        'Accept': '*/*'
      }
    });
    return response.status === 200;
  } catch (error) {
    throw new Error('Failed to delete question');
  }
};

export const getRelatedQuestions = async (questionId) => {
  try {
    const response = await axios.get(`${API_URL}/GetRelatedQuestions?questionId=${questionId}`, {
      headers: {
        'Accept': '*/*'
      }
    });
    return response.data.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      return null; // No related questions
    } else {
      throw new Error('Failed to fetch related questions');
    }
  }
};

export const createChoiceAnswerOptions = async (questionId, answerInfo) => {
  try {
    const response = await axios.post(`${API_URL}/CreateChoiceAnswerOptions`, {
      questionId,
      answerInfo
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*'
      }
    });
    return response.status === 200;
  } catch (error) {
    throw new Error('Failed to create choice answer options');
  }
};

export const updateChoiceAnswerOptions = async (questionId, answerInfo) => {
  try {
    const response = await axios.post(`${API_URL}/UpdateChoiceAnswerOptions`, {
      questionId,
      answerInfo
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*'
      }
    });
    return response.status === 200;
  } catch (error) {
    throw new Error('Failed to update choice answer options');
  }
};