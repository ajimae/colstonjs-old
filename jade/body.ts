export default function readBody(request: Request, encoding?: string): Promise<JSON | string> {
  if (encoding == "text") {
    return request.text();
  }

  return request.json()
}
