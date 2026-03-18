"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState, useMemo } from "react";
import { AdBanner } from "@/components/AdSense";

const guideListTranslations: Record<string, any> = {
   fr: { 
     title: "Guides & Stratégies", 
     subtitle: "Tutoriels et stratégies pour maîtriser le jeu",
     categories: ["Tous", "Guide classique", "Guide événement", "Début de jeu", "Fin de jeu"],
     categoryClassic: "Guide classique",
     categoryEvent: "Guide événement",
     categoryEarly: "Début de jeu",
     categoryLate: "Fin de jeu",
     inProgress: "En cours",
     new: "Nouveau",
     searchPlaceholder: "Rechercher un guide..."
   },
   en: { 
     title: "Guides & Strategies", 
     subtitle: "Tutorials and strategies to master the game",
     categories: ["All", "Classic Guide", "Event Guide", "Early game", "Late game"],
     categoryClassic: "Classic Guide",
     categoryEvent: "Event Guide",
     categoryEarly: "Early game",
     categoryLate: "Late game",
     inProgress: "In Progress",
     new: "New",
     searchPlaceholder: "Search a guide..."
   },
   it: { 
     title: "Guide e Strategie", 
     subtitle: "Tutoriali e strategie per padroneggiare il gioco",
     categories: ["Tutti", "Guida classica", "Guida evento", "Inizio gioco", "Fine gioco"],
     categoryClassic: "Guida classica",
     categoryEvent: "Guida evento",
     categoryEarly: "Inizio gioco",
     categoryLate: "Fine gioco",
     inProgress: "In corso",
     new: "Nuovo",
     searchPlaceholder: "Cerca una guida..."
   },
   es: { 
     title: "Guías y Estrategias", 
     subtitle: "Tutoriales y estrategias para dominar el juego",
     categories: ["Todos", "Guía clásica", "Guía evento", "Inicio del juego", "Final del juego"],
     categoryClassic: "Guía clásica",
     categoryEvent: "Guía evento",
     categoryEarly: "Inicio del juego",
     categoryLate: "Final del juego",
     inProgress: "En progreso",
     new: "Nuevo",
     searchPlaceholder: "Buscar una guía..."
   },
   pt: { 
     title: "Guias e Estratégias", 
     subtitle: "Tutoriais e estratégias para dominar o jogo",
     categories: ["Todos", "Guia clássico", "Guia evento", "Início do jogo", "Fim de jogo"],
     categoryClassic: "Guia clássico",
     categoryEvent: "Guia evento",
     categoryEarly: "Início do jogo",
     categoryLate: "Fim de jogo",
     inProgress: "Em progresso",
     new: "Novo",
     searchPlaceholder: "Pesquisar um guia..."
   },
   pl: { 
     title: "Poradniki i Strategie", 
     subtitle: "Samouczki i strategie, aby opanować grę",
     categories: ["Wszystkie", "Poradnik klasyczny", "Poradnik wydarzenia", "Wczesna gra", "Późna gra"],
     categoryClassic: "Poradnik klasyczny",
     categoryEvent: "Poradnik wydarzenia",
     categoryEarly: "Wczesna gra",
     categoryLate: "Późna gra",
     inProgress: "W toku",
     new: "Nowy",
     searchPlaceholder: "Szukaj poradnika..."
   },
   id: { 
     title: "Panduan dan Strategi", 
     subtitle: "Tutorial dan strategi untuk menguasai permainan",
     categories: ["Semua", "Panduan klasik", "Panduan acara", "Awal permainan", "Akhir permainan"],
     categoryClassic: "Panduan klasik",
     categoryEvent: "Panduan acara",
     categoryEarly: "Awal permainan",
     categoryLate: "Akhir permainan",
     inProgress: "Sedang berlangsung",
     new: "Baru",
     searchPlaceholder: "Cari panduan..."
   },
   ru: { 
     title: "Гайды и Стратегии", 
     subtitle: "Учебники и стратегии для освоения игры",
     categories: ["Все", "Классический гайд", "Гайд события", "Ранняя игра", "Поздняя игра"],
     categoryClassic: "Классический гайд",
     categoryEvent: "Гайд события",
     categoryEarly: "Ранняя игра",
     categoryLate: "Поздняя игра",
     inProgress: "В процессе",
     new: "Новый",
     searchPlaceholder: "Поиск гайда..."
   },
};

const categoryMap: Record<string, Record<string, string>> = {
  fr: { "Tous": "Tous", "Guide classique": "Guide classique", "Guide événement": "Guide événement", "Début de jeu": "Début de jeu", "Fin de jeu": "Fin de jeu" },
  en: { "Tous": "All", "Guide classique": "Classic Guide", "Guide événement": "Event Guide", "Début de jeu": "Early game", "Fin de jeu": "Late game" },
  it: { "Tous": "Tutti", "Guide classique": "Guida classica", "Guide événement": "Guida evento", "Début de jeu": "Inizio gioco", "Fin de jeu": "Fine gioco" },
  es: { "Tous": "Todos", "Guide classique": "Guía clásica", "Guide événement": "Guía evento", "Début de jeu": "Inicio del juego", "Fin de jeu": "Final del juego" },
  pt: { "Tous": "Todos", "Guide classique": "Guia clássico", "Guide événement": "Guia evento", "Début de jeu": "Início do jogo", "Fin de jeu": "Fim de jogo" },
  pl: { "Tous": "Wszystkie", "Guide classique": "Poradnik klasyczny", "Guide événement": "Poradnik wydarzenia", "Début de jeu": "Wczesna gra", "Fin de jeu": "Późna gra" },
  id: { "Tous": "Semua", "Guide classique": "Panduan klasik", "Guide événement": "Panduan acara", "Début de jeu": "Awal permainan", "Fin de jeu": "Akhir permainan" },
  ru: { "Tous": "Все", "Guide classique": "Классический гайд", "Guide événement": "Гайд события", "Début de jeu": "Ранняя игра", "Fin de jeu": "Поздняя игра" },
};

