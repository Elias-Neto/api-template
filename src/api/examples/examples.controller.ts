import { Request, Response } from 'express'

import { AppError } from '@services/errors/AppError'

const fetchExamples = async (request: Request, response: Response) => {
  const { db } = request

  try {
    const examples = await db.collection('examples').find().toArray()
    return response.status(200).json(examples)
  } catch (error) {
    throw new AppError(
      'Erro ao listar exemplos.',
      error,
      500,
      'FetchCustomSurveysError',
    )
  }
}

export { fetchExamples }
