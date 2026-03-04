import Logo from "./Logo";
import Burger from "./Burger";

export default function Header() {
    return (
        <header className="flex items-center justify-between px-6 py-4 border-b bg-[#c4c4c4]">
            <Logo />
            <Burger />
        </header>
    );
}