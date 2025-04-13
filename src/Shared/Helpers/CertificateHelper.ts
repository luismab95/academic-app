import Share from 'react-native-share';
import RNFS from 'react-native-fs';

export const sharePdf = async (pdfPath: string) => {
  const shareOptions = {
    url: `file://${pdfPath}`,
    type: 'application/pdf',
  };

  await Share.open(shareOptions);
};

export const base64ToTempFile = async (
  base64String: string,
  fileName: string,
) => {
  const cleanBase64 = base64String.split(',')[1];
  const filePath = `${RNFS.DownloadDirectoryPath}/${fileName}`;
  //todo ver porque cambia el base64..
  await RNFS.writeFile(filePath, cleanBase64, 'base64');
  console.log(`File written to: ${filePath}`);
  
  return filePath;
};
