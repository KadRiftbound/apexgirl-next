# TopGirl / ApexGirl / Idol Company — Game Knowledge Base

## Overview
War strategy game similar to White Out Survival. Group-oriented progression across multiple servers and Abroad cycles. Artists function as heroes/commanders with stats, skills, and specialties.

---

## 1. Game Structure & Progression

### Phase 1: Home Server (~4 weeks)
- Start on a new server in the "outer zone" (tutorial phase ~3 weeks)
- Group recruits, progresses toward map center
- Goal: conquer Burj Khalifa, claim Mayor title
- After ~3 weeks, server becomes permanent **home server**
- Then transition: wait for other servers, ~1 week City Supremacy event

### Phase 2: Abroad Cycles
The game loops through Abroad adventures:

**Tokyo** (first Abroad, ~3 weeks)
- Tokyo Warmup first (prep week, 6 servers grouped)
- New map, similar conquest mechanics
- Tokyo Tower = final objective (like Burj Khalifa)
- Has Metro system, specific buildings
- Top 25 in Warmup unlock Chizuru (first rally capacity artist)
- 1st server gets 10% stat bonus, 2nd/3rd get 5%

**Bali** (second Abroad)
- Grand Palace = final objective

**Ancient Rome** (third Abroad)
- Coliseum = final objective

### Between Abroad cycles
- Return to home server
- Alternates between City Supremacy (SvS) and Top CEO events
- Wait time varies: 1 week to 5-6 weeks
- A pool of ~40-50 servers is needed to launch next Abroad

### Main Game Loop
Home Server -> Tokyo Warmup -> Tokyo -> Home -> Bali -> Home -> Ancient Rome -> (repeats: Tokyo 2, Bali 2, Rome 2...)

### Travel
- **Passports** allow switching between home server and Abroad maps
- Home server doesn't disappear during Abroad

---

## 2. Artist System

### Ranks (highest to lowest)
| Rank | Description |
|------|-------------|
| **UR** | Ultra Rare — special/limited, CANNOT be upgraded. Linked to an SSR. Level follows linked SSR. |
| **SSR** | Super Super Rare — normal top-tier artist, CAN be upgraded (levels/stars) |
| **SR** | Super Rare |
| **R** | Rare |

### UR Details
- **9 starting UR** — from the home server initial pool (Alexandra, Genevieve, Isadora, Josephine, Marguerite, Anastasia, Beatrice, Elizabeth, Gabriella)
- **3 UR per Abroad** (Tokyo, Bali, Rome) — linked to SSR from the same Abroad
  - Example: UR Bali is linked to an SSR from Bali
- UR cannot be leveled/upgraded directly
- Player chooses which SSR to link to the UR (any SSR, can change freely)
- UR's power = linked SSR's level/stars
- Cannot link two different UR to the same SSR simultaneously
- **Deployment limit**: 1-2 UR on home server map, only 1 UR on Abroad map
- Strategy: invest in the linked SSR to make the UR stronger
- Since linking is flexible, UR can be adapted to different roles by changing linked SSR

### Positions (role in team)
- **Center** — lead role, certain stat distribution
- **Vocalist** — Sing-focused stat distribution
- **Dancer** — Dance-focused stat distribution
- **Singer** — special position (UR only?)
- **Visual** — balanced/special position (UR only?)
- Positions have minimal gameplay impact EXCEPT in **Grammy Award** event

### Stats
| Stat | Meaning |
|------|---------|
| **Sing** | Attack power |
| **Dance** | Defense power |
| Total | Sing + Dance (overall power indicator) |

### Specialties
| Specialty | Effect | Count | Notable |
|-----------|--------|-------|---------|
| **damage_boost** | 2 offensive skills: skill damage + basic attack damage | 35 | Meta staple |
| **solo_car** | Increases troop capacity for solo team (Fan cap) | 33 | Key for solo power |
| **mixed** | 1 offensive + 1 defensive skill | 19 | Jack-of-all-trades |
| **driving_speed** | March speed | 8 | QoL, low impact |
| **damage_reduction** | 2 defensive skills: reduces incoming damage | 6 | Tanky |
| **gathering (rassemblement)** | Rally capacity (group attack troop size) | 6 | Rally cap stat. Different from economy. |
| **economy** | Resource gathering (gold from hotels, resource farming) | 5 | Only 1 SSR (Kesnia, Tier D). Mostly R-rank. Minor specialty. |
| **hq_defense** | HQ/base defense | 5 | All SSR, all Tier A or S |

### Skills System
| Skill Type | Trigger | Effect |
|------------|---------|--------|
| **Basic attack** | Constant | Regular damage |
| **Skills** | Every 10 seconds | Special effects (damage, buffs, debuffs) |
| **Damage to player** | Passive | Boosts BOTH basic attack AND skill damage |

### Troop System (Fans)
- **Fan cap** = troop capacity for solo deployments
  - Functions as HP and base damage (like classic war games)
  - Example: Aurelia has fan cap
