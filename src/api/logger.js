export function validationError(request, h, error) {
  console.log(error.message);

  return h.response({
    error: "Validation Failed",
    message: error.message,
    details: error.details
  }).code(400).takeover();
}
