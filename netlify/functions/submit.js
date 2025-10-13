exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Parse request body
    const data = JSON.parse(event.body);
    
    // Validate required fields
    if (!data.full_name || !data.phone || !data.destination_country || !data.comment) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }

    // Get the token from environment variable
    const MEHNAT_TOKEN = process.env.MEHNAT_TOKEN;
    
    if (!MEHNAT_TOKEN) {
      console.error('MEHNAT_TOKEN environment variable is not set');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Server configuration error' })
      };
    }

    // Send data to Mehnat.uz API
    // Note: Replace with actual Mehnat.uz API endpoint when available
    const MEHNAT_API_ENDPOINT = 'https://api.mehnat.uz/submit'; // Placeholder
    
    const response = await fetch(MEHNAT_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MEHNAT_TOKEN}`
      },
      body: JSON.stringify({
        full_name: data.full_name,
        phone: data.phone,
        destination_country: data.destination_country,
        comment: data.comment
      })
    });

    if (!response.ok) {
      throw new Error(`Mehnat.uz API returned status ${response.status}`);
    }

    const result = await response.json();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: true,
        message: 'Form submitted successfully',
        data: result
      })
    };
  } catch (error) {
    console.error('Error submitting form:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: false,
        error: 'Failed to submit form',
        message: error.message
      })
    };
  }
};