import Logo from "../shared/Logo";
import MenuPrinicipal from "../shared/MenuPrincipal";

export default function Cabecalho() {
    return (
        <header className="flex justify-center fixed top-0 
            left-0 w-full bg-green-800 h-16 shadow-md z-40">
            <div className="flex items-center justify-between container">
                <Logo
                    largura={32} 
                    altura={32}
                    className="text-zinc-200 text-lg"
                />
                <div>
                    <MenuPrinicipal />
                </div>
            </div>
        </header>
    )
}