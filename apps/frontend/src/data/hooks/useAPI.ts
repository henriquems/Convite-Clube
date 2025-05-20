import useSessao from "./useSessao"
import { HttpErro } from "../../errors/HttpErro";
import { useCallback } from "react";

export default function useAPI() {
    const { token } = useSessao()
    const urlBase = process.env.NEXT_PUBLIC_API_URL

    const httpGet = useCallback(async (caminho: string) => {
        const uri = caminho.startsWith("/") ? caminho : `/${caminho}`;
        const urlCompleta = `${urlBase}${uri}`;

        const resposta = await fetch(urlCompleta, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return extrairDados(resposta);
    }, [token, urlBase]);

    const httpDelete = useCallback(async (caminho: string) => {
        const uri = caminho.startsWith("/") ? caminho : `/${caminho}`;
        const urlCompleta = `${urlBase}${uri}`;

        const resposta = await fetch(urlCompleta, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return extrairDados(resposta);
    }, [token, urlBase]);

    const httpPost = useCallback(async (caminho: string, body: any) => {
        const uri = caminho.startsWith("/") ? caminho : `/${caminho}`;
        const urlCompleta = `${urlBase}${uri}`;

        try {
        const resposta = await fetch(urlCompleta, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(body),
        });

        if (!resposta.ok) {
            let data;
            try {
                data = await resposta.json();
                console.error("Erro do servidor:", data);
            } catch (e) {
                console.error("Erro ao tentar ler JSON:", e);
                data = { message: "Erro desconhecido" };
            }

            throw new HttpErro(resposta.status, data);
        }

        const contentType = resposta.headers.get("Content-Type");

        if (contentType && (contentType.includes("application/pdf") ||
            contentType.includes(
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            ))
        ) {
            return resposta.blob();
        }

        return extrairDados(resposta);
        } catch (error) {
            console.error("Erro no httpPost:", error);
            throw error;
        }
    }, [token, urlBase]);

    async function httpPostFormDataComProgresso<T = any>(
        caminho: string,
        formData: FormData,
        onProgresso?: (percentual: number) => void
    ): Promise<T> {
        const uri = caminho.startsWith('/') ? caminho : `/${caminho}`;
        const urlCompleta = `${urlBase}${uri}`;
    
        return new Promise<T>((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', urlCompleta);
            xhr.setRequestHeader('Authorization', `Bearer ${token}`);
    
            xhr.upload.onprogress = (event) => {
                if (event.lengthComputable && onProgresso) {
                    const percentual = Math.round((event.loaded / event.total) * 100);
                    onProgresso(percentual);
                }
            };
    
            xhr.onload = () => {
                try {
                    const respostaJson = JSON.parse(xhr.responseText);
                    if (xhr.status >= 200 && xhr.status < 300) {
                        resolve(respostaJson as T);
                    } else {
                        reject(new HttpErro(xhr.status, respostaJson));
                    }
                } catch (error) {
                    reject(new HttpErro(xhr.status, { message: "Erro ao processar resposta" }));
                }
            };
    
            xhr.onerror = () => {
                reject(new HttpErro(xhr.status, { message: "Erro na requisição" }));
            };
    
            xhr.send(formData);
        });
    }

    async function extrairDados(resposta: Response) {
        const contentType = resposta.headers.get("Content-Type");

        if (contentType && contentType.includes(
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        )) {
            return resposta.blob();
        }

        if (contentType && contentType.includes("application/json")) {
            try {
                const conteudo = await resposta.json();
                return conteudo;
            } catch (error) {
                console.error("Erro ao tentar parsear JSON:", error);
                throw new Error("Erro ao processar resposta JSON");
            }
            }

            try {
                const conteudo = await resposta.text();
                return conteudo;
            } catch (error) {
                console.error("Erro ao processar resposta de texto:", error);
                throw new Error("Erro ao processar resposta de texto");
            }
        }

    return { httpGet, httpPost, httpDelete };
}   
