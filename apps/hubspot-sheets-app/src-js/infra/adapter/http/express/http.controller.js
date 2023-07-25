module.exports = class ExpressControllerAdapter {
  static adapt (controller) {
    return async (req, res) => {
      try {
        const httpRequest = {
          body: req.body,
          headers: req.headers,
          params: req.params,
          query: req.query
        }
        const httpResponse = await controller.handle(httpRequest)
        res.status(httpResponse.status).json(httpResponse.body)
      } catch (error) {
        res.status(500).json({
          error: 'Internal server error'
        })
      }
    }
  }
}
