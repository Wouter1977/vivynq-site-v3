# Higgsfield-visuals voor de Vivynq-site

Ik (Claude) kan Higgsfield niet zelf bedienen — dat vereist jouw account/login.
De site staat klaar met nette **placeholders** die je 1-op-1 vervangt door
Higgsfield-output. Hieronder per plek de exacte prompt + waar het bestand komt.

## Merk-richtlijnen (plak bovenaan elke prompt)
> Cinematic, dark and elegant. Deep aubergine-to-black gradient background
> (#0F0318 → #2E0832 → #1A0525). Gold accents (#C9A84C). Calm, premium,
> spiritual-but-grounded. No text, no logos, no faces in focus. 4 subtle accent
> colors allowed sparingly: deep red, ochre, green, blue.

---

## 1. Hero-video (belangrijkste)
**Plek:** `src/components/hero-visual.tsx` — vervang het blok onder
`{/* HIGGSFIELD VIDEO SLOT — vervang dit blok */}` door:
```tsx
<video autoPlay muted loop playsInline poster="/hero-poster.jpg"
  className="absolute inset-0 w-full h-full object-cover">
  <source src="/hero.mp4" type="video/mp4" />
</video>
```
Zet `hero.mp4` + `hero-poster.jpg` in `public/`.

**Higgsfield prompt (image-to-video of text-to-video, 4:5, ~6-10s, seamless loop):**
> [merk-richtlijnen] — A slow, meditative orbit of four softly glowing orbs
> (deep red, ochre, green, blue) circling a luminous golden core, like a
> personality constellation. Fine concentric gold rings rotate gently. Particles
> of light drift upward. Ultra-smooth, hypnotic, seamless loop. Macro depth of
> field, volumetric light. Vertical 4:5.

## 2. Open Graph / social share-beeld (1200×630)
**Plek:** `public/og.jpg` (koppel later in `layout.tsx` → `openGraph.images`).
> [merk-richtlijnen] — Wide cinematic hero: a single radiant golden orb with four
> faint colored satellites, vast dark space, gold dust. Lower-third left empty for
> text overlay. 1200x630.

## 3. "Vier lagen"-sectie (4 vierkante beelden, optioneel)
Voor Lichaam / Denken / Gevoel / Ziel — elk 1:1, abstract:
- **Lichaam (rood):** > [merk] — abstract macro of breath/energy moving through a translucent body silhouette, deep red glow. No face.
- **Denken (blauw):** > [merk] — abstract neural constellation of fine blue-gold lines forming a calm lattice.
- **Gevoel (groen):** > [merk] — soft organic green light blooming like a heartbeat ripple in dark water.
- **Ziel (oker):** > [merk] — concentric golden circles like roots/family rings expanding into darkness.

## 4. Optioneel: korte product-loops
Voor `/scan` en `/zakelijk` een rustige achtergrond-loop (16:9, ~6s) met hetzelfde
motief, lager contrast zodat tekst leesbaar blijft.

---

### Aanlevering
- Video: `.mp4` (H.264), < 4 MB voor de hero, in `public/`.
- Beelden: `.jpg`/`.webp` in `public/`.
- Geef me daarna een seintje, dan koppel ik ze in (1 edit per plek) en vervang ik
  de placeholders.
