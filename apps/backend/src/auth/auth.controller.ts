import { Body, Controller, Post, HttpException, HttpStatus } from '@nestjs/common';
import { AuthPrisma } from './auth.prisma';
import { ErroAplicacao, LoginAuth } from '@conviteclube/core';
import { BcryptProvider } from '../shared/bcrypt.provider';
import * as jwt from 'jsonwebtoken';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly repositorio: AuthPrisma,
        private readonly cripto: BcryptProvider
    ){}

    @Post('/logar')
    async logar(@Body() dados: { login: string; senha: string }) {
        try {
            const casoDeUso = new LoginAuth(this.repositorio, this.cripto);
            const usuario = await casoDeUso.executar({ login: dados.login, senha: dados.senha });
            const chave = process.env.JWT_SECRET;
            return jwt.sign(usuario, chave, { expiresIn: '15d' });
        } catch (erro) {
            if (erro instanceof ErroAplicacao) {
                switch (erro.codigo) {
                    case 'USUARIO_NAO_ENCONTRADO':
                        throw new HttpException({ message: erro.message }, HttpStatus.NOT_FOUND);
                    case 'SENHA_INCORRETA':
                        throw new HttpException({ message: erro.message }, HttpStatus.UNAUTHORIZED);
                }
            }

            throw new HttpException({ message: 'Erro interno' }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