const guideTranslations: Record<string, Record<string, { title: string; description: string }>> = {
  fr: {
    "structure-du-jeu": { title: "Structure du jeu", description: "Comprendre la structure du jeu Top Girl. Serveur d'origine, cycles Abroad, City Supremacy et boucle principale." },
  },
  en: {
    "structure-du-jeu": { title: "Game Structure", description: "Understand the structure of Top Girl game. Home server, Abroad cycles, City Supremacy and main loop." },
    "equipment": { title: "Equipment Guide", description: "Jewelry, Cars and Properties to optimize your stats. Gold vs Purple comparison and purchase priorities." },
    "construction-equipe-debut": { title: "Early Game Team Building", description: "Pick your early roster and avoid wasting resources." },
    "construction-equipe-fin": { title: "Late Game Team Building", description: "Build an optimized team based on the opponent and context." },
    "team-builder": { title: "Team Builder", description: "How to build the perfect team. Genre synergy calculation and equipment bonuses." },
    "recommended-teams": { title: "Recommended Teams", description: "Best UR and SSR team compositions. Offensive, balanced and defensive strategies." },
    "leveling-ssr": { title: "SSR Leveling Guide", description: "Number of cards needed to level up your SSR characters to level 115." },
    "blueprints": { title: "Blueprints Guide", description: "Blueprint requirements by tier (1-21) to upgrade your facilities. Tier 7-12 Gold." },
    "hq-upgrade": { title: "HQ Upgrade Guide", description: "Building cards needed for each HQ level. Total requirement: 29,922 cards." },
    "vehicle-system": { title: "Vehicle System Guide", description: "Complete guide to the vehicle system. Cars, parts and upgrades." },
    "gold-equipment": { title: "Gold Equipment Guide", description: "Best gold equipment choices and strategies for late game." },
    "purple-equipment": { title: "Purple Equipment Guide", description: "Best purple equipment choices and how to obtain them." },
    "event-ancient-rome": { title: "Guide to Ancient Rome", description: "Complete guide to the Adventure Abroad Rome event. Phases, strategies and rewards." },
    "event-radio-battle": { title: "Radio Battle Guide", description: "Complete guide to Radio Battle. 5 phases, strategies to maximize your Radio Coins." },
    "event-grammy": { title: "Grammy Awards Guide", description: "Guide to the 8 Grammy categories. Best teams and strategies to win medals." },
    "event-ultimate-ceo": { title: "Ultimate CEO Guide", description: "The Ultimate CEO Complete Guide: How to Defeat the CEO and Get the Best Rewards." },
    "event-echo-death-match": { title: "Echo Death Match Guide", description: "3-day weekly event. Choose a difficulty and clear stages for rewards." },
    "event-muse": { title: "Muse Event Guide", description: "Rhythm mini-game. Use Entry Tickets, play tracks and upgrade your stats." },
    "event-chamber-territory": { title: "Chamber Territory Guide", description: "Chamber Territory Guide. Capture and defend territories for rewards." },
    "event-cleanup-party": { title: "Cleanup Party Guide", description: "Cleanup Party Guide. Collect trash cans and exchange for rewards." },
    "event-metro-subway": { title: "Metro & Subway Guide", description: "Metro & Subway Guide. Collect tickets and ride the subway for rewards." },
    "event-vs-group": { title: "VS Group Event Guide", description: "VS Group Event Guide. Battle between groups with 5 days preparation and 1 day final combat." },
    "event-fishing": { title: "Fishing Event Guide", description: "Fishing Event Guide. Set up your aquarium, catch fish and earn rewards." },
    "world-building": { title: "World Building Guide", description: "World Building Guide. Build and develop your world in the game." },
    "vip-level": { title: "VIP Level Guide", description: "VIP Level Guide. Details of points required for each VIP level." },
    "ceo-coins": { title: "CEO Coins Purchase Guide", description: "Guide to purchasing CEO Coins via the official payment website." },
    "alliance-management": { title: "Alliance Management Guide", description: "Alliance Management Guide. Roles, responsibilities and strategies for managing your guild." },
    "peak-level": { title: "Peak Level Guide", description: "Peak Level Guide. Late-game progression system for 5-star SSR girls." },
    "group-shop": { title: "Group Shop Guide", description: "Group Shop Guide. What to buy in the guild shop to optimize your progress." },
  },
  it: {
    "structure-du-jeu": { title: "Struttura del gioco", description: "Comprendi la struttura del gioco Top Girl. Server home, cicli Abroad, City Supremacy e ciclo principale." },
    "equipment": { title: "Guida Equipaggiamento", description: "Gioielli, Auto e Proprietà per ottimizzare le tue statistiche. Confronto Gold vs Purple e priorità d'acquisto." },
    "team-builder": { title: "Costruttore di Team", description: "Come costruire la squadra perfetta. Calcolo delle sinergie di genere e bonus equipaggiamento." },
    "recommended-teams": { title: "Team Consigliati", description: "Migliori composizioni di team UR e SSR. Strategie offensive, equilibrate e difensive." },
    "leveling-ssr": { title: "Guida Level Up SSR", description: "Numero di carte necessarie per level up i tuoi personaggi SSR al livello 115." },
    "blueprints": { title: "Guida Blueprints", description: "Requisiti blueprint per tier (1-21) per migliorare le tue strutture. Tier 7-12 Oro." },
    "hq-upgrade": { title: "Guida HQ (Quartier Generale)", description: "Carte edificio necessarie per ogni livello HQ. Totale richiesto: 29.922 carte." },
    "vehicle-system": { title: "Sistema Veicoli", description: "Guida completa al sistema veicoli. Auto, parti e miglioramenti." },
    "gold-equipment": { title: "Guida Equipaggiamento Oro", description: "Migliori scelte di equipaggiamento oro e strategie per il late game." },
    "purple-equipment": { title: "Guida Equipaggiamento Purple", description: "Migliori scelte di equipaggiamento purple e come ottenerli." },
    "event-ancient-rome": { title: "Guida all'Antica Roma", description: "Guida completa all'evento Avventura a Roma. Fasi, strategie e ricompense." },
    "event-radio-battle": { title: "Guida Radio Battle", description: "Guida completa a Radio Battle. 5 fasi, strategie per massimizzare le tue Radio Coin." },
    "event-grammy": { title: "Guida Grammy Awards", description: "Guida alle 8 categorie Grammy. Migliori team e strategie per vincere medaglie." },
    "event-ultimate-ceo": { title: "Guida Ultimate CEO", description: "Guida completa Ultimate CEO: Come sconfiggere il CEO e ottenere le migliori ricompense." },
    "event-echo-death-match": { title: "Guida Echo Death Match", description: "Guida Echo Death Match. Accumula Echo Stones e scambia per ricompense SSR+." },
    "event-muse": { title: "Guida Muse Event", description: "Mini-gioco musicale. Usa Entry Tickets, gioca track e potenzia le stats." },
    "event-chamber-territory": { title: "Guida Chamber Territory", description: "Guida Chamber Territory. Cattura e difendi territori per ricompense." },
    "event-cleanup-party": { title: "Guida Cleanup Party", description: "Guida Cleanup Party. Raccogli i cestini e scambia per ricompense." },
    "event-metro-subway": { title: "Guida Metro & Subway", description: "Guida Metro & Subway. Raccogli i biglietti e monta sulla metro per ricompense." },
    "event-vs-group": { title: "Guida Evento VS Group", description: "Guida VS Group Event. Battaglia tra gruppi con 5 giorni di preparazione e 1 giorno di combattimento finale." },
    "event-fishing": { title: "Guida Evento Fishing", description: "Guida Fishing Event. Configura il tuo acquario, cattura pesci e guadagna ricompense." },
    "world-building": { title: "Guida World Building", description: "Guida World Building. Costruisci e sviluppa il tuo mondo nel gioco." },
    "vip-level": { title: "Guida Livello VIP", description: "Guida VIP Level. Dettagli dei punti richiesti per ogni livello VIP." },
    "ceo-coins": { title: "Guida Acquisto CEO Coins", description: "Guida all'acquisto di CEO Coins tramite il sito di pagamento ufficiale." },
    "alliance-management": { title: "Guida Gestione Alleanza", description: "Guida gestione alleanza. Ruoli, responsabilità e strategie per gestire la tua gilda." },
    "peak-level": { title: "Guida Peak Level", description: "Guida Peak Level. Sistema di progressione late-game per SSR girl con 5 stelle." },
    "group-shop": { title: "Guida Group Shop", description: "Guida Group Shop. Cosa acquistare nel negozio gilda per ottimizzare i tuoi progressi." },
  },
  es: {
    "structure-du-jeu": { title: "Estructura del juego", description: "Comprende la estructura del juego Top Girl. Servidor local, ciclos Abroad, City Supremacy y ciclo principal." },
    "equipment": { title: "Guía de Equipamiento", description: "Joyas, Coches y Propiedades para optimizar tus estadísticas. Comparación Gold vs Purple y prioridades de compra." },
    "team-builder": { title: "Constructor de Equipos", description: "Cómo construir el equipo perfecto. Cálculo de sinergias de género y bonos de equipo." },
    "recommended-teams": { title: "Equipos Recomendados", description: "Mejores composiciones de equipos UR y SSR. Estrategias ofensivas, equilibradas y defensivas." },
    "leveling-ssr": { title: "Guía de Subida de Nivel SSR", description: "Número de cartas necesarias para subir de nivel tus personajes SSR al nivel 115." },
    "blueprints": { title: "Guía de Blueprints", description: "Requisitos de blueprints por tier (1-21) para mejorar tus instalaciones. Tier 7-12 Oro." },
    "hq-upgrade": { title: "Guía de HQ (Sede Central)", description: "Cartas de edificio necesarias para cada nivel de HQ. Requisito total: 29,922 cartas." },
    "vehicle-system": { title: "Sistema de Vehículos", description: "Guía completa del sistema de vehículos. Coches, piezas y mejoras." },
    "gold-equipment": { title: "Guía de Equipamiento Oro", description: "Mejores elecciones de equipamiento oro y estrategias para late game." },
    "purple-equipment": { title: "Guía de Equipamiento Purple", description: "Mejores elecciones de equipamiento purple y cómo obtenerlos." },
    "event-ancient-rome": { title: "Guía de la Antigua Roma", description: "Guía completa del evento Aventura en Roma. Fases, estrategias y recompensas." },
    "event-radio-battle": { title: "Guía de Radio Battle", description: "Guía completa de Radio Battle. 5 fases, estrategias para maximizar tus Radio Coins." },
    "event-grammy": { title: "Guía de Grammy Awards", description: "Guía de las 8 categorías Grammy. Mejores equipos y estrategias para ganar medallas." },
    "event-ultimate-ceo": { title: "Guía de Ultimate CEO", description: "Guía completa de Ultimate CEO: Cómo derrotar al CEO y obtener las mejores recompensas." },
    "event-echo-death-match": { title: "Guía de Echo Death Match", description: "Guía de Echo Death Match. Acumula Echo Stones y canjea por recompensas SSR+." },
    "event-chamber-territory": { title: "Guía de Chamber Territory", description: "Guía de Chamber Territory. Captura y defiende territorios por recompensas." },
    "event-cleanup-party": { title: "Guía de Cleanup Party", description: "Guía de Cleanup Party. Recoge los botes de basura y canjea por recompensas." },
    "event-metro-subway": { title: "Guía de Metro & Subway", description: "Guía de Metro & Subway. Recoge tickets y monta en el metro por recompensas." },
    "event-vs-group": { title: "Guía de Evento VS Group", description: "Guía de VS Group Event. Batalla entre grupos con 5 días de preparación y 1 día de combate final." },
    "event-fishing": { title: "Guía de Evento de Pesca", description: "Guía de Fishing Event. Configura tu acuario, pesca peces y gana recompensas." },
    "world-building": { title: "Guía de World Building", description: "Guía de World Building. Construye y desarrolla tu mundo en el juego." },
    "vip-level": { title: "Guía de Nivel VIP", description: "Guía de VIP Level. Detalles de puntos requeridos para cada nivel VIP." },
    "ceo-coins": { title: "Guía de Compra de CEO Coins", description: "Guía para comprar CEO Coins a través del sitio de pago oficial." },
    "alliance-management": { title: "Guía de Gestión de Alianza", description: "Guía de gestión de alianza. Roles, responsabilidades y estrategias para manejar tu gremios." },
    "peak-level": { title: "Guía de Peak Level", description: "Guía de Peak Level. Sistema de progresión late-game para SSR girls con 5 estrellas." },
    "group-shop": { title: "Guía de Group Shop", description: "Guía de Group Shop. Qué comprar en la tienda del gremio para optimizar tu progreso." },
  },
  pt: {
    "structure-du-jeu": { title: "Estrutura do jogo", description: "Compreenda a estrutura do jogo Top Girl. Servidor principal, ciclos Abroad, City Supremacy e ciclo principal." },
    "equipment": { title: "Guia de Equipamento", description: "Joias, Carros e Imóveis para otimizar suas estatísticas. Comparação Gold vs Purple e prioridades de compra." },
    "team-builder": { title: "Construtor de Times", description: "Como construir o time perfeito. Cálculo de sinergias de gênero e bônus de equipamento." },
    "recommended-teams": { title: "Times Recomendados", description: "Melhores composições de times UR e SSR. Estratégias ofensivas, equilibradas e defensivas." },
    "leveling-ssr": { title: "Guia de Level Up SSR", description: "Número de cartas necessárias para level up seus personagens SSR para o nível 115." },
    "blueprints": { title: "Guia de Blueprints", description: "Requisitos de blueprints por tier (1-21) para melhorar suas instalações. Tier 7-12 Ouro." },
    "hq-upgrade": { title: "Guia de HQ (Sede)", description: "Cartas de construção necessárias para cada nível do HQ. Requisito total: 29.922 cartas." },
    "vehicle-system": { title: "Sistema de Veículos", description: "Guia completo do sistema de veículos. Carros, peças e melhorias." },
    "gold-equipment": { title: "Guia de Equipamento Ouro", description: "Melhores escolhas de equipamento ouro e estratégias para late game." },
    "purple-equipment": { title: "Guia de Equipamento Purple", description: "Melhores escolhas de equipamento purple e como obtê-los." },
    "event-ancient-rome": { title: "Guia da Roma Antiga", description: "Guia completo do evento Aventura em Roma. Fases, estratégias e recompensas." },
    "event-radio-battle": { title: "Guia do Radio Battle", description: "Guia completo do Radio Battle. 5 fases, estratégias para maximizar suas Radio Coins." },
    "event-grammy": { title: "Guia do Grammy Awards", description: "Guia das 8 categorias Grammy. Melhores times e estratégias para ganhar medalhas." },
    "event-ultimate-ceo": { title: "Guia do Ultimate CEO", description: "Guia completo do Ultimate CEO: Como derrotar o CEO e obter as melhores recompensas." },
    "event-echo-death-match": { title: "Guia do Echo Death Match", description: "Guia do Echo Death Match. Acumule Echo Stones e troque por recompensas SSR+." },
    "event-muse": { title: "Guia do Muse Event", description: "Mini-jogo musical. Use Entry Tickets, jogue tracks e melhore suas stats." },
    "event-chamber-territory": { title: "Guia do Chamber Territory", description: "Guia do Chamber Territory. Capture e defenda territórios por recompensas." },
    "event-cleanup-party": { title: "Guia do Cleanup Party", description: "Guia do Cleanup Party. Colete os cestos de lixo e troque por recompensas." },
    "event-metro-subway": { title: "Guia do Metro & Subway", description: "Guia do Metro & Subway. Colete tickets e pegue o metrô por recompensas." },
    "event-vs-group": { title: "Guia do Evento VS Group", description: "Guia do VS Group Event. Batalha entre grupos com 5 dias de preparação e 1 dia de combate final." },
    "event-fishing": { title: "Guia do Evento de Pesca", description: "Guia do Fishing Event. Configure seu aquário, pesque peixes e ganhe recompensas." },
    "world-building": { title: "Guia de World Building", description: "Guia de World Building. Construa e desenvolva seu mundo no jogo." },
    "vip-level": { title: "Guia de Nível VIP", description: "Guia de VIP Level. Detalhes dos pontos necessários para cada nível VIP." },
    "ceo-coins": { title: "Guia de Compra de CEO Coins", description: "Guia para comprar CEO Coins através do site de pagamento oficial." },
    "alliance-management": { title: "Guia de Gestão de Aliança", description: "Guia de gestão de aliança. Funções, responsabilidades e estratégias para gerenciar sua guilda." },
    "peak-level": { title: "Guia de Peak Level", description: "Guia de Peak Level. Sistema de progressão late-game para SSR girls com 5 estrelas." },
    "group-shop": { title: "Guia do Group Shop", description: "Guia do Group Shop. O que comprar na loja da guilda para otimizar seu progresso." },
  },
  pl: {
    "structure-du-jeu": { title: "Struktura gry", description: "Zrozum strukturę gry Top Girl. Serwer główny, cykle Abroad, City Supremacy i główna pętla." },
    "equipment": { title: "Poradnik Wyposażenia", description: "Biżuteria, Samochody i Nieruchomości, aby zoptymalizować statystyki. Porównanie Gold vs Purple i priorytety zakupów." },
    "team-builder": { title: "Konstruktor Drużyny", description: "Jak zbudować idealną drużynę. Obliczanie synergii gatunku i bonusów wyposażenia." },
    "recommended-teams": { title: "Zalecane Drużyny", description: "Najlepsze składy drużyn UR i SSR. Strategie ofensywne, zrównoważone i defensywne." },
    "leveling-ssr": { title: "Poradnik Levelowania SSR", description: "Liczba kart potrzebnych do wylevelowania postaci SSR na poziom 115." },
    "blueprints": { title: "Poradnik Blueprintów", description: "Wymagania blueprintów na tier (1-21) do ulepszenia instalacji. Tier 7-12 Złoto." },
    "hq-upgrade": { title: "Poradnik HQ (Kwatera Główna)", description: "Karty budynku potrzebne na każdy poziom HQ. Całkowite wymaganie: 29 922 kart." },
    "vehicle-system": { title: "System Pojazdów", description: "Kompletny poradnik systemu pojazdów. Samochody, części i ulepszenia." },
    "gold-equipment": { title: "Poradnik Wyposażenia Złotego", description: "Najlepsze wybory wyposażenia gold i strategie na późną grę." },
    "purple-equipment": { title: "Poradnik Wyposażenia Fioletowego", description: "Najlepsze wybory wyposażenia purple i jak je zdobyć." },
    "event-ancient-rome": { title: "Poradnik Starożytnego Rzymu", description: "Kompletny poradnik wydarzenia Przygoda w Rzymie. Fazy, strategie i nagrody." },
    "event-radio-battle": { title: "Poradnik Radio Battle", description: "Kompletny poradnik Radio Battle. 5 faz, strategie maksymalizacji Radio Coin." },
    "event-grammy": { title: "Poradnik Grammy Awards", description: "Poradnik 8 kategorii Grammy. Najlepsze drużyny i strategie wygrywania medaliów." },
    "event-ultimate-ceo": { title: "Poradnik Ultimate CEO", description: "Kompletny poradnik Ultimate CEO: Jak pokonać CEO i zdobyć najlepsze nagrody." },
    "event-echo-death-match": { title: "Poradnik Echo Death Match", description: "Poradnik Echo Death Match. Gromadź Echo Stones i wymieniaj na nagrody SSR+." },
    "event-muse": { title: "Poradnik Muse Event", description: "Muzyczna minigra. Używaj Entry Tickets, graj tracki i ulepszaj staty." },
    "event-chamber-territory": { title: "Poradnik Chamber Territory", description: "Poradnik Chamber Territory. Zdobywaj i defenduj terytoria dla nagród." },
    "event-cleanup-party": { title: "Poradnik Cleanup Party", description: "Poradnik Cleanup Party. Zbieraj śmietniki i wymieniaj na nagrody." },
    "event-metro-subway": { title: "Poradnik Metro & Subway", description: "Poradnik Metro & Subway. Zbieraj bilety i jedź metrem dla nagród." },
    "event-vs-group": { title: "Poradnik Wydarzenia VS Group", description: "Poradnik VS Group Event. Bitwa między grupami z 5 dniami przygotowań i 1 dniem walki." },
    "event-fishing": { title: "Poradnik Wydarzenia Wędkowania", description: "Poradnik Fishing Event. Skonfiguruj akwarium, łów ryby i zdobywaj nagrody." },
    "world-building": { title: "Poradnik World Building", description: "Poradnik World Building. Buduj i rozwijaj swój świat w grze." },
    "vip-level": { title: "Poradnik Poziomu VIP", description: "Poradnik VIP Level. Szczegóły punktów wymaganych dla każdego poziomu VIP." },
    "ceo-coins": { title: "Poradnik Zakupu CEO Coins", description: "Poradnik zakupu CEO Coins przez oficjalną stronę płatności." },
    "alliance-management": { title: "Poradnik Zarządzania Sojuszem", description: "Poradnik zarządzania sojuszem. Role, obowiązki i strategie zarządzania gildią." },
    "peak-level": { title: "Poradnik Peak Level", description: "Poradnik Peak Level. System progresji późnej gry dla SSR girls z 5 gwiazdkami." },
    "group-shop": { title: "Poradnik Group Shop", description: "Poradnik Group Shop. Co kupować w sklepie gildii, aby zoptymalizować postęp." },
  },
  id: {
    "structure-du-jeu": { title: "Struktur permainan", description: "Pahami struktur permainan Top Girl. Server utama, siklus Abroad, City Supremacy dan loop utama." },
    "equipment": { title: "Panduan Peralatan", description: "Perhiasan, Mobil, dan Properti untuk mengoptimalkan statistik Anda. Perbandingan Gold vs Purple dan prioritas pembelian." },
    "team-builder": { title: "Pembuat Tim", description: "Cara membangun tim yang sempurna. Perhitungan sinergi genre dan bonus peralatan." },
    "recommended-teams": { title: "Tim yang Direkomendasikan", description: "Komposisi tim UR dan SSR terbaik. Strategi ofensif, seimbang, dan defensif." },
    "leveling-ssr": { title: "Panduan Level Up SSR", description: "Jumlah kartu yang diperlukan untuk level up karakter SSR Anda ke level 115." },
    "blueprints": { title: "Panduan Blueprints", description: "Persyaratan blueprint per tier (1-21) untuk meningkatkan fasilitas Anda. Tier 7-12 Emas." },
    "hq-upgrade": { title: "Panduan HQ (Markas Besar)", description: "Kartu bangunan yang diperlukan untuk setiap level HQ. Total kebutuhan: 29.922 kartu." },
    "vehicle-system": { title: "Sistem Kendaraan", description: "Panduan lengkap sistem kendaraan. Mobil, suku cadang, dan peningkatan." },
    "gold-equipment": { title: "Panduan Peralatan Emas", description: "Pilihan peralatan emas terbaik dan strategi untuk late game." },
    "purple-equipment": { title: "Panduan Peralatan Ungu", description: "Pilihan peralatan ungu terbaik dan cara mendapatkannya." },
    "event-ancient-rome": { title: "Panduan Roma Kuno", description: "Panduan lengkap acara Petualangan di Roma. Fase, strategi, dan hadiah." },
    "event-radio-battle": { title: "Panduan Radio Battle", description: "Panduan lengkap Radio Battle. 5 fase, strategi memaksimalkan Radio Coins Anda." },
    "event-grammy": { title: "Panduan Grammy Awards", description: "Panduan 8 kategori Grammy. Tim terbaik dan strategi memenangkan medals." },
    "event-ultimate-ceo": { title: "Panduan Ultimate CEO", description: "Panduan lengkap Ultimate CEO: Cara Mengalahkan CEO dan Mendapatkan Hadiah Terbaik." },
    "event-echo-death-match": { title: "Panduan Echo Death Match", description: "Panduan Echo Death Match. Kumpulkan Echo Stones dan tukarkan dengan hadiah SSR+." },
    "event-chamber-territory": { title: "Panduan Chamber Territory", description: "Panduan Chamber Territory. Tangkap dan pertahankan wilayah untuk hadiah." },
    "event-cleanup-party": { title: "Panduan Cleanup Party", description: "Panduan Cleanup Party. Kumpulkan tempat sampah dan tukarkan untuk hadiah." },
    "event-metro-subway": { title: "Panduan Metro & Subway", description: "Panduan Metro & Subway. Kumpulkan tiket dan naik metro untuk hadiah." },
    "event-vs-group": { title: "Panduan Acara VS Group", description: "Panduan VS Group Event. Pertarungan antar grup dengan 5 hari persiapan dan 1 hari pertarungan final." },
    "event-fishing": { title: "Panduan Acara Memancing", description: "Panduan Fishing Event. Siapkan akuarium Anda, tangkap ikan, dan menangkan hadiah." },
    "world-building": { title: "Panduan World Building", description: "Panduan World Building. Bangun dan kembangkan dunia Anda dalam permainan." },
    "vip-level": { title: "Panduan Level VIP", description: "Panduan VIP Level. Detail poin yang diperlukan untuk setiap level VIP." },
    "ceo-coins": { title: "Panduan Pembelian CEO Coins", description: "Panduan pembelian CEO Coins melalui situs pembayaran resmi." },
    "alliance-management": { title: "Panduan Manajemen Aliansi", description: "Panduan manajemen aliansi. Peran, tanggung jawab, dan strategi mengelola guild Anda." },
    "peak-level": { title: "Panduan Peak Level", description: "Panduan Peak Level. Sistem progresi late-game untuk SSR girl dengan 5 bintang." },
    "group-shop": { title: "Panduan Group Shop", description: "Panduan Group Shop. Apa yang harus dibeli di toko guild untuk mengoptimalkan kemajuan Anda." },
  },
  ru: {
    "structure-du-jeu": { title: "Структура игры", description: "Понять структуру игры Top Girl. Родной сервер, циклы Abroad, City Supremacy и основной цикл." },
    "equipment": { title: "Гайд по снаряжению", description: "Украшения, машины и недвижимость для оптимизации ваших статов. Сравнение Gold vs Purple и приоритеты покупки." },
    "team-builder": { title: "Конструктор команд", description: "Как собрать идеальную команду. Расчёт синергии жанра и бонусов снаряжения." },
    "recommended-teams": { title: "Рекомендуемые команды", description: "Лучшие составы команд UR и SSR. Наступательные, сбалансированные и оборонительные стратегии." },
    "leveling-ssr": { title: "Гайд по прокачке SSR", description: "Количество карт, необходимое для прокачки ваших персонажей SSR до уровня 115." },
    "blueprints": { title: "Гайд по чертежам", description: "Требования к чертежам по тиру (1-21) для улучшения ваших построек. Тир 7-12 Золото." },
    "hq-upgrade": { title: "Гайд по HQ (Штаб-квартира)", description: "Карты зданий, необходимые для каждого уровня HQ. Всего требуется: 29 922 карты." },
    "vehicle-system": { title: "Система транспорта", description: "Полный гайд по системе транспорта. Машины, запчасти и улучшения." },
    "gold-equipment": { title: "Гайд по золотому снаряжению", description: "Лучший выбор золотого снаряжения и стратегии для поздней игры." },
    "purple-equipment": { title: "Гайд по фиолетовому снаряжению", description: "Лучший выбор фиолетового снаряжения и как его получить." },
    "event-ancient-rome": { title: "Гайд по Древнему Риму", description: "Полный гайд по событию Приключение в Риме. Фазы, стратегии и награды." },
    "event-radio-battle": { title: "Гайд по Radio Battle", description: "Полный гайд по Radio Battle. 5 фаз, стратегии максимизации Radio Coins." },
    "event-grammy": { title: "Гайд по Grammy Awards", description: "Гайд по 8 категориям Grammy. Лучшие команды и стратегии победы." },
    "event-ultimate-ceo": { title: "Гайд по Ultimate CEO", description: "Полный гайд по Ultimate CEO: Как победить CEO и получить лучшие награды." },
    "event-echo-death-match": { title: "Гайд по Echo Death Match", description: "Гайд по Echo Death Match. Накапливайте Echo Stones и обменивайте на награды SSR+." },
    "event-muse": { title: "Гайд по Muse Event", description: "Музыкальная мини-игра. Используйте Entry Tickets, играйте треки и улучшайте статы." },
    "event-chamber-territory": { title: "Гайд по Chamber Territory", description: "Гайд по Chamber Territory. Захватывайте и защищайте территории для наград." },
    "event-cleanup-party": { title: "Гайд по Cleanup Party", description: "Гайд по Cleanup Party. Собирайте урны и обменивайте на награды." },
    "event-metro-subway": { title: "Гайд по Metro & Subway", description: "Гайд по Metro & Subway. Собирайте билеты и ездите на метро за наградами." },
    "event-vs-group": { title: "Гайд по событию VS Group", description: "Гайд по VS Group Event. Битва между группами с 5 днями подготовки и 1 днём финальной битвы." },
    "event-fishing": { title: "Гайд по событию Рыбалка", description: "Гайд по Fishing Event. Настройте аквариум, ловите рыбу и выигрывайте награды." },
    "world-building": { title: "Гайд по World Building", description: "Гайд по World Building. Стройте и развивайте свой мир в игре." },
    "vip-level": { title: "Гайд по VIP Level", description: "Гайд по VIP Level. Детали очках, необходимых для каждого уровня VIP." },
    "ceo-coins": { title: "Гайд по покупке CEO Coins", description: "Гайд по покупке CEO Coins через официальный платёжный сайт." },
    "alliance-management": { title: "Гайд по управлению альянсом", description: "Гайд по управлению альянсом. Роли, обязанности и стратегии управления гильдией." },
    "peak-level": { title: "Гайд по Peak Level", description: "Гайд по Peak Level. Система прогрессии поздней игры для SSR girls с 5 звёздами." },
    "group-shop": { title: "Гайд по Group Shop", description: "Гайд по Group Shop. Что покупать в гильдийном магазине для оптимизации прогресса." },
  },
};

