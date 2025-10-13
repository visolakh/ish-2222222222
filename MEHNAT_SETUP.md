# Mehnat.uz Integration Setup

This guide explains how to set up the Mehnat.uz API integration for the contact form.

## Prerequisites

- Netlify account
- Access to Mehnat.uz API credentials

## Setup Instructions

### 1. Get Your Mehnat.uz API Token

Contact Mehnat.uz to obtain your API authentication token. You will need:
- API endpoint URL
- Bearer token for authentication

### 2. Configure Environment Variable on Netlify

#### Option A: Using Netlify Dashboard (Recommended)

1. Log in to your [Netlify dashboard](https://app.netlify.com)
2. Select your site
3. Go to **Site settings** → **Environment variables**
4. Click **Add a variable**
5. Set:
   - **Key**: `MEHNAT_TOKEN`
   - **Value**: Your Mehnat.uz API token
   - **Scopes**: Select all (Builds, Functions, Post-processing)
6. Click **Save**

#### Option B: Using Netlify CLI

```bash
# Install Netlify CLI if you haven't already
npm install -g netlify-cli

# Login to Netlify
netlify login

# Set the environment variable
netlify env:set MEHNAT_TOKEN "your-token-here"
```

### 3. Update API Endpoint (if needed)

If the Mehnat.uz API endpoint is different from the placeholder, update it in `netlify/functions/submit.js`:

```javascript
const MEHNAT_API_ENDPOINT = 'https://api.mehnat.uz/submit'; // Update this URL
```

### 4. Deploy

Once the environment variable is set, deploy or redeploy your site:

```bash
# Using Netlify CLI
netlify deploy --prod

# Or push to your Git repository if you have auto-deploy enabled
git push origin main
```

### 5. Test the Integration

1. Go to your contact page: `https://your-site.netlify.app/contact`
2. Fill out the form with test data
3. Submit the form
4. Check that you receive a success message
5. Verify the submission appears in Mehnat.uz system

## Troubleshooting

### Form submission fails with "Server configuration error"
- **Cause**: `MEHNAT_TOKEN` environment variable is not set
- **Solution**: Follow Step 2 above to set the environment variable

### Form submission fails with "Failed to submit form"
- **Cause**: Issue connecting to Mehnat.uz API
- **Solution**: 
  - Verify the API endpoint URL is correct
  - Verify your token is valid and has not expired
  - Check Netlify function logs for detailed error messages

### How to view function logs

1. Go to Netlify dashboard
2. Select your site
3. Go to **Functions** tab
4. Click on the `submit` function
5. View the logs for detailed error information

## API Request Format

The contact form sends data in the following format:

```json
{
  "full_name": "User's full name",
  "phone": "User's phone number",
  "destination_country": "poland | korea | japan | croatia | russia | israel",
  "comment": "User's message"
}
```

## Security Notes

- ✅ The API token is stored securely in Netlify environment variables
- ✅ The token is never exposed to the client-side code
- ✅ All API requests are made server-side through Netlify Functions
- ✅ HTTPS is enforced for all communications

## Support

For issues with:
- **Mehnat.uz API**: Contact Mehnat.uz support
- **Netlify deployment**: Check [Netlify documentation](https://docs.netlify.com)
- **Website functionality**: Contact your development team