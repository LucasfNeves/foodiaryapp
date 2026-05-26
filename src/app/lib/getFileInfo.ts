import { File } from 'expo-file-system';

export async function getFileInfo(fileUri: string) {
    const fileInfo = new File(fileUri).info();

    const filename = fileUri.split('/').at(-1);

    if (!fileInfo.exists || !fileInfo.size || !filename) {
        throw new Error('This file does not exist.');
    }

    const type = filename.endsWith('.jpg')
        ? ('image/jpeg' as const)
        : ('audio/m4a' as const);

    return { size: fileInfo.size, filename, type };
}