type Guide = {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  category: string;
  guideType: "classic" | "event";
  readTime: string;
  isNew?: boolean;
  inProgress?: boolean;
  stage?: "early" | "late";
  isDone?: boolean;
  // thumbnail: chemin image guide OU artiste SSR si pas de logo
  thumbnail?: string;
};

const guides: Guide[] = [
  {
    id: "structure-du-jeu",
    title: "Structure du jeu",
    description: "Comprendre la structure du jeu Top Girl. Serveur d'origine, cycles Abroad, City Supremacy et boucle principale.",
    icon: "📊",
    color: "#8b5cf6",
    category: "Guide classique",
    guideType: "classic",
    readTime: "10 min",
    isNew: true,
    isDone: true,
    thumbnail: "/assets/images/artists/Alice.jpg",
  },
  {
    id: "equipment",
    title: "Guide Équipement",
    description: "Bijoux, Voitures et Propriétés pour optimiser vos statistiques. Comparaison Gold vs Purple et priorités d'achat.",
    icon: "💍",
    color: "#fbbf24",
    category: "Guide classique",
    guideType: "classic",
    readTime: "10 min",
    isNew: true,
    isDone: true,
    thumbnail: "/assets/images/artists/Aurora.jpg",
  },
  {
    id: "construction-equipe-debut",
    title: "Construction d'équipe début de jeu",
    description: "Choisir ses artistes au début et éviter de gaspiller des ressources.",
    icon: "🎯",
    color: "#f97316",
    category: "Avancé - Début de jeu",
    guideType: "classic",
    readTime: "12 min",
    stage: "early",
    isDone: true,
    thumbnail: "/assets/images/artists/Ayaka.jpg",
  },
  {
    id: "construction-equipe-fin",
    title: "Construction d'équipe fin de jeu",
    description: "Construire une équipe optimisée en fin de jeu selon l'adversaire.",
    icon: "🧠",
    color: "#f59e0b",
    category: "Avancé - Fin de jeu",
    guideType: "classic",
    readTime: "12 min",
    stage: "late",
    isDone: true,
    thumbnail: "/assets/images/artists/Brooklyn.jpg",
  },
  {
    id: "team-builder",
    title: "Team Builder",
    description: "Comment construire l'équipe parfaite. Calcul des synergies de genre et bonus d'équipement.",
    icon: "👥",
    color: "#22d3ee",
    category: "Guide classique",
    guideType: "classic",
    readTime: "15 min",
    inProgress: true,
  },
  {
    id: "recommended-teams",
    title: "Équipes Recommandées",
    description: "Les meilleures compositions d'équipes UR et SSR. Stratégies offensives, équilibrées et défensives.",
    icon: "🏆",
    color: "#f472b6",
    category: "Guide classique",
    guideType: "classic",
    readTime: "12 min",
    inProgress: true,
  },
  {
    id: "leveling-ssr",
    title: "Montée en Niveau SSR",
    description: "Nombre de cartes nécessaires pour level up vos personnages SSR jusqu'au niveau 115.",
    icon: "📈",
    color: "#34d399",
    category: "Guide classique",
    guideType: "classic",
    readTime: "8 min",
    inProgress: true,
  },
  {
    id: "blueprints",
    title: "Guide Blueprints",
    description: "Requirements en blueprints par tier (1-21) pour améliorer vos installations. Tier 7-12 Gold.",
    icon: "🛠️",
    color: "#818cf8",
    category: "Guide classique",
    guideType: "classic",
    readTime: "10 min",
    inProgress: true,
  },
  {
    id: "hq-upgrade",
    title: "Guide HQ (Quartier Général)",
    description: "Cartes de bâtiment nécessaires pour chaque niveau du HQ. Requirement total: 29,922 cartes.",
    icon: "🏢",
    color: "#a855f7",
    category: "Guide classique",
    guideType: "classic",
    readTime: "5 min",
    inProgress: true,
  },
  {
    id: "vehicle-system",
    title: "Système de Véhicules",
    description: "Système complet: Avancement, Pièces (Moteur, Châsis, Suspension, Jantes), Skins débloqués.",
    icon: "🚗",
    color: "#f87171",
    category: "Guide classique",
    guideType: "classic",
    readTime: "15 min",
    inProgress: true,
  },
  {
    id: "gold-equipment",
    title: "Équipement Gold Optimal",
    description: "Setup complet Gold pour Vocalist, Dancer et Center. +19,730 stats et 86,000 fans par personnage.",
    icon: "✨",
    color: "#fbbf24",
    category: "Guide classique",
    guideType: "classic",
    readTime: "10 min",
    inProgress: true,
  },
  {
    id: "event-ancient-rome",
    title: "Guide Ancient Rome",
    description: "Guide complet de l'événement Adventure Abroad Rome. Phases, stratégies et rewards.",
    icon: "🏛️",
    color: "#f97316",
    category: "Guide événement",
    guideType: "event",
    readTime: "10 min",
    inProgress: true,
  },
  {
    id: "event-radio-battle",
    title: "Guide Radio Battle",
    description: "Guide complet du Radio Battle. 5 phases, stratégies pour maximiser vos Radio Coins.",
    icon: "📻",
    color: "#06b6d4",
    category: "Guide événement",
    guideType: "event",
    readTime: "8 min",
    inProgress: true,
  },
  {
    id: "event-grammy",
    title: "Guide Grammy Awards",
    description: "Guide des 8 catégories Grammy. Meilleures équipes et stratégies pour gagner des medals.",
    icon: "🏆",
    color: "#fbbf24",
    category: "Guide événement",
    guideType: "event",
    readTime: "10 min",
    inProgress: true,
  },
  {
    id: "event-ultimate-ceo",
    title: "Guide Ultimate CEO",
    description: "Guide complet de l'Ultimate CEO. Comment vaincre le CEO et obtenir les meilleures rewards.",
    icon: "💼",
    color: "#ef4444",
    category: "Guide événement",
    guideType: "event",
    readTime: "8 min",
    inProgress: true,
  },
  {
    id: "event-echo-death-match",
    title: "Guide Echo Death Match",
    description: "Événement de 3 jours. Choisissez une difficulté et terminez les stages pour des récompenses.",
    icon: "👻",
    color: "#8b5cf6",
    category: "Guide événement",
    guideType: "event",
    readTime: "8 min",
    isNew: true,
    isDone: true,
    thumbnail: "/assets/images/guides/echo-death-match.jpg",
  },
  {
    id: "event-muse",
    title: "Guide Muse Event",
    description: "Guide du Muse Event. Mini-jeu musical avec Entry Tickets et upgrades.",
    icon: "🎵",
    color: "#a855f7",
    category: "Guide événement",
    guideType: "event",
    readTime: "8 min",
    isNew: true,
    isDone: true,
    thumbnail: "/assets/images/guides/muse-event.jpg",
  },
  {
    id: "event-chamber-territory",
    title: "Guide Chamber Territory",
    description: "Guide du Chamber Territory. Capturez et défendez des territoires pour des rewards.",
    icon: "🏰",
    color: "#14b8a6",
    category: "Guide événement",
    guideType: "event",
    readTime: "8 min",
    inProgress: true,
  },
  {
    id: "event-cleanup-party",
    title: "Guide Cleanup Party",
    description: "Guide du Cleanup Party. Collectez des poubelles et échangez pour des rewards.",
    icon: "🧹",
    color: "#22c55e",
    category: "Guide événement",
    guideType: "event",
    readTime: "5 min",
    inProgress: true,
  },
  {
    id: "event-metro-subway",
    title: "Guide Metro & Subway",
    description: "Guide du Metro & Subway. Collectez des tickets et montez dans le métro pour des rewards.",
    icon: "🚇",
    color: "#3b82f6",
    category: "Guide événement",
    guideType: "event",
    readTime: "5 min",
    inProgress: true,
  },
  {
    id: "event-vs-group",
    title: "Guide VS Group Event",
    description: "Guide du VS Group Event. Bataille entre groupes avec 5 jours de préparation et 1 jour de combat final.",
    icon: "⚔️",
    color: "#ef4444",
    category: "Guide événement",
    guideType: "event",
    readTime: "8 min",
    isNew: true,
    isDone: true,
    thumbnail: "/assets/images/guides/vs-group.jpg",
  },
  {
    id: "event-fishing",
    title: "Guide Fishing Event",
    description: "Guide du Fishing Event. Configurez votre aquarium, attrapez des poissons et gagnez des récompenses.",
    icon: "🎣",
    color: "#06b6d4",
    category: "Guide événement",
    guideType: "event",
    readTime: "6 min",
    isNew: true,
    isDone: true,
    thumbnail: "/assets/images/guides/fishing-event.jpg",
  },
  {
    id: "world-building",
    title: "World Building Guide",
    description: "Guide World Building. Construisez et développez votre monde dans le jeu.",
    icon: "🌍",
    color: "#10b981",
    category: "Guide classique",
    guideType: "classic",
    readTime: "10 min",
    inProgress: true,
  },
  {
    id: "vip-level",
    title: "VIP Level Guide",
    description: "Guide VIP Level. Détails des points requis pour chaque niveau VIP.",
    icon: "⭐",
    color: "#f59e0b",
    category: "Guide classique",
    guideType: "classic",
    readTime: "15 min",
    inProgress: true,
  },
  {
    id: "ceo-coins",
    title: "CEO Coins Purchase Guide",
    description: "Guide d'achat de CEO Coins via le site de paiement officiel.",
    icon: "💰",
    color: "#84cc16",
    category: "Guide classique",
    guideType: "classic",
    readTime: "5 min",
    inProgress: true,
  },
  {
    id: "alliance-management",
    title: "Alliance Management Guide",
    description: "Guide de gestion d'alliance. Rôles, responsabilités et stratégies pour gérer votre guilde.",
    icon: "🏰",
    color: "#8b5cf6",
    category: "Guide classique",
    guideType: "classic",
    readTime: "12 min",
    inProgress: true,
  },
  {
    id: "peak-level",
    title: "Peak Level Guide",
    description: "Guide Peak Level. Système de progression late-game pour SSR girls avec 5 étoiles.",
    icon: "📊",
    color: "#ec4899",
    category: "Guide classique",
    guideType: "classic",
    readTime: "15 min",
    inProgress: true,
  },
  {
    id: "group-shop",
    title: "Group Shop Guide",
    description: "Guide Group Shop. Quoi acheter dans la boutique de guilde pour optimiser vos progrès.",
    icon: "🛒",
    color: "#f97316",
    category: "Guide classique",
    guideType: "classic",
    readTime: "5 min",
    inProgress: true,
  },
];

