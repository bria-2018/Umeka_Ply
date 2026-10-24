/** Signature ornament: stacked fine lines echoing a laminated plywood edge. */
export function PlyLines({ className = '', count = 7, animate = false }: { className?: string; count?: number; animate?: boolean }) {
  return (
    <div aria-hidden="true" className={`flex flex-col gap-[5px] ${animate ? 'layer-anim' : ''} ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="block h-px bg-current"
          style={{ width: `${100 - ((i * 37) % 45)}%`, opacity: 1 - i * 0.08, animationDelay: `${i * 70}ms` }}
        />
      ))}
    </div>
  );
}
