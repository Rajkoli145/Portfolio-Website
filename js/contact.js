// API URL based on environment
const API_URL = window.location.hostname.includes('github.io') 
    ? 'https://portfolio-website-1m1nrgvrg-rajkoli145s-projects.vercel.app'  // Updated Vercel URL
    : 'http://localhost:3000';

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
    
    console.log('Form data:', formObject);
    
    try {
        const response = await fetch(`${API_URL}/api/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formObject)
        });

        console.log('Response status:', response.status);
        
        if (response.ok) {
            const result = await response.json();
            console.log('Response data:', result);
            alert('Message sent successfully!');
            form.reset();
        } else {
            const errorText = await response.text();
            console.error('Server error:', errorText);
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
