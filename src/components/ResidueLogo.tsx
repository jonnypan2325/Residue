import Image from 'next/image';

interface ResidueLogoProps {
  className?: string;
  priority?: boolean;
}

export default function ResidueLogo({
  className = 'w-9 h-9 rounded-lg',
  priority = false,
}: ResidueLogoProps) {
  return (
    <div className={`relative shrink-0 overflow-hidden ${className}`}>
      <Image
        src="/icon.png"
        alt="Residue logo"
        fill
        sizes="48px"
        priority={priority}
        unoptimized
        className="object-cover"
      />
    </div>
  );
}
