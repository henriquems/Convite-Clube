BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[usuario] (
    [id] INT NOT NULL IDENTITY(1,1),
    [curso_id] INT,
    [periodo_letivo_id] INT,
    [nome] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [login] NVARCHAR(1000) NOT NULL,
    [senha] NVARCHAR(1000) NOT NULL,
    [cpf] NVARCHAR(1000) NOT NULL,
    [status] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [usuario_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [usuario_login_key] UNIQUE NONCLUSTERED ([login])
);

-- CreateTable
CREATE TABLE [dbo].[perfil] (
    [id] INT NOT NULL IDENTITY(1,1),
    [nome] NVARCHAR(1000) NOT NULL,
    [descricao] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [perfil_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [perfil_nome_key] UNIQUE NONCLUSTERED ([nome])
);

-- CreateTable
CREATE TABLE [dbo].[curso] (
    [id] INT NOT NULL IDENTITY(1,1),
    [descricao] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [curso_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [curso_descricao_key] UNIQUE NONCLUSTERED ([descricao])
);

-- CreateTable
CREATE TABLE [dbo].[periodo_letivo] (
    [id] INT NOT NULL IDENTITY(1,1),
    [descricao] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [periodo_letivo_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [periodo_letivo_descricao_key] UNIQUE NONCLUSTERED ([descricao])
);

-- CreateTable
CREATE TABLE [dbo].[clube] (
    [id] INT NOT NULL IDENTITY(1,1),
    [descricao] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [clube_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [clube_descricao_key] UNIQUE NONCLUSTERED ([descricao])
);

-- CreateTable
CREATE TABLE [dbo].[periodo_inscricao] (
    [id] INT NOT NULL IDENTITY(1,1),
    [clube_id] INT NOT NULL,
    [descricao] NVARCHAR(1000) NOT NULL,
    [data_inicio] DATETIME2 NOT NULL,
    [data_fim] DATETIME2 NOT NULL,
    [quantidade_convite] INT NOT NULL,
    [valor_convite] DECIMAL(10,2) NOT NULL,
    [data_limite_pagamento] DATETIME2 NOT NULL,
    CONSTRAINT [periodo_inscricao_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[pedido] (
    [id] INT NOT NULL IDENTITY(1,1),
    [usuario_id] INT NOT NULL,
    [periodo_inscricao_id] INT NOT NULL,
    [numero] NVARCHAR(1000) NOT NULL,
    [status] NVARCHAR(1000) NOT NULL,
    [valor_pedido] DECIMAL(10,2) NOT NULL,
    [valor_pago] DECIMAL(10,2),
    [data_pagamento] DATETIME2,
    [data_pedido] DATETIME2 NOT NULL,
    CONSTRAINT [pedido_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [pedido_numero_key] UNIQUE NONCLUSTERED ([numero])
);

-- CreateTable
CREATE TABLE [dbo].[endereco] (
    [id] INT NOT NULL IDENTITY(1,1),
    [usuario_id] INT NOT NULL,
    [logradouro] NVARCHAR(1000) NOT NULL,
    [cidade] NVARCHAR(1000) NOT NULL,
    [estado] NVARCHAR(1000) NOT NULL,
    [cep] NVARCHAR(1000) NOT NULL,
    [bairro] NVARCHAR(1000) NOT NULL,
    [numero] NVARCHAR(1000) NOT NULL,
    [complemento] NVARCHAR(1000),
    CONSTRAINT [endereco_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[boleto] (
    [id] INT NOT NULL IDENTITY(1,1),
    [pedido_id] INT NOT NULL,
    [identificador_convenio] NVARCHAR(1000) NOT NULL,
    [referencia_transacao] NVARCHAR(1000),
    [valor] INT NOT NULL,
    [quantidade_ponto] NVARCHAR(1000) NOT NULL,
    [tipo_pagamento] NVARCHAR(1000) NOT NULL,
    [cpf_cnpj] NVARCHAR(1000) NOT NULL,
    [indicador_pessoa] NVARCHAR(1000) NOT NULL,
    [valor_desconto] NVARCHAR(1000),
    [data_limite_desconto] NVARCHAR(1000),
    [tipo_duplicata] NVARCHAR(1000) NOT NULL,
    [url_retorno] NVARCHAR(1000) NOT NULL,
    [url_informa] NVARCHAR(1000),
    [nome] NVARCHAR(1000) NOT NULL,
    [endereco] NVARCHAR(1000) NOT NULL,
    [cidade] NVARCHAR(1000) NOT NULL,
    [estado] NVARCHAR(1000) NOT NULL,
    [cep] NVARCHAR(1000) NOT NULL,
    [mensagem] NVARCHAR(1000) NOT NULL,
    [status_boleto] NVARCHAR(1000) NOT NULL,
    [status_envio] NVARCHAR(1000) NOT NULL,
    [valor_pagamento] NVARCHAR(1000),
    [tarifa_bancaria] NVARCHAR(1000),
    [data_vencimento] DATETIME2 NOT NULL,
    [data_pagamento] DATETIME2,
    [data_boleto] DATETIME2 NOT NULL,
    CONSTRAINT [boleto_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[retorno] (
    [id] INT NOT NULL IDENTITY(1,1),
    [usuario_id] INT NOT NULL,
    [status_retorno_id] INT,
    [linha] NVARCHAR(1000) NOT NULL,
    [tipo_linha] NVARCHAR(1000),
    [status] NVARCHAR(1000),
    [banco] NVARCHAR(1000),
    [agencia] NVARCHAR(1000),
    [conta] NVARCHAR(1000),
    [arquivo] NVARCHAR(1000),
    [data_processamento] DATETIME2 NOT NULL,
    CONSTRAINT [retorno_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[status_retorno] (
    [id] INT NOT NULL IDENTITY(1,1),
    [descricao] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [status_retorno_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[log_retorno] (
    [id] INT NOT NULL IDENTITY(1,1),
    [retorno_id] INT NOT NULL,
    [descricao] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [log_retorno_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[_PerfilToUsuario] (
    [A] INT NOT NULL,
    [B] INT NOT NULL,
    CONSTRAINT [_PerfilToUsuario_AB_unique] UNIQUE NONCLUSTERED ([A],[B])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [_PerfilToUsuario_B_index] ON [dbo].[_PerfilToUsuario]([B]);

-- AddForeignKey
ALTER TABLE [dbo].[usuario] ADD CONSTRAINT [usuario_curso_id_fkey] FOREIGN KEY ([curso_id]) REFERENCES [dbo].[curso]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[usuario] ADD CONSTRAINT [usuario_periodo_letivo_id_fkey] FOREIGN KEY ([periodo_letivo_id]) REFERENCES [dbo].[periodo_letivo]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[periodo_inscricao] ADD CONSTRAINT [periodo_inscricao_clube_id_fkey] FOREIGN KEY ([clube_id]) REFERENCES [dbo].[clube]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[pedido] ADD CONSTRAINT [pedido_usuario_id_fkey] FOREIGN KEY ([usuario_id]) REFERENCES [dbo].[usuario]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[pedido] ADD CONSTRAINT [pedido_periodo_inscricao_id_fkey] FOREIGN KEY ([periodo_inscricao_id]) REFERENCES [dbo].[periodo_inscricao]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[endereco] ADD CONSTRAINT [endereco_usuario_id_fkey] FOREIGN KEY ([usuario_id]) REFERENCES [dbo].[usuario]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[boleto] ADD CONSTRAINT [boleto_pedido_id_fkey] FOREIGN KEY ([pedido_id]) REFERENCES [dbo].[pedido]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[retorno] ADD CONSTRAINT [retorno_usuario_id_fkey] FOREIGN KEY ([usuario_id]) REFERENCES [dbo].[usuario]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[retorno] ADD CONSTRAINT [retorno_status_retorno_id_fkey] FOREIGN KEY ([status_retorno_id]) REFERENCES [dbo].[status_retorno]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[log_retorno] ADD CONSTRAINT [log_retorno_retorno_id_fkey] FOREIGN KEY ([retorno_id]) REFERENCES [dbo].[retorno]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[_PerfilToUsuario] ADD CONSTRAINT [_PerfilToUsuario_A_fkey] FOREIGN KEY ([A]) REFERENCES [dbo].[perfil]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[_PerfilToUsuario] ADD CONSTRAINT [_PerfilToUsuario_B_fkey] FOREIGN KEY ([B]) REFERENCES [dbo].[usuario]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
