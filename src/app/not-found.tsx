import { Container, SectionTitle, Lead, GoldLink } from "@/components/ui";

export default function NotFound() {
  return (
    <section style={{ paddingTop: "96px", paddingBottom: "40px" }}>
      <Container>
        <div className="max-w-[560px] mx-auto text-center">
          <p className="font-display text-goud" style={{ fontSize: "4rem", lineHeight: 1, opacity: 0.5 }}>404</p>
          <SectionTitle style={{ margin: "12px 0 14px" }}>Deze pagina bestaat niet</SectionTitle>
          <Lead style={{ margin: "0 auto 26px", maxWidth: "440px" }}>
            Misschien is de link verouderd. Begin opnieuw bij het begin.
          </Lead>
          <GoldLink href="/">Naar de homepage</GoldLink>
        </div>
      </Container>
    </section>
  );
}
