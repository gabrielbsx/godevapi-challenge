import { TransferContactsListFactory } from './main/factory/transfer-contacts-list.factory'
import { type APIGatewayProxyEvent } from 'aws-lambda'
import dotenv from 'dotenv'

dotenv.config()

export interface LambdaResponse {
  headers: HeaderOption
  statusCode: number
  body: string
}

interface HeaderOption {
  'Access-Control-Allow-Origin': string
};

const lambdaResponse = (body: any, status: number): LambdaResponse => ({
  headers: {
    'Access-Control-Allow-Origin': '*'
  },
  statusCode: status,
  body: JSON.stringify(body)
})

export const handle = async (event: APIGatewayProxyEvent): Promise<LambdaResponse> => {
  const transferContactsListFactory = TransferContactsListFactory.make()
  const params = event.pathParameters ?? {}
  try {
    const response = await transferContactsListFactory.handle({
      body: undefined,
      headers: undefined,
      params,
      query: undefined
    })
    return lambdaResponse(response.body, response.status)
  } catch (error) {
    return lambdaResponse({
      error: error instanceof Error ? error.message : 'Internal server error'
    }, 500)
  }
}

export default handle
