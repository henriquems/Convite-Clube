import { ProvedorCriptografia } from '@conviteclube/core';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt'

@Injectable()
export class BcryptProvider implements ProvedorCriptografia {

    async criptografar(senha: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(senha, salt);
    }

    comparar(senha: string, senhaCriptografada: string): Promise<boolean> {
        return bcrypt.compare(senha, senhaCriptografada);
    }
}
