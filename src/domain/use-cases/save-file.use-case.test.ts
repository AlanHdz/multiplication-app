import { SaveFile } from './save-file.use-case';
import fs from 'fs';

describe('SaveFileUseCase', () => {

  const customOptions = {
    fileContent: 'custom default values',
    fileDestination: 'custom-outputs',
    fileName: 'custom-table-name'
  }

  const customFilePath = `${customOptions.fileDestination}/${customOptions.fileName}.txt`

  beforeEach(() => {
    //jest.clearAllMocks();
  })

  afterEach(() => {
    const exists = fs.existsSync('outputs');
    if (exists) fs.rmSync('outputs', { recursive: true });

    const existsCustom = fs.existsSync(customOptions.fileDestination);
    if (existsCustom) fs.rmSync(customOptions.fileDestination, { recursive: true });
    
  })

  test('should save file with default values', () => {
    
    const saveFile = new SaveFile();
    const filePath = 'outputs/table.txt';
    const options = {
      fileContent: 'test content'
    }

    const result = saveFile.execute(options);

    const checkFile = fs.existsSync(filePath)
    const fileContent = fs.readFileSync(filePath, 'utf8')

    expect(result).toBeTruthy()
    expect(checkFile).toBeTruthy()
    expect(fileContent).toBe(options.fileContent);


  })

  test('should save file with custom values', () => {
    
    const saveFile = new SaveFile()
    

    const result = saveFile.execute(customOptions);

    const checkFile = fs.existsSync(customFilePath)
    const fileContent = fs.readFileSync(customFilePath, 'utf8')

    expect(result).toBe(true);
    expect(checkFile).toBe(true);
    expect(fileContent).toBe(customOptions.fileContent);

  })

  test('should return false if directory is not created', () => {
    const saveFile = new SaveFile();
    const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(() => { 
      throw new Error('this is a custom error message from testing') 
    });

    const result = saveFile.execute(customOptions);

    expect(result).toBe(false);

    mkdirSpy.mockRestore();
  })

  test('should return false if file is not created', () => {
    const saveFile = new SaveFile();
    const writeFileSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(() => { 
      throw new Error('this is a custom error message from testing') 
    });

    const result = saveFile.execute({ fileContent: 'hola' });

    expect(result).toBe(false);

    writeFileSpy.mockRestore();

  })



})