// API URL based on environment
const API_URL = window.location.hostname === 'rajkoli145.github.io'
    ? 'https://portfolio-website-qq6xm66d5-rajkoli145s-projects.vercel.app'  // Production URL
    : window.location.hostname === 'localhost'
        ? 'http://localhost:3000'  // Local development
        : '';  // Default to same origin

console.log('Current hostname:', window.location.hostname);
console.log('Using API URL:', API_URL);

async function handleSubmit(event) {
    event.preventDefault();
    console.log('Form submission started');
    
    const form = event.target;
    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    
    try {
        const formData = new FormData(form);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        console.log('Submitting form data:', formObject);
        
        const result = await window.API.submitContactForm(formObject);
        console.log('Submission successful:', result);
        
        alert('Message sent successfully!');
        form.reset();
    } catch (error) {
        console.error('Submission failed:', error);
        alert('Failed to send message. Please try again.');
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
    }
}
