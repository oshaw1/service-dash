import fetch from 'node-fetch';

export async function checkHttp(host: string, port: number, endpoint: string = '/') {
  const startTime = Date.now();
  const url = `http://${host}:${port}${endpoint}`;
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 seconds timeout
    
    const response = await fetch(url, { 
      method: 'GET',
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    const responseTime = Date.now() - startTime;
    
    if (response.ok) { // Status in the range 200-299
      return {
        status: 'up' as const,
        responseTime,
        details: `HTTP ${response.status} OK`,
      };
    } else if (response.status >= 500) {
      return {
        status: 'down' as const,
        responseTime,
        details: `HTTP ${response.status} Server Error`,
      };
    } else {
      return {
        status: 'degraded' as const,
        responseTime,
        details: `HTTP ${response.status} ${response.statusText}`,
      };
    }
  } catch (error: any) {
    return {
      status: 'down' as const,
      responseTime: Date.now() - startTime,
      details: `Error: ${error.message}`,
    };
  }
}