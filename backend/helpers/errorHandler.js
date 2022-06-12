function errorHandler(error, req, res, next) {
  if (error) {
    return res.status(error.status || 500).json({ success: false, error: error });
  }
  return res.status(500).json({ success: false, message: "server error" });
}

module.exports = errorHandler;
