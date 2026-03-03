export default function Burger() {
    return (
        <button className="flex flex-col gap-1.5 p-2 focus:outline-none group">
            <span className="w-8 h-0.5 bg-current group-hover:bg-blue-500 transition-colors"></span>
            <span className="w-8 h-0.5 bg-current group-hover:bg-blue-500 transition-colors"></span>
            <span className="w-5 h-0.5 bg-current self-end group-hover:bg-blue-500 transition-colors"></span>
        </button>
    );
}