// API URL based on environment
const API_URL = window.location.hostname.includes('github.io') 
    ? 'https://portfolio-backend-s2ws.onrender.com'  // Updated Render.com backend URL
    : 'http://localhost:3000';

async function handleSubmit(event) {
    event.preventDefault();
    console.log('Form submission started');
    
    const form = event.target;
    const formData = new FormData(form);
    const formObject = {};
    
    // Convert FormData to a plain object
    formData.forEach((value, key) => {
        formObject[key] = value;
    });
    
    console.log('Form data:', formObject);
    console.log('Sending to URL:', API_URL);
    
    try {
        // First, test the backend connection
        const testResponse = await fetch(`${API_URL}/test`);
        console.log('Test response:', testResponse);
        
        if (!testResponse.ok) {
            throw new Error('Backend connection test failed');
        }
        
        // If test passes, send the actual form data
        const response = await fetch(`${API_URL}/api/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formObject)
        });

        console.log('Response status:', response.status);
        const result = await response.json();
        console.log('Response data:', result);
        
        if (response.ok) {
            alert('Message sent successfully!');
            form.reset();
        } else {
            throw new Error(result.message || 'Error sending message');
        }
    } catch (error) {
        console.error('Detailed error:', error);
        alert('Error sending message. Please check the console for details.');
    }
}
