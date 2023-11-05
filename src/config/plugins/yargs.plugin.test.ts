// import { yarg } from './yargs.plugin'

const runCommand = async (args: string[]) => {
  process.argv = [...process.argv, ...args];
  const { yarg } = await import('./yargs.plugin');
  return yarg;
}

describe('Test args.plugin.ts', () => {
  const orignalArgv = process.argv

  beforeEach(() => {
    process.argv = orignalArgv;
    jest.resetModules();
  })

  test('should return default values', async () => {
    const argv = await runCommand(['-b', '5']);

    //console.log(argv);

    expect(argv).toEqual(expect.objectContaining({
      b: 5,
      l: 10,
      s: false,
      n: 'table',
      d: 'outputs',
    }));
    
  })

  test('should return configuration with custom values', async () => {

    const argv = await runCommand(['-b', '10', '-l', '20', '-s', '-n', 'test', '-d', 'custom']);

    expect(argv).toEqual(expect.objectContaining({
      b: 10,
      l: 20,
      s: true,
      n: 'test',
      d: 'custom',
    }));

  })

})