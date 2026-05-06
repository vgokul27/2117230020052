// Wrapper for logging middleware from backend
// DISABLED: Backend has CORS configuration issues
// This is a no-op function that prevents network errors

const Log = async (level, module, message) => {
  // Logging disabled to prevent CORS errors
  // Backend CORS header conflict: '*, http://localhost:3000'
  return Promise.resolve();
};

export default Log;
