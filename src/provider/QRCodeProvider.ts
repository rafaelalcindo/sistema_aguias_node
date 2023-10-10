import qrCode, { QRCodeToFileOptions } from 'qrcode';
import dayjs from 'dayjs';
import md5 from 'md5';
import path from 'path';
import fs from 'fs'
import CryptoJS from 'crypto-js';
import cryptoKey from '../config/cryptoKey';

class QRCodeProvider {
    public async generateQrCode(
        id: string,
        redoQrcode: boolean = false,
        qrCodeName?: string
    ): Promise<string> {
        let nameQrCodes = '';

        if (redoQrcode) {
            nameQrCodes = qrCodeName ? qrCodeName : '';
        } else {
            nameQrCodes = `${md5(id)}${dayjs().unix()}.png`;
        }

        const pathQrCode = `${path.resolve(__dirname, '..', 'assets', 'qrcodes', nameQrCodes)}`;

        const config = {
            version: 6,
            color: {
                dark: "#073f64",
                light: "#FFFFFF"
            }
        } as QRCodeToFileOptions;

        await qrCode.toFile(pathQrCode, id, config, (err) => { if (err) { throw err } });

        return nameQrCodes;
    }

    public async unhashCryptFromQrCode(hash: string): Promise<any> {
        const decrypt = CryptoJS.AES.decrypt(hash, cryptoKey.key);
        return decrypt.toString(CryptoJS.enc.Utf8)
    }

    public async hashCryptForQrCode(id: string): Promise<any> {
        const crypt = await CryptoJS.AES.encrypt(id, cryptoKey.key);
        return crypt.toString();
    }

    public async removeQrCode(nameQrCode: string): Promise<void> {
        const pathQrCode = `${path.resolve(__dirname, '..', 'assets', 'qrcodes', nameQrCode)}`;
        try {
            await fs.unlinkSync(pathQrCode);
        } catch {
            console.log('não possui qrcode');
        }

    }
}

export default QRCodeProvider;