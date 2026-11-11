# LILA — Design System

Source of truth for color and atmosphere: `design-references/LILA_MOODBOARD.png`.
Hebrew, RTL, parents of girls about 8–13, and girls who should feel welcome.

## Style

An illustrated lifestyle world. Soft, refined, and warm. Japanese children’s-book calm mixed with a modern gift brand. Not a pharmacy catalog, not a kindergarten site, and not a generic store template.

## Palette

| Token | Hex | Use |
| --- | --- | --- |
| cream | `#F7F3EE` | Page background |
| paper | `#FBF8F4` | Raised paper, consent card |
| blush | `#E8D0D6` | Dusty pink surfaces |
| lilac | `#D9D1EA` | Lavender surfaces |
| sage | `#C9DDD4` | Mint surfaces |
| peach | `#F4E6C8` | Butter yellow surfaces |
| sky / powder | `#D5E4F2` | Light blue surfaces |
| rose | `#6E3E56` | Links |
| rose-deep | `#4E3344` | Primary buttons, white text |
| ink | `#2F2836` | Body text |
| muted | `#5A5160` | Secondary text |

Text on cream and on the pastel cards stays ink or muted. White text is only on `rose-deep`.

## Type

- Headings: Heebo, medium weight
- Body and forms: IBM Plex Sans Hebrew, regular weight
- Wordmark: existing `public/logo.png`. Do not redraw it.

## Shape

- Buttons: full pill, at least 48px tall
- Cards: 1.75rem radius, soft shadow, 1px ink ring at 10% opacity
- Sections: 4rem mobile, 6rem desktop, content width 72rem
- Focus: 3px rose-deep outline, never removed

## Motifs

Hand-drawn flowers, daisies, sparks and sprigs in `components/illustrations/Motifs.tsx`. They are decorative and hidden from assistive tech. Product photography stays the real kit images in `public/`.

## Forms

Visible labels, errors under the field, one summary alert, and no success message before the server accepts the submission. Marketing consent is a separate unchecked checkbox.
