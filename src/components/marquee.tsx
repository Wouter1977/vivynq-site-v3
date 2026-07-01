/**
 * Oneindig schuivende tekstband (marquee). Pauzeert bij hover. Pure CSS.
 */
export function Marquee({ items }: { items: string[] }) {
  const row = (
    <div className="vq-marquee-track">
      {items.concat(items).map((t, i) => (
        <span key={i} className="font-display inline-flex items-center" style={{ fontSize: "clamp(1.4rem, 3.4vw, 2.6rem)", color: "rgba(242,237,227,0.9)" }}>
          <span style={{ padding: "0 28px" }}>{t}</span>
          <span style={{ color: "#C9A84C", fontSize: "0.6em" }}>✦</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className="vq-marquee" style={{ overflow: "hidden", borderTop: "1px solid rgba(201,168,76,0.2)", borderBottom: "1px solid rgba(201,168,76,0.2)", padding: "22px 0" }}>
      {row}
    </div>
  );
}
