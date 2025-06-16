import RNFS from 'react-native-fs';

export const base64ToTempFile = async (
  base64String: string,
  fileName: string,
) => {
  try {
    const cleanBase64 = base64String.split(',')[1];

    const filePath = `${RNFS.DownloadDirectoryPath}/${fileName}`;
    await RNFS.writeFile(filePath, cleanBase64, 'base64');
    return filePath;
  } catch (error) {
    console.log(error);
  }
};
