/**
 * Creates an error handler function that converts an error into a standardized error response.
 *
 * @param {unknown} error - The error object to handle.
 * @returns {Object} The standardized error response object.
 */
export const ErrorHandler = (error: unknown) => {
  if (typeof error === "object" && error !== null) {
    return { result: "error", message: error.toString() };
  } else {
    return { result: "error", message: "Unknown error" };
  }
};
