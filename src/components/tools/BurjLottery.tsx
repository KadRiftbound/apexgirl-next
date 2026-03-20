'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';

// ─── Types ───────────────────────────────────────────────
type Reward = {
  id: number;
  type: 'gift' | 'artist';
  tier?: 'luxury' | 'superior' | 'rare' | 'special';
  pick?: number;
  label: string;
  color: string;
  bg: string;
  icon: string;
};

type Winner = {
  name: string;
  reward: Reward;
};

const MAX_PLAYERS = 150;

// ─── Récompenses fixes ────────────────────────────────────
const REWARDS: Reward[] = [
  // 1 Luxury
  { id: 1,  type: 'gift', tier: 'luxury',   label: 'Luxury Gift',    color: '#ffd700', bg: 'rgba(255,215,0,0.18)',    icon: '👑' },
  // 2 Superior
  { id: 2,  type: 'gift', tier: 'superior', label: 'Superior Gift',  color: '#c084fc', bg: 'rgba(192,132,252,0.18)',  icon: '💜' },
  { id: 3,  type: 'gift', tier: 'superior', label: 'Superior Gift',  color: '#c084fc', bg: 'rgba(192,132,252,0.18)',  icon: '💜' },
  // 5 Rare
  { id: 4,  type: 'gift', tier: 'rare',     label: 'Rare Gift',      color: '#60a5fa', bg: 'rgba(96,165,250,0.18)',   icon: '💙' },
  { id: 5,  type: 'gift', tier: 'rare',     label: 'Rare Gift',      color: '#60a5fa', bg: 'rgba(96,165,250,0.18)',   icon: '💙' },
  { id: 6,  type: 'gift', tier: 'rare',     label: 'Rare Gift',      color: '#60a5fa', bg: 'rgba(96,165,250,0.18)',   icon: '💙' },
  { id: 7,  type: 'gift', tier: 'rare',     label: 'Rare Gift',      color: '#60a5fa', bg: 'rgba(96,165,250,0.18)',   icon: '💙' },
  { id: 8,  type: 'gift', tier: 'rare',     label: 'Rare Gift',      color: '#60a5fa', bg: 'rgba(96,165,250,0.18)',   icon: '💙' },
  // 10 Special
  { id: 9,  type: 'gift', tier: 'special',  label: 'Special Gift',   color: '#4ade80', bg: 'rgba(74,222,128,0.15)',   icon: '💚' },
  { id: 10, type: 'gift', tier: 'special',  label: 'Special Gift',   color: '#4ade80', bg: 'rgba(74,222,128,0.15)',   icon: '💚' },
  { id: 11, type: 'gift', tier: 'special',  label: 'Special Gift',   color: '#4ade80', bg: 'rgba(74,222,128,0.15)',   icon: '💚' },
  { id: 12, type: 'gift', tier: 'special',  label: 'Special Gift',   color: '#4ade80', bg: 'rgba(74,222,128,0.15)',   icon: '💚' },
  { id: 13, type: 'gift', tier: 'special',  label: 'Special Gift',   color: '#4ade80', bg: 'rgba(74,222,128,0.15)',   icon: '💚' },
  { id: 14, type: 'gift', tier: 'special',  label: 'Special Gift',   color: '#4ade80', bg: 'rgba(74,222,128,0.15)',   icon: '💚' },
  { id: 15, type: 'gift', tier: 'special',  label: 'Special Gift',   color: '#4ade80', bg: 'rgba(74,222,128,0.15)',   icon: '💚' },
  { id: 16, type: 'gift', tier: 'special',  label: 'Special Gift',   color: '#4ade80', bg: 'rgba(74,222,128,0.15)',   icon: '💚' },
  { id: 17, type: 'gift', tier: 'special',  label: 'Special Gift',   color: '#4ade80', bg: 'rgba(74,222,128,0.15)',   icon: '💚' },
  { id: 18, type: 'gift', tier: 'special',  label: 'Special Gift',   color: '#4ade80', bg: 'rgba(74,222,128,0.15)',   icon: '💚' },
  // 8 Artist picks
  { id: 19, type: 'artist', pick: 1, label: '1st Artist Pick', color: '#f472b6', bg: 'rgba(244,114,182,0.18)', icon: '🎤' },
  { id: 20, type: 'artist', pick: 2, label: '2nd Artist Pick', color: '#fb923c', bg: 'rgba(251,146,60,0.18)',  icon: '🎤' },
  { id: 21, type: 'artist', pick: 3, label: '3rd Artist Pick', color: '#facc15', bg: 'rgba(250,204,21,0.18)',  icon: '🎤' },
  { id: 22, type: 'artist', pick: 4, label: '4th Artist Pick', color: '#a3e635', bg: 'rgba(163,230,53,0.18)',  icon: '🎤' },
  { id: 23, type: 'artist', pick: 5, label: '5th Artist Pick', color: '#34d399', bg: 'rgba(52,211,153,0.18)',  icon: '🎤' },
  { id: 24, type: 'artist', pick: 6, label: '6th Artist Pick', color: '#22d3ee', bg: 'rgba(34,211,238,0.18)',  icon: '🎤' },
  { id: 25, type: 'artist', pick: 7, label: '7th Artist Pick', color: '#818cf8', bg: 'rgba(129,140,248,0.18)', icon: '🎤' },
  { id: 26, type: 'artist', pick: 8, label: '8th Artist Pick', color: '#e879f9', bg: 'rgba(232,121,249,0.18)', icon: '🎤' },
];

// ─── Traductions ──────────────────────────────────────────
const T: Record<string, any> = {
  fr: {
    addPlayer: 'Ajouter des participants',
    playerName: 'Noms des participants',
    placeholder: 'Ex: Alice, Bob, Charlie',
    players: 'Participants',
    noPlayers: 'Aucun participant ajouté',
    mode: 'Mode de tirage',
    modeBoth: 'Un Gift ET un Pick artiste possible',
    modeOne: 'Un seul type de récompense par personne',
    draw: 'Lancer le tirage',
    reset: 'Réinitialiser',
    results: 'Résultats',
    noResults: 'Lance le tirage pour voir les résultats',
    rewardPool: 'Pool de récompenses',
    remaining: 'restantes',
    giftsLeft: 'Gifts',
    picksLeft: 'Artist Picks',
    duplicate: 'Ce participant existe déjà',
    maxPlayers: 'Maximum 150 participants',
  },
  en: {
    addPlayer: 'Add participants',
    playerName: 'Participant names',
    placeholder: 'e.g. Alice, Bob, Charlie',
    players: 'Participants',
    noPlayers: 'No participants added',
    mode: 'Draw mode',
    modeBoth: 'One Gift AND one Artist Pick possible',
    modeOne: 'Only one reward type per person',
    draw: 'Run the lottery',
    reset: 'Reset',
    results: 'Results',
    noResults: 'Run the lottery to see results',
    rewardPool: 'Reward pool',
    remaining: 'remaining',
    giftsLeft: 'Gifts',
    picksLeft: 'Artist Picks',
    duplicate: 'This participant already exists',
    maxPlayers: 'Maximum 150 participants',
  },
  de: {
    addPlayer: 'Teilnehmer hinzufügen',
    playerName: 'Teilnehmernamen',
    placeholder: 'z.B. Anna, Ben, Clara',
    players: 'Teilnehmer',
    noPlayers: 'Keine Teilnehmer hinzugefügt',
    mode: 'Ziehungmodus',
    modeBoth: 'Ein Gift UND ein Artist Pick möglich',
    modeOne: 'Nur eine Belohnungsart pro Person',
    draw: 'Ziehung starten',
    reset: 'Zurücksetzen',
    results: 'Ergebnisse',
    noResults: 'Starte die Ziehung um Ergebnisse zu sehen',
    rewardPool: 'Belohnungspool',
    remaining: 'verbleibend',
    giftsLeft: 'Gifts',
    picksLeft: 'Artist Picks',
    duplicate: 'Dieser Teilnehmer existiert bereits',
    maxPlayers: 'Maximal 150 Teilnehmer',
  },
  it: {
    addPlayer: 'Aggiungi partecipanti',
    playerName: 'Nomi dei partecipanti',
    placeholder: 'es. Alice, Bob, Carlo',
    players: 'Partecipanti',
    noPlayers: 'Nessun partecipante aggiunto',
    mode: 'Modalità estrazione',
    modeBoth: 'Un Gift E un Pick artista possibili',
    modeOne: 'Solo un tipo di ricompensa per persona',
    draw: 'Avvia estrazione',
    reset: 'Ripristina',
    results: 'Risultati',
    noResults: 'Avvia lestrazione per vedere i risultati',
    rewardPool: 'Pool ricompense',
    remaining: 'rimanenti',
    giftsLeft: 'Gifts',
    picksLeft: 'Artist Picks',
    duplicate: 'Questo partecipante esiste già',
    maxPlayers: 'Massimo 150 partecipanti',
  },
  es: {
    addPlayer: 'Añadir participantes',
    playerName: 'Nombres de participantes',
    placeholder: 'ej. Ana, Ben, Clara',
    players: 'Participantes',
    noPlayers: 'No hay participantes añadidos',
    mode: 'Modo de sorteo',
    modeBoth: 'Un Gift Y un Pick de artista posibles',
    modeOne: 'Solo un tipo de recompensa por persona',
    draw: 'Iniciar sorteo',
    reset: 'Reiniciar',
    results: 'Resultados',
    noResults: 'Inicia el sorteo para ver resultados',
    rewardPool: 'Pool de recompensas',
    remaining: 'restantes',
    giftsLeft: 'Gifts',
    picksLeft: 'Artist Picks',
    duplicate: 'Este participante ya existe',
    maxPlayers: 'Máximo 150 participantes',
  },
  pt: {
    addPlayer: 'Adicionar participantes',
    playerName: 'Nomes dos participantes',
    placeholder: 'ex. Ana, Ben, Clara',
    players: 'Participantes',
    noPlayers: 'Nenhum participante adicionado',
    mode: 'Modo de sorteio',
    modeBoth: 'Um Gift E um Pick de artista possíveis',
    modeOne: 'Apenas um tipo de recompensa por pessoa',
    draw: 'Iniciar sorteio',
    reset: 'Reiniciar',
    results: 'Resultados',
    noResults: 'Inicia o sorteio para ver resultados',
    rewardPool: 'Pool de recompensas',
    remaining: 'restantes',
    giftsLeft: 'Gifts',
    picksLeft: 'Artist Picks',
    duplicate: 'Este participante já existe',
    maxPlayers: 'Máximo 150 participantes',
  },
  pl: {
    addPlayer: 'Dodaj uczestników',
    playerName: 'Imiona uczestników',
    placeholder: 'np. Anna, Ben, Klara',
    players: 'Uczestnicy',
    noPlayers: 'Nie dodano uczestników',
    mode: 'Tryb losowania',
    modeBoth: 'Możliwy Gift ORAZ Artist Pick',
    modeOne: 'Tylko jeden typ nagrody na osobę',
    draw: 'Rozpocznij losowanie',
    reset: 'Resetuj',
    results: 'Wyniki',
    noResults: 'Rozpocznij losowanie aby zobaczyć wyniki',
    rewardPool: 'Pula nagród',
    remaining: 'pozostałe',
    giftsLeft: 'Gifts',
    picksLeft: 'Artist Picks',
    duplicate: 'Ten uczestnik już istnieje',
    maxPlayers: 'Maksimum 150 uczestników',
  },
  id: {
    addPlayer: 'Tambah peserta',
    playerName: 'Nama peserta',
    placeholder: 'cth. Anna, Ben, Clara',
    players: 'Peserta',
    noPlayers: 'Tidak ada peserta ditambahkan',
    mode: 'Mode undian',
    modeBoth: 'Gift DAN Artist Pick dimungkinkan',
    modeOne: 'Hanya satu jenis hadiah per orang',
    draw: 'Mulai undian',
    reset: 'Reset',
    results: 'Hasil',
    noResults: 'Mulai undian untuk melihat hasil',
    rewardPool: 'Pool hadiah',
    remaining: 'tersisa',
    giftsLeft: 'Gifts',
    picksLeft: 'Artist Picks',
    duplicate: 'Peserta ini sudah ada',
    maxPlayers: 'Maksimum 150 peserta',
  },
  ru: {
    addPlayer: 'Добавить участников',
    playerName: 'Имена участников',
    placeholder: 'напр. Анна, Бен, Клара',
    players: 'Участники',
    noPlayers: 'Участники не добавлены',
    mode: 'Режим розыгрыша',
    modeBoth: 'Возможен Gift И Artist Pick',
    modeOne: 'Только один тип награды на человека',
    draw: 'Начать розыгрыш',
    reset: 'Сбросить',
    results: 'Результаты',
    noResults: 'Начните розыгрыш чтобы увидеть результаты',
    rewardPool: 'Пул наград',
    remaining: 'осталось',
    giftsLeft: 'Gifts',
    picksLeft: 'Artist Picks',
    duplicate: 'Этот участник уже существует',
    maxPlayers: 'Максимум 150 участников',
  },
};

// ─── Utilitaires ──────────────────────────────────────────
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const TIER_ORDER = { luxury: 0, superior: 1, rare: 2, special: 3 };

// ─── Composant principal ──────────────────────────────────
export default function BurjLottery() {
  const params = useParams();
  const lang = (params?.lang as string) || 'fr';
  const t = T[lang] || T.en;

  const [players, setPlayers] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [inputError, setInputError] = useState('');
  const [allowBoth, setAllowBoth] = useState(false);
  const [winners, setWinners] = useState<Winner[]>([]);
  const [drawn, setDrawn] = useState(false);
  const [drawError, setDrawError] = useState('');

  const giftsPool  = REWARDS.filter(r => r.type === 'gift');
  const artistPool = REWARDS.filter(r => r.type === 'artist');

  // ── Ajouter un ou plusieurs participants (séparés par des virgules)
  const addPlayer = () => {
    const rawInput = input.trim();
    if (!rawInput) return;
    
    // Diviser par virgule et nettoyer
    const names = rawInput.split(',').map(n => n.trim()).filter(n => n.length > 0);
    
    const newPlayers = [...players];
    let errors = [];
    
    for (const name of names) {
      if (newPlayers.includes(name)) {
        errors.push(`"${name}" ${t.duplicate}`);
      } else if (newPlayers.length >= MAX_PLAYERS) {
        errors.push(t.maxPlayers);
        break;
      } else {
        newPlayers.push(name);
      }
    }
    
    if (errors.length > 0) {
      setInputError(errors.join(', '));
      return;
    }
    
    setPlayers(newPlayers);
    setInput('');
    setInputError('');
    setDrawn(false);
    setDrawError('');
  };

  const removePlayer = (name: string) => {
    setPlayers(players.filter(p => p !== name));
    setDrawn(false);
    setDrawError('');
  };

  // ── Lancer le tirage
  const runDraw = () => {
    if (players.length === 0) return;
    setDrawError('');

    const shuffledPlayers = shuffle(players);

    if (allowBoth) {
      // Chaque participant peut obtenir 1 Gift ET/OU 1 Artist Pick
      // On distribue d'abord tous les gifts, puis les picks, en tournant sur les joueurs
      const allRewards = shuffle([...REWARDS]);
      const result: Winner[] = [];
      const perPlayer: Record<string, { gift?: Reward; pick?: Reward }> = {};
      shuffledPlayers.forEach(p => { perPlayer[p] = {}; });

      // Distribuer gifts puis picks
      const giftsBag  = shuffle([...giftsPool]);
      const picksBag  = shuffle([...artistPool]);
      const shuffledForGifts  = shuffle([...shuffledPlayers]);
      const shuffledForPicks  = shuffle([...shuffledPlayers]);

      shuffledForGifts.forEach((player, i) => {
        if (i < giftsBag.length) perPlayer[player].gift = giftsBag[i];
      });
      shuffledForPicks.forEach((player, i) => {
        if (i < picksBag.length) perPlayer[player].pick = picksBag[i];
      });

      // Construire les résultats : un winner par reward obtenu
      shuffledPlayers.forEach(player => {
        const { gift, pick } = perPlayer[player];
        if (gift) result.push({ name: player, reward: gift });
        if (pick) result.push({ name: player, reward: pick });
      });

      setWinners(result);
    } else {
      // Mode un seul type : on attribue au hasard 26 récompenses parmi les participants
      const bag = shuffle([...REWARDS]);
      const winnersSlice = shuffledPlayers.slice(0, bag.length);
      const result: Winner[] = winnersSlice.map((player, i) => ({
        name: player,
        reward: bag[i],
      }));
      setWinners(result);
    }

    setDrawn(true);
  };

  const reset = () => {
    setPlayers([]);
    setInput('');
    setInputError('');
    setWinners([]);
    setDrawn(false);
    setDrawError('');
  };

  // ── Résumé pool
  const giftWinners  = winners.filter(w => w.reward.type === 'gift');
  const artistWinners = winners.filter(w => w.reward.type === 'artist');

  // Trier les résultats : gifts d'abord (par tier), puis artist picks (par pick #)
  const sortedWinners = [...winners].sort((a, b) => {
    if (a.reward.type !== b.reward.type) return a.reward.type === 'gift' ? -1 : 1;
    if (a.reward.type === 'gift' && b.reward.type === 'gift') {
      return (TIER_ORDER[a.reward.tier!] ?? 99) - (TIER_ORDER[b.reward.tier!] ?? 99);
    }
    return (a.reward.pick ?? 0) - (b.reward.pick ?? 0);
  });

  return (
    <div style={{ color: '#fff', fontSize: '0.9rem' }}>

      {/* ── Pool overview ── */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '18px' }}>
        {/* Gifts */}
        <div style={{ flex: 1, minWidth: '120px', background: 'rgba(255,255,255,0.04)', borderRadius: '10px', padding: '10px 14px', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.45)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>🎁 {t.giftsLeft}</div>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {[
              { tier: 'luxury',   color: '#ffd700', icon: '👑', count: 1  },
              { tier: 'superior', color: '#c084fc', icon: '💜', count: 2  },
              { tier: 'rare',     color: '#60a5fa', icon: '💙', count: 5  },
              { tier: 'special',  color: '#4ade80', icon: '💚', count: 10 },
            ].map(({ tier, color, icon, count }) => (
              <span key={tier} style={{ background: `${color}18`, border: `1px solid ${color}44`, borderRadius: '6px', padding: '2px 8px', fontSize: '0.72rem', color }}>
                {icon} ×{count}
              </span>
            ))}
          </div>
        </div>
        {/* Artist Picks */}
        <div style={{ flex: 1, minWidth: '120px', background: 'rgba(255,255,255,0.04)', borderRadius: '10px', padding: '10px 14px', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.45)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>🎤 {t.picksLeft}</div>
          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
            {artistPool.map(r => (
              <span key={r.id} style={{ background: r.bg, border: `1px solid ${r.color}44`, borderRadius: '6px', padding: '2px 7px', fontSize: '0.7rem', color: r.color }}>
                {r.pick}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Mode ── */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{t.mode}</div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {[
            { val: false, label: t.modeOne },
            { val: true,  label: t.modeBoth },
          ].map(({ val, label }) => (
            <button
              key={String(val)}
              onClick={() => { setAllowBoth(val); setDrawn(false); }}
              style={{
                flex: 1, minWidth: '120px', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer',
                border: allowBoth === val ? '2px solid #f97316' : '1px solid rgba(255,255,255,0.12)',
                background: allowBoth === val ? 'rgba(249,115,22,0.15)' : 'rgba(255,255,255,0.04)',
                color: allowBoth === val ? '#f97316' : 'rgba(255,255,255,0.6)',
                fontSize: '0.78rem', fontWeight: allowBoth === val ? 700 : 400,
                transition: 'all 0.15s',
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Ajouter participants ── */}
      <div style={{ marginBottom: '14px' }}>
        <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          {t.players} ({players.length}/{MAX_PLAYERS})
        </div>
        <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', marginBottom: '8px' }}>
          💡 {t.playerName}: {t.placeholder}
        </div>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
          <input
            value={input}
            onChange={e => { setInput(e.target.value); setInputError(''); }}
            onKeyDown={e => e.key === 'Enter' && addPlayer()}
            placeholder={t.placeholder}
            style={{
              flex: 1, padding: '8px 12px', borderRadius: '8px', fontSize: '0.88rem',
              background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)',
              color: '#fff', outline: 'none',
            }}
          />
          <button
            onClick={addPlayer}
            style={{
              padding: '8px 16px', borderRadius: '8px', border: 'none',
              background: 'linear-gradient(135deg, #f97316, #ea580c)',
              color: '#fff', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            + {t.addPlayer}
          </button>
        </div>
        {inputError && <div style={{ color: '#f87171', fontSize: '0.75rem', marginBottom: '6px' }}>{inputError}</div>}

        {/* Liste participants */}
        {players.length > 0 ? (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {players.map(p => (
              <span
                key={p}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  padding: '4px 10px', borderRadius: '20px', fontSize: '0.8rem',
                  background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)',
                  color: '#fff',
                }}
              >
                {p}
                <button
                  onClick={() => removePlayer(p)}
                  style={{ background: 'none', border: 'none', color: 'rgba(255,100,100,0.7)', cursor: 'pointer', padding: '0', fontSize: '0.75rem', lineHeight: 1 }}
                >✕</button>
              </span>
            ))}
          </div>
        ) : (
          <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem', fontStyle: 'italic' }}>{t.noPlayers}</div>
        )}
      </div>

      {/* ── Boutons d'action ── */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        <button
          onClick={runDraw}
          disabled={players.length === 0}
          style={{
            flex: 1, padding: '10px', borderRadius: '10px', border: 'none',
            background: players.length === 0 ? 'rgba(255,255,255,0.1)' : 'linear-gradient(135deg, #f97316, #ea580c)',
            color: players.length === 0 ? 'rgba(255,255,255,0.3)' : '#fff',
            fontWeight: 700, fontSize: '0.9rem', cursor: players.length === 0 ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s',
          }}
        >
          🎲 {t.draw}
        </button>
        <button
          onClick={reset}
          style={{
            padding: '10px 16px', borderRadius: '10px',
            border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.05)',
            color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', cursor: 'pointer',
          }}
        >
          ↺ {t.reset}
        </button>
      </div>

      {drawError && <div style={{ color: '#f87171', fontSize: '0.8rem', marginBottom: '12px', padding: '8px 12px', background: 'rgba(248,113,113,0.1)', borderRadius: '8px', border: '1px solid rgba(248,113,113,0.3)' }}>{drawError}</div>}

      {/* ── Résultats ── */}
      <div>
        <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          🏆 {t.results}
          {drawn && (
            <span style={{ marginLeft: '8px', color: '#f97316', fontSize: '0.7rem' }}>
              · {giftWinners.length} gifts, {artistWinners.length} picks
            </span>
          )}
        </div>

        {!drawn ? (
          <div style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.8rem', fontStyle: 'italic', textAlign: 'center', padding: '20px 0' }}>{t.noResults}</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            {sortedWinners.map((w, i) => (
              <div
                key={`${w.name}-${w.reward.id}-${i}`}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '8px 12px', borderRadius: '10px',
                  background: w.reward.bg, border: `1px solid ${w.reward.color}44`,
                }}
              >
                <span style={{ fontSize: '1rem', flexShrink: 0 }}>{w.reward.icon}</span>
                <span style={{ flex: 1, fontWeight: 600, color: '#fff', fontSize: '0.88rem' }}>{w.name}</span>
                <span style={{
                  padding: '3px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700,
                  background: `${w.reward.color}22`, color: w.reward.color,
                  border: `1px solid ${w.reward.color}55`, whiteSpace: 'nowrap',
                }}>
                  {w.reward.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