- **Rally cap** = troop capacity for team rallies (group attacks)
  - Multiple players join to attack together
  - Example: Sari has rally cap
- Both use the same concept but one is solo, one is group

---

## 3. Economy & Buildings

### City Buildings
- Main source of income in early game
- Linked to **Management/Economy** stat of artists
- Early game priority: Tower > Buildings > Employees
- Don't hire too many employees too early

### Hotels
- Resource farming — dig for gold
- Gold helps upgrade buildings faster

### Abroad Buildings
- Each Abroad has specific buildings
- Generate experience based on shop level + Management stat

---

## 4. Abroad-Specific Systems

### Tokyo
- **Tokyo Tower** = final objective (like Burj Khalifa)
- **Metro** system: gives boosts, rewards, progression
- **Tokyo buildings**: generate XP based on shop levels + Management
- **6 servers per pool**, grouped by similar age
- Heavy penalty for unorganized servers

### Bali
- **Grand Palace** = final objective
- Has its own set of UR artists linked to Bali SSR

### Ancient Rome
- **Coliseum** = final objective
- Has its own set of UR artists linked to Rome SSR
- **Unique mechanic**: No need to link to a building to attack. Normal mechanic requires building/constructing to reach map objectives.
- Rome bypasses the construction requirement — more direct combat

---

## 5. Events

### City Supremacy
- SvS (Server vs Server) between 2-3 servers
- Occurs between Abroad cycles
- Lasts ~1 week

### Top CEO
- Another recurring event between cycles

### Echo Death Match
- Weekly 3-day event (Friday-Sunday)
- Choose difficulty (fixed for event)
- 15 stages, each available 1 hour
- Bonus rewards at stages 3, 6, 9, 12, 15
- Rewards: SR/SSR Private Photos, SSR Cards, EXP Cards

### Grammy Award
- Event where artist positions actually matter
- Correct positioning gives scoring boosts
- All artists trigger their skills when placed in the correct position
- Positions: Center, Vocalist, Dancer, Singer, Visual — each has a designated slot

### Other Events
- Fishing Event
- Muse Event
- Radio Battle
- Roulette Event
- Clean Up Party
- Versus Group Event
- Ultimate CEO Event
- Group Battle

---

## 6. Artist Analysis Framework

When writing `thoughts` for an artist, consider:

1. **Rank (UR vs SSR)**
   - UR: special, cannot upgrade, linked to SSR. Mention linked SSR.
   - SSR: normal, can upgrade. Worth investing long-term.

2. **Stats (Sing vs Dance)**
   - High Sing > Dance → offensive glass cannon
   - High Dance > Sing → defensive tank
   - Balanced → versatile

3. **Specialty**
   - damage_boost → offensive DPS, good for bursting
   - damage_reduction → defensive, good for survival
   - solo_car → strong in solo content
   - mixed → flexible, jack-of-all-trades
   - gathering → resource focused
   - economy → economic management
   - hq_defense → base defender
   - driving_speed → fast marches

4. **Position + Genre**
   - Position matters mainly for Grammy Award
   - Genre matters for Collection system synergy

5. **Skills**
   - What specific % buffs/debuffs they provide
   - Rally cap vs Fan cap distinction

6. **Calculated Tier**
   - Community ranking (S+ through D)
   - Higher tier = better overall value

7. **Acquisition**
   - How hard to obtain (F2P, Low spender, etc.)

---

## 7. UR Artist Inventory

### Home Server UR (8)
1. Alexandra (Center, Pop, damage_boost, Tier A)
2. Genevieve (Dancer, Rock, damage_reduction, Tier A)
3. Isadora (Center, EDM, damage_reduction, Tier A)
4. Josephine (Vocalist, Hip Hop, damage_boost, Tier A)
5. Marguerite (Vocalist, R&B, damage_boost, Tier A)
6. Anastasia (Center, Pop, damage_boost, Tier A)
7. Beatrice (Singer, Hip Hop, solo_car, Tier S)
8. Elizabeth (Visual, Pop, damage_boost, Tier S)
9. Gabriella (Singer, Rock, damage_boost, Tier S)

### Abroad UR
- Tokyo: 3 UR artists
- Bali: 3 UR artists
- Rome: 3 UR artists
- Each linked to SSR from same Abroad

---

## 8. Key Facts for AdSense Content Strategy

- The game is a **war strategy game** with hero-collection mechanics
- **Sing = ATK, Dance = DEF** (this is critical for accurate analysis)
- **UR vs SSR** distinction is crucial: UR = fixed power linked to SSR investment
- **Abroad cycle** is the core endgame loop
- **Fan cap vs Rally cap** = solo vs group troop capacity
- Positions only matter in Grammy Award
- Genres matter for Collection system
- Guides already contain substantial content (600-7400 chars each)
- Artist pages need `thoughts` field filled with analysis based on above framework
