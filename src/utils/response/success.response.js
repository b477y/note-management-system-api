export const successResponse = ({ res, status = 200, message, data } = {}) => {
  if (!res) {
    const error = new Error("Missing 'res' in successResponse");
    error.cause = 500;
    error.success = false;
    throw error;
  }
  return res.status(status).json({ success: true, message, data });
};
