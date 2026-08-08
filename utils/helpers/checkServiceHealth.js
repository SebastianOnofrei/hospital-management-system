async function checkService(name, url) {
  try {
    const response = await fetch(`${url}/health/ready`, {
      signal: AbortSignal.timeout(2000),
    });

    if (response.ok) {
      return {
        status: "healthy",
      };
    }

    return {
      status: "unhealthy",
      httpStatus: response.status,
    };
  } catch {
    return {
      status: "unreachable",
    };
  }
}

module.exports = { checkService };
