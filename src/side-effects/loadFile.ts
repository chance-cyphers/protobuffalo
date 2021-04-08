import {remote} from 'electron';

const { dialog } = remote;

export function showFileDialog(): Promise<string> {
  return dialog.showOpenDialog({properties: ['openFile', 'multiSelections']})
      .then((value) => {
          return value.filePaths[0];
      });
}