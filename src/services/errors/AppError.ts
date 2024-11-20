export class AppError extends Error {
  public readonly name: string
  public readonly message: string
  public readonly status: number
  public readonly error: Error

  constructor(message: string, error: Error, status = 400, name = 'Error') {
    super(name)
    this.message = message
    this.status = status
    this.error = error
  }
}