const categories = ["Tous", "Guide classique", "Guide événement", "Début de jeu", "Fin de jeu"];

function getGuideTitle(id: string, lang: string, fallback: string): string {
  return guideTranslations[lang]?.[id]?.title || fallback;
}

function getGuideDescription(id: string, lang: string, fallback: string): string {
  return guideTranslations[lang]?.[id]?.description || fallback;
}

export default function GuidesPage() {
  const params = useParams();
  const lang = params?.lang as string || "fr";
  const t = guideListTranslations[lang] || guideListTranslations.en;
  const [activeCategoryState, setActiveCategoryState] = useState(t.categories[0]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredGuides = useMemo(() => {
    let filtered = guides;
    
    if (activeCategoryState !== t.categories[0]) {
      if (activeCategoryState === t.categoryEarly) {
        filtered = filtered.filter((g) => g.stage === "early");
      } else if (activeCategoryState === t.categoryLate) {
        filtered = filtered.filter((g) => g.stage === "late");
      } else if (activeCategoryState === t.categoryClassic) {
        filtered = filtered.filter((g) => g.guideType === "classic");
      } else if (activeCategoryState === t.categoryEvent) {
        filtered = filtered.filter((g) => g.guideType === "event");
      }
    }
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((g) => {
        const title = getGuideTitle(g.id, lang, g.title).toLowerCase();
        const description = getGuideDescription(g.id, lang, g.description).toLowerCase();
        return title.includes(query) || description.includes(query);
      });
    }
    
    const newGuides = filtered.filter((g) => g.isNew);
    const otherGuides = filtered.filter((g) => !g.isNew);
    return [...newGuides, ...otherGuides];
  }, [activeCategoryState, searchQuery, lang, t]);

  return (
    <div style={{ 
      minHeight: "100vh",
      paddingBottom: "60px"
    }}>
      <div style={{
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(139, 92, 246, 0.25)",
        padding: "40px 0 30px"
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 16px" }}>
          <h1 style={{ 
            fontSize: "2.5rem", 
            fontWeight: 800, 
            marginBottom: "8px",
            background: "linear-gradient(135deg, #f472b6, #c084fc, #818cf8)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            📖 {t.title}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1rem" }}>
            {t.subtitle}
          </p>
        </div>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px 16px" }}>
        <AdBanner />

        <div style={{ display: "flex", gap: "8px", marginBottom: "24px", flexWrap: "wrap", alignItems: "center" }}>
          {t.categories.map((cat: string) => {
            return (
            <button
              key={cat}
              onClick={() => setActiveCategoryState(cat)}
              style={{
                padding: "10px 18px",
                borderRadius: "10px",
                border: activeCategoryState === cat
                  ? "1px solid rgba(236, 72, 153, 0.7)"
                  : "1px solid rgba(139, 92, 246, 0.30)",
                background: activeCategoryState === cat
                  ? "linear-gradient(135deg, #ec4899, #a855f7)"
                  : "rgba(139, 92, 246, 0.10)",
                color: activeCategoryState === cat ? "#fff" : "rgba(255,255,255,0.75)",
                cursor: "pointer",
                fontSize: "0.85rem",
                fontWeight: 600,
                transition: "all 0.2s",
                boxShadow: activeCategoryState === cat ? "0 4px 16px rgba(236,72,153,0.35)" : "none",
              }}
            >
              {cat}
            </button>
          )})}
        </div>

        <div style={{ marginBottom: "24px" }}>
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "14px 20px",
              borderRadius: "12px",
              border: "1.5px solid rgba(139, 92, 246, 0.45)",
              background: "rgba(139, 92, 246, 0.08)",
              color: "#fff",
              fontSize: "1rem",
              outline: "none",
            }}
          />
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "16px",
        }}>
          {filteredGuides.map((guide) => (
            <Link
              key={guide.id}
              href={`/${lang}/guides/${guide.id}`}
              style={{
                background: "rgba(20,20,40,0.70)",
                borderRadius: "20px",
                border: `1.5px solid ${guide.color}66`,
                padding: "24px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                position: "relative",
                overflow: "hidden",
                textDecoration: "none",
                display: "block",
                boxShadow: `0 2px 16px ${guide.color}18`,
                filter: guide.inProgress ? "grayscale(0.45)" : "none",
              }}
              onMouseEnter={(e) => {
                if (!guide.inProgress) {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow = `0 20px 40px ${guide.color}22`;
                  e.currentTarget.style.borderColor = guide.color + "66";
                }
              }}
              onMouseLeave={(e) => {
                if (!guide.inProgress) {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = `0 2px 16px ${guide.color}18`;
                  e.currentTarget.style.borderColor = `${guide.color}55`;
                }
              }}
            >
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                background: `linear-gradient(90deg, ${guide.color}, ${guide.color}88)`,
              }} />

              {guide.thumbnail && (
                <div style={{
                  height: "120px",
                  borderRadius: "12px",
                  overflow: "hidden",
                  marginBottom: "16px",
                  position: "relative",
                }}>
                  <Image
                    src={guide.thumbnail}
                    alt={guide.title}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              )}

              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "56px",
                height: "56px",
                borderRadius: "16px",
                background: `${guide.color}22`,
                fontSize: "1.75rem",
                marginBottom: "16px",
              }}>
                {guide.icon}
              </div>

              <h3 style={{ color: "#fff", fontSize: "1.1rem", fontWeight: 700, marginBottom: "8px" }}>
                {getGuideTitle(guide.id, lang, guide.title)}
              </h3>

              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.85rem", lineHeight: 1.6, marginBottom: "16px" }}>
                {getGuideDescription(guide.id, lang, guide.description)}
              </p>

              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {guide.isNew && (
                  <span style={{
                    padding: "4px 10px",
                    borderRadius: "8px",
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    background: "linear-gradient(135deg, #ef4444, #f97316)",
                    color: "#fff",
                  }}>
                    {t.new || "Nouveau"}
                  </span>
                )}
                {guide.inProgress && (
                  <span style={{
                    padding: "4px 10px",
                    borderRadius: "8px",
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    background: "rgba(251, 191, 36, 0.35)",
                    color: "#fbbf24",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}>
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#fbbf24", animation: "pulse 1.5s infinite" }} />
                    {t.inProgress || "En cours"}
                  </span>
                )}
                <span style={{
                  padding: "4px 10px",
                  borderRadius: "8px",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  background: `${guide.color}40`,
                  color: "#fff",
                  border: `1px solid ${guide.color}66`,
                }}>
                  {guide.category}
                </span>
                <span style={{
                  padding: "4px 10px",
                  borderRadius: "8px",
                  fontSize: "0.7rem",
                  background: "rgba(255,255,255,0.12)",
                  color: "rgba(255,255,255,0.65)",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}>
                  {guide.readTime}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
