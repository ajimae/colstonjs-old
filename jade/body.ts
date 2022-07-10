export default function readBody(request: Request, encoding?: string): any {
  if (encoding == "text") {
    return request.text()
  }

  return request.json
}
