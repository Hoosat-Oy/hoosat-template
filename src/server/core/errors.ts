/**
 * Creates an error handler function that converts an error into a standardized error response.
 *
 * @param {unknown} error - The error object to handle.
 * @returns {Object} - The standardized error response object.
 * @throws {Error} - If the provided error is not an object or null.
 */
export const ErrorHandler = (error: unknown): { result: string, message: string } => {
  if (typeof error === "object" && error !== null) {
    return { result: "error", message: error.toString() };
  } else {
    throw new Error("Invalid error object");
  }
};
