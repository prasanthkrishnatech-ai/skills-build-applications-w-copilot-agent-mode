export const getApiBaseUrl = (): string => {
  const port = Number(process.env.PORT) || 8000;
  const codespaceName = process.env.CODESPACE_NAME;

  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${port}`;
};
