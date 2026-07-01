import Image from "next/image";

export function Logo({
  size = 96,
  priority,
  className,
}: {
  size?: number;
  priority?: boolean;
  className?: string;
}) {
  return (
    <Image
      src="/logo-256.png"
      alt="VIVYNQ"
      width={size}
      height={size}
      sizes={`${size}px`}
      priority={priority}
      className={className}
    />
  );
}
