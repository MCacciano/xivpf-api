// Get token from model, create cookie and send response
module.exports = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
    httpOnly: true
  };

  // it prod use the secure flag for https
  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  // prettier-ignore
  res
  .status(statusCode)
  .cookie('token', token, options)
  .json({ success: true, token });
};
