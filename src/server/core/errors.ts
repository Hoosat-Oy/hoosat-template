export const ErrorHandler = (error: unknown) => {
  if (typeof error === "object" && error !== null) {
    return { result: "error", message: error.toString() };
  } else {
    return { result: "error", message: "Unknown error" };
  }
} 