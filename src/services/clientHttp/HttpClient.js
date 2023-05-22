import delay from '../../utils/delay';
import APIError from '../../errors/APIError';

class HttpClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  get(path, options) {
    return this.makeRequest(path, { method: 'GET', headers: options?.headers });
  }

  post(path, options = {}) {
    return this.makeRequest(path, { method: 'POST', body: options?.body, headers: options?.headers });
  }

  async makeRequest(path, options) {
    await delay(1500);
    const headers = new Headers();

    if (options.body) {
      headers.append('Content-Type', 'application/json');
    }

    // pegando headers customizados
    if (options.headers) {
      Object.entries(options.headers).forEach(([name, value]) => {
        headers.append(name, value);
      });
      /* 1 forma de fazer
      Object.keys(options.headers).forEach((name) => {
        headers.append(name, options.headers[name]);
      }); */
    }

    const response = await fetch(`${this.baseURL}${path}`, {
      method: options.method,
      body: JSON.stringify(options.body),
      headers,
    });

    let responseBody = null;
    const contentType = response.headers.get('Content-Type');

    if (contentType.includes('application/json')) {
      responseBody = await response.json();
    }
    if (response.ok) {
      return responseBody;
    }
    // mandando erro personalizado de API
    throw new APIError(response, responseBody);
  }
}

export default HttpClient;
