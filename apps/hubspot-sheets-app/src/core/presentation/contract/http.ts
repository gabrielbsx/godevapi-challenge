export interface Request {
  body: any
  headers: any
  params: any
  query: any
}

export interface Response {
  status: number
  body: any
}
