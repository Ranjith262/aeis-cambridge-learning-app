# AEIS Learning World — Phase 0 Product Bible
## Pedagogy · Art · Architecture (Locked Standards)

**Audience:** Children 7–8 years (Primary 1 / AEIS P2 entrance readiness)  
**Subjects:** Mathematics (lead), English (parity design)  
**Status:** PHASE 0 COMPLETE — all later work must obey this bible  

---

## A. Pedagogy Bible (Learning Science)

### A1. Developmental constraints
- Learners are concrete-operational: concepts must be acted on before they are symbolic.
- Attention arcs: 2–4 minutes per micro-episode; chain episodes, do not lecture.
- Error is information; shame collapses exploration.

### A2. Non-negotiable instructional sequence (every skill)
1. **Goal** the child can say in plain words  
2. **Concrete** action (move, group, count objects)  
3. **Pictorial** representation of the same action  
4. **Abstract** symbols / number sentence  
5. **Try** with scaffolding  
6. **Feedback** that names the *strategy*, not only right/wrong  
7. **Spaced return** via Review Garden  

This is CPA + retrieval practice + process feedback.

### A3. Math skill graph (Phase 1–2 priority)
| Skill ID | Concept | Canonical a-ha |
|----------|---------|----------------|
| PV_TENS_ONES | Place value tens & ones | 10 ones = 1 ten |
| PV_BUILD | Build number from tens+ones | 3 tens + 4 ones = 34 |
| PV_READ | Read digit places | In 47, 4 means 40 |
| BONDS_10 | Number bonds to 10 | 7 needs 3 to make 10 |
| ADD_WITHIN_20 | Addition strategies | Make-ten |
| SUB_WITHIN_20 | Subtraction strategies | Count back / bond |
| COMPARE | Greater / less | Tens first |
| MONEY_CENTS | Coin totals | Value not count of coins |
| TIME_OCLOCK | Hour / half past | Hands mean different units |
| GRAPH_COMPARE | Picture graphs | Most / least / difference |

### A4. English skill graph (design parity; build after Math slice)
| Skill ID | Concept |
|----------|---------|
| PHON_PATTERN | Letter–sound patterns in context |
| VOCAB_SCENE | Word meaning from scene |
| SENT_BUILD | Subject–verb–object assembly |
| READ_QUEST | Short passage + meaning choice |
| GRAM_NOTICE | Pattern notice after success |

### A5. Generator rules
- Surface form infinite; deep structure fixed per skill schema.
- Every item: skillId, CPA stage, misconception distractors, reading load score.
- No fixed ordered paper for practice. Mocks generate from schemas under exam constraints.

### A6. Session shape (default practice)
Enter world → 30–60s concept cinema → guided manipulative → 5–8 adaptive items → strategy praise → optional garden.

Mocks: separate mode; no cinema mid-paper.

### A7. Motivation
Competence (visible growth), autonomy (path choice), relatedness (character guide).  
Process praise only.

---

## B. Art Bible (Experience Craft)

### B1. First 3 seconds
Child must feel: *I entered a world*, not *I opened a form*.

### B2. World identity
- **Math Kingdom:** soft daylight, water, islands, castles, warm pastels, hopeful.
- **Character:** Captain Number — clear silhouette, readable emotions, never scary.
- Motion has weight: anticipation, settle. No random shaking of the page shell.

### B3. 3D / depth policy
- Prefer **meaningful 3D-like stages** for place value blocks (CSS 3D / canvas / R3F when stable).
- Performance budget: mid tablet, no jank on core path.
- Reduced-motion: same pedagogy, simplified transitions.

### B4. Teach cinema
- 4–6 beats, autoplay ~2.5–3.5s/beat, skippable.
- Numbers taken from *this* question or skill demo range.
- Ends on “I understand” → try.

### B5. Parent surface
Calm, light, instrument-like. Story of progress > vanity charts.

---

## C. Technical Bible (Architecture)

### C1. Layers
1. World shell (nav, a11y, profile, audio bus later)  
2. Curriculum graph  
3. Experience runtime (scenes)  
4. Generators  
5. Learner model  
6. SRS  
7. Parent insights  

### C2. Phase 1 vertical slice scope (ONLY)
**Skill:** Place value (tens & ones)  
**Must ship:**
- Dedicated Place Value World entry  
- Concept cinema engine (timeline) for PV  
- Interactive blocks (tens rods + ones cubes)  
- Generator for PV items only (infinite)  
- Guided + independent practice  
- Learner model updates for PV skills  
- Parent one-line PV insight  
- Tests for generator + grading  

### C3. Quality gates
- Phase incomplete until: tests pass, manual path walkthrough documented, bible not violated.
- No mock/exam work inside Phase 1 unless it reuses PV generator only for practice.

### C4. Stability
- `overscroll-behavior: none`; no transform fights on map shells.
- Touch targets ≥ 44px where primary.

---

## D. Phase gate checklist
- [x] Pedagogy standards written  
- [x] Art standards written  
- [x] Technical standards written  
- [ ] Phase 1 vertical slice implemented & tested  

**Signed:** Learning · Design · Architecture · Engineering (single implementation stream)
