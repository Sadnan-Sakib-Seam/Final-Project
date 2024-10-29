import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const modalVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
};

const LoginModal = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const switchMode = () => setIsLogin(!isLogin);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid.';

    if (!password) newErrors.password = 'Password is required.';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters.';

    if (!isLogin && password !== confirmPassword) newErrors.confirmPassword = 'Passwords must match.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted');
      onClose();
    }
  };

  return (
      <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={modalVariants}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96 text-gray-900 dark:text-gray-200"
          variants={modalVariants}
        >
          <h2 className="text-xl font-semibold mb-4">{isLogin ? 'Login' : 'Signup'}</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
                required
              />
              {errors.email && <p className="text-red-500">{errors.email}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
                required
              />
              {errors.password && <p className="text-red-500">{errors.password}</p>}
            </div>

            {!isLogin && (
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
                  required
                />
                {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword}</p>}
              </div>
            )}

            <button
              type="submit"
              className="bg-blue-600 w-full text-white py-2 rounded hover:bg-blue-500 dark:bg-blue-700 dark:hover:bg-blue-600"
            >
              {isLogin ? 'Login' : 'Signup'}
            </button>
          </form>

          <button onClick={switchMode} className="mt-4 text-blue-600 dark:text-blue-400">
            {isLogin ? 'Create an account' : 'Already have an account?'}
          </button>

          <button
            onClick={onClose}
            className="mt-2 text-red-600 dark:text-red-400 w-full text-center"
          >
            Close
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoginModal;