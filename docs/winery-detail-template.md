# Winery Detail Template

`Weingut Dautel` is the reference implementation for the editorial winery detail page system.

This template is about reusable structure and UI logic, not reusable copy or shared imagery.

## Narrative Order

1. `hero`
2. `overview`
3. `heritage-renewal`
4. `wine-focus`
5. `recognition`
6. `award`
7. `gallery`
8. `video`
9. `wines`
10. `inquiry`
11. `navigation`

## Reusable Logic

- `WineryHero`
  - large image-led first screen
  - integrated editorial info card
- `WineryRichSection`
  - `intro`: overview/rationale with supporting fact cards
  - `tinted`: heritage or contextual narrative blocks
  - `spotlight`: wine-focus or award sections with supporting image
  - `fact`: recognition/validation block
- `WineryGallery`
  - one dominant image
  - curated supporting hierarchy
- `WineryVideoSection`
  - quiet media emphasis
- `WineryWinesSection`
  - equal-height editorial bottle cards
- `WineryPager`
  - curated continuation to other wineries

## Data Model

Use `WineryEntry` with:

- `templateKey`
- `hiddenSectionIds`
- `heroImage`, `descriptor`, `intro`
- ordered `sections`
- optional `awards`
- optional `gallery`
- optional `video`
- `wines`
- optional `inquiry`

Use `WineryTextSection.role` to map content to editorial slots:

- `overview`
- `heritage-renewal`
- `wine-focus`
- `recognition`
- `award`
- `essay`

## Dautel-Specific Logic That Was Separated

- hidden sections are now controlled by `hiddenSectionIds` in data instead of page-level `slug === 'dautel'` conditions
- narrative roles are now explicit through `WineryTextSection.role`
- reusable winery rotation is handled by `getRotatedWineries()`
- reusable section visibility is handled by `getVisibleWinerySections()`

## How To Build The Next Winery Page

1. Start with a `WineryEntry`.
2. Set `templateKey: 'editorial-reference'`.
3. Fill the same structural slots with winery-specific content and images.
4. Keep the Dautel narrative order unless there is a strong editorial reason to vary it.
5. Use:
   - `heritage-renewal` for lineage and estate updates
   - `wine-focus` for one bottle, varietal, or house-expression anchor
   - `recognition` for long-term validation
   - `award` for source-based factual recognition
6. Keep gallery hierarchy deliberate:
   - one dominant image
   - supporting images with clear priority
7. Keep wines editorial:
   - equal-card grid
   - no store-like merchandising

Each winery can stay visually individual through its own imagery, copy, and emphasis, while still using the same calm premium editorial system.
