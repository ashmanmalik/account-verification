const axios = require('axios');
const { getBasiqAuthorizationHeader } = require('../../serverAuthentication');
const { validateEmail } = require('../../utils/validation');


/**
 * This API endpoint creates a user, which gives you a "bucket" to store all your financial data.
 *
 * https://api.basiq.io/reference/create-a-user
 */

const createUser = async (req, res) => {
  if (req.method === 'POST') {
    const { email } = req.body;
    // Validate the request body fields
    if (!validateEmail(email)) {
      res.status(400).json({ message: 'Invalid email' });
      return;
    }
    try {
      const { data } = await axios({
        method: 'post',
        url: 'https://au-api.basiq.io/users',
        headers: {
          Authorization: await getBasiqAuthorizationHeader(),
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        data: req.body,
      });
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } else {
    // Only POST is allowed
    res.status(400).json({ message: 'Invalid method' });
  }
};

module.exports = createUser;