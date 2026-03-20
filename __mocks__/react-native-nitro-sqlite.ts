export const NitroSQLiteConnection = {
  execute: jest.fn(),
  executeAsync: jest.fn(),
};

export const open = jest.fn(() => NitroSQLiteConnection);