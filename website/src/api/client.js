import axios from 'axios';

// API base URL - will be set via environment variable for deployment
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 120000, // 120 second timeout (cold starts can take 30-60s, inference 15-20s)
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Generate responses from all 4 model variants
 * @param {string} prompt - User's input prompt
 * @param {number} maxTokens - Maximum tokens to generate (default: 200)
 * @returns {Promise<Object>} - Response object with all model outputs
 */
export const generateResponses = async (prompt, maxTokens = 200) => {
  try {
    const response = await apiClient.post('/api/generate', {
      prompt,
      max_tokens: maxTokens,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      // Server responded with error
      throw new Error(error.response.data.detail || 'Failed to generate responses');
    } else if (error.request) {
      // Request made but no response
      throw new Error('No response from server. Please check your connection.');
    } else {
      // Something else went wrong
      throw new Error('Failed to send request: ' + error.message);
    }
  }
};

/**
 * Check API health status
 * @returns {Promise<Object>} - Health status object
 */
export const checkHealth = async () => {
  try {
    const response = await apiClient.get('/health');
    return response.data;
  } catch (error) {
    throw new Error('API health check failed');
  }
};

export default apiClient;
