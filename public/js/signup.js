document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.querySelector('form');
  signupForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(signupForm);
    const data = Object.fromEntries(formData.entries());
    console.log(data);

    try {
      const response = await axios.post('/register', data);
      console.log('Server response:', response);
      if (response.status === 200) {
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = document.getElementById('error-message');
      if (error.response && error.response.data && error.response.data.error) {
        errorMessage.textContent = error.response.data.error;
      } else {
        errorMessage.textContent = 'An error occurred. Please try again.';
      }
    }
  });
});
