module.exports = class CommanderControllerAdapter {
  static adapt (controller) {
    return async (args) => {
      const cliResponse = await controller.handle(args)
      return cliResponse.body
    }
  }
}
