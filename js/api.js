// API configuration
const API_CONFIG = {
    CONTACT_API: 'https://portfolio-website-qq6xm66d5-rajkoli145s-projects.vercel.app/api/contact'
};

// Contact form API
async function submitContactForm(formData) {
    try {
        const response = await fetch(API_CONFIG.CONTACT_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData),
            mode: 'cors'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// Export API functions
window.API = {
    submitContactForm
};
