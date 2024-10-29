import React, { useState, useEffect } from 'react';

const QuestionType = ({ question, updateQuestion, updateInputType, deleteQuestion }) => {
  const [options, setOptions] = useState(question.options);

  useEffect(() => {
    question.options = options;
  }, [options, question]);

  const addOption = () => {
    setOptions([...options, '']);
  };

  const updateOption = (index, value) => {
    const updatedOptions = options.map((option, i) => (i === index ? value : option));
    setOptions(updatedOptions);
  };

  const deleteOption = (index) => {
    const updatedOptions = options.filter((_, i) => i !== index);
    setOptions(updatedOptions);
  };

  const handleInputChange = (e) => {
    updateQuestion(e.target.value);
  };

  const handleInputTypeChange = (e) => {
    updateInputType(e.target.value);
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        value={question.text}
        onChange={handleInputChange}
        className="block w-full mb-2 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        placeholder="Enter your question"
      />

      <select
        onChange={handleInputTypeChange}
        value={question.inputType}
        className="block w-full mb-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
      >
        <option value="text">Text Input</option>
        <option value="radio">Multiple Choice</option>
        <option value="checkbox">Checkboxes</option>
        <option value="dropdown">Dropdown Menu</option>
        <option value="file">File Upload</option>
        <option value="date">Date</option>
        <option value="time">Time</option>
      </select>

      {(question.inputType === 'radio' || question.inputType === 'checkbox' || question.inputType === 'dropdown') && (
        <div>
          {options.map((option, index) => (
            <div key={index} className="flex items-center space-x-4 mb-2">
              <input
                type="text"
                value={option}
                onChange={(e) => updateOption(index, e.target.value)}
                className="border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Option"
              />
              <button
                onClick={() => deleteOption(index)}
                className="bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white px-2 py-1 rounded hover:bg-gray-400 dark:hover:bg-gray-600 transition-all duration-300"
              >
                Delete
              </button>
            </div>
          ))}
          <button
            onClick={addOption}
            className="mt-2 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 rounded hover:bg-gray-400 dark:hover:bg-gray-600 transition-all duration-300"
          >
            Add Option
          </button>
        </div>
      )}

      <button
        onClick={deleteQuestion}
        className="mt-4 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 rounded hover:bg-gray-400 dark:hover:bg-gray-600 transition-all duration-300"
      >
        Delete Question
      </button>
    </div>
  );
};

export default QuestionType;