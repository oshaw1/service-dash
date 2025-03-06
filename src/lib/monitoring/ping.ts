import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function ping(host: string) {
  const startTime = Date.now();
  
  try {
    // Use different ping commands based on the OS
    const platform = process.platform;
    const pingCmd = platform === 'win32' 
      ? `ping -n 1 -w 1000 ${host}`
      : `ping -c 1 -W 1 ${host}`;
    
    const { stdout } = await execAsync(pingCmd);
    const responseTime = Date.now() - startTime;
    
    // Check for packet loss or error messages
    if (stdout.includes('100% packet loss') || stdout.includes('0 received')) {
      return {
        status: 'down' as const,
        responseTime,
        details: 'Host is not responding to ping',
      };
    }
    
    return {
      status: 'up' as const,
      responseTime,
      details: 'Host is responding to ping',
    };
  } catch (error: any) {
    return {
      status: 'down' as const,
      responseTime: Date.now() - startTime,
      details: `Error: ${error.message}`,
    };
  }
}