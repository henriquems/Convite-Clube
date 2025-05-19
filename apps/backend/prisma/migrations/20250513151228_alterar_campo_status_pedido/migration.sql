/*
  Warnings:

  - You are about to drop the column `status` on the `pedido` table. All the data in the column will be lost.
  - Added the required column `status_pagamento` to the `pedido` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[pedido] DROP COLUMN [status];
ALTER TABLE [dbo].[pedido] ADD [status_pagamento] NVARCHAR(1000) NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
