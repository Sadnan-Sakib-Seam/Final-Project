import React, { useState } from 'react';
import QuestionType from './QuestionType';

const QuestionForm = () => {
  const [questions, setQuestions] = useState([]);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState({});

  const addQuestion = () => {
    setQuestions([...questions, { id: questions.length + 1, text: '', inputType: 'text', options: [] }]);
  };

  const updateQuestion = (index, value) => {
    const updatedQuestions = questions.map((question, i) => (i === index ? { ...question, text: value } : question));
    setQuestions(updatedQuestions);
  };

  const updateInputType = (index, value) => {
    const updatedQuestions = questions.map((question, i) => (i === index ? { ...question, inputType: value, options: [] } : question));
    setQuestions(updatedQuestions);
  };

  const deleteQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  const validateForm = () => {
    const newErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!recipientEmail || !emailPattern.test(recipientEmail)) {
      newErrors.recipientEmail = 'Please enter a valid recipient email.';
    }

    const questionErrors = questions.map((question) =>
      !question.text ? 'Question text cannot be empty.' : ''
    ).filter((error) => error);
    
    if (questionErrors.length > 0) {
      newErrors.questions = 'All questions must have text.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendEmail = () => {
    if (validateForm()) {
      setLoading(true);
      setTimeout(() => {
        console.log('Email sent to:', recipientEmail);
        console.log('Email sent with questions:', questions);

        setLoading(false);
        setQuestions([]);
        setRecipientEmail('');
        setErrors({});
        setSuccessMessage('Email sent successfully!');
      }, 500);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Question Form</h2>

      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 mb-2">Recipient Email</label>
        <input
          type="email"
          value={recipientEmail}
          onChange={(e) => setRecipientEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
          placeholder="Enter recipient's email"
          required
        />
        {errors.recipientEmail && <p className="text-red-500">{errors.recipientEmail}</p>}
      </div>

      <div>
        {questions.map((question, index) => (
          <div key={question.id} className="mb-4 border p-2 rounded">
            <QuestionType
              question={question}
              updateQuestion={(value) => updateQuestion(index, value)}
              updateInputType={(value) => updateInputType(index, value)}
              deleteQuestion={() => deleteQuestion(index)}
            />
          </div>
        ))}
        <button
          onClick={addQuestion}
          className="bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 rounded hover:bg-gray-400 dark:hover:bg-gray-600 transition-all duration-300"
        >
          Add Question
        </button>
      </div>

      {errors.questions && (
        <div className="text-red-500 mt-2">
          <p>{errors.questions}</p>
        </div>
      )}

      {successMessage && <div className="text-green-500 mt-2">{successMessage}</div>}

      <div className="mt-4">
        <button
          onClick={handleSendEmail}
          className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition-all duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Send Email
        </button>
      </div>
    </div>
  );
};

export default QuestionForm;