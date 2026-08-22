export function createErrorHandler() {
  return function errorHandler(error, req, res, next) {
    req.log.error(
      {
        err: error,
      },
      "Unhandled request error",
    );

    res.status(500).json({
      message: "Internal server error",
    });
  };
}
