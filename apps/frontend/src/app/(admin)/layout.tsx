import ForcarAutenticacao from "@/components/shared/ForcarAutenticacao";
import Pagina from "@/components/template/Pagina";

export default function Layout(props: any){
    return (
        <div>
            <ForcarAutenticacao>
                <Pagina>{props.children}</Pagina>
            </ForcarAutenticacao>
        </div>
    )
}