import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function runCustomCommand(command: string, host: string, port: number) {
  const startTime = Date.now();
  
  try {
    // Replace placeholders in the command
    const processedCommand = command
      .replace(/{host}/g, host)
      .replace(/{port}/g, port.toString());
    
    const { stdout, stderr } = await execAsync(processedCommand, { timeout: 10000 });
    
    const responseTime = Date.now() - startTime;
    
    if (stderr && stderr.length > 0) {
      return {
        status: 'degraded' as const,
        responseTime,
        details: `Command executed with warnings: ${stderr}`,
      };
    }
    
    return {
      status: 'up' as const,
      responseTime,
      details: `Command executed successfully: ${stdout.substring(0, 100)}${stdout.length > 100 ? '...' : ''}`,
    };
  } catch (error: any) {
    return {
      status: 'down' as const,
      responseTime: Date.now() - startTime,
      details: `Error: ${error.message}`,
    };
  }
}