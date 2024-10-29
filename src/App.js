import React, { useState } from 'react';
import DarkModeToggle from './components/DarkModeToggle';
import PopUpLogin from './components/PopUpLogin';
import QuestionForm from './components/QuestionForm';

const App = () => {
  const [showQuestionForm, setShowQuestionForm] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white relative transition-colors duration-500">

      <header className="bg-gray-200 dark:bg-gray-900 py-4 shadow-md dark:shadow-none">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-3xl font-semibold text-black dark:text-white">
            Custom Form
          </h1>

          <div className="flex space-x-4 items-center">
            <PopUpLogin />
            <DarkModeToggle />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 mt-8">

        <div className="text-center mb-8">
          <button
            onClick={() => setShowQuestionForm(!showQuestionForm)}
            className="bg-gray-300 dark:bg-gray-800 hover:bg-gray-400 dark:hover:bg-gray-700 text-black dark:text-white font-semibold py-2 px-4 rounded shadow-lg dark:shadow-lg transition-all duration-300"
            style={{
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
              transition: 'background-color 0.3s, box-shadow 0.3s',
            }}
          >
            {showQuestionForm ? 'Hide Question Form' : 'Create a Form'}
          </button>
        </div>

        {showQuestionForm && (
          <div className="mb-10 bg-gray-100 dark:bg-gray-900 p-6 rounded-lg shadow-md dark:shadow-lg transition-transform transform hover:scale-105">
            <QuestionForm />
          </div>
        )}
      </main>

      <footer className="bg-gray-100 dark:bg-gray-900 py-4 text-center mt-10 border-t border-gray-300 dark:border-gray-700">
        <p className="text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} Cutom Form. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default App;