# Phase 4 Gate — Adaptive intelligence

## Delivered
- [x] Cross-skill learner model (attempts, accuracy, recent window)
- [x] Fragile skill detection (recent accuracy < 50% with ≥3 samples)
- [x] Skill ranking for practice priority
- [x] Stamina / sessions-today soft signal + parent line
- [x] Smart Quest builder with interleaving (avoid 3 identical skills in a row)
- [x] Smart Quest page: math / english / mixed domains
- [x] Recording hooked into IslandWorld, Place Value, Bonds, English
- [x] Unit tests

## Manual test
1. Home → Smart Quest → Math
2. Answer mix of items → finish → see coach notes
3. Fail same skill several times → new Smart Quest prioritises it (skill tag)
4. Island practice also feeds the model

## Status
**Phase 4 core: COMPLETE**
