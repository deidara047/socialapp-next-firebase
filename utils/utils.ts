export function getMessageFromErrorCode(error: string): string {
  let pureError = error.slice(5).replaceAll("-", " ");
  return "Error: " + pureError.charAt(0).toUpperCase() + pureError.slice(1);
}