const fs = require("fs");

const FR_SOURCE = "public/glossaire.txt";
const SUPPORTED_LANGS = ["en", "it", "es", "pt", "pl", "id", "ru", "de"];

const TRANSLATIONS = {
  "Glossaire Top Girl": {
    en: "Top Girl Glossary",
    it: "Glossario Top Girl",
    es: "Glosario Top Girl",
    pt: "Glossário Top Girl",
    pl: "Słownik Top Girl",
    id: "Glosarium Top Girl",
    ru: "Глоссарий Top Girl",
    de: "Top Girl Glossar",
  },
  "Structure du jeu": {
    en: "Game Structure",
    it: "Struttura del gioco",
    es: "Estructura del juego",
    pt: "Estrutura do jogo",
    pl: "Struktura gry",
    id: "Struktur Permainan",
    ru: "Структура игры",
    de: "Spielstruktur",
  },
  "Stats et progression": {
    en: "Stats and Progression",
    it: "Statistiche e progressione",
    es: "Estadísticas y progresión",
    pt: "Stats e progressão",
    pl: "Statystyki i postęp",
    id: "Stats dan Progresi",
    ru: "Статы и прогресс",
    de: "Stats und Fortschritt",
  },
  "Artistes, équipes et compétences": {
    en: "Artists, Teams and Skills",
    it: "Artisti, team e competenze",
    es: "Artistas, equipos y habilidades",
    pt: "Artistas, equipes e habilidades",
    pl: "Artyści, drużyny i umiejętności",
    id: "Artis, Tim dan Skill",
    ru: "Артисты, команды и навыки",
    de: "Künstler, Teams und Fähigkeiten",
  },
  "Assets et équipements": {
    en: "Assets and Equipment",
    it: "Asset e attrezzature",
    es: "Assets y equipamiento",
    pt: "Assets e equipamentos",
    pl: "Zasoby i wyposażenie",
    id: "Aset dan Peralatan",
    ru: "Ассеты и снаряжение",
    de: "Assets und Ausrüstung",
  },
  "Peak, Tier et systèmes passifs": {
    en: "Peak, Tier and Passive Systems",
    it: "Peak, Tier e sistemi passivi",
    es: "Peak, Tier y sistemas pasivos",
    pt: "Peak, Tier e sistemas passivos",
    pl: "Peak, Tier i systemy pasywne",
    id: "Peak, Tier dan Sistem Pasif",
    ru: "Peak, Tier и пассивные системы",
    de: "Peak, Tier und passive Systeme",
  },
  "Ressources et économie": {
    en: "Resources and Economy",
    it: "Risorse ed economia",
    es: "Recursos y economía",
    pt: "Recursos e economia",
    pl: "Zasoby i ekonomia",
    id: "Sumber daya dan Ekonomi",
    ru: "Ресурсы и экономика",
    de: "Ressourcen und Wirtschaft",
  },
  "Boutiques et shops": {
    en: "Shops and Boutiques",
    it: "Negozi e boutique",
    es: "Tiendas y boutiques",
    pt: "Lojas e boutiques",
    pl: "Sklepy i butiki",
    id: "Toko dan Boutique",
    ru: "Магазины",
    de: "Läden und Shops",
  },
  "Groupe et coordination": {
    en: "Group and Coordination",
    it: "Gruppo e coordinazione",
    es: "Grupo y coordinación",
    pt: "Grupo e coordenação",
    pl: "Grupa i koordynacja",
    id: "Grup dan Koordinasi",
    ru: "Группа и координация",
    de: "Gruppe und Koordination",
  },
  "Combat et guerre": {
    en: "Combat and War",
    it: "Combattimento e guerra",
    es: "Combate y guerra",
    pt: "Combate e guerra",
    pl: "Walka i wojna",
    id: "Pertempuran dan Perang",
    ru: "Бой и война",
    de: "Kampf und Krieg",
  },
  "Événements majeurs": {
    en: "Major Events",
    it: "Eventi principali",
    es: "Eventos principales",
    pt: "Eventos principais",
    pl: "Główne wydarzenia",
    id: "Event Utama",
    ru: "Главные события",
    de: "Große Events",
  },
  "Événements Tokyo et systèmes liés": {
    en: "Tokyo Events and Related Systems",
    it: "Eventi di Tokyo e sistemi correlati",
    es: "Eventos de Tokyo y sistemas relacionados",
    pt: "Eventos de Tokyo e sistemas relacionados",
    pl: "Wydarzenia Tokyo i powiązane systemy",
    id: "Event Tokyo dan Sistem Terkait",
    ru: "События Tokyo и связанные системы",
    de: "Tokyo-Events und zugehörige Systeme",
  },
  "Fishing Event": {
    en: "Fishing Event",
    it: "Evento di pesca",
    es: "Evento de pesca",
    pt: "Evento de pesca",
    pl: "Wydarzenie wędkarskie",
    id: "Event Memancing",
    ru: "Рыбалка",
    de: "Angel-Event",
  },
  "Group Battle": {
    en: "Group Battle",
    it: "Battaglia di gruppo",
    es: "Batalla de grupo",
    pt: "Batalha de grupo",
    pl: "Bitwa grupowa",
    id: "Pertempuran Grup",
    ru: "Групповая битва",
    de: "Gruppenkampf",
  },
  "VIP et dépenses": {
    en: "VIP and Spending",
    it: "VIP e spese",
    es: "VIP y gastos",
    pt: "VIP e gastos",
    pl: "VIP i wydatki",
    id: "VIP dan Pengeluaran",
    ru: "VIP и расходы",
    de: "VIP und Ausgaben",
  },
};

const DEF_TRANSLATIONS = {
  "Serveur d'origine (Home Server)": {
    en: "Home Server",
    it: "Server principale",
    es: "Servidor principal",
    pt: "Servidor principal",
    pl: "Serwer główny",
    id: "Server Utama",
    ru: "Родной сервер",
    de: "Heimserver",
  },
  "Abroad": {
    en: "Abroad",
    it: "Abroad",
    es: "Abroad",
    pt: "Abroad",
    pl: "Abroad",
    id: "Abroad",
    ru: "Abroad",
    de: "Abroad",
  },
  Warmup: {
    en: "Warmup",
    it: "Warmup",
    es: "Warmup",
    pt: "Warmup",
    pl: "Warmup",
    id: "Warmup",
    ru: "Warmup",
    de: "Warmup",
  },
  "Tokyo": { en: "Tokyo", it: "Tokyo", es: "Tokyo", pt: "Tokyo", pl: "Tokyo", id: "Tokyo", ru: "Tokyo", de: "Tokyo" },
  Bali: { en: "Bali", it: "Bali", es: "Bali", pt: "Bali", pl: "Bali", id: "Bali", ru: "Bali", de: "Bali" },
  "Roma / Ancient Rome": { en: "Roma / Ancient Rome", it: "Roma / Ancient Rome", es: "Roma / Ancient Rome", pt: "Roma / Ancient Rome", pl: "Roma / Ancient Rome", id: "Roma / Ancient Rome", ru: "Roma / Ancient Rome", de: "Roma / Ancient Rome" },
  Chamber: { en: "Chamber", it: "Chamber", es: "Chamber", pt: "Chamber", pl: "Chamber", id: "Chamber", ru: "Chamber", de: "Chamber" },
  "Chamber Territory": { en: "Chamber Territory", it: "Territorio Chamber", es: "Territorio Chamber", pt: "Território Chamber", pl: "Terytorium Chamber", id: "Teritori Chamber", ru: "Территория Chamber", de: "Chamber-Territorium" },
  HQ: { en: "HQ", it: "HQ", es: "HQ", pt: "HQ", pl: "HQ", id: "HQ", ru: "HQ", de: "HQ" },
  Landmark: { en: "Landmark", it: "Landmark", es: "Landmark", pt: "Landmark", pl: "Landmark", id: "Landmark", ru: "Landmark", de: "Landmark" },
  "Landmark First Occupation": { en: "Landmark First Occupation", it: "Prima occupazione Landmark", es: "Primera ocupación de Landmark", pt: "Primeira ocupação de Landmark", pl: "Pierwsza okupacja Landmark", id: "Pendudukan Landmark Pertama", ru: "Первое занятие Landmark", de: "Landmark-Erste Besetzung" },
  "Burj Khalifa": { en: "Burj Khalifa", it: "Burj Khalifa", es: "Burj Khalifa", pt: "Burj Khalifa", pl: "Burj Khalifa", id: "Burj Khalifa", ru: "Burj Khalifa", de: "Burj Khalifa" },
  "Tokyo Tower": { en: "Tokyo Tower", it: "Tokyo Tower", es: "Tokyo Tower", pt: "Tokyo Tower", pl: "Tokyo Tower", id: "Tokyo Tower", ru: "Tokyo Tower", de: "Tokyo Tower" },
  "Maire (Mayor)": { en: "Mayor", it: "Sindaco", es: "Alcalde", pt: "Prefeito", pl: "Burmistrz", id: "Wali Kota", ru: "Мэр", de: "Bürgermeister" },
  "Postes du Burj": { en: "Burj Posts", it: "Posizioni Burj", es: "Puestos del Burj", pt: "Postos do Burj", pl: "Stanowiska Burj", id: "Posisi Burj", ru: "Должности Burj", de: "Burj-Positionen" },
  "Pool de serveurs": { en: "Server Pool", it: "Pool di server", es: "Grupo de servidores", pt: "Pool de servidores", pl: "Pula serwerów", id: "Pool Server", ru: "Пул серверов", de: "Server-Pool" },
  Migration: { en: "Migration", it: "Migrazione", es: "Migración", pt: "Migração", pl: "Migracja", id: "Migrasi", ru: "Миграция", de: "Migration" },
  "Migration Tickets": { en: "Migration Tickets", it: "Biglietti di migrazione", es: "Tickets de migración", pt: "Tickets de migração", pl: "Bilety migracyjne", id: "Tiket Migrasi", ru: "Билеты миграции", de: "Migrations-Tickets" },
  "Chant (Sing)": { en: "Sing", it: "Canto", es: "Canto", pt: "Canto", pl: "Śpiew", id: "Bernyanyi", ru: "Пение", de: "Singen" },
  "Danse (Defense)": { en: "Defense", it: "Difesa", es: "Defensa", pt: "Defesa", pl: "Obrona", id: "Defense", ru: "Защита", de: "Verteidigung" },
  "Management (Economy)": { en: "Economy", it: "Economia", es: "Economía", pt: "Economia", pl: "Ekonomia", id: "Ekonomi", ru: "Экономика", de: "Wirtschaft" },
  "Boost actif": { en: "Active Boost", it: "Boost attivo", es: "Boost activo", pt: "Boost ativo", pl: "Aktywny boost", id: "Boost Aktif", ru: "Активный буст", de: "Aktiver Boost" },
  "Boost passif": { en: "Passive Boost", it: "Boost passivo", es: "Boost pasivo", pt: "Boost passivo", pl: "Pasywny boost", id: "Boost Pasif", ru: "Пассивный буст", de: "Passiver Boost" },
  "Valeur brute (Base Value)": { en: "Base Value", it: "Valore base", es: "Valor base", pt: "Valor base", pl: "Wartość bazowa", id: "Nilai Dasar", ru: "Базовое значение", de: "Grundwert" },
  "Augmentation en pourcentage (Percentage Increase)": { en: "Percentage Increase", it: "Aumento percentuale", es: "Aumento porcentual", pt: "Aumento percentual", pl: "Procentowy wzrost", id: "Peningkatan Persentase", ru: "Процентное увеличение", de: "Prozentuale Erhöhung" },
  "Basic Stats": { en: "Basic Stats", it: "Statistiche base", es: "Stats básicos", pt: "Stats básicos", pl: "Statystyki bazowe", id: "Stats Dasar", ru: "Базовые статы", de: "Basis-Stats" },
  "Basic Damage Resistance": { en: "Basic Damage Resistance", it: "Resistenza danni base", es: "Resistencia de daño base", pt: "Resistência a dano básico", pl: "Odporność na bazowe obrażenia", id: "Hambatan Kerusakan Dasar", ru: "Базовая защита от урона", de: "Basis-Schadensresistenz" },
  "Basic Attack Damage": { en: "Basic Attack Damage", it: "Danno attacco base", es: "Daño de ataque base", pt: "Dano de ataque básico", pl: "Bazowe obrażenia ataku", id: "Kerusakan Serangan Dasar", ru: "Базовый урон атаки", de: "Basis-Angriffsschaden" },
  "Skill Damage": { en: "Skill Damage", it: "Danno da competenza", es: "Daño de habilidad", pt: "Dano de habilidade", pl: "Obrażenia od umiejętności", id: "Kerusakan Skill", ru: "Урон навыка", de: "Fähigkeitsschaden" },
  "Skill Resistance": { en: "Skill Resistance", it: "Resistenza competenze", es: "Resistencia de habilidad", pt: "Resistência de habilidade", pl: "Odporność na umiejętności", id: "Hambatan Skill", ru: "Сопротивление навыкам", de: "Fähigkeitsresistenz" },
  "Damage to Player": { en: "Damage to Player", it: "Danno al giocatore", es: "Daño al jugador", pt: "Dano ao jogador", pl: "Obrażenia gracza", id: "Kerusakan ke Pemain", ru: "Урон по игроку", de: "Spielerschaden" },
  "Fan Capacity": { en: "Fan Capacity", it: "Capacità fan", es: "Capacidad de fans", pt: "Capacidade de fãs", pl: "Pojemność fanów", id: "Kapasitas Fan", ru: "Ёмкость фанатов", de: "Fan-Kapazität" },
  "Rally Capacity": { en: "Rally Capacity", it: "Capacità rally", es: "Capacidad de rally", pt: "Capacidade de rally", pl: "Pojemność rally", id: "Kapasitas Rally", ru: "Ёмкость рейда", de: "Rally-Kapazität" },
  "Global Stat Boost": { en: "Global Stat Boost", it: "Boost stat globale", es: "Boost de stat global", pt: "Boost de stat global", pl: "Globalny boost statystyk", id: "Boost Stat Global", ru: "Глобальный буст статов", de: "Globaler Stat-Boost" },
  "Genre principal (Main Genre)": { en: "Main Genre", it: "Genere principale", es: "Género principal", pt: "Gênero principal", pl: "Główny gatunek", id: "Genre Utama", ru: "Основной жанр", de: "Hauptgenre" },
  Artiste: { en: "Artist", it: "Artista", es: "Artista", pt: "Artista", pl: "Artysta", id: "Artis", ru: "Артист", de: "Künstler" },
  UR: { en: "UR", it: "UR", es: "UR", pt: "UR", pl: "UR", id: "UR", ru: "UR", de: "UR" },
  "Équipe principale": { en: "Main Team", it: "Team principale", es: "Equipo principal", pt: "Equipe principal", pl: "Główna drużyna", id: "Tim Utama", ru: "Основная команда", de: "Hauptteam" },
  "Équipe secondaire": { en: "Second Team", it: "Secondo team", es: "Segundo equipo", pt: "Segunda equipe", pl: "Drużyna drugorzędna", id: "Tim Kedua", ru: "Вторая команда", de: "Zweitteam" },
  "EDM Team": { en: "EDM Team", it: "EDM Team", es: "EDM Team", pt: "EDM Team", pl: "EDM Team", id: "EDM Team", ru: "EDM Team", de: "EDM Team" },
  "RNB Team": { en: "RNB Team", it: "RNB Team", es: "RNB Team", pt: "RNB Team", pl: "RNB Team", id: "RNB Team", ru: "RNB Team", de: "RNB Team" },
  "Rock Team": { en: "Rock Team", it: "Rock Team", es: "Rock Team", pt: "Rock Team", pl: "Rock Team", id: "Rock Team", ru: "Rock Team", de: "Rock Team" },
  "HQ Defense": { en: "HQ Defense", it: "Difesa HQ", es: "Defensa HQ", pt: "Defesa HQ", pl: "Obrona HQ", id: "Defense HQ", ru: "Защита HQ", de: "HQ-Verteidigung" },
  "Solo Car": { en: "Solo Car", it: "Auto singola", es: "Coche solitario", pt: "Carro solo", pl: "Solo Samochód", id: "Mobil Solo", ru: "Соло машина", de: "Solo-Auto" },
  "Supportive Task": { en: "Supportive Task", it: "Compito di supporto", es: "Tarea de apoyo", pt: "Tarefa de suporte", pl: "Zadanie wspierające", id: "Tugas Pendukung", ru: "Поддерживающая задача", de: "Unterstützende Aufgabe" },
  "Driving Speed": { en: "Driving Speed", it: "Velocità di guida", es: "Velocidad de conducción", pt: "Velocidade de condução", pl: "Prędkość jazdy", id: "Kecepatan Mengemudi", ru: "Скорость вождения", de: "Fahrgeschwindigkeit" },
  "3 Skills Gold": { en: "3 Skills Gold", it: "3 Skills Gold", es: "3 Skills Gold", pt: "3 Skills Gold", pl: "3 Skills Gold", id: "3 Skills Gold", ru: "3 Skills Gold", de: "3 Skills Gold" },
  "Skill de genre": { en: "Genre Skill", it: "Skill di genere", es: "Habilidad de género", pt: "Habilidade de gênero", pl: "Umiejętność gatunku", id: "Skill Genre", ru: "Жанровый навык", de: "Genre-Skill" },
  "Skill de position": { en: "Position Skill", it: "Skill di posizione", es: "Habilidad de posición", pt: "Habilidade de posição", pl: "Umiejętność pozycji", id: "Skill Posisi", ru: "Позиционный навык", de: "Positions-Skill" },
  "Skill de base": { en: "Base Skill", it: "Skill base", es: "Habilidad base", pt: "Habilidade base", pl: "Umiejętność bazowa", id: "Skill Dasar", ru: "Базовый навык", de: "Basis-Skill" },
  "Boost herself": { en: "Boost herself", it: "Boost sé stessa", es: "Boost ella misma", pt: "Boost ela mesma", pl: "Boost siebie", id: "Boost dirinya", ru: "Буст себя", de: "Boost selbst" },
  "Boost all artist": { en: "Boost all artist", it: "Boost tutti gli artisti", es: "Boost todos los artistas", pt: "Boost todos os artistas", pl: "Boost wszystkich artystów", id: "Boost semua artis", ru: "Буст всех артистов", de: "Boost alle Künstler" },
  Center: { en: "Center", it: "Center", es: "Center", pt: "Center", pl: "Center", id: "Center", ru: "Center", de: "Center" },
  Singer: { en: "Singer", it: "Cantante", es: "Cantante", pt: "Cantora", pl: "Śpiewaczka", id: "Penyanyi", ru: "Певец", de: "Sänger" },
  Dancer: { en: "Dancer", it: "Ballerino", es: "Bailarín", pt: "Dançarina", pl: "Tancerka", id: "Penari", ru: "Танцор", de: "Tänzer" },
  Back: { en: "Back", it: "Back", es: "Back", pt: "Back", pl: "Back", id: "Back", ru: "Back", de: "Back" },
  Assets: { en: "Assets", it: "Asset", es: "Assets", pt: "Assets", pl: "Assets", id: "Aset", ru: "Ассеты", de: "Assets" },
  "Bijou (Jewelry)": { en: "Jewelry", it: "Gioiello", es: "Joyería", pt: "Joalheria", pl: "Biżuteria", id: "Perhiasan", ru: "Украшение", de: "Schmuck" },
  "Voiture (Car)": { en: "Car", it: "Auto", es: "Coche", pt: "Carro", pl: "Samochód", id: "Mobil", ru: "Машина", de: "Auto" },
  "Propriété (Property / Real Estate)": { en: "Property", it: "Proprietà", es: "Propiedad", pt: "Propriedade", pl: "Nieruchomość", id: "Properti", ru: "Недвижимость", de: "Eigentum" },
  "Asset Coins": { en: "Asset Coins", it: "Monete Asset", es: "Monedas de Asset", pt: "Moedas de Asset", pl: "Monety Asset", id: "Koin Aset", ru: "Ассет-коины", de: "Asset-Münzen" },
  "Match Bonus": { en: "Match Bonus", it: "Bonus Match", es: "Bonus de coincidencia", pt: "Bônus de correspondência", pl: "Bonus dopasowania", id: "Bonus Match", ru: "Матч-бонус", de: "Match-Bonus" },
  "Tokyo Assets": { en: "Tokyo Assets", it: "Asset Tokyo", es: "Assets de Tokyo", pt: "Assets de Tokyo", pl: "Assety Tokyo", id: "Aset Tokyo", ru: "Tokyo ассеты", de: "Tokyo Assets" },
  "Exclusive Tokyo Assets": { en: "Exclusive Tokyo Assets", it: "Asset esclusivi Tokyo", es: "Assets exclusivos de Tokyo", pt: "Assets exclusivos de Tokyo", pl: "Ekskluzywne assety Tokyo", id: "Aset Eksklusif Tokyo", ru: "Эксклюзивные Tokyo ассеты", de: "Exklusive Tokyo Assets" },
  "Auction House": { en: "Auction House", it: "Casa d'aste", es: "Casa de subastas", pt: "Casa de leilões", pl: "Dom aukcyjny", id: "Rumah Lelang", ru: "Аукционный дом", de: "Auktionshaus" },
  "Promotion / Promote": { en: "Promote", it: "Promuovi", es: "Promover", pt: "Promover", pl: "Awansuj", id: "Promosikan", ru: "Продвигать", de: "Verbessern" },
  "Voiture T4": { en: "T4 Car", it: "Auto T4", es: "Coche T4", pt: "Carro T4", pl: "Samochód T4", id: "Mobil T4", ru: "T4 машина", de: "T4-Auto" },
  "Peak Level": { en: "Peak Level", it: "Livello Peak", es: "Nivel Peak", pt: "Nível Peak", pl: "Poziom Peak", id: "Level Peak", ru: "Уровень Peak", de: "Peak-Level" },
  "Peak System": { en: "Peak System", it: "Sistema Peak", es: "Sistema Peak", pt: "Sistema Peak", pl: "System Peak", id: "Sistem Peak", ru: "Система Peak", de: "Peak-System" },
  Tier: { en: "Tier", it: "Tier", es: "Tier", pt: "Tier", pl: "Tier", id: "Tier", ru: "Tier", de: "Tier" },
  "T1 / T2 / T3 / T4 / T5": { en: "T1 / T2 / T3 / T4 / T5", it: "T1 / T2 / T3 / T4 / T5", es: "T1 / T2 / T3 / T4 / T5", pt: "T1 / T2 / T3 / T4 / T5", pl: "T1 / T2 / T3 / T4 / T5", id: "T1 / T2 / T3 / T4 / T5", ru: "T1 / T2 / T3 / T4 / T5", de: "T1 / T2 / T3 / T4 / T5" },
  "T2 (C)": { en: "T2 (C)", it: "T2 (C)", es: "T2 (C)", pt: "T2 (C)", pl: "T2 (C)", id: "T2 (C)", ru: "T2 (C)", de: "T2 (C)" },
  "T3 (B)": { en: "T3 (B)", it: "T3 (B)", es: "T3 (B)", pt: "T3 (B)", pl: "T3 (B)", id: "T3 (B)", ru: "T3 (B)", de: "T3 (B)" },
  "T4 (A)": { en: "T4 (A)", it: "T4 (A)", es: "T4 (A)", pt: "T4 (A)", pl: "T4 (A)", id: "T4 (A)", ru: "T4 (A)", de: "T4 (A)" },
  "T5 (A+)": { en: "T5 (A+)", it: "T5 (A+)", es: "T5 (A+)", pt: "T5 (A+)", pl: "T5 (A+)", id: "T5 (A+)", ru: "T5 (A+)", de: "T5 (A+)" },
  "Voiture passive": { en: "Passive Car", it: "Auto passiva", es: "Coche pasivo", pt: "Carro passivo", pl: "Pasywny samochód", id: "Mobil Pasif", ru: "Пассивная машина", de: "Passives Auto" },
  Collection: { en: "Collection", it: "Collezione", es: "Colección", pt: "Coleção", pl: "Kolekcja", id: "Koleksi", ru: "Коллекция", de: "Sammlung" },
  Villa: { en: "Villa", it: "Villa", es: "Villa", pt: "Villa", pl: "Willa", id: "Villa", ru: "Вилла", de: "Villa" },
  "CEO Outfit": { en: "CEO Outfit", it: "Outfit CEO", es: "Traje de CEO", pt: "Traje de CEO", pl: "Strój CEO", id: "Pakaian CEO", ru: "CEO наряд", de: "CEO-Outfit" },
  "HQ Skin": { en: "HQ Skin", it: "Skin HQ", es: "Skin de HQ", pt: "Skin de HQ", pl: "Skin HQ", id: "Skin HQ", ru: "HQ скин", de: "HQ-Skin" },
  "Team Feature": { en: "Team Feature", it: "Funzione team", es: "Función de equipo", pt: "Função de equipe", pl: "Funkcja drużyny", id: "Fitur Tim", ru: "Командная функция", de: "Team-Funktion" },
  Diamonds: { en: "Diamonds", it: "Diamanti", es: "Diamantes", pt: "Diamantes", pl: "Diamenty", id: "Diamond", ru: "Алмазы", de: "Diamanten" },
  Gold: { en: "Gold", it: "Oro", es: "Oro", pt: "Ouro", pl: "Złoto", id: "Emas", ru: "Золото", de: "Gold" },
  "Gold Ingots / Lingots": { en: "Gold Ingots", it: "Lingotti d'oro", es: "Lingotes de oro", pt: "Barras de ouro", pl: "Sztabki złota", id: "Batangan Emas", ru: "Золотые слитки", de: "Goldbarren" },
  Interviews: { en: "Interviews", it: "Interviste", es: "Entrevistas", pt: "Entrevistas", pl: "Wywiady", id: "Wawancara", ru: "Интервью", de: "Interviews" },
  "Universal Photos": { en: "Universal Photos", it: "Foto universali", es: "Fotos universales", pt: "Fotos universais", pl: "Uniwersalne zdjęcia", id: "Foto Universal", ru: "Универсальные фото", de: "Universelle Fotos" },
  Relics: { en: "Relics", it: "Reliquie", es: "Reliquias", pt: "Relíquias", pl: "Relikwie", id: "Relik", ru: "Реликвии", de: "Relikte" },
  Demos: { en: "Demos", it: "Demo", es: "Demo", pt: "Demo", pl: "Demo", id: "Demo", ru: "Демо", de: "Demos" },
  CD: { en: "CD", it: "CD", es: "CD", pt: "CD", pl: "CD", id: "CD", ru: "CD", de: "CD" },
  "Promotion Manuals": { en: "Promotion Manuals", it: "Manuali di promozione", es: "Manuales de promoción", pt: "Manuais de promoção", pl: "Podręczniki promocyjne", id: "Manual Promosi", ru: "Промо-мануалы", de: "Promo-Handbücher" },
  "CEO Coins": { en: "CEO Coins", it: "Monete CEO", es: "Monedas CEO", pt: "Moedas CEO", pl: "Monety CEO", id: "Koin CEO", ru: "CEO-коины", de: "CEO-Münzen" },
  "Monthly Card": { en: "Monthly Card", it: "Carta mensile", es: "Tarjeta mensual", pt: "Cartão mensal", pl: "Karta miesięczna", id: "Kartu Bulanan", ru: "Месячная карта", de: "Monatskarte" },
  "Weekly Pass": { en: "Weekly Pass", it: "Pass settimanale", es: "Pase semanal", pt: "Passe semanal", pl: "Tygodniowy pass", id: "Pass Mingguan", ru: "Недельный пасс", de: "Wochenpass" },
  "Monthly Pass": { en: "Monthly Pass", it: "Pass mensile", es: "Pase mensual", pt: "Passe mensal", pl: "Miesięczny pass", id: "Pass Bulanan", ru: "Месячный пасс", de: "Monatspass" },
  "Corporate Acquisition": { en: "Corporate Acquisition", it: "Acquisizione aziendale", es: "Adquisición corporativa", pt: "Aquisição corporativa", pl: "Przejęcie korporacyjne", id: "Akuisisi Korporat", ru: "Корпоративное поглощение", de: "Unternehmensübernahme" },
  "Recharge Event": { en: "Recharge Event", it: "Evento ricarica", es: "Evento de recarga", pt: "Evento de recarga", pl: "Wydarzenie doładowania", id: "Event Isi Ulang", ru: "Ивент пополнения", de: "Auflade-Event" },
  Milestone: { en: "Milestone", it: "Traguardo", es: "Hito", pt: "Marco", pl: "Kamień milowy", id: "Pencapaian", ru: "Веха", de: "Meilenstein" },
  "VIP Shop": { en: "VIP Shop", it: "Negozio VIP", es: "Tienda VIP", pt: "Loja VIP", pl: "Sklep VIP", id: "Toko VIP", ru: "VIP магазин", de: "VIP-Shop" },
  "Stock Market Shop": { en: "Stock Market Shop", it: "Negozio Stock Market", es: "Tienda Stock Market", pt: "Loja Stock Market", pl: "Sklep giełdowy", id: "Toko Stock Market", ru: "Биржевой магазин", de: "Börsen-Shop" },
  "Tokyo Shop": { en: "Tokyo Shop", it: "Negozio Tokyo", es: "Tienda de Tokyo", pt: "Loja Tokyo", pl: "Sklep Tokyo", id: "Toko Tokyo", ru: "Tokyo магазин", de: "Tokyo-Shop" },
  "Victorious Shop": { en: "Victorious Shop", it: "Negozio vittorioso", es: "Tienda victoriosa", pt: "Loja vitoriosa", pl: "Sklep zwycięski", id: "Toko Kemenangan", ru: "Победный магазин", de: "Sieger-Shop" },
  "Silver Shop": { en: "Silver Shop", it: "Negozio Argento", es: "Tienda Plata", pt: "Loja Prata", pl: "Sklep Srebrny", id: "Toko Perak", ru: "Серебряный магазин", de: "Silber-Shop" },
  "Bronze Shop": { en: "Bronze Shop", it: "Negozio Bronzo", es: "Tienda Bronce", pt: "Loja Bronze", pl: "Sklep Brązowy", id: "Toko Perunggu", ru: "Бронзовый магазин", de: "Bronze-Shop" },
  "Group Shop": { en: "Group Shop", it: "Negozio gruppo", es: "Tienda de grupo", pt: "Loja de grupo", pl: "Sklep grupowy", id: "Toko Grup", ru: "Групповой магазин", de: "Gruppen-Shop" },
  "Parking Wars Shop": { en: "Parking Wars Shop", it: "Negozio Parking Wars", es: "Tienda Parking Wars", pt: "Loja Parking Wars", pl: "Sklep Parking Wars", id: "Toko Parking Wars", ru: "Магазин Parking Wars", de: "Parking Wars Shop" },
  Groupe: { en: "Group", it: "Gruppo", es: "Grupo", pt: "Grupo", pl: "Grupa", id: "Grup", ru: "Группа", de: "Gruppe" },
  "Group Coins": { en: "Group Coins", it: "Monete gruppo", es: "Monedas de grupo", pt: "Moedas de grupo", pl: "Monety grupowe", id: "Koin Grup", ru: "Групповые коины", de: "Gruppen-Münzen" },
  "Group Points": { en: "Group Points", it: "Punti gruppo", es: "Puntos de grupo", pt: "Pontos de grupo", pl: "Punkty grupowe", id: "Poin Grup", ru: "Групповые очки", de: "Gruppen-Punkte" },
  "Personal Points": { en: "Personal Points", it: "Punti personali", es: "Puntos personales", pt: "Pontos pessoais", pl: "Punkty osobiste", id: "Poin Pribadi", ru: "Личные очки", de: "Persönliche Punkte" },
  "Financial Power": { en: "Financial Power", it: "Potere finanziario", es: "Poder financiero", pt: "Poder financeiro", pl: "Siła finansowa", id: "Kekuatan Finansial", ru: "Финансовая мощь", de: "Finanzkraft" },
  "Game en groupe / Teamplay": { en: "Teamplay", it: "Gioco di gruppo", es: "Juego en grupo", pt: "Jogo em grupo", pl: "Gra grupowa", id: "Bermain Tim", ru: "Командная игра", de: "Teamspiel" },
  Whale: { en: "Whale", it: "Balena", es: "Ballena", pt: "Baleia", pl: "Wieloryb", id: "Paus", ru: "Кит", de: "Wal" },
  "F2P (Free to Play)": { en: "F2P (Free to Play)", it: "F2P (Free to Play)", es: "F2P (Free to Play)", pt: "F2P (Free to Play)", pl: "F2P (Free to Play)", id: "F2P (Free to Play)", ru: "F2P (Free to Play)", de: "F2P (Free to Play)" },
  "Macro game": { en: "Macro game", it: "Macro gioco", es: "Macro juego", pt: "Macro jogo", pl: "Makro gra", id: "Makro game", ru: "Макро игра", de: "Makro-Spiel" },
  "Micro game": { en: "Micro game", it: "Micro gioco", es: "Micro juego", pt: "Micro jogo", pl: "Mikro gra", id: "Mikro game", ru: "Микро игра", de: "Mikro-Spiel" },
  "Meta / Méta": { en: "Meta", it: "Meta", es: "Meta", pt: "Meta", pl: "Meta", id: "Meta", ru: "Мета", de: "Meta" },
  Diplomatie: { en: "Diplomacy", it: "Diplomazia", es: "Diplomacia", pt: "Diplomacia", pl: "Dyplomacja", id: "Diplomasi", ru: "Дипломатия", de: "Diplomatie" },
  "Solo Attack": { en: "Solo Attack", it: "Attacco solo", es: "Ataque solitario", pt: "Ataque solo", pl: "Atak solo", id: "Serangan Solo", ru: "Соло атака", de: "Solo-Angriff" },
  Rally: { en: "Rally", it: "Rally", es: "Rally", pt: "Rally", pl: "Rally", id: "Rally", ru: "Ралли", de: "Rally" },
  "Rally Leader": { en: "Rally Leader", it: "Capo rally", es: "Líder de rally", pt: "Líder de rally", pl: "Lider rally", id: "Pemimpin Rally", ru: "Лидер рейда", de: "Rally-Leader" },
  Bus: { en: "Bus", it: "Bus", es: "Bus", pt: "Ônibus", pl: "Autobus", id: "Bus", ru: "Автобус", de: "Bus" },
  Refill: { en: "Refill", it: "Rifornimento", es: "Relleno", pt: "Reabastecimento", pl: "Uzupełnienie", id: "Refill", ru: "Рефилл", de: "Nachfüllen" },
  Kills: { en: "Kills", it: "Uccisioni", es: "Eliminaciones", pt: "Mortes", pl: "Zabójstwa", id: "Kill", ru: "Киллы", de: "Kills" },
  Losses: { en: "Losses", it: "Perdite", es: "Pérdidas", pt: "Perdas", pl: "Straty", id: "Loss", ru: "Потери", de: "Verluste" },
  "Kill / Loss Ratio": { en: "Kill/Loss Ratio", it: "Rapporto Kill/Loss", es: "Ratio Kill/Loss", pt: "Proporção Kill/Loss", pl: "Stosunek K/L", id: "Rasio Kill/Loss", ru: "Соотношение K/L", de: "Kill/Loss-Verhältnis" },
  "First Claim": { en: "First Claim", it: "Prima richiesta", es: "Primera reclamación", pt: "Primeira reivindicação", pl: "Pierwsze roszczenie", id: "Klaim Pertama", ru: "Первое требование", de: "Erste Beanspruchung" },
  "Fan Losses": { en: "Fan Losses", it: "Perdite di fan", es: "Pérdidas de fans", pt: "Perdas de fãs", pl: "Straty fanów", id: "Kehilangan Fan", ru: "Потери фанатов", de: "Fan-Verluste" },
  "Safe Zone": { en: "Safe Zone", it: "Zona sicura", es: "Zona segura", pt: "Zona segura", pl: "Bezpieczna strefa", id: "Zona Aman", ru: "Безопасная зона", de: "Sicherheitszone" },
  "City Supremacy": { en: "City Supremacy", it: "Supremazia cittadina", es: "Supremacía urbana", pt: "Supremacia urbana", pl: "Dominacja miejska", id: "Supremasi Kota", ru: "Городское превосходство", de: "Stadt-Vorherrschaft" },
  "Ultimate CEO / Top CEO": { en: "Ultimate CEO / Top CEO", it: "Ultimate CEO / Top CEO", es: "Ultimate CEO / Top CEO", pt: "Ultimate CEO / Top CEO", pl: "Ultimate CEO / Top CEO", id: "Ultimate CEO / Top CEO", ru: "Ultimate CEO / Top CEO", de: "Ultimate CEO / Top CEO" },
  "Group Battle": { en: "Group Battle", it: "Battaglia di gruppo", es: "Batalla de grupo", pt: "Batalha de grupo", pl: "Bitwa grupowa", id: "Pertempuran Grup", ru: "Групповая битва", de: "Gruppenkampf" },
  "Rush Attack": { en: "Rush Attack", it: "Attacco rush", es: "Ataque rush", pt: "Ataque rush", pl: "Atak rush", id: "Serangan Rush", ru: "Раш-атака", de: "Rush-Angriff" },
  "Radio Battle": { en: "Radio Battle", it: "Battaglia radio", es: "Batalla de radio", pt: "Batalha de rádio", pl: "Bitwa radiowa", id: "Pertempuran Radio", ru: "Радио-битва", de: "Radio-Battle" },
  "Grammy Award": { en: "Grammy Award", it: "Grammy Award", es: "Grammy Award", pt: "Grammy Award", pl: "Nagroda Grammy", id: "Grammy Award", ru: "Grammy Award", de: "Grammy Award" },
  "Fishing Event": { en: "Fishing Event", it: "Evento di pesca", es: "Evento de pesca", pt: "Evento de pesca", pl: "Wydarzenie wędkarskie", id: "Event Memancing", ru: "Рыбалка", de: "Angel-Event" },
  "Fan Meeting": { en: "Fan Meeting", it: "Fan Meeting", es: "Fan Meeting", pt: "Fan Meeting", pl: "Fan Meeting", id: "Fan Meeting", ru: "Fan Meeting", de: "Fan-Meeting" },
  "Tipsy Date": { en: "Tipsy Date", it: "Appuntamento brillo", es: "Cita borracha", pt: "Encontro bêbado", pl: "Pijana randka", id: "Kencan Mabuk", ru: "Пьяное свидание", de: "Betrunkener Date" },
  "Dice Event": { en: "Dice Event", it: "Evento dei dadi", es: "Evento de dados", pt: "Evento de dados", pl: "Wydarzenie z kośćmi", id: "Event Dadu", ru: "Кубик", de: "Würfel-Event" },
  "Versus Event": { en: "Versus Event", it: "Evento Versus", es: "Evento Versus", pt: "Evento Versus", pl: "Wydarzenie Versus", id: "Event Versus", ru: "Версус", de: "Versus-Event" },
  "Ultimate Group Event": { en: "Ultimate Group Event", it: "Evento gruppo finale", es: "Evento de grupo definitivo", pt: "Evento de grupo definitivo", pl: "Ostateczne wydarzenie grupowe", id: "Event Grup Akhir", ru: "Финальное групповое событие", de: "Ultimatives Gruppen-Event" },
  "Who is the richest in Tokyo?": { en: "Who is the richest in Tokyo?", it: "Chi è il più ricco a Tokyo?", es: "¿Quién es el más rico en Tokyo?", pt: "Quem é o mais rico em Tóquio?", pl: "Kto jest najbogatszy w Tokyo?", id: "Siapa terkaya di Tokyo?", ru: "Кто самый богатый в Tokyo?", de: "Wer ist der Reichste in Tokyo?" },
  "Parking Wars": { en: "Parking Wars", it: "Guerre di parcheggio", es: "Guerras de estacionamiento", pt: "Guerras de estacionamento", pl: "Wojny parkingowe", id: "Parking Wars", ru: "Parking Wars", de: "Parking Wars" },
  Producer25: { en: "Producer25", it: "Producer25", es: "Producer25", pt: "Producer25", pl: "Producer25", id: "Producer25", ru: "Producer25", de: "Producer25" },
  Metro: { en: "Metro", it: "Metro", es: "Metro", pt: "Metro", pl: "Metro", id: "Metro", ru: "Метро", de: "Metro" },
  "Stock Market": { en: "Stock Market", it: "Stock Market", es: "Stock Market", pt: "Stock Market", pl: "Giełda", id: "Pasar Saham", ru: "Биржа", de: "Börse" },
  "Stock Auction": { en: "Stock Auction", it: "Asta azionaria", es: "Subasta de acciones", pt: "Leilão de ações", pl: "Aukcja giełdowa", id: "Lelang Saham", ru: "Аукцион акций", de: "Aktienauktion" },
  "Toll 1": { en: "Toll 1", it: "Pedaggio 1", es: "Peaje 1", pt: "Pedágio 1", pl: "Opłata 1", id: "Tol 1", ru: "Толл 1", de: "Maut 1" },
  Hotels: { en: "Hotels", it: "Hotel", es: "Hoteles", pt: "Hotéis", pl: "Hotele", id: "Hotel", ru: "Отели", de: "Hotels" },
  Concerts: { en: "Concerts", it: "Concerti", es: "Conciertos", pt: "Concertos", pl: "Koncerty", id: "Konser", ru: "Концерты", de: "Konzerte" },
  Stadium: { en: "Stadium", it: "Stadio", es: "Estadio", pt: "Estádio", pl: "Stadion", id: "Stadion", ru: "Стадион", de: "Stadion" },
  "Free Bait": { en: "Free Bait", it: "Esca gratuita", es: "Cebo gratis", pt: "Isca gratuita", pl: "Darmowa przynęta", id: "Umpan Gratis", ru: "Бесплатная наживка", de: "Kostenloser Köder" },
  "Paid Bait": { en: "Paid Bait", it: "Esca a pagamento", es: "Cebo de pago", pt: "Isca paga", pl: "Płatna przynęta", id: "Umpan Berbayar", ru: "Платная наживка", de: "Bezahlter Köder" },
  Voucher: { en: "Voucher", it: "Buono", es: "Vale", pt: "Vale", pl: "Voucher", id: "Voucher", ru: "Ваучер", de: "Gutschein" },
  "Fish Pool": { en: "Fish Pool", it: "Pesciera", es: "Piscina de peces", pt: "Piscina de peixes", pl: "Basen z rybami", id: "Kolam Ikan", ru: "Пруд с рыбой", de: "Fischbecken" },
  "Free Pool": { en: "Free Pool", it: "Piscina gratuita", es: "Piscina gratuita", pt: "Piscina gratuita", pl: "Basen darmowy", id: "Kolam Gratis", ru: "Бесплатный бассейн", de: "Kostenloses Becken" },
  "Paid Pool": { en: "Paid Pool", it: "Piscina a pagamento", es: "Piscina de pago", pt: "Piscina paga", pl: "Basen płatny", id: "Kolam Berbayar", ru: "Платный бассейн", de: "Bezahltes Becken" },
  Aquarium: { en: "Aquarium", it: "Acquario", es: "Acuario", pt: "Aquário", pl: "Akwarium", id: "Akuarium", ru: "Аквариум", de: "Aquarium" },
  "Tank Slot": { en: "Tank Slot", it: "Slot vasca", es: "Ranura de tanque", pt: "Slot de tanque", pl: "Slot zbiornika", id: "Slot Tank", ru: "Слот бака", de: "Becken-Platz" },
  "Blue Shells": { en: "Blue Shells", it: "Gusci blu", es: "Conchas azules", pt: "Conchas azuis", pl: "Niebieskie muszle", id: "Cangkang Biru", ru: "Синие ракушки", de: "Blaue Muscheln" },
  "Pity System": { en: "Pity System", it: "Sistema di pietà", es: "Sistema de lástima", pt: "Sistema de pena", pl: "System litości", id: "Sistem Kasian", ru: "Система жалости", de: "Mitleids-System" },
  "Car Part": { en: "Car Part", it: "Pezzo auto", es: "Pieza de coche", pt: "Peça de carro", pl: "Część samochodu", id: "Bagian Mobil", ru: "Деталь машины", de: "Auto-Teil" },
  "Car Design": { en: "Car Design", it: "Design auto", es: "Diseño de coche", pt: "Design de carro", pl: "Projekt samochodu", id: "Desain Mobil", ru: "Дизайн машины", de: "Auto-Design" },
  "Battle Points": { en: "Battle Points", it: "Punti battaglia", es: "Puntos de batalla", pt: "Pontos de batalha", pl: "Punkty bitwy", id: "Poin Pertempuran", ru: "Боевые очки", de: "Kampfpunkte" },
  "Preparation Phase": { en: "Preparation Phase", it: "Fase di preparazione", es: "Fase de preparación", pt: "Fase de preparação", pl: "Faza przygotowawcza", id: "Fase Persiapan", ru: "Фаза подготовки", de: "Vorbereitungsphase" },
  "Final Battle Phase": { en: "Final Battle Phase", it: "Fase battaglia finale", es: "Fase de batalla final", pt: "Fase de batalha final", pl: "Faza ostatecznej bitwy", id: "Fase Pertempuran Akhir", ru: "Финальная фаза битвы", de: "Endkampfphase" },
  "Ultimate Victory": { en: "Ultimate Victory", it: "Vittoria finale", es: "Victoria definitiva", pt: "Vitória definitiva", pl: "Ostateczne zwycięstwo", id: "Kemenangan Tertinggi", ru: "Абсолютная победа", de: "Ultimativer Sieg" },
  "Battle Blueprints": { en: "Battle Blueprints", it: "Progetti battaglia", es: "Planos de batalla", pt: "Planos de batalha", pl: "Plany bitewne", id: "Blueprint Pertempuran", ru: "Боевые чертежи", de: "Kampf-Blaupausen" },
  "Master Blueprints": { en: "Master Blueprints", it: "Progetti master", es: "Planos maestros", pt: "Planos mestres", pl: "Główne plany", id: "Blueprint Master", ru: "Мастер-чертежи", de: "Meister-Blaupausen" },
  "Tier Rewards": { en: "Tier Rewards", it: "Ricompense Tier", es: "Recompensas de Tier", pt: "Recompensas de Tier", pl: "Nagrody Tier", id: "Hadiah Tier", ru: "Награды Tier", de: "Tier-Belohnungen" },
  "VIP Level": { en: "VIP Level", it: "Livello VIP", es: "Nivel VIP", pt: "Nível VIP", pl: "Poziom VIP", id: "Level VIP", ru: "Уровень VIP", de: "VIP-Level" },
  "VIP Club": { en: "VIP Club", it: "Club VIP", es: "Club VIP", pt: "Clube VIP", pl: "Klub VIP", id: "Klub VIP", ru: "VIP клуб", de: "VIP-Club" },
  "Customer Service": { en: "Customer Service", it: "Servizio clienti", es: "Atención al cliente", pt: "Atendimento ao cliente", pl: "Obsługa klienta", id: "Layanan Pelanggan", ru: "Служба поддержки", de: "Kundenservice" },
  "Direct Top-up": { en: "Direct Top-up", it: "Ricarica diretta", es: "Recarga directa", pt: "Recarga direta", pl: "Bezpośrednie doładowanie", id: "Top-up Langsung", ru: "Прямое пополнение", de: "Direkte Aufladung" },
};

const LANG_FILES = {
  en: "public/glossary.txt",
  it: "public/glossario.txt",
  es: "public/glosario.txt",
  pt: "public/glossario_pt.txt",
  pl: "public/glosariusz.txt",
  id: "public/glosarium.txt",
  ru: "public/glossariy.txt",
  de: "public/glossar.txt",
};

const emDash = "\u2014";

function translateLine(line, lang) {
  if (line === "") return line;

  if (TRANSLATIONS[line] && TRANSLATIONS[line][lang]) {
    return TRANSLATIONS[line][lang];
  }

  const emIdx = line.indexOf(emDash);
  const hypIdx = line.indexOf(" - ");
  const sepIdx = emIdx !== -1 ? emIdx : hypIdx;

  if (sepIdx === -1) return line;

  const parenIdx = line.indexOf("(");

  let term, enPart, definition;

  if (parenIdx !== -1 && parenIdx < sepIdx) {
    term = line.substring(0, parenIdx).trimEnd().replace(/\u2019|\u2018/g, "'");
    enPart = line.substring(parenIdx + 1, sepIdx - 2).trim();
    definition = line.substring(sepIdx + 2).trim();
  } else {
    term = line.substring(0, sepIdx).trimEnd().replace(/\u2019|\u2018/g, "'");
    enPart = "";
    definition = line.substring(sepIdx + 2).trim();
  }

  const translatedTerm = (DEF_TRANSLATIONS[term]?.[lang])
    || (enPart ? DEF_TRANSLATIONS[term + " (" + enPart + ")"]?.[lang] : undefined)
    || term;

  const sep = emDash + " ";

  if (enPart) {
    if (lang === "en") {
      return `${translatedTerm}${sep}${definition}`;
    }
    return `${translatedTerm} (${enPart})${sep}${definition}`;
  }
  return `${translatedTerm}${sep}${definition}`;
}

const frContent = fs.readFileSync(FR_SOURCE, "utf8");
const frLines = frContent.split("\n");

for (const lang of SUPPORTED_LANGS) {
  const outputPath = LANG_FILES[lang];
  const translatedLines = frLines.map((line) => translateLine(line, lang));
  fs.writeFileSync(outputPath, translatedLines.join("\n"), "utf8");
  console.log(`Written: ${outputPath}`);
}

console.log("Done!");
