import fs from 'fs';

import uploadConfig from '../config/uploads';

class FileProvider {

    public async removeFile(fileName: string): Promise<void> {
        const pathFilename = uploadConfig.directory + '/' + fileName;

        if (fs.existsSync(pathFilename)) {
            const fileExist = await fs.promises.stat(pathFilename);

            if (fileExist) {
                await fs.promises.unlink(pathFilename);
            }
        }
    }
}

export default FileProvider;