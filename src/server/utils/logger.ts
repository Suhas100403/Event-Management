export function logError(error: Error, context?: string) {
  console.error(`[${context || 'Error'}] ${error.name}: ${error.message}`);
  if (error.stack) {
    console.error(error.stack);
  }
}

export function logInfo(message: string, context?: string) {
  console.log(`[${context || 'Info'}] ${message}`);
}

export function logWarning(message: string, context?: string) {
  console.warn(`[${context || 'Warning'}] ${message}`);
}