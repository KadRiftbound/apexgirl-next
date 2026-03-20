'use client';

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import artistsData from "@/lib/data/artists.json";

const translations: Record<string, any> = {
  fr: {
    title: "Team Builder & Équipement",
    selectCharacters: "Sélectionner les personnages",
    selectedTeam: "Équipe sélectionnée",
    noTeam: "Aucun personnage sélectionné",
    addUpTo5: "Ajoutez jusqu'à 5 personnages",
    baseStats: "Stats de base",
    equipment: "Équipement",
    equipmentBonus: "Bonus équipement",
    totalFans: "Fans totaux",
    genreSynergy: "Synergie de genre",
    none: "Aucun",
    jewelry: "Bijoux",
    cars: "Voitures",
    properties: "Propriétés",
    reset: "Réinitialiser",
    finalStats: "Stats finales",
    vocaliste: "Vocaliste",
    dancer: "Danseur",
    center: "Center",
    allGenres: "Tous les genres",
    allPositions: "Toutes les positions",
    allRanks: "Tous les ranks",
    filterGenre: "Genre",
    filterPosition: "Position",
    singAttack: "Sing (Attaque)",
    danceDefense: "Danse (Défense)",
    singPlus: "Sing +",
    dancePlus: "Danse +",
    fansPlus: "Fans +",
    finalSing: "Sing Final",
    finalDance: "Danse Finale",
    totalFansLabel: "Total Fans",
  },
  en: {
    title: "Team Builder & Equipment",
    selectCharacters: "Select Characters",
    selectedTeam: "Selected Team",
    noTeam: "No characters selected",
    addUpTo5: "Add up to 5 characters",
    baseStats: "Base Stats",
    equipment: "Equipment",
    equipmentBonus: "Equipment Bonus",
    totalFans: "Total Fans",
    genreSynergy: "Genre Synergy",
    none: "None",
    jewelry: "Jewelry",
    cars: "Cars",
    properties: "Properties",
    reset: "Reset",
    finalStats: "Final Stats",
    vocaliste: "Vocalist",
    dancer: "Dancer",
    center: "Center",
    allGenres: "All genres",
    allPositions: "All positions",
    allRanks: "All ranks",
    filterGenre: "Genre",
    filterPosition: "Position",
    singAttack: "Sing (Attack)",
    danceDefense: "Dance (Defense)",
    singPlus: "Sing +",
    dancePlus: "Dance +",
    fansPlus: "Fans +",
    finalSing: "Final Sing",
    finalDance: "Final Dance",
    totalFansLabel: "Total Fans",
  },
  it: {
    title: "Team Builder & Equipaggiamento",
    selectCharacters: "Seleziona Personaggi",
    selectedTeam: "Squadra selezionata",
    noTeam: "Nessun personaggio selezionato",
    addUpTo5: "Aggiungi fino a 5 personaggi",
    baseStats: "Stats di base",
    equipment: "Equipaggiamento",
    equipmentBonus: "Bonus Equipaggiamento",
    totalFans: "Fans totali",
    genreSynergy: "Sinergia genere",
    none: "Nessuno",
    jewelry: "Gioielli",
    cars: "Macchine",
    properties: "Proprietà",
    reset: "Reset",
    finalStats: "Stats finali",
    vocaliste: "Vocalista",
    dancer: "Ballerino",
    center: "Center",
    allGenres: "Tutti i generi",
    allPositions: "Tutte le posizioni",
    allRanks: "Tutti i ranghi",
    filterGenre: "Genere",
    filterPosition: "Posizione",
    singAttack: "Canto (Attacco)",
    danceDefense: "Danza (Difesa)",
    singPlus: "Canto +",
    dancePlus: "Danza +",
    fansPlus: "Fans +",
    finalSing: "Canto Finale",
    finalDance: "Danza Finale",
    totalFansLabel: "Totale Fans",
  },
  es: {
    title: "Team Builder & Equipamiento",
    selectCharacters: "Seleccionar Personajes",
    selectedTeam: "Equipo seleccionado",
    noTeam: "Ningún personaje seleccionado",
    addUpTo5: "Añade hasta 5 personajes",
    baseStats: "Stats base",
    equipment: "Equipamiento",
    equipmentBonus: "Bonus Equipamiento",
    totalFans: "Fans totales",
    genreSynergy: "Sinergia de género",
    none: "Ninguno",
    jewelry: "Joyas",
    cars: "Coches",
    properties: "Propiedades",
    reset: "Reiniciar",
    finalStats: "Stats finales",
    vocaliste: "Vocalista",
    dancer: "Bailarín",
    center: "Center",
    allGenres: "Todos los géneros",
    allPositions: "Todas las posiciones",
    allRanks: "Todos los rangos",
    filterGenre: "Género",
    filterPosition: "Posición",
    singAttack: "Canto (Ataque)",
    danceDefense: "Baile (Defensa)",
    singPlus: "Canto +",
    dancePlus: "Baile +",
    fansPlus: "Fans +",
    finalSing: "Canto Final",
    finalDance: "Baile Final",
    totalFansLabel: "Total Fans",
  },
  pt: {
    title: "Team Builder & Equipamento",
    selectCharacters: "Selecionar Personagens",
    selectedTeam: "Equipe selecionada",
    noTeam: "Nenhum personagem selecionado",
    addUpTo5: "Adicione até 5 personagens",
    baseStats: "Stats base",
    equipment: "Equipamento",
    equipmentBonus: "Bônus Equipamento",
    totalFans: "Total de fãs",
    genreSynergy: "Sinergia de gênero",
    none: "Nenhum",
    jewelry: "Joias",
    cars: "Carros",
    properties: "Propriedades",
    reset: "Resetar",
    finalStats: "Stats finais",
    vocaliste: "Vocalista",
    dancer: "Dançarino",
    center: "Center",
    allGenres: "Todos os gêneros",
    allPositions: "Todas as posições",
    allRanks: "Todas as patentes",
    filterGenre: "Gênero",
    filterPosition: "Posição",
    singAttack: "Canto (Ataque)",
    danceDefense: "Dança (Defesa)",
    singPlus: "Canto +",
    dancePlus: "Dança +",
    fansPlus: "Fans +",
    finalSing: "Canto Final",
    finalDance: "Dança Final",
    totalFansLabel: "Total de Fans",
  },
  pl: {
    title: "Team Builder & Wyposażenie",
    selectCharacters: "Wybierz Postacie",
    selectedTeam: "Wybrany Zespół",
    noTeam: "Nie wybrano postaci",
    addUpTo5: "Dodaj do 5 postaci",
    baseStats: "Statystyki bazowe",
    equipment: "Wyposażenie",
    equipmentBonus: "Bonus Wyposażenia",
    totalFans: "Suma fanów",
    genreSynergy: "Synergia gatunku",
    none: "Brak",
    jewelry: "Biżuteria",
    cars: "Samochody",
    properties: "Nieruchomości",
    reset: "Resetuj",
    finalStats: "Statystyki końcowe",
    vocaliste: "Wokalista",
    dancer: "Tancerz",
    center: "Center",
    allGenres: "Wszystkie gatunki",
    allPositions: "Wszystkie pozycje",
    allRanks: "Wszystkie rangi",
    filterGenre: "Gatunek",
    filterPosition: "Pozycja",
    singAttack: "Śpiew (Atak)",
    danceDefense: "Taniec (Obrona)",
    singPlus: "Śpiew +",
    dancePlus: "Taniec +",
    fansPlus: "Fani +",
    finalSing: "Końcowy Śpiew",
    finalDance: "Końcowy Taniec",
    totalFansLabel: "Suma Fanów",
  },
  id: {
    title: "Team Builder & Equipment",
    selectCharacters: "Pilih Karakter",
    selectedTeam: "Tim yang Dipilih",
    noTeam: "Tidak ada karakter dipilih",
    addUpTo5: "Tambah hingga 5 karakter",
    baseStats: "Stats dasar",
    equipment: "Equipment",
    equipmentBonus: "Bonus Equipment",
    totalFans: "Total penggemar",
    genreSynergy: "Sinergi genre",
    none: "Tidak ada",
    jewelry: "Perhiasan",
    cars: "Mobil",
    properties: "Properti",
    reset: "Reset",
    finalStats: "Stats akhir",
    vocaliste: "Vokalis",
    dancer: "Penari",
    center: "Center",
    allGenres: "Semua genre",
    allPositions: "Semua posisi",
    allRanks: "Semua rank",
    filterGenre: "Genre",
    filterPosition: "Posisi",
    singAttack: "Nyanyi (Serangan)",
    danceDefense: "Tari (Pertahanan)",
    singPlus: "Nyanyi +",
    dancePlus: "Tari +",
    fansPlus: "Fans +",
    finalSing: "Nyanyi Akhir",
    finalDance: "Tari Akhir",
    totalFansLabel: "Total Fans",
  },
  ru: {
    title: "Team Builder & Снаряжение",
    selectCharacters: "Выбрать Персонажей",
    selectedTeam: "Выбранная Команда",
    noTeam: "Персонаж не выбран",
    addUpTo5: "Добавьте до 5 персонажей",
    baseStats: "Базовые статы",
    equipment: "Снаряжение",
    equipmentBonus: "Бонус снаряжения",
    totalFans: "Всего фанатов",
    genreSynergy: "Синергия жанра",
    none: "Нет",
    jewelry: "Украшения",
    cars: "Машины",
    properties: "Свойства",
    reset: "Сбросить",
    finalStats: "Итоговые статы",
    vocaliste: "Вокалист",
    dancer: "Танцор",
    center: "Центр",
    allGenres: "Все жанры",
    allPositions: "Все позиции",
    allRanks: "Все ранги",
    filterGenre: "Жанр",
    filterPosition: "Позиция",
    singAttack: "Пение (Атака)",
    danceDefense: "Танец (Защита)",
    singPlus: "Пение +",
    dancePlus: "Танец +",
    fansPlus: "Фаны +",
    finalSing: "Итоговое Пение",
    finalDance: "Итоговый Танец",
    totalFansLabel: "Всего Фанатов",
  },
  de: {
    title: "Team Builder & Ausrüstung",
    selectCharacters: "Charaktere auswählen",
    selectedTeam: "Ausgewähltes Team",
    noTeam: "Keine Charaktere ausgewählt",
    addUpTo5: "Bis zu 5 Charaktere hinzufügen",
    baseStats: "Basis-Stats",
    equipment: "Ausrüstung",
    equipmentBonus: "Ausrüstungs-Bonus",
    totalFans: "Gesamt-Fans",
    genreSynergy: "Genre-Synergie",
    none: "Keine",
    jewelry: "Schmuck",
    cars: "Autos",
    properties: "Immobilien",
    reset: "Zurücksetzen",
    finalStats: "Endgültige Stats",
    vocaliste: "Vokalist",
    dancer: "Tänzer",
    center: "Center",
    allGenres: "Alle Genres",
    allPositions: "Alle Positionen",
    allRanks: "Alle Ränge",
    filterGenre: "Genre",
    filterPosition: "Position",
    singAttack: "Sing (Angriff)",
    danceDefense: "Tanz (Verteidigung)",
    singPlus: "Sing +",
    dancePlus: "Tanz +",
    fansPlus: "Fans +",
    finalSing: "Endgültig Sing",
    finalDance: "Endgültig Tanz",
    totalFansLabel: "Gesamt-Fans",
  },
};

type Artist = {
  id: number;
  name: string;
  group: string;
  rank: string;
  position: string;
  genre: string;
  singStat?: number;
  danceStat?: number;
  image?: string;
};

type Equipment = {
  id: string;
  name: string;
  rarity: string;
  sing: number;
  dance: number;
  management: number;
  fans: number;
};

const equipmentData = {
  jewelry: [
    { id: "ring", name: "Ring", rarity: "GOLD", sing: 2015, dance: 0, management: 0, fans: 11000 },
    { id: "choker", name: "Choker", rarity: "GOLD", sing: 0, dance: 2015, management: 0, fans: 11000 },
    { id: "heels", name: "Heels", rarity: "GOLD", sing: 0, dance: 0, management: 806, fans: 11000 },
    { id: "watch", name: "Watch", rarity: "PURPLE", sing: 1640, dance: 0, management: 0, fans: 0 },
    { id: "bracelet", name: "Bracelet", rarity: "PURPLE", sing: 0, dance: 1640, management: 0, fans: 0 },
    { id: "lingerie", name: "Lingerie", rarity: "PURPLE", sing: 0, dance: 0, management: 656, fans: 0 },
  ] as Equipment[],
  cars: [
    { id: "audi", name: "Audi", rarity: "GOLD", sing: 5905, dance: 0, management: 0, fans: 25000 },
    { id: "lamborghini", name: "Lamborghini", rarity: "GOLD", sing: 0, dance: 5905, management: 0, fans: 25000 },
    { id: "lexus", name: "Lexus", rarity: "GOLD", sing: 0, dance: 0, management: 2362, fans: 25000 },
    { id: "lotus", name: "Lotus", rarity: "PURPLE", sing: 4030, dance: 0, management: 0, fans: 0 },
    { id: "beetle", name: "Beetle", rarity: "PURPLE", sing: 0, dance: 4030, management: 0, fans: 0 },
    { id: "cooper", name: "Cooper", rarity: "PURPLE", sing: 0, dance: 0, management: 1612, fans: 0 },
  ] as Equipment[],
  properties: [
    { id: "villa", name: "Villa", rarity: "GOLD", sing: 11810, dance: 0, management: 0, fans: 50000 },
    { id: "park_mansion", name: "Park Mansion", rarity: "GOLD", sing: 0, dance: 11810, management: 0, fans: 50000 },
    { id: "country_manor", name: "Country Manor", rarity: "GOLD", sing: 0, dance: 0, management: 4724, fans: 50000 },
    { id: "penthouse", name: "Penthouse", rarity: "PURPLE", sing: 8060, dance: 0, management: 0, fans: 0 },
    { id: "loft", name: "Loft", rarity: "PURPLE", sing: 0, dance: 8060, management: 0, fans: 0 },
  ] as Equipment[]
};

const genreColors: Record<string, string> = {
  "Pop": "#ff69b4",
  "Hip Hop": "#ff8c00",
  "R&B": "#9b59b6",
  "Rock": "#e74c3c",
  "EDM": "#00ced1",
};

const rankColors: Record<string, string> = {
  "UR": "#ffd700",
  "SSR": "#c084fc",
  "SR": "#60a5fa",
  "R": "#4ade80",
};

export default function TeamBuilder() {
  const params = useParams();
  const lang = (params?.lang as string) || "en";
  const t = translations[lang] || translations.en;

  const [team, setTeam] = useState<Artist[]>([]);
  const [selectedCharId, setSelectedCharId] = useState<number | null>(null);
  const [filterGenre, setFilterGenre] = useState("");
  const [filterPosition, setFilterPosition] = useState("");
  const [filterRank, setFilterRank] = useState("");

  const [equipment, setEquipment] = useState<{
    jewelry: Equipment | null;
    car: Equipment | null;
    property: Equipment | null;
  }>({ jewelry: null, car: null, property: null });

  const filteredArtists = useMemo(() => {
    return artistsData.filter((artist: Artist) => {
      const matchesGenre = !filterGenre || artist.genre === filterGenre;
      const matchesPosition = !filterPosition || artist.position === filterPosition;
      const matchesRank = !filterRank || artist.rank === filterRank;
      return matchesGenre && matchesPosition && matchesRank;
    });
  }, [filterGenre, filterPosition, filterRank]);

  const addToTeam = (artist: Artist) => {
    if (team.length < 5 && !team.find(a => a.id === artist.id)) {
      setTeam([...team, artist]);
      setSelectedCharId(null);
    }
  };

  const removeFromTeam = (id: number) => {
    setTeam(team.filter(a => a.id !== id));
  };

  const teamStats = useMemo(() => {
    let sing = 0, dance = 0, management = 0, fans = 0;

    team.forEach(artist => {
      sing += artist.singStat || 0;
      dance += artist.danceStat || 0;
    });

    if (equipment.jewelry) {
      sing += equipment.jewelry.sing;
      dance += equipment.jewelry.dance;
      management += equipment.jewelry.management;
      fans += equipment.jewelry.fans;
    }
    if (equipment.car) {
      sing += equipment.car.sing;
      dance += equipment.car.dance;
      management += equipment.car.management;
      fans += equipment.car.fans;
    }
    if (equipment.property) {
      sing += equipment.property.sing;
      dance += equipment.property.dance;
      management += equipment.property.management;
      fans += equipment.property.fans;
    }

    return { sing, dance, management, fans };
  }, [team, equipment]);

  const baseStats = useMemo(() => {
    let sing = 0, dance = 0;
    team.forEach(artist => {
      sing += artist.singStat || 0;
      dance += artist.danceStat || 0;
    });
    return { sing, dance };
  }, [team]);

  return (
    <div style={{ width: "100%", color: "#fff" }}>
      <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "20px", textAlign: "center" }}>
        {t.title}
      </h2>

      {/* Filters */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px", flexWrap: "wrap" }}>
        <select
          value={filterGenre}
          onChange={(e) => setFilterGenre(e.target.value)}
          style={{ padding: "8px 12px", borderRadius: "6px", background: "#1f2937", border: "1px solid #374151", color: "#fff", fontSize: "0.85rem" }}
        >
          <option value="">{t.allGenres}</option>
          <option value="Pop">Pop</option>
          <option value="Hip Hop">Hip Hop</option>
          <option value="R&B">R&B</option>
          <option value="Rock">Rock</option>
          <option value="EDM">EDM</option>
        </select>
        <select
          value={filterPosition}
          onChange={(e) => setFilterPosition(e.target.value)}
          style={{ padding: "8px 12px", borderRadius: "6px", background: "#1f2937", border: "1px solid #374151", color: "#fff", fontSize: "0.85rem" }}
        >
          <option value="">{t.allPositions}</option>
          <option value="Vocalist">{t.vocaliste}</option>
          <option value="Dancer">{t.dancer}</option>
          <option value="Center">{t.center}</option>
        </select>
        <select
          value={filterRank}
          onChange={(e) => setFilterRank(e.target.value)}
          style={{ padding: "8px 12px", borderRadius: "6px", background: "#1f2937", border: "1px solid #374151", color: "#fff", fontSize: "0.85rem" }}
        >
          <option value="">{t.allRanks}</option>
          <option value="UR">UR</option>
          <option value="SSR">SSR</option>
          <option value="SR">SR</option>
          <option value="R">R</option>
        </select>
      </div>

      {/* Character Selection */}
      {team.length < 5 && (
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))", 
          gap: "8px", 
          marginBottom: "20px",
          maxHeight: "200px",
          overflowY: "auto",
          padding: "12px",
          background: "#111827",
          borderRadius: "8px"
        }}>
          {filteredArtists.slice(0, 50).map((artist: Artist) => (
            <button
              key={artist.id}
              onClick={() => addToTeam(artist)}
              disabled={!!team.find(a => a.id === artist.id)}
              style={{
                width: "100%",
                aspectRatio: "3/4",
                borderRadius: "6px",
                border: `2px solid ${rankColors[artist.rank] || "#374151"}`,
                background: team.find(a => a.id === artist.id) ? "#374151" : "#1f2937",
                cursor: team.find(a => a.id === artist.id) ? "not-allowed" : "pointer",
                overflow: "hidden",
                padding: 0,
                opacity: team.find(a => a.id === artist.id) ? 0.5 : 1,
              }}
              title={artist.name}
            >
              {artist.image ? (
                <img src={`/assets/images/artists/${artist.image}`} alt={artist.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", background: genreColors[artist.genre] ? `${genreColors[artist.genre]}33` : "#374151" }}>
                  <span style={{ fontSize: "1.5rem", fontWeight: 700, color: rankColors[artist.rank] }}>{artist.name.charAt(0)}</span>
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Team Display */}
      <div style={{ 
        display: "flex", 
        gap: "8px", 
        marginBottom: "20px", 
        justifyContent: "center",
        flexWrap: "wrap"
      }}>
        {[0,1,2,3,4].map(i => (
          <div
            key={i}
            onClick={() => team[i] && removeFromTeam(team[i].id)}
            style={{
              width: "60px",
              height: "80px",
              borderRadius: "8px",
              border: `2px solid ${team[i] ? rankColors[team[i].rank] : "#374151"}`,
              background: team[i] ? "#1f2937" : "#111827",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: team[i] ? "pointer" : "default",
              overflow: "hidden"
            }}
          >
            {team[i] ? (
              team[i].image ? (
                <img src={`/assets/images/artists/${team[i].image}`} alt={team[i].name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <span style={{ fontSize: "1.5rem", fontWeight: 700, color: rankColors[team[i].rank] }}>{team[i].name.charAt(0)}</span>
              )
            ) : (
              <span style={{ color: "#4b5563", fontSize: "1.5rem" }}>+</span>
            )}
          </div>
        ))}
      </div>

      {team.length > 0 && (
        <button
          onClick={() => setTeam([])}
          style={{
            display: "block",
            margin: "0 auto 20px",
            padding: "8px 20px",
            borderRadius: "6px",
            border: "1px solid #374151",
            background: "transparent",
            color: "#9ca3af",
            cursor: "pointer",
            fontSize: "0.85rem"
          }}
        >
          {t.reset}
        </button>
      )}

      {/* Equipment Selection */}
      {team.length > 0 && (
        <div style={{ marginBottom: "24px" }}>
          <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "12px", color: "#9ca3af" }}>{t.equipment}</h3>
          
          {/* Jewelry */}
          <div style={{ marginBottom: "16px" }}>
            <h4 style={{ fontSize: "0.85rem", color: "#6b7280", marginBottom: "8px" }}>{t.jewelry}</h4>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              <button
                onClick={() => setEquipment(e => ({ ...e, jewelry: null }))}
                style={{
                  padding: "6px 12px",
                  borderRadius: "4px",
                  border: !equipment.jewelry ? "1px solid #f472b6" : "1px solid #374151",
                  background: !equipment.jewelry ? "#374151" : "transparent",
                  color: "#fff",
                  fontSize: "0.75rem",
                  cursor: "pointer"
                }}
              >
                None
              </button>
              {equipmentData.jewelry.map(item => (
                <button
                  key={item.id}
                  onClick={() => setEquipment(e => ({ ...e, jewelry: item }))}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "4px",
                    border: equipment.jewelry?.id === item.id ? "1px solid #f472b6" : "1px solid #374151",
                    background: equipment.jewelry?.id === item.id ? "#374151" : "transparent",
                    color: item.rarity === "GOLD" ? "#fbbf24" : "#a78bfa",
                    fontSize: "0.75rem",
                    cursor: "pointer"
                  }}
                >
                  {item.name} ({item.rarity})
                </button>
              ))}
            </div>
          </div>

          {/* Cars */}
          <div style={{ marginBottom: "16px" }}>
            <h4 style={{ fontSize: "0.85rem", color: "#6b7280", marginBottom: "8px" }}>{t.cars}</h4>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              <button
                onClick={() => setEquipment(e => ({ ...e, car: null }))}
                style={{
                  padding: "6px 12px",
                  borderRadius: "4px",
                  border: !equipment.car ? "1px solid #f472b6" : "1px solid #374151",
                  background: !equipment.car ? "#374151" : "transparent",
                  color: "#fff",
                  fontSize: "0.75rem",
                  cursor: "pointer"
                }}
              >
                None
              </button>
              {equipmentData.cars.map(item => (
                <button
                  key={item.id}
                  onClick={() => setEquipment(e => ({ ...e, car: item }))}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "4px",
                    border: equipment.car?.id === item.id ? "1px solid #f472b6" : "1px solid #374151",
                    background: equipment.car?.id === item.id ? "#374151" : "transparent",
                    color: item.rarity === "GOLD" ? "#fbbf24" : "#a78bfa",
                    fontSize: "0.75rem",
                    cursor: "pointer"
                  }}
                >
                  {item.name} ({item.rarity})
                </button>
              ))}
            </div>
          </div>

          {/* Properties */}
          <div style={{ marginBottom: "16px" }}>
            <h4 style={{ fontSize: "0.85rem", color: "#6b7280", marginBottom: "8px" }}>{t.properties}</h4>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              <button
                onClick={() => setEquipment(e => ({ ...e, property: null }))}
                style={{
                  padding: "6px 12px",
                  borderRadius: "4px",
                  border: !equipment.property ? "1px solid #f472b6" : "1px solid #374151",
                  background: !equipment.property ? "#374151" : "transparent",
                  color: "#fff",
                  fontSize: "0.75rem",
                  cursor: "pointer"
                }}
              >
                None
              </button>
              {equipmentData.properties.map(item => (
                <button
                  key={item.id}
                  onClick={() => setEquipment(e => ({ ...e, property: item }))}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "4px",
                    border: equipment.property?.id === item.id ? "1px solid #f472b6" : "1px solid #374151",
                    background: equipment.property?.id === item.id ? "#374151" : "transparent",
                    color: item.rarity === "GOLD" ? "#fbbf24" : "#a78bfa",
                    fontSize: "0.75rem",
                    cursor: "pointer"
                  }}
                >
                  {item.name} ({item.rarity})
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Stats Display */}
      {team.length > 0 && (
        <div style={{ 
          background: "#111827", 
          borderRadius: "12px", 
          padding: "20px",
          border: "1px solid #374151"
        }}>
          <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "16px", color: "#f472b6" }}>{t.baseStats}</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "20px" }}>
            <div style={{ background: "#1f2937", padding: "12px", borderRadius: "8px", textAlign: "center" }}>
              <div style={{ fontSize: "0.75rem", color: "#9ca3af", marginBottom: "4px" }}>{t.singAttack}</div>
              <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#f472b6" }}>{baseStats.sing.toLocaleString()}</div>
            </div>
            <div style={{ background: "#1f2937", padding: "12px", borderRadius: "8px", textAlign: "center" }}>
              <div style={{ fontSize: "0.75rem", color: "#9ca3af", marginBottom: "4px" }}>{t.danceDefense}</div>
              <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#8b5cf6" }}>{baseStats.dance.toLocaleString()}</div>
            </div>
          </div>

          {(equipment.jewelry || equipment.car || equipment.property) && (
            <>
              <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "16px", color: "#8b5cf6" }}>{t.equipmentBonus}</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "20px" }}>
                <div style={{ background: "#1f2937", padding: "12px", borderRadius: "8px", textAlign: "center" }}>
                  <div style={{ fontSize: "0.75rem", color: "#9ca3af", marginBottom: "4px" }}>{t.singPlus}</div>
                  <div style={{ fontSize: "1.25rem", fontWeight: 700, color: "#f472b6" }}>+{(equipment.jewelry?.sing || 0) + (equipment.car?.sing || 0) + (equipment.property?.sing || 0)}</div>
                </div>
                <div style={{ background: "#1f2937", padding: "12px", borderRadius: "8px", textAlign: "center" }}>
                  <div style={{ fontSize: "0.75rem", color: "#9ca3af", marginBottom: "4px" }}>{t.dancePlus}</div>
                  <div style={{ fontSize: "1.25rem", fontWeight: 700, color: "#8b5cf6" }}>+{(equipment.jewelry?.dance || 0) + (equipment.car?.dance || 0) + (equipment.property?.dance || 0)}</div>
                </div>
                <div style={{ background: "#1f2937", padding: "12px", borderRadius: "8px", textAlign: "center" }}>
                  <div style={{ fontSize: "0.75rem", color: "#9ca3af", marginBottom: "4px" }}>{t.fansPlus}</div>
                  <div style={{ fontSize: "1.25rem", fontWeight: 700, color: "#fbbf24" }}>+{((equipment.jewelry?.fans || 0) + (equipment.car?.fans || 0) + (equipment.property?.fans || 0)).toLocaleString()}</div>
                </div>
              </div>
            </>
          )}

          <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "16px", color: "#22c55e" }}>{t.finalStats}</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div style={{ background: "linear-gradient(135deg, #ec4899, #a855f7)", padding: "16px", borderRadius: "8px", textAlign: "center" }}>
              <div style={{ fontSize: "0.75rem", opacity: 0.8, marginBottom: "4px" }}>{t.finalSing}</div>
              <div style={{ fontSize: "2rem", fontWeight: 800 }}>{teamStats.sing.toLocaleString()}</div>
            </div>
            <div style={{ background: "linear-gradient(135deg, #8b5cf6, #06b6d4)", padding: "16px", borderRadius: "8px", textAlign: "center" }}>
              <div style={{ fontSize: "0.75rem", opacity: 0.8, marginBottom: "4px" }}>{t.finalDance}</div>
              <div style={{ fontSize: "2rem", fontWeight: 800 }}>{teamStats.dance.toLocaleString()}</div>
            </div>
            <div style={{ background: "#1f2937", padding: "12px", borderRadius: "8px", textAlign: "center", gridColumn: "span 2" }}>
              <div style={{ fontSize: "0.75rem", color: "#9ca3af", marginBottom: "4px" }}>{t.totalFansLabel}</div>
              <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#fbbf24" }}>{teamStats.fans.toLocaleString()}</div>
            </div>
          </div>
        </div>
      )}

      {team.length === 0 && (
        <div style={{ textAlign: "center", padding: "40px", color: "#6b7280" }}>
          <div style={{ fontSize: "3rem", marginBottom: "12px" }}>👥</div>
          <p>{t.noTeam}</p>
          <p style={{ fontSize: "0.85rem" }}>{t.addUpTo5}</p>
        </div>
      )}
    </div>
  );
}
