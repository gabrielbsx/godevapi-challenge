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

export const handle = async (event: APIGatewayProxyEvent): Promise<LambdaResponse> => {
  const transferContactsListFactory = TransferContactsListFactory.make()
  const params = event.pathParameters ?? {}
  const response = await transferContactsListFactory.handle({
    body: undefined,
    headers: undefined,
    params,
    query: undefined
  })
  return {
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    statusCode: response.status,
    body: response.body
  }
}

export default handle
