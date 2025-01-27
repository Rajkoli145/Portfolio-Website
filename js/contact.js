// API URL based on environment
const API_URL = window.location.hostname.includes('github.io') 
    ? 'https://portfolio-website-38ez1as7u-rajkoli145s-projects.vercel.app'  // Updated Vercel URL
    : 'http://localhost:3000';

console.log('Current API URL:', API_URL);

async function handleSubmit(event) {
    event.preventDefault();
    console.log('Form submission started');
    
    const form = event.target;
    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    
    const formData = new FormData(form);
    const formObject = {};
    
    formData.forEach((value, key) => {
        formObject[key] = value;
    });
    
    console.log('Sending form data to:', `${API_URL}/api/contact`);
    console.log('Form data:', formObject);
    
    try {
        const response = await fetch(`${API_URL}/api/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formObject),
            mode: 'cors'
        });

        console.log('Response status:', response.status);
        console.log('Response headers:', [...response.headers.entries()]);
        
        const responseData = await response.text();
        console.log('Raw response:', responseData);
        
        if (response.ok) {
            let result;
            try {
                result = JSON.parse(responseData);
            } catch (e) {
                console.warn('Could not parse response as JSON:', e);
                result = { message: 'Message sent successfully!' };
            }
            console.log('Response data:', result);
            alert('Message sent successfully!');
            form.reset();
        } else {
            console.error('Server error:', responseData);
            throw new Error('Failed to send message. Please try again.');
        }
    } catch (error) {
        console.error('Error details:', error);
        alert(error.message || 'Error sending message. Please try again.');
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
    }
}
