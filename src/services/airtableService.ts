import axios from 'axios';

const AIRTABLE_API_KEY = 'patL2qM5BxtZ0FLzr.e003e2da34ef3ffe13515922cfd839a31c14f650fee117c2ddaf4ca44f88eed2'; // Replace with your Airtable API key
const AIRTABLE_BASE_ID = 'appRHbWQu9VwOk33j'; // Your Airtable Base ID
const AIRTABLE_TABLE_NAME = 'uss_base'; // Your Airtable Table Name

// Create Axios instance for Airtable API
const airtableApi = axios.create({
  baseURL: `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`,
  headers: {
    Authorization: `Bearer ${AIRTABLE_API_KEY}`,
    // Removed the Origin header since it cannot be set manually by the client-side
  },
});

// Get user by email from Airtable
export const getUserByEmail = async (email: string) => {
  try {
    const response = await airtableApi.get('/', {
      params: {
        filterByFormula: `{email} = '${email}'`,  // Airtable formula to filter by email
      },
    });

    // Check if any records were returned
    if (response.data.records.length === 0) {
      console.error('No user found with the provided email');
      return null;
    }

    return response.data.records[0]; // Return the first matching user
  } catch (error) {
    console.error('Error fetching user:', error.message);
    return null;
  }
};

// Authenticate user with email and password
export const authenticateUser = async (email: string, password: string) => {
  const user = await getUserByEmail(email);
  if (!user) {
    console.error('No user found');
    return null;
  }

  // Compare the provided password with the stored password
  if (user.fields.password !== password) {
    console.error('Incorrect password');
    return null;
  }

  // Return the user information after successful authentication
  return {
    id: user.id,
    email: user.fields.email,
    givenName: user.fields.given_name,
    familyName: user.fields.family_name,
    subscriptionPlan: user.fields.subscription_plan,
    profilePictureUrl: user.fields.profile_picture_url?.[0]?.url || '',
    bio: user.fields.bio || '',
    twitterHandle: user.fields.twitter_handle || '',
    facebookHandle: user.fields.facebook_handle || '',
    instagramHandle: user.fields.instagram_handle || '',
    registrationDate: user.fields.registration_date,
    lastLogin: user.fields.last_login,
    posts: user.fields.Posts ? user.fields.Posts.length : 0,
    analytics: user.fields.Analytics || 0,
  };
};

// Update user's last login in Airtable
export const updateLastLogin = async (userId: string) => {
  try {
    // Make sure that 'last_login' is a valid field in Airtable and that userId is the correct record ID
    const response = await airtableApi.patch(`/${userId}`, {
      fields: {
        last_login: new Date().toISOString(), // Ensure this field exists in your Airtable schema
      },
    });
    console.log('Last login updated successfully:', response.data);
  } catch (error) {
    console.error('Error updating last login:', error.message); // Log the actual error message
  }
};


// Create a new user in Airtable
export const createUser = async (name: string, email: string, password: string) => {
  try {
    const [givenName, familyName] = name.split(' '); // Split the name into first and last

    const response = await airtableApi.post('/', {
      fields: {
        email,
        password, // Note: In a real-world scenario, this password should be hashed
        given_name: givenName,
        family_name: familyName,
        subscription_plan: 'free',
        registration_date: new Date().toISOString(),
        last_login: new Date().toISOString(),
      },
    });

    // Return the newly created user
    return {
      id: response.data.id,
      email: response.data.fields.email,
      givenName: response.data.fields.given_name,
      familyName: response.data.fields.family_name,
      subscriptionPlan: response.data.fields.subscription_plan,
    };
  } catch (error) {
    console.error('Error creating user:', error.message);
    return null;
  }
};
