"use client";


import Link from "next/link";
import { AdBanner } from "@/components/AdSense";
import { useEffect, useState, type ReactNode } from "react";
import guidesData from "@/lib/data/guides.json";
import artistsData from "@/lib/data/artists.json";

const guideTranslations: Record<string, any> = {
   fr: { notFound: "Guide non trouvé", backToGuides: "← Retour aux guides", otherGuides: "Autres guides", tips: "Conseils", rewards: "Récompenses", explanation: "Explication", artistDatabaseTitle: "Base de Données Artistes", artistDatabaseDesc: "Découvrez tous les artistes", tierListTitle: "Tier List", tierListDesc: "Classement des meilleurs artistes", relatedGuides: "Guides liés", relatedArtists: "Artistes liés", glossary: "Glossaire du guide", noRelatedGuides: "Aucun guide lié", noRelatedArtists: "Aucun artiste lié" },
   en: { notFound: "Guide not found", backToGuides: "← Back to Guides", otherGuides: "Other Guides", tips: "Tips", rewards: "Rewards", explanation: "Explanation", artistDatabaseTitle: "Artist Database", artistDatabaseDesc: "Discover all artists", tierListTitle: "Tier List", tierListDesc: "Best artists ranking", relatedGuides: "Related guides", relatedArtists: "Related artists", glossary: "Guide glossary", noRelatedGuides: "No related guides", noRelatedArtists: "No related artists" },
   it: { notFound: "Guida non trovata", backToGuides: "← Torna alle guide", otherGuides: "Altre guide", tips: "Consigli", rewards: "Ricompense", explanation: "Spiegazione", artistDatabaseTitle: "Database Artisti", artistDatabaseDesc: "Scopri tutti gli artisti", tierListTitle: "Tier List", tierListDesc: "Classifica dei migliori artisti", relatedGuides: "Guide correlate", relatedArtists: "Artisti correlati", glossary: "Glossario della guida", noRelatedGuides: "Nessuna guida correlata", noRelatedArtists: "Nessun artista correlato" },
   es: { notFound: "Guía no encontrada", backToGuides: "← Volver a las guías", otherGuides: "Otras guías", tips: "Consejos", rewards: "Recompensas", explanation: "Explicación", artistDatabaseTitle: "Base de Datos de Artistas", artistDatabaseDesc: "Descubre todos los artistas", tierListTitle: "Tier List", tierListDesc: "Ranking de los mejores artistas", relatedGuides: "Guías relacionadas", relatedArtists: "Artistas relacionados", glossary: "Glosario del guía", noRelatedGuides: "No hay guías relacionadas", noRelatedArtists: "No hay artistas relacionados" },
   pt: { notFound: "Guia não encontrado", backToGuides: "← Voltar aos guias", otherGuides: "Outros guias", tips: "Dicas", rewards: "Recompensas", explanation: "Explicação", artistDatabaseTitle: "Base de Artistas", artistDatabaseDesc: "Descubra todas as artistas", tierListTitle: "Tier List", tierListDesc: "Ranking das melhores artistas", relatedGuides: "Guias relacionados", relatedArtists: "Artistas relacionados", glossary: "Glossário do guia", noRelatedGuides: "Sem guias relacionados", noRelatedArtists: "Sem artistas relacionados" },
   pl: { notFound: "Poradnik nie znaleziony", backToGuides: "← Wróć do poradników", otherGuides: "Inne poradniki", tips: "Wskazówki", rewards: "Nagrody", explanation: "Wyjaśnienie", artistDatabaseTitle: "Baza Artystów", artistDatabaseDesc: "Poznaj wszystkich artystów", tierListTitle: "Tier List", tierListDesc: "Ranking najlepszych artystów", relatedGuides: "Powiązane poradniki", relatedArtists: "Powiązani artyści", glossary: "Słownik poradnika", noRelatedGuides: "Brak powiązanych poradników", noRelatedArtists: "Brak powiązanych artystów" },
   id: { notFound: "Panduan tidak ditemukan", backToGuides: "← Kembali ke panduan", otherGuides: "Panduan lain", tips: "Tips", rewards: "Hadiah", explanation: "Penjelasan", artistDatabaseTitle: "Database Artis", artistDatabaseDesc: "Lihat semua artis", tierListTitle: "Tier List", tierListDesc: "Peringkat artis terbaik", relatedGuides: "Panduan terkait", relatedArtists: "Artis terkait", glossary: "Glosarium panduan", noRelatedGuides: "Tidak ada panduan terkait", noRelatedArtists: "Tidak ada artis terkait" },
   ru: { notFound: "Гайд не найден", backToGuides: "← Вернуться к гайдам", otherGuides: "Другие гайды", tips: "Советы", rewards: "Награды", explanation: "Объяснение", artistDatabaseTitle: "База артистов", artistDatabaseDesc: "Все артисты", tierListTitle: "Tier List", tierListDesc: "Рейтинг лучших артистов", relatedGuides: "Связанные гайды", relatedArtists: "Связанные артисты", glossary: "Глоссарий гайда", noRelatedGuides: "Нет связанных гайдов", noRelatedArtists: "Нет связанных артистов" },
   de: { notFound: "Leitfaden nicht gefunden", backToGuides: "← Zurück zu den Leitfäden", otherGuides: "Weitere Leitfäden", tips: "Tipps", rewards: "Belohnungen", explanation: "Erklärung", artistDatabaseTitle: "Künstlerdatenbank", artistDatabaseDesc: "Entdecke alle Künstler", tierListTitle: "Tier Liste", tierListDesc: "Beste Künstler Rangliste", relatedGuides: "Verwandte Leitfäden", relatedArtists: "Verwandte Künstler", glossary: "Leitfaden-Glossar", noRelatedGuides: "Keine verwandten Leitfäden", noRelatedArtists: "Keine verwandten Künstler" },
};

type Guide = {
  id: string;
  title: string;
  title_en?: string;
  title_it?: string;
  title_es?: string;
  title_pt?: string;
  title_pl?: string;
  title_id?: string;
  title_ru?: string;
  title_de?: string;
  description: string;
  description_en?: string;
  description_it?: string;
  description_es?: string;
  description_pt?: string;
  description_pl?: string;
  description_id?: string;
  description_ru?: string;
  description_de?: string;
  icon: string;
  color: string;
  category: string;
  category_en?: string;
  category_it?: string;
  category_es?: string;
  category_pt?: string;
  category_pl?: string;
  category_id?: string;
  category_ru?: string;
  category_de?: string;
  readTime: string;
  content?: string;
  content_en?: string;
  content_it?: string;
  content_es?: string;
  content_pt?: string;
  content_pl?: string;
  content_id?: string;
  content_ru?: string;
  content_de?: string;
  tips?: string;
  tips_en?: string;
  tips_it?: string;
  tips_es?: string;
  tips_pt?: string;
  tips_pl?: string;
  tips_id?: string;
  tips_ru?: string;
  tips_de?: string;
  rewards?: string;
  rewards_en?: string;
  rewards_it?: string;
  rewards_es?: string;
  rewards_pt?: string;
  rewards_pl?: string;
  rewards_id?: string;
  rewards_ru?: string;
  rewards_de?: string;
  guideType?: "classic" | "event" | "special";
  stage?: "early" | "mid" | "late" | null;
  difficulty?: "beginner" | "intermediate" | "advanced" | null;
  relatedGuides?: string[];
  relatedArtists?: string[];
};

const guides: Guide[] = [
  {
    id: "structure-du-jeu",
    title: "Structure du jeu",
    title_en: "Game Structure",
    title_it: "Struttura del gioco",
    title_es: "Estructura del juego",
    title_pt: "Estrutura do jogo",
    title_pl: "Struktura gry",
    title_id: "Struktur permainan",
    title_ru: "Структура игры",
    title_de: "Spielstruktur",
    description: "Comprendre la structure du jeu Top Girl. Serveur d'origine, cycles Abroad, City Supremacy et boucle principale.",
    description_en: "Understand the structure of Top Girl game. Home server, Abroad cycles, City Supremacy and main loop.",
    description_it: "Comprendi la struttura del gioco Top Girl. Server home, cicli Abroad, City Supremacy e ciclo principale.",
    description_es: "Comprende la estructura del juego Top Girl. Servidor local, ciclos Abroad, City Supremacy y ciclo principal.",
    description_pt: "Compreenda a estrutura do jogo Top Girl. Servidor principal, ciclos Abroad, City Supremacy e ciclo principal.",
    description_pl: "Zrozum strukturę gry Top Girl. Serwer główny, cykle Abroad, City Supremacy i główna pętla.",
    description_id: "Pahami struktur permainan Top Girl. Server utama, siklus Abroad, City Supremacy dan loop utama.",
    description_ru: "Понять структуру игры Top Girl. Родной сервер, циклы Abroad, City Supremacy и основной цикл.",
    description_de: "Verstehe die Struktur des Top Girl Spiels. Heimat-Server, Abroad-Zyklen, City Supremacy und Hauptschleife.",
    icon: "📊",
    color: "#8b5cf6",
    category: "Débutant",
    category_en: "Beginner",
    category_it: "Principiante",
    category_es: "Principiante",
    category_pt: "Iniciante",
    category_pl: "Początkujący",
    category_id: "Pemula",
    category_ru: "Начинающий",
    category_de: "Anfänger",
    readTime: "10 min",
    content: `
## Guide : Comprendre la structure du jeu Top Girl

### Explication courte
Top Girl suit une progression en plusieurs phases.
Le jeu commence sur un serveur d'origine, où ton groupe évolue pendant les premières semaines. Ensuite, le jeu alterne entre des phases sur le serveur d'origine, des événements comme City Supremacy et Top CEO, et des cycles Abroad comme Tokyo, Bali et Roma.
Comprendre ce cycle est important pour bien préparer son groupe et planifier ses ressources.

### Explication longue

#### 1. Le début du jeu : le serveur d'origine
La première grande phase du jeu dure environ 4 semaines.

Pendant les 3 premières semaines, tu commences sur un nouveau serveur situé dans la zone extérieure. Cette phase sert presque de tutoriel, mais elle reste très importante.
Ton groupe doit recruter, progresser, et avancer vers le centre de la carte pour essayer de conquérir le Burj Khalifa et obtenir le titre de Maire.

À la fin de cette phase, ce serveur devient ton serveur d'origine.
C'est le serveur auquel ton compte reste lié pour la suite du jeu, sauf en cas de migration.

#### 2. La transition après le début
À la fin de la troisième semaine, ton serveur doit attendre d'autres serveurs, ou rejoindre d'autres serveurs déjà prêts.
Pendant cette période, il y a un événement d'environ 1 semaine appelé City Supremacy.

City Supremacy est une phase de type SvS entre 2 ou 3 serveurs.

#### 3. Tokyo Warmup puis Tokyo
Après cette transition, le jeu entre dans le premier cycle Abroad.

Ce cycle commence avec Tokyo Warmup, un événement de préparation.
Ensuite commence Tokyo, qui dure environ 3 semaines.

Tokyo se déroule sur une autre carte.
Ton serveur d'origine ne disparaît pas. Tu peux passer entre les deux grâce aux Passports.

Sur Tokyo, on retrouve une logique proche du début du jeu :
- progression sur une carte
- affrontement entre serveurs
- conquête de zones
- objectif final autour de la Tokyo Tower

Les serveurs sont répartis en chambers de chaque côté de la carte.
Le but est donc de progresser avec son groupe dans un cadre Serveur contre Serveur.

#### 4. Retour sur le serveur d'origine
Après Tokyo, on retourne sur le serveur d'origine.

Cette phase peut durer plus ou moins longtemps.
Le jeu semble attendre qu'une pool de serveurs soit assez remplie avant de lancer la suite.
D'après tes infos, cette attente peut durer :
- parfois 1 semaine
- parfois jusqu'à 5 ou 6 semaines

Pendant cette période, le jeu alterne surtout entre :
- City Supremacy
- Top CEO

Le nombre exact de serveurs nécessaires n'est pas encore totally clair, mais tu estimes qu'il faut environ 40 à 50 serveurs.

#### 5. La boucle principale du jeu
Une fois assez de serveurs réunis, le jeu entre dans une boucle plus stable.

Cette boucle suit ce modèle :
- Bali Warmup
- Bali
- City Supremacy ou Top CEO
- Roma Warmup
- Roma
- Top CEO ou City Supremacy

Ensuite, la boucle recommence avec :
- Tokyo Warmup
- Tokyo
- City Supremacy ou Top CEO
- Bali Warmup
- Bali
- Top CEO ou City Supremacy
- Roma Warmup
- Roma
- Top CEO ou City Supremacy
- Puis à nouveau Tokyo Warmup.

#### 6. La notion de "Abroad"
On peut utiliser Abroad comme terme global pour désigner :
- Tokyo
- Bali
- Roma

Ces trois grandes phases suivent le même principe :
1. Une semaine de Warmup
2. Puis 3 semaines d'événement principal
3. Sur une autre carte
4. Avec logique de confrontation entre serveurs

Quand un cycle revient, on peut le numéroter :
- Tokyo 2, Bali 2, Roma 2
- Puis : Tokyo 3, etc.

#### 7. Les stats importantes à connaître
Top Girl repose aussi sur 3 stats principales :
- Sing = Chant
- Defense = lié à la Danse
- Economy = lié au Management
`,
    content_en: `
## Guide: Understanding Top Girl Game Structure

### Short Explanation
Top Girl follows a multi-phase progression.
The game starts on a home server, where your group evolves during the first few weeks. Then the game alternates between phases on the home server, events like City Supremacy and Top CEO, and Abroad cycles like Tokyo, Bali, and Roma.
Understanding this cycle is important to properly prepare your group and plan your resources.

### Long Explanation

#### 1. Game Start: The Home Server
The first major phase lasts about 4 weeks.

During the first 3 weeks, you start on a new server in the outer area. This phase serves almost as a tutorial, but it remains very important.
Your group must recruit, progress, and move toward the center of the map to try to conquer the Burj Khalifa and get the Mayor title.

At the end of this phase, this server becomes your home server.
This is the server your account remains linked to for the rest of the game, unless you migrate.

#### 2. Transition After Start
At the end of the third week, your server must wait for other servers, or join other servers already ready.
During this period, there's an event of about 1 week called City Supremacy.

City Supremacy is a SvS phase between 2 or 3 servers.

#### 3. Tokyo Warmup Then Tokyo
After this transition, the game enters the first Abroad cycle.

This cycle starts with Tokyo Warmup, a preparation event.
Then Tokyo begins, lasting about 3 weeks.

Tokyo takes place on another map.
Your home server doesn't disappear. You can travel between the two using Passports.

On Tokyo, you find a logic similar to the game start:
- progression on a map
- server vs server confrontation
- zone conquest
- final objective around the Tokyo Tower

Servers are divided into chambers on each side of the map.
The goal is to progress with your group in a Server vs Server framework.

#### 4. Return to Home Server
After Tokyo, you return to the home server.

This phase can last more or less time.
The game seems to wait until a pool of servers is filled enough before launching the next part.
According to your info, this wait can last:
- sometimes 1 week
- sometimes up to 5 or 6 weeks

During this period, the game mainly alternates between:
- City Supremacy
- Top CEO

The exact number of servers needed is not yet totally clear, but you estimate about 40 to 50 servers.

#### 5. Main Game Loop
Once enough servers are gathered, the game enters a more stable loop.

This loop follows this model:
- Bali Warmup
- Bali
- City Supremacy or Top CEO
- Roma Warmup
- Roma
- Top CEO or City Supremacy

Then the loop restarts with:
- Tokyo Warmup
- Tokyo
- City Supremacy or Top CEO
- Bali Warmup
- Bali
- Top CEO or City Supremacy
- Roma Warmup
- Roma
- Top CEO or City Supremacy
- Then Tokyo Warmup again.

#### 6. The "Abroad" Concept
You can use Abroad as an umbrella term to designate:
- Tokyo
- Bali
- Roma

These three major phases follow the same principle:
1. One week of Warmup
2. Then 3 weeks of main event
3. On another map
4. With server vs server confrontation logic

When a cycle returns, you can number it:
- Tokyo 2, Bali 2, Roma 2
- Then: Tokyo 3, etc.

#### 7. Important Stats to Know
Top Girl also relies on 3 main stats:
- Sing = Singing
- Defense = linked to Dance
- Economy = linked to Management
`,
    content_it: `
## Guida: Comprendere la Struttura del Gioco Top Girl

### Spiegazione Breve
Top Girl segue una progressione multifase.
Il gioco inizia su un server home, dove il tuo gruppo evolve durante le prime settimane. Poi il gioco alterna tra fasi sul server home, eventi come City Supremacy e Top CEO, e cicli Abroad come Tokyo, Bali e Roma.
Comprendere questo ciclo è importante per preparare bene il tuo gruppo e pianificare le tue risorse.

### Spiegazione Dettagliata

#### 1. Inizio del Gioco: Il Server Home
La prima grande fase dura circa 4 settimane.

Durante le prime 3 settimane, inizi su un nuovo server nell'area esterna. Questa fase serve quasi da tutorial, ma rimane molto importante.
Il tuo gruppo deve reclutare, progredire e avanzare verso il centro della mappa per cercare di conquistare il Burj Khalifa e ottenere il titolo di Sindaco.

Alla fine di questa fase, questo server diventa il tuo server home.
Questo è il server a cui il tuo account rimane legato per il resto del gioco, a meno che tu non migri.

#### 2. Transizione Dopo l'Inizio
Alla fine della terza settimana, il tuo server deve aspettare altri server, o unirsi ad altri server già pronti.
Durante questo periodo, c'è un evento di circa 1 settimana chiamato City Supremacy.

City Supremacy è una fase di tipo SvS tra 2 o 3 server.

#### 3. Tokyo Warmup Poi Tokyo
Dopo questa transizione, il gioco entra nel primo ciclo Abroad.

Questo ciclo inizia con Tokyo Warmup, un evento di preparazione.
Poi inizia Tokyo, che dura circa 3 settimane.

Tokyo si svolge su un'altra mappa.
Il tuo server home non scompare. Puoi viaggiare tra i due usando i Passports.

Su Tokyo, trovi una logica simile all'inizio del gioco:
- progressione su una mappa
- confronto tra server
- conquista di zone
- obiettivo finale intorno alla Tokyo Tower

I server sono divisi in chamber su ogni lato della mappa.
L'obiettivo è quindi progredire con il tuo gruppo in un quadro Server contro Server.

#### 4. Ritorno al Server Home
Dopo Tokyo, ritorni al server home.

Questa fase può durare più o meno tempo.
Il gioco sembra aspettare che un pool di server sia abbastanza pieno prima di lanciare la parte successiva.
Secondo le tue info, questa attesa può durare:
- a volte 1 settimana
- a volte fino a 5 o 6 settimane

Durante questo periodo, il gioco alterna principalmente tra:
- City Supremacy
- Top CEO

Il numero esatto di server necessari non è ancora del tutto chiaro, ma stimi circa 40-50 server.

#### 5. Loop Principale del Gioco
Una volta riuniti abbastanza server, il gioco entra in un loop più stabile.

Questo loop segue questo modello:
- Bali Warmup
- Bali
- City Supremacy o Top CEO
- Roma Warmup
- Roma
- Top CEO o City Supremacy

Poi il loop ricomincia con:
- Tokyo Warmup
- Tokyo
- City Supremacy o Top CEO
- Bali Warmup
- Bali
- Top CEO o City Supremacy
- Roma Warmup
- Roma
- Top CEO o City Supremacy
- Poi Tokyo Warmup di nuovo.

#### 6. Il Concetto di "Abroad"
Puoi usare Abroad come termine ombrello per indicare:
- Tokyo
- Bali
- Roma

Queste tre fasi principali seguono lo stesso principio:
1. Una settimana di Warmup
2. Poi 3 settimane di evento principale
3. Su un'altra mappa
4. Con logica di confronto tra server

Quando un ciclo ritorna, puoi numerarlo:
- Tokyo 2, Bali 2, Roma 2
- Poi: Tokyo 3, ecc.

#### 7. Statistiche Importanti da Conoscere
Top Girl si basa anche su 3 statistiche principali:
- Sing = Canto
- Defense = legato alla Danza
- Economy = legato alla Gestione
`,
    content_es: `
## Guía: Comprender la Estructura del Juego Top Girl

### Explicación Corta
Top Girl sigue una progresión multifase.
El juego comienza en un servidor local, donde tu grupo evoluciona durante las primeras semanas. Luego el juego alterna entre fases en el servidor local, eventos como City Supremacy y Top CEO, y ciclos Abroad como Tokyo, Bali y Roma.
Comprender este ciclo es importante para preparar bien tu grupo y planificar tus recursos.

### Explicación Larga

#### 1. Inicio del Juego: El Servidor Local
La primera gran fase dura aproximadamente 4 semanas.

Durante las primeras 3 semanas, comienzas en un nuevo servidor en la zona exterior. Esta fase sirve casi como tutorial, pero sigue siendo muy importante.
Tu grupo debe reclutar, progresar y avanzar hacia el centro del mapa para intentar conquistar el Burj Khalifa y obtener el título de Alcalde.

Al final de esta fase, este servidor se convierte en tu servidor local.
Este es el servidor al que tu cuenta permanece vinculada para el resto del juego, a menos que migres.

#### 2. Transición Después del Inicio
Al final de la tercera semana, tu servidor debe esperar a otros servidores, o unirse a otros servidores ya listos.
Durante este período, hay un evento de aproximadamente 1 semana llamado City Supremacy.

City Supremacy es una fase de tipo SvS entre 2 o 3 servidores.

#### 3. Tokyo Warmup Luego Tokyo
Después de esta transición, el juego entra en el primer ciclo Abroad.

Este ciclo comienza con Tokyo Warmup, un evento de preparación.
Luego comienza Tokyo, que dura aproximadamente 3 semanas.

Tokyo se desarrolla en otro mapa.
Tu servidor local no desaparece. Puedes viajar entre los dos usando Passports.

En Tokyo, encuentras una lógica similar al inicio del juego:
- progresión en un mapa
- confrontación entre servidores
- conquista de zonas
- objetivo final alrededor de la Tokyo Tower

Los servidores se dividen en chambers a cada lado del mapa.
El objetivo es progresar con tu grupo en un marco Servidor contra Servidor.

#### 4. Regreso al Servidor Local
Después de Tokyo, regresas al servidor local.

Esta fase puede durar más o menos tiempo.
El juego parece esperar hasta que un grupo de servidores esté lo suficientemente lleno antes de lanzar la siguiente parte.
Según tus datos, esta espera puede durar:
- a veces 1 semana
- a veces hasta 5 o 6 semanas

Durante este período, el juego alterna principalmente entre:
- City Supremacy
- Top CEO

El número exacto de servidores necesarios aún no está totalmente claro, pero estimas que se necesitan aproximadamente 40-50 servidores.

#### 5. Bucle Principal del Juego
Una vez que se reúnen suficientes servidores, el juego entra en un bucle más estable.

Este bucle sigue este modelo:
- Bali Warmup
- Bali
- City Supremacy o Top CEO
- Roma Warmup
- Roma
- Top CEO o City Supremacy

Luego el bucle comienza de nuevo con:
- Tokyo Warmup
- Tokyo
- City Supremacy o Top CEO
- Bali Warmup
- Bali
- Top CEO o City Supremacy
- Roma Warmup
- Roma
- Top CEO o City Supremacy
- Luego Tokyo Warmup de nuevo.

#### 6. El Concepto de "Abroad"
Puedes usar Abroad como término general para designar:
- Tokyo
- Bali
- Roma

Estas tres fases principales siguen el mismo principio:
1. Una semana de Warmup
2. Luego 3 semanas de evento principal
3. En otro mapa
4. Con lógica de confrontación entre servidores

Cuando un ciclo vuelve, puedes numerarlo:
- Tokyo 2, Bali 2, Roma 2
- Luego: Tokyo 3, etc.

#### 7. Estadísticas Importantes a Conocer
Top Girl también se basa en 3 estadísticas principales:
- Sing = Canto
- Defense = ligado a la Danza
- Economy = ligado a la Gestión
`,
    content_pt: `
## Guia: Compreendendo a Estrutura do Jogo Top Girl

### Explicação Curta
Top Girl segue uma progressão em múltiplas fases.
O jogo começa em um servidor local, onde seu grupo evolui durante as primeiras semanas. Então o jogo alterna entre fases no servidor local, eventos como City Supremacy e Top CEO, e ciclos Abroad como Tokyo, Bali e Roma.
Compreender este ciclo é importante para preparar bem seu grupo e planejar seus recursos.

### Explicação Longa

#### 1. Início do Jogo: O Servidor Local
A primeira grande fase dura cerca de 4 semanas.

Durante as primeiras 3 semanas, você começa em um novo servidor na área externa. Esta fase serve quase como um tutorial, mas permanece muito importante.
Seu grupo deve recrutar, progredir e avançar em direção ao centro do mapa para tentar conquistar o Burj Khalifa e obter o título de Prefeito.

No final desta fase, este servidor se torna seu servidor local.
Este é o servidor ao qual sua conta permanece vinculada pelo resto do jogo, a menos que você migre.

#### 2. Transição Após o Início
No final da terceira semana, seu servidor deve esperar outros servidores ou juntar-se a outros servidores já prontos.
Durante este período, há um evento de cerca de 1 semana chamado City Supremacy.

City Supremacy é uma fase do tipo SvS entre 2 ou 3 servidores.

#### 3. Tokyo Warmup Depois Tokyo
Após esta transição, o jogo entra no primeiro ciclo Abroad.

Este ciclo começa com Tokyo Warmup, um evento de preparação.
Então Tokyo começa, durando cerca de 3 semanas.

Tokyo acontece em outro mapa.
Seu servidor local não desaparece. Você pode viajar entre os dois usando Passports.

Em Tokyo, você encontra uma lógica próxima ao início do jogo:
- progressão em um mapa
- confronto entre servidores
- conquista de zonas
- objetivo final ao redor da Tokyo Tower

Os servidores são divididos em chambers de cada lado do mapa.
O objetivo é progredir com seu grupo em um quadro Servidor contra Servidor.

#### 4. Retorno ao Servidor Local
Após Tokyo, você retorna ao servidor local.

Esta fase pode durar mais ou menos tempo.
O jogo parece esperar até que um grupo de servidores esteja preenchido o suficiente antes de lançar a próxima parte.
De acordo com suas informações, esta espera pode durar:
- às vezes 1 semana
- às vezes até 5 ou 6 semanas

Durante este período, o jogo alterna principalmente entre:
- City Supremacy
- Top CEO

O número exato de servidores necessários ainda não está totalmente claro, mas você estima cerca de 40-50 servidores.

#### 5. Loop Principal do Jogo
Uma vez que suficientes servidores são reunidos, o jogo entra em um loop mais estável.

Este loop segue este modelo:
- Bali Warmup
- Bali
- City Supremacy ou Top CEO
- Roma Warmup
- Roma
- Top CEO ou City Supremacy

Então o loop recomeça com:
- Tokyo Warmup
- Tokyo
- City Supremacy ou Top CEO
- Bali Warmup
- Bali
- Top CEO ou City Supremacy
- Roma Warmup
- Roma
- Top CEO ou City Supremacy
- Depois Tokyo Warmup novamente.

#### 6. O Conceito de "Abroad"
Você pode usar Abroad como um termo geral para designar:
- Tokyo
- Bali
- Roma

Estas três fases principais seguem o mesmo princípio:
1. Uma semana de Warmup
2. Depois 3 semanas de evento principal
3. Em outro mapa
4. Com lógica de confronto entre servidores

Quando um ciclo retorna, você pode numerá-lo:
- Tokyo 2, Bali 2, Roma 2
- Depois: Tokyo 3, etc.

#### 7. Estatísticas Importantes a Conhecer
Top Girl também depende de 3 estatísticas principais:
- Sing = Canto
- Defense = ligado à Dança
- Economy = ligado à Gestão
`,
    content_pl: `
## Przewodnik: Zrozumienie Struktury Gry Top Girl

### Krótka wyjaśnienie
Top Girl podąża za wielofazową progresją.
Gra zaczyna się na serwerze domowym, gdzie twoja grupa ewoluuje przez pierwsze tygodnie. Następnie gra przełącza się między fazami na serwerze domowym, wydarzeniami takimi jak City Supremacy i Top CEO oraz cyklami Abroad jak Tokyo, Bali i Roma.
Zrozumienie tego cyklu jest ważne, aby odpowiednio przygotować grupę i zaplanować zasoby.

### Długa wyjaśnienie

#### 1. Początek Gry: Serwer Domowy
Pierwsza duża faza trwa około 4 tygodni.

Podczas pierwszych 3 tygodni zaczynasz na nowym serwerze w zewnętrznym obszarze. Ta faza służy prawie jako samouczek, ale pozostaje bardzo ważna.
Twoja grupa musi rekrutować, rozwijać się i zbliżać się do centrum mapy, aby spróbować podbić Burj Khalifa i zdobyć tytuł Prezydenta.

Pod koniec tej fazy, ten serwer staje się twoim serwerem domowym.
To jest serwer, z którym twoje konto pozostaje powiązane przez resztę gry, chyba że przeprowadzisz migrację.

#### 2. Przejście Po Początku
Pod koniec trzeciego tygodnia twój serwer musi czekać na inne serwery lub dołączyć do innych serwerów gotowych.
W tym okresie jest wydarzenie trwające około 1 tygodnia zwane City Supremacy.

City Supremacy to faza typu SvS między 2 lub 3 serwerami.

#### 3. Tokyo Warmup Następnie Tokyo
Po tym przejściu gra wchodzi w pierwszy cykl Abroad.

Ten cykl zaczyna się od Tokyo Warmup, wydarzenia przygotowawczego.
Następnie zaczyna się Tokyo, trwające około 3 tygodni.

Tokyo odbywa się na innej mapie.
Twój serwer domowy nie znika. Możesz podróżować między nimi za pomocą Paszportów.

W Tokyo znajdujesz logikę podobną do początku gry:
- postęp na mapie
- konfrontacja między serwerami
- podbój stref
- końcowy cel wokół Tokyo Tower

Serwery są podzielone na chambers po obu stronach mapy.
Celem jest postęp z grupą w ramach Serwer kontra Serwer.

#### 4. Powrót do Serwera Domowego
Po Tokyo wracasz do serwera domowego.

Ta faza może trwać dłużej lub krócej.
Gra wydaje się czekać, aż pula serwerów będzie wystarczająco wypełniona, zanim uruchomi następną część.
Według twoich informacji, to oczekiwanie może trwać:
- czasami 1 tydzień
- czasami do 5 lub 6 tygodni

W tym okresie gra głównie przełącza się między:
- City Supremacy
- Top CEO

Dokładna liczba potrzebnych serwerów nie jest jeszcze całkiem jasna, ale szacujesz, że potrzeba około 40-50 serwerów.

#### 5. Główna Pętla Gry
Gdy zebrze się wystarczająco dużo serwerów, gra wchodzi w bardziej stabilną pętlę.

Ta pętla podąża za tym modelem:
- Bali Warmup
- Bali
- City Supremacy lub Top CEO
- Roma Warmup
- Roma
- Top CEO lub City Supremacy

Następnie pętla zaczyna się od nowa:
- Tokyo Warmup
- Tokyo
- City Supremacy lub Top CEO
- Bali Warmup
- Bali
- Top CEO lub City Supremacy
- Roma Warmup
- Roma
- Top CEO lub City Supremacy
- Następnie Tokyo Warmup ponownie.

#### 6. Pojęcie "Abroad"
Możesz używać Abroad jako ogólnego terminu do oznaczenia:
- Tokyo
- Bali
- Roma

Te trzy główne fazy podążają za tym samym zasadą:
1. Tydzień Warmup
2. Następnie 3 tygodnie głównego wydarzenia
3. Na innej mapie
4. Z logiką konfrontacji między serwerami

Gdy cykl wraca, możesz go ponumerować:
- Tokyo 2, Bali 2, Roma 2
- Następnie: Tokyo 3, itd.

#### 7. Ważne Statystyki do Poznania
Top Girl opiera się również na 3 głównych statystykach:
- Sing = Śpiew
- Defense = związany z Tańcem
- Economy = związany z Zarządzaniem
`,
    content_id: `
## Panduan: Memahami Struktur Permainan Top Girl

### Penjelasan Singkat
Top Girl mengikuti progresi multi-fase.
Permainan dimulai di server rumah, di mana grup Anda berkembang selama beberapa minggu pertama. Kemudian permainan bergantian antara fase di server rumah, acara seperti City Supremacy dan Top CEO, dan siklus Abroad seperti Tokyo, Bali, dan Roma.
Memahami siklus ini penting untuk mempersiapkan grup Anda dengan baik dan merencanakan sumber daya Anda.

### Penjelasan Panjang

#### 1. Awal Permainan: Server Rumah
Fase utama pertama berlangsung sekitar 4 minggu.

Selama 3 minggu pertama, Anda memulai di server baru di area luar. Fase ini berfungsi hampir seperti tutorial, tetapi tetap sangat penting.
Grup Anda harus merekrut, berkembang, dan maju menuju pusat peta untuk mencoba menaklukkan Burj Khalifa dan mendapatkan gelar Wali Kota.

Pada akhir fase ini, server ini menjadi server rumah Anda.
Ini adalah server yang terhubung dengan akun Anda untuk sisa permainan, kecuali Anda bermigrasi.

#### 2. Transisi Setelah Awal
Di akhir minggu ketiga, server Anda harus menunggu server lain, atau bergabung dengan server lain yang sudah siap.
Selama periode ini, ada acara sekitar 1 minggu yang disebut City Supremacy.

City Supremacy adalah fase tipe SvS antara 2 atau 3 server.

#### 3. Tokyo Warmup Kemudian Tokyo
Setelah transisi ini, permainan memasuki siklus Abroad pertama.

Siklus ini dimulai dengan Tokyo Warmup, acara persiapan.
Lalu Tokyo dimulai, berlangsung sekitar 3 minggu.

Tokyo berlangsung di peta lain.
Server rumah Anda tidak menghilang. Anda dapat bepergian di antara keduanya menggunakan Passport.

Di Tokyo, Anda menemukan logika serupa dengan awal permainan:
- progresi di peta
- konfrontasi antar server
- penaklukan zona
- tujuan akhir di sekitar Tokyo Tower

Server dibagi menjadi chambers di setiap sisi peta.
Tujuannya adalah untuk berkembang dengan grup Anda dalam kerangka Server vs Server.

#### 4. Kembali ke Server Rumah
Setelah Tokyo, Anda kembali ke server rumah.

Fase ini bisa bertahan lebih atau kurang lama.
Permainan tampaknya menunggu sampai kumpulan server cukup terisi sebelum memulai bagian selanjutnya.
Menurut info Anda, menunggu ini bisa bertahan:
- kadang 1 minggu
- kadang sampai 5 atau 6 minggu

Selama periode ini, permainan terutama bergantian antara:
- City Supremacy
- Top CEO

Jumlah tepat server yang diperlukan belum sepenuhnya jelas, tetapi Anda memperkirakan sekitar 40-50 server.

#### 5. Loop Utama Permainan
Setelah cukup banyak server berkumpul, permainan memasuki loop yang lebih stabil.

Loop ini mengikuti model ini:
- Bali Warmup
- Bali
- City Supremacy atau Top CEO
- Roma Warmup
- Roma
- Top CEO atau City Supremacy

Lalu loop dimulai ulang dengan:
- Tokyo Warmup
- Tokyo
- City Supremacy atau Top CEO
- Bali Warmup
- Bali
- Top CEO atau City Supremacy
- Roma Warmup
- Roma
- Top CEO atau City Supremacy
- Kemudian Tokyo Warmup lagi.

#### 6. Konsep "Abroad"
Anda dapat menggunakan Abroad sebagai istilah umum untuk menunjukkan:
- Tokyo
- Bali
- Roma

Tiga fase utama ini mengikuti prinsip yang sama:
1. Seminggu Warmup
2. Kemudian 3 minggu acara utama
3. Di peta lain
4. Dengan logika konfrontasi antar server

Ketika siklus kembali, Anda dapat menomornya:
- Tokyo 2, Bali 2, Roma 2
- Kemudian: Tokyo 3, dll.

#### 7. Statistik Penting yang Perlu Diketahui
Top Girl juga bergantung pada 3 statistik utama:
- Sing = Nyanyian
- Defense = Terkait dengan Tari
- Economy = Terkait dengan Manajemen
`,
    content_de: `
## Leitfaden: Die Spielstruktur von Top Girl verstehen

### Kurze Erklärung
Top Girl folgt einer Mehrphasen-Progression.
Das Spiel beginnt auf einem Heimat-Server, wo deine Gruppe während der ersten Wochen agiert. Dann wechselt das Spiel zwischen Phasen auf dem Heimat-Server, Ereignissen wie City Supremacy und Top CEO, und Abroad-Zyklen wie Tokyo, Bali und Roma.
Das Verständnis dieses Zyklus ist wichtig, um deine Gruppe richtig vorzubereiten und deine Ressourcen zu planen.

### Lange Erklärung

#### 1. Spielstart: Der Heimat-Server
Die erste große Phase dauert etwa 4 Wochen.

Während der ersten 3 Wochen startest du auf einem neuen Server im äußeren Bereich. Diese Phase dient fast als Tutorial, bleibt aber sehr wichtig.
Deine Gruppe muss rekrutieren, Fortschritte machen und sich zur Mitte der Karte bewegen, um zu versuchen, das Burj Khalifa zu erobern und den Titel des Bürgermeisters zu erhalten.

Am Ende dieser Phase wird dieser Server zu deinem Heimat-Server.
Dies ist der Server, mit dem dein Konto für den Rest des Spiels verbunden bleibt, es sei denn, du migrierst.

#### 2. Übergang nach dem Start
Am Ende der dritten Woche muss dein Server auf andere Server warten oder sich anderen Servern anschließen, die bereits bereit sind.
Während dieser Zeit gibt es ein etwa einwöchiges Ereignis namens City Supremacy.

City Supremacy ist eine SvS-Phase zwischen 2 oder 3 Servern.

#### 3. Tokyo Warmup dann Tokyo
Nach diesem Übergang betritt das Spiel den ersten Abroad-Zyklus.

Dieser Zyklus beginnt mit Tokyo Warmup, einem Vorbereitungsereignis.
Dann beginnt Tokyo, das etwa 3 Wochen dauert.

Tokyo findet auf einer anderen Karte statt.
Dein Heimat-Server verschwindet nicht. Du kannst mit Passports zwischen beiden reisen.

Auf Tokyo findest du eine Logik ähnlich zum Spielstart:
- Fortschritt auf einer Karte
- Konfrontation zwischen Servern
- Eroberung von Zonen
- finales Ziel rund um den Tokyo Tower

Server sind in Kammern auf jeder Seite der Karte aufgeteilt.
Das Ziel ist es also, mit deiner Gruppe in einem Server-gegen-Server-Rahmen voranzukommen.

#### 4. Rückkehr zum Heimat-Server
Nach Tokyo kehrst du zum Heimat-Server zurück.

Diese Phase kann mehr oder weniger Zeit dauern.
Das Spiel scheint zu warten, bis ein Pool von Servern ausreichend gefüllt ist, bevor der nächste Teil gestartet wird.
Laut deinen Informationen kann dieses Warten dauern:
- manchmal 1 Woche
- manchmal bis zu 5 oder 6 Wochen

Während dieser Zeit wechselt das Spiel hauptsächlich zwischen:
- City Supremacy
- Top CEO

Die genaue Anzahl der benötigten Server ist noch nicht ganz klar, aber du schätzt etwa 40 bis 50 Server.

#### 5. Die Hauptspielschleife
Sobald genügend Server zusammengekommen sind, tritt das Spiel in eine stabilere Schleife ein.

Diese Schleife folgt diesem Modell:
- Bali Warmup
- Bali
- City Supremacy oder Top CEO
- Roma Warmup
- Roma
- Top CEO oder City Supremacy

Dann startet die Schleife neu mit:
- Tokyo Warmup
- Tokyo
- City Supremacy oder Top CEO
- Bali Warmup
- Bali
- Top CEO oder City Supremacy
- Roma Warmup
- Roma
- Top CEO oder City Supremacy
- Dann wieder Tokyo Warmup.

#### 6. Das "Abroad"-Konzept
Du kannst Abroad als Sammelbegriff verwenden für:
- Tokyo
- Bali
- Roma

Diese drei großen Phasen folgen dem gleichen Prinzip:
1. Eine Woche Warmup
2. Dann 3 Wochen des Hauptereignisses
3. Auf einer anderen Karte
4. Mit Server-gegen-Server-Konfrontationslogik

Wenn ein Zyklus zurückkommt, kannst du ihn nummerieren:
- Tokyo 2, Bali 2, Roma 2
- Dann: Tokyo 3, usw.

#### 7. Wichtige Stats
Top Girl basiert auch auf 3 Haupt-Stats:
- Sing = Gesang
- Tanz = Verteidigung
- Management = Wirtschaft
`,
    content_ru: `
## Гайд: Понимание Структуры Игры Top Girl

### Краткое объяснение
Top Girl следует многофазному прогрессу.
Игра начинается на домашнем сервере, где ваша группа развивается в первые недели. Затем игра чередуется между фазами на домашнем сервере, такими событиями как City Supremacy и Top CEO, и циклами Abroad как Tokyo, Bali и Roma.
Понимание этого цикла важно для правильной подготовки группы и планирования ресурсов.

### Подробное Объяснение

#### 1. Начало Игры: Домашний Сервер
Первый большой этап длится около 4 недель.

В течение первых 3 недель вы начинаете на новом сервере во внешней зоне. Этот этап служит почти как обучение, но остается очень важным.
Ваша группа должна набирать, развиваться и продвигаться к центру карты, чтобы попытаться завоевать Бурдж-Халифа и получить титул Мэра.

В конце этого этапа этот сервер становится вашим домашним сервером.
Это сервер, с которым ваш аккаунт остается связанным до конца игры, если вы не мигрируете.

#### 2. Переход После Начала
В конце третьей недели ваш сервер должен ждать другие серверы или присоединяться к другим готовым серверам.
В этот период проходит событие продолжительностью около 1 недели под названием City Supremacy.

City Supremacy - это фаза типа SvS между 2 или 3 серверами.

#### 3. Tokyo Warmup Затем Tokyo
После этого перехода игра входит в первый цикл Abroad.

Этот цикл начинается с Tokyo Warmup, события подготовки.
Затем начинается Tokyo, который длится около 3 недель.

Tokyo проходит на другой карте.
Ваш домашний сервер не исчезает. Вы можете перемещаться между ними с помощью Passport.

На Tokyo вы находите логику, аналогичную началу игры:
- продвижение по карте
- противостояние между серверами
- завоевание зон
- финальная цель вокруг Tokyo Tower

Серверы разделены на chambers по обеим сторонам карты.
Цель состоит в том, чтобы продвигаться с вашей группой в рамках Сервер против Сервера.

#### 4. Возвращение на Домашний Сервер
После Tokyo вы возвращаетесь на домашний сервер.

Этот этап может длиться больше или меньше времени.
Игра, кажется, ждет, пока пул серверов не будет достаточно заполнен, прежде чем запустить следующую часть.
По вашим данным, это ожидание может длиться:
- иногда 1 неделю
- иногда до 5 или 6 недель

В этот период игра в основном чередуется между:
- City Supremacy
- Top CEO

Точное количество необходимых серверов пока не до конца ясно, но вы оцениваете примерно в 40-50 серверов.

#### 5. Основной Цикл Игры
Когда собирается достаточно серверов, игра входит в более стабильный цикл.

Этот цикл следует этой модели:
- Bali Warmup
- Bali
- City Supremacy или Top CEO
- Roma Warmup
- Roma
- Top CEO или City Supremacy

Затем цикл начинается заново:
- Tokyo Warmup
- Tokyo
- City Supremacy или Top CEO
- Bali Warmup
- Bali
- Top CEO или City Supremacy
- Roma Warmup
- Roma
- Top CEO или City Supremacy
- Затем снова Tokyo Warmup.

#### 6. Понятие "Abroad"
Вы можете использовать Abroad как общий термин для обозначения:
- Tokyo
- Bali
- Roma

Эти три основные фазы следуют тому же принципу:
1. Одна неделя Warmup
2. Затем 3 недели основного события
3. На другой карте
4. С логикой противостояния между серверами

Когда цикл возвращается, вы можете пронумеровать его:
- Tokyo 2, Bali 2, Roma 2
- Затем: Tokyo 3 и т.д.

#### 7. Важные Статы
Top Girl также основывается на 3 основных статах:
- Sing = Пение
- Defense = связано с Танцем
- Economy = связано с Менеджментом
`,
    tips: `
- Comprendre le cycle global du jeu aide à mieux planifier tes ressources
- Le jeu est fortement centré sur le groupe. Jouer seul limite beaucoup la progression
- Le serveur d'origine reste la base de ton compte pendant longtemps
- Les phases Abroad comme Tokyo, Bali et Roma ne remplacent pas ton serveur d'origine. Elles s'ajoutent à lui
- Garde des ressources pour les périodes de Warmup, car elles servent souvent à préparer l'événement principal
- Il faut apprendre à distinguer les périodes de : progression locale, affrontement entre serveurs, préparation des futurs cycles
- Ne pense pas seulement au présent. Il faut aussi préparer le prochain Abroad, le prochain City Supremacy, ou le prochain Top CEO
    `,
    tips_en: `
- Understanding the global game cycle helps you better plan your resources
- The game is heavily group-focused. Playing alone greatly limits progression
- The home server remains the base of your account for a long time
- Abroad phases like Tokyo, Bali and Roma don't replace your home server. They add to it
- Save resources for Warmup periods, as they often serve to prepare for the main event
- Learn to distinguish between periods of: local progression, server vs server confrontation, preparing for future cycles
- Don't just think about the present. You also need to prepare for the next Abroad, City Supremacy, or Top CEO
    `,
    tips_it: `
- Comprendere il ciclo globale del gioco ti aiuta a pianificare meglio le tue risorse
- Il gioco è fortemente incentrato sul gruppo. Giocare da soli limita molto la progressione
- Il server home rimane la base del tuo account per molto tempo
- Le fasi Abroad come Tokyo, Bali e Roma non sostituiscono il tuo server home. Si aggiungono a lui
- Risparmia risorse per i periodi di Warmup, poiché spesso servono per preparare l'evento principale
- Impara a distinguere i periodi di: progressione locale, confronto tra server, preparazione per i cicli futuri
- Non pensare solo al presente. Devi anche prepararti per il prossimo Abroad, City Supremacy o Top CEO
    `,
    tips_es: `
- Comprender el ciclo global del juego te ayuda a planificar mejor tus recursos
- El juego está muy centrado en el grupo. Jugar solo limita mucho la progresión
- El servidor local sigue siendo la base de tu cuenta durante mucho tiempo
- Las fases Abroad como Tokyo, Bali y Roma no reemplazan tu servidor local. Se añaden a él
- Ahorra recursos para los períodos de Warmup, ya que a menudo sirven para preparar el evento principal
- Aprende a distinguir los períodos de: progresión local, confrontación entre servidores, preparación para ciclos futuros
- No pienses solo en el presente. También necesitas prepararte para el próximo Abroad, City Supremacy o Top CEO
    `,
    tips_pt: `
- Compreender o ciclo global do jogo ajuda você a planejar melhor seus recursos
- O jogo é fortemente focado em grupo. Jogar sozinho limita muito a progressão
- O servidor local permanece a base da sua conta por muito tempo
- As fases Abroad como Tokyo, Bali e Roma não substituem seu servidor local. Elas se somam a ele
- Economize recursos para períodos de Warmup, pois frequentemente servem para preparar o evento principal
- Aprenda a distinguir os períodos de: progressão local, confronto entre servidores, preparação para ciclos futuros
- Não pense apenas no presente. Você também precisa se preparar para o próximo Abroad, City Supremacy ou Top CEO
    `,
    tips_pl: `
- Zrozumienie globalnego cyklu gry pomaga lepiej planować zasoby
- Gra jest mocno skupiona na grupie. Granie samotnie bardzo ogranicza postęp
- Serwer domowy pozostaje bazą Twojego konta przez długi czas
- Fazy Abroad jak Tokyo, Bali i Roma nie zastępują Twojego serwera domowego. Dodają się do niego
- Oszczędzaj zasoby na okresy Warmup, ponieważ często służą do przygotowania głównego wydarzenia
- Naucz się rozróżniać okresy: lokalnej progresji, konfrontacji między serwerami, przygotowania do przyszłych cykli
- Nie myśl tylko o teraźniejszości. Musisz także przygotować się na następny Abroad, City Supremacy lub Top CEO
    `,
    tips_id: `
- Memahami siklus permainan global membantu Anda merencanakan sumber daya dengan lebih baik
- Permainan sangat fokus pada grup. Bermain sendiri sangat membatasi progresi
- Server rumah tetap menjadi basis akun Anda dalam waktu lama
- Fase Abroad seperti Tokyo, Bali dan Roma tidak menggantikan server rumah Anda. Mereka menambahkannya
- Hemat sumber daya untuk periode Warmup, karena sering berfungsi untuk mempersiapkan acara utama
- Pelajari untuk membedakan periode: progresi lokal, konfrontasi antar server, persiapan untuk siklus masa depan
- Jangan hanya memikirkan saat ini. Anda juga perlu mempersiapkan Abroad, City Supremacy, atau Top CEO berikutnya
    `,
    tips_ru: `
- Понимание глобального цикла игры помогает лучше планировать ресурсы
- Игра сильно ориентирована на группу. Игра в одиночку сильно ограничивает прогресс
- Домашний сервер остается базой вашего аккаунта надолго
- Фазы Abroad как Tokyo, Bali и Roma не заменяют ваш домашний сервер. Они добавляются к нему
- Экономьте ресурсы на периоды Warmup, так как они часто служат для подготовки к главному событию
- Научитесь различать периоды: локального прогресса, противостояния между серверами, подготовки к будущим циклам
- Думайте не только о настоящем. Вам также нужно подготовиться к следующему Abroad, City Supremacy или Top CEO
    `,
    tips_de: `
- Das Verständnis des globalen Spielyzyklus hilft dir, deine Ressourcen besser zu planen
- Das Spiel ist stark gruppenorientiert. Alleine spielen begrenzt den Fortschritt stark
- Der Heimat-Server bleibt die Basis deines Kontos für lange Zeit
- Abroad-Phasen wie Tokyo, Bali und Roma ersetzen deinen Heimat-Server nicht. Sie ergänzen ihn
- Spare Ressourcen für Warmup-Phasen, da sie oft dazu dienen, sich auf das Hauptereignis vorzubereiten
- Lerne zwischen Zeiträumen zu unterscheiden: lokaler Fortschritt, Server-gegen-Server-Konfrontation, Vorbereitung auf zukünftige Zyklen
- Denke nicht nur an die Gegenwart. Du musst dich auch auf das nächste Abroad, City Supremacy oder Top CEO vorbereiten
    `,
  },
  {
    id: "equipment",
    title: "Guide Équipement",
    title_en: "Equipment Guide",
    title_it: "Guida Equipaggiamento",
    title_es: "Guía de Equipamiento",
    title_pt: "Guia de Equipamento",
    title_pl: "Poradnik Wyposażenia",
    title_id: "Panduan Peralatan",
    title_ru: "Гайд по снаряжению",
    title_de: "Ausrüstungs-Leitfaden",
    description: "Bijoux, Voitures et Propriétés pour optimiser vos statistiques. Comparaison Gold vs Purple et priorités d'achat.",
    description_en: "Jewelry, Cars and Properties to optimize your stats. Gold vs Purple comparison and purchase priorities.",
    description_it: "Gioielli, Auto e Proprietà per ottimizzare le tue statistiche. Confronto Gold vs Purple e priorità d'acquisto.",
    description_es: "Joyas, Coches y Propiedades para optimizar tus estadísticas. Comparación Gold vs Purple y prioridades de compra.",
    description_pt: "Joias, Carros e Imóveis para otimizar suas estatísticas. Comparação Gold vs Purple e prioridades de compra.",
    description_pl: "Biżuteria, Samochody i Nieruchomości, aby zoptymalizować statystyki. Porównanie Gold vs Purple i priorytety zakupów.",
    description_id: "Perhiasan, Mobil, dan Properti untuk mengoptimalkan statistik Anda. Perbandingan Gold vs Purple dan prioritas pembelian.",
    description_ru: "Украшения, машины и недвижимость для оптимизации ваших статов. Сравнение Gold vs Purple и приоритеты покупки.",
    description_de: "Schmuck, Autos und Immobilien zur Optimierung deiner Stats. Gold vs Lila Vergleich und Kaufprioritäten.",
    icon: "💍",
    color: "#fbbf24",
    category: "Débutant",
    category_en: "Beginner",
    category_it: "Principiante",
    category_es: "Principiante",
    category_pt: "Iniciante",
    category_pl: "Początkujący",
    category_id: "Pemula",
    category_ru: "Начинающий",
    category_de: "Anfänger",
    readTime: "10 min",
    content: `
## Guide des équipements

### Explication courte
Les équipements, aussi appelés Assets, sont une source majeure de puissance dans Top Girl.
Chaque artiste peut équiper 3 Assets : 1 bijou, 1 voiture et 1 propriété.
Les Assets donnent beaucoup de stats et augmentent aussi la capacité de fans.
Si l'artiste correspond à l'Asset, tu gagnes un bonus de stats de 20%. Exemple : une Roma artist avec des Roma assets.

### Explication longue
Les équipements sont un système central du jeu. Ils servent à renforcer une artiste de manière directe.
Un bon Asset donne beaucoup de stats. Il peut aussi donner un gros gain de fan capacity.
Sur une équipe principale, de bons Assets font une très grande différence.

Chaque artiste a 3 slots :
- 1 bijou
- 1 voiture
- 1 propriété

Le bonus le plus important à connaître est le bonus de correspondance.
Quand une artiste équipe un Asset qui correspond à son origine ou à sa saison, elle gagne +20% de stats sur cet Asset.
Exemple : une artiste Roma avec un Roma Asset.

Cela rend les Assets Abroad encore plus forts sur les artistes qui matchent déjà cette saison.

### Les bijoux
Les bijoux sont la catégorie la plus simple à obtenir au début.

**Bijoux classiques :**
- Assez simples à obtenir
- Disponibles dans le VIP Shop
- Disponibles en récompense de Landmark first occupation
- Disponibles dans le Stock Market Shop

**Bijoux Abroad :**
- Plus difficiles à obtenir
- Disponibles en récompense de Landmark first occupation
- Disponibles dans certains événements de la saison correspondante
- Concernent surtout Tokyo, Bali et Roma

**Auction House :**
- Il n'existe pas de bijou Auction House

### Les voitures
Les voitures sont plus difficiles à obtenir que les bijoux.

**Voitures classiques :**
- Difficulté modérée
- Obtenues dans des récompenses d'événement
- Obtenues dans des event shops
- Disponibles aussi dans le VIP Shop, mais le coût est élevé

**Voitures Abroad :**
- Difficiles à obtenir
- Obtenues dans les récompenses et boutiques d'événement de la saison correspondante
- Assez difficiles à obtenir en free-to-play

**Voitures Auction House :**
- Très difficiles à obtenir
- Une fois par semaine sur le serveur d'origine pour la branche Chant / Sing
- Une fois par semaine dans l'auction des aventures Abroad pour la branche Danse / Defense
- Il n'existe pas de voiture Auction House pour Management / Economy
- Il faut finir premier des enchères

### Les propriétés
Les propriétés suivent presque la même logique que les voitures.

**Propriétés classiques :**
- Similaires aux voitures classiques
- Obtenues via récompenses d'événement et boutiques d'événement
- Pas disponibles dans le VIP Shop

**Propriétés Abroad :**
- Similaires aux voitures Abroad
- En général environ deux fois plus chères
- Donc plus difficiles à obtenir

**Propriétés Auction House :**
- Même logique que pour les voitures Auction House

### Valeur des équipements
En valeur pure, l'ordre général est :
Classique < Abroad < Auction House

La difficulté d'obtention suit la même logique.
Les meilleurs Assets sont aussi les plus rares et les plus chers à construire.

Dans la pratique :
- Les Assets classiques sont la base
- Les Assets Abroad sont meilleurs
- Les Assets Auction House sont les plus puissants
- Un Asset Abroad devient encore plus intéressant sur une artiste qui le match
`,
    content_en: `
## Equipment Guide

### Short Explanation
Equipment, also called Assets, is a major source of power in Top Girl.
Each artist can equip 3 Assets: 1 jewelry, 1 car and 1 property.
Assets give a lot of stats and also increase fan capacity.
If the artist matches the Asset, you get a +20% stats bonus. Example: a Roma artist with Roma assets.

### Long Explanation
Equipment is a core system in the game. It serves to reinforce an artist directly.
A good Asset gives a lot of stats. It can also give a big fan capacity gain.
On a main team, good Assets make a very big difference.

Each artist has 3 slots:
- 1 jewelry
- 1 car
- 1 property

The most important bonus to know is the matching bonus.
When an artist equips an Asset that matches their origin or season, they get +20% stats on that Asset.
Example: a Roma artist with a Roma Asset.

This makes Abroad Assets even stronger on artists who already match that season.

### Jewelry
Jewelry is the easiest category to get at the start.

**Classic Jewelry:**
- Fairly simple to obtain
- Available in the VIP Shop
- Available as Landmark first occupation rewards
- Available in the Stock Market Shop

**Abroad Jewelry:**
- Harder to obtain
- Available as Landmark first occupation rewards
- Available in certain events of the corresponding season
- Mainly concerns Tokyo, Bali and Roma

**Auction House:**
- No jewelry Auction House exists

### Cars
Cars are harder to obtain than jewelry.

**Classic Cars:**
- Moderate difficulty
- Obtained from event rewards
- Obtained from event shops
- Also available in VIP Shop, but cost is high

**Abroad Cars:**
- Hard to obtain
- Obtained from event rewards and shops of the corresponding season
- Quite hard to obtain for free-to-play

**Auction House Cars:**
- Very hard to obtain
- Once per week on home server for Sing/ Chant branch
- Once per week in Abroad adventures auction for Dance/ Defense branch
- No Auction House car exists for Management/ Economy
- Must finish first in auction

### Properties
Properties follow almost the same logic as cars.

**Classic Properties:**
- Similar to classic cars
- Obtained via event rewards and event shops
- Not available in VIP Shop

**Abroad Properties:**
- Similar to Abroad cars
- Generally about twice as expensive
- Therefore harder to obtain

**Auction House Properties:**
- Same logic as Auction House cars

### Equipment Value
In pure value, the general order is:
Classic < Abroad < Auction House

Difficulty of obtaining follows the same logic.
The best Assets are also the rarest and most expensive to build.

In practice:
- Classic Assets are the base
- Abroad Assets are better
- Auction House Assets are the most powerful
- An Abroad Asset becomes even more interesting on an artist who matches it
`,
    content_it: `
## Guida agli Equipaggiamenti

### Breve Spiegazione
L'equipaggiamento, chiamato anche Assets, è una fonte maggiore di potenza in Top Girl.
Ogni artista può equipaggiare 3 Assets: 1 gioiello, 1 auto e 1 proprietà.
Gli Assets danno molte statistiche e aumentano anche la capacità di fan.
Se l'artista corrisponde all'Asset, ottieni un bonus di statistiche del 20%. Esempio: un artista Roma con assets Roma.

### Spiegazione Dettagliata
L'equipaggiamento è un sistema centrale nel gioco. Serve a rafforzare un'artista in modo diretto.
Un buon Asset dà molte statistiche. Può anche dare un grande guadagno di capacità fan.
Su una squadra principale, buoni Assets fanno una grande differenza.

Ogni artista ha 3 slot:
- 1 gioiello
- 1 auto
- 1 proprietà

Il bonus più importante da conoscere è il bonus di corrispondenza.
Quando un'artista equipaggia un Asset che corrisponde alla sua origine o stagione, ottiene +20% di statistiche su quell'Asset.
Esempio: un'artista Roma con un Asset Roma.

Questo rende gli Assets Abroad ancora più forti sugli artisti che corrispondono già a quella stagione.

### Gioielli
I gioielli sono la categoria più semplice da ottenere all'inizio.

**Gioielli Classici:**
- Abbastanza semplici da ottenere
- Disponibili nel VIP Shop
- Disponibili come ricompensa per la prima occupazione di Landmark
- Disponibili nel Stock Market Shop

**Gioielli Abroad:**
- Più difficili da ottenere
- Disponibili come ricompensa per la prima occupazione di Landmark
- Disponibili in alcuni eventi della stagione corrispondente
- Riguardano principalmente Tokyo, Bali e Roma

**Auction House:**
- Non esistono gioielli Auction House

### Auto
Le auto sono più difficili da ottenere rispetto ai gioielli.

**Auto Classiche:**
- Difficoltà moderata
- Ottenute da ricompense di eventi
- Ottenute da event shop
- Disponibili anche nel VIP Shop, ma il costo è elevato

**Auto Abroad:**
- Difficili da ottenere
- Ottenute dalle ricompense e boutique di eventi della stagione corrispondente
- Abbastanza difficili da ottenere free-to-play

**Auto Auction House:**
- Molto difficili da ottenere
- Una volta a settimana sul server home per il ramo Canto
- Una volta a settimana nell'asta delle avventure Abroad per il ramo Danza
- Non esiste auto Auction House per Management
- Bisogna finire primi all'asta

### Proprietà
Le proprietà seguono quasi la stessa logica delle auto.

**Proprietà Classiche:**
- Simili alle auto classiche
- Ottenute tramite ricompense di eventi e boutique di eventi
- Non disponibili nel VIP Shop

**Proprietà Abroad:**
- Simili alle auto Abroad
- In generale circa due volte più costose
- Quindi più difficili da ottenere

**Proprietà Auction House:**
- Stessa logica delle auto Auction House
`,
    content_es: `
## Guía de Equipamiento

### Explicación Corta
El equipamiento, también llamado Assets, es una fuente importante de poder en Top Girl.
Cada artista puede equipar 3 Assets: 1 joya, 1 coche y 1 propiedad.
Los Assets dan muchas stats y también aumentan la capacidad de fans.
Si el artista coincide con el Asset, ganas un bono de stats del 20%. Ejemplo: un artista Roma con assets Roma.

### Explicación Larga
El equipamiento es un sistema central del juego. Sirve para reforzar a un artista de manera directa.
Un buen Asset da muchas stats. También puede dar una gran ganancia de capacidad de fans.
En un equipo principal, buenos Assets hacen una gran diferencia.

Cada artista tiene 3 ranuras:
- 1 joya
- 1 coche
- 1 propiedad

El bono más importante conocer es el bono de coincidencia.
Cuando un artista equipa un Asset que corresponde a su origen o temporada, obtiene +20% de stats en ese Asset.
Ejemplo: un artista Roma con un Asset Roma.

Esto hace que los Assets Abroad sean aún más fuertes en artistas que ya coinciden con esa temporada.

### Joyas
Las joyas son la categoría más fácil de obtener al principio.

**Joyas Clásicas:**
- Bastante simples de obtener
- Disponibles en la VIP Shop
- Disponibles como recompensa por primera ocupación de Landmark
- Disponibles en la Stock Market Shop

**Joyas Abroad:**
- Más difíciles de obtener
- Disponibles como recompensa por primera ocupación de Landmark
- Disponibles en ciertos eventos de la temporada correspondiente
- Principalmente relacionadas con Tokyo, Bali y Roma

**Auction House:**
- No existen joyas de Auction House

### Coches
Los coches son más difíciles de obtener que las joyas.

**Coches Clásicos:**
- Dificultad moderada
- Obtenidos de recompensas de eventos
- Obtenidos de tiendas de eventos
- Disponibles también en la VIP Shop, pero el costo es alto

**Coches Abroad:**
- Difíciles de obtener
- Obtenidos de recompensas y tiendas de eventos de la temporada correspondiente
- Bastante difíciles de obtener free-to-play

**Coches Auction House:**
- Muy difíciles de obtener
- Una vez por semana en el servidor local para la rama Canto
- Una vez por semana en la subasta de aventuras Abroad para la rama Danza
- No existe coche de Auction House para Gestión
- Hay que terminar primero en la subasta

### Propiedades
Las propiedades siguen casi la misma lógica que los coches.

**Propiedades Clásicas:**
- Similares a los coches clásicos
- Obtenidas a través de recompensas de eventos y tiendas de eventos
- No disponibles en la VIP Shop

**Propiedades Abroad:**
- Similares a los coches Abroad
- Generalmente alrededor de dos veces más caras
- Por lo tanto más difíciles de obtener

**Propiedades Auction House:**
- Misma lógica que los coches Auction House
`,
    content_pt: `
## Guia de Equipamento

### Explicação Curta
O equipamento, também chamado de Assets, é uma fonte importante de poder no Top Girl.
Cada artista pode equipar 3 Assets: 1 joia, 1 carro e 1 propriedade.
Os Assets dão muitas stats e também aumentam a capacidade de fãs.
Se o artista corresponde ao Asset, você ganha um bônus de stats de 20%. Exemplo: um artista Roma com assets Roma.

### Explicação Longa
O equipamento é um sistema central no jogo. Serve para reforçar um artista de forma direta.
Um bom Asset dá muitas stats. Também pode dar uma grande ganho de capacidade de fãs.
Em uma equipe principal, bons Assets fazem uma grande diferença.

Cada artista tem 3 slots:
- 1 joia
- 1 carro
- 1 propriedade

O bônus mais importante conhecer é o bônus de correspondência.
Quando um artista equipa um Asset que corresponde à sua origem ou temporada, ele ganha +20% de stats nesse Asset.
Exemplo: um artista Roma com um Asset Roma.

Isso torna os Assets Abroad ainda mais fortes em artistas que já correspondem a essa estação.

### Joias
As joias são a categoria mais fácil de obter no início.

**Joias Clássicas:**
- Bastante simples de obter
- Disponíveis na VIP Shop
- Disponíveis como recompensa de primeira ocupação de Landmark
- Disponíveis na Stock Market Shop

**Joias Abroad:**
- Mais difíceis de obter
- Disponíveis como recompensa de primeira ocupação de Landmark correspondentes
- Relacionadas principalmente com Tokyo, Bali e Roma

**Auction House:**
- Não existem joias de Auction House

### Carros
Carros são mais difíceis de obter do que joias.

**Carros Clássicos:**
- Dificuldade moderada
- Obtidos de recompensas de eventos
- Obtidos de lojas de eventos
- Também disponíveis na VIP Shop, mas o custo é alto

**Carros Abroad:**
- Difíceis de obter
- Obtidos de recompensas e lojas de eventos da temporada correspondente
- Bastante difíceis de obter para free-to-play

**Carros Auction House:**
- Muito difíceis de obter
- Uma vez por semana no servidor local para o ramo Canto
- Uma vez por semana no leilão de aventuras Abroad para o ramo Dança
- Não existe carro de Auction House para Gestão
- É preciso terminar em primeiro no leilão

### Propriedades
Propriedades seguem quase a mesma lógica que os carros.

**Propriedades Clássicas:**
- Similares aos carros clássicos
- Obtidas via recompensas de eventos e lojas de eventos
- Não disponíveis na VIP Shop

**Propriedades Abroad:**
- Similares aos carros Abroad
- Geralmente cerca de duas vezes mais caras
- Portanto mais difíceis de obter

**Propriedades Auction House:**
- Mesma lógica que os carros Auction House
`,
    content_pl: `
## Poradnik Wyposażenia

### Krótkie Wyjaśnienie
Wyposażenie, zwane również Assets, jest głównym źródłem mocy w Top Girl.
Każdy artysta może wyposażyć 3 Assets: 1 biżuterię, 1 samochód i 1 nieruchomość.
Assets dają dużo statystyk i również zwiększają pojemność fanów.
Jeśli artysta odpowiada Assetowi, otrzymujesz bonus statystyk 20%. Przykład: artysta Roma z assets Roma.

### Długie Wyjaśnienie
Wyposażenie jest centralnym systemem w grze. Służy do bezpośredniego wzmacniania artysty.
Dobry Asset daje dużo statystyk. Może też dać duży zysk pojemności fanów.
Na głównym zespole dobre Assets robią bardzo dużą różnicę.

Każdy artysta ma 3 sloty:
- 1 biżuteria
- 1 samochód
- 1 nieruchomość

Najważniejszy bonus do poznania to bonus dopasowania.
Gdy artysta wyposaża Asset odpowiadający jego pochodzeniu lub sezonowi, otrzymuje +20% statystyk na tym Assetcie.
Przykład: artysta Roma z Assetem Roma.

To sprawia, że Assets Abroad są jeszcze silniejsze na artystach, którzy już pasują do tego sezonu.

### Biżuteria
Biżuteria jest najłatwiejszą kategorią do zdobycia na początku.

**Klasyczna Biżuteria:**
- Dość łatwa do zdobycia
- Dostępna w VIP Shop
- Dostępna jako nagroda za pierwsze zajęcie Landmark
- Dostępna w Stock Market Shop

**Biżuteria Abroad:**
- Trudniejsza do zdobycia
- Dostępna jako nagroda za pierwsze zajęcie Landmark
- Dostępna w niektórych wydarzeniach odpowiedniego sezonu
- Głównie dotyczy Tokyo, Bali i Roma

**Auction House:**
- Nie istnieje biżuteria Auction House

### Samochody
Samochody są trudniejsze do zdobycia niż biżuteria.

**Klasyczne Samochody:**
- Umiarkowana trudność
- Zdobywane z nagród wydarzeń
- Zdobywane ze sklepów wydarzeń
- Dostępne również w VIP Shop, ale koszt jest wysoki

**Samochody Abroad:**
- Trudne do zdobycia
- Zdobywane z nagród i sklepów wydarzeń odpowiedniego sezonu
- Dość trudne do zdobycia dla free-to-play

**Samochody Auction House:**
- Bardzo trudne do zdobycia
- Raz w tygodniu na serwerze głównym dla gałęzi Śpiew
- Raz w tygodniu w aukcji przygód Abroad dla gałęzi Taniec
- Nie istnieje samochód Auction House dla Zarządzania
- Trzeba wygrać aukcję

### Nieruchomości
Nieruchomości podążają prawie za tą samą logiką co samochody.

**Klasyczne Nieruchomości:**
- Podobne do klasycznych samochodów
- Zdobywane poprzez nagrody wydarzeń i sklepy wydarzeń
- Niedostępne w VIP Shop

**Nieruchomości Abroad:**
- Podobne do samochodów Abroad
- Generalnie około dwa razy droższe
- Dlatego trudniejsze do zdobycia

**Nieruchomości Auction House:**
- Ta sama logika co samochody Auction House
`,
    content_de: `
## Ausrüstungs-Leitfaden

### Kurze Erklärung
Ausrüstung, auch Assets genannt, ist eine wichtige Kraftquelle in Top Girl.
Jede Künstlerin kann 3 Assets ausrüsten: 1 Schmuck, 1 Auto und 1 Immobilie.
Assets geben viele Stats und erhöhen auch die Fan-Kapazität.
Wenn die Künstlerin zum Asset passt, erhältst du einen Stats-Bonus von 20%. Beispiel: Eine Roma-Künstlerin mit Roma-Assets.

### Lange Erklärung
Ausrüstung ist ein zentrales System im Spiel. Sie dient zur direkten Verstärkung einer Künstlerin.
Ein gutes Asset gibt viele Stats. Es kann auch einen großen Fan-Kapazitätsgewinn geben.
Auf einem Hauptteam machen gute Assets einen sehr großen Unterschied.

Jede Künstlerin hat 3 Slots:
- 1 Schmuck
- 1 Auto
- 1 Immobilie

Der wichtigste Bonus zum Kennenlernen ist der Matching-Bonus.
Wenn eine Künstlerin ein Asset ausrüstet, das zu ihrer Herkunft oder Saison passt, erhält sie +20% Stats auf dieses Asset.
Beispiel: Eine Roma-Künstlerin mit einem Roma-Asset.

Dies macht Abroad-Assets noch stärker bei Künstlerinnen, die bereits zu dieser Saison passen.

### Schmuck
Schmuck ist die einfachste Kategorie am Anfang zu erhalten.

**Klassischer Schmuck:**
- Ziemlich einfach zu erhalten
- Verfügbar im VIP Shop
- Verfügbar als Belohnung für erste Landmark-Besetzung
- Verfügbar im Stock Market Shop

**Abroad Schmuck:**
- Schwieriger zu erhalten
- Verfügbar als Belohnung für erste Landmark-Besetzung
- Verfügbar in bestimmten Events der entsprechenden Saison
- Betrifft hauptsächlich Tokyo, Bali und Roma

**Auction House:**
- Es gibt keinen Auction House Schmuck

### Autos
Autos sind schwieriger zu erhalten als Schmuck.

**Klassische Autos:**
- Mäßige Schwierigkeit
- Erhalten aus Event-Belohnungen
- Erhalten aus Event-Shops
- Auch im VIP Shop verfügbar, aber die Kosten sind hoch

**Abroad Autos:**
- Schwer zu erhalten
- Erhalten aus Belohnungen und Shops des entsprechenden Events
- Ziemlich schwer für Free-to-Play zu erhalten

**Auction House Autos:**
- Sehr schwer zu erhalten
- Einmal pro Woche auf dem Heimat-Server für den Gesang/ Sing-Zweig
- Einmal pro Woche in der Abroad-Abenteuer-Auktion für den Tanz/ Defense-Zweig
- Es gibt kein Auction House Auto für Management/ Economy
- Du musst die Auktion gewinnen

### Immobilien
Immobilien folgen fast der gleichen Logik wie Autos.

**Klassische Immobilien:**
- Ähnlich wie klassische Autos
- Erhalten durch Event-Belohnungen und Event-Shops
- Nicht im VIP Shop verfügbar

**Abroad Immobilien:**
- Ähnlich wie Abroad-Autos
- Generell etwa doppelt so teuer
- Daher schwieriger zu erhalten

**Auction House Immobilien:**
- Gleiche Logik wie Auction House Autos
`,
    content_id: `
## Panduan Peralatan

### Penjelasan Singkat
Peralatan, juga disebut Assets, adalah sumber kekuatan utama di Top Girl.
Setiap seniman dapat melengkapi 3 Assets: 1 perhiasan, 1 mobil dan 1 properti.
Assets memberikan banyak statistik dan juga meningkatkan kapasitas penggemar.
Jika seniman sesuai dengan Asset, Anda mendapatkan bonus statistik 20%. Contoh: seniman Roma dengan assets Roma.

### Penjelasan Panjang
Peralatan adalah sistem inti dalam permainan. Berfungsi untuk memperkuat seniman secara langsung.
Asset yang bagus memberikan banyak statistik. Dapat juga memberikan peningkatan kapasitas penggemar yang besar.
Di tim utama, Assets yang bagus membuat perbedaan yang sangat besar.

Setiap seniman memiliki 3 slot:
- 1 perhiasan
- 1 mobil
- 1 properti

Bonus paling penting untuk diketahui adalah bonus kecocokan.
Ketika seniman melengkapi Asset yang sesuai dengan asal atau musimnya, ia mendapatkan +20% statistik pada Asset tersebut.
Contoh: seniman Roma dengan Asset Roma.

Ini membuat Assets Abroad menjadi lebih kuat pada seniman yang sudah cocok dengan musim tersebut.

### Perhiasan
Perhiasan adalah kategori termudah untuk diperoleh di awal.

**Perhiasan Klasik:**
- Cukup mudah diperoleh
- Tersedia di VIP Shop
- Tersedia sebagai hadiah untuk pendudukan Landmark pertama
- Tersedia di Stock Market Shop

**Perhiasan Abroad:**
- Lebih sulit diperoleh
- Tersedia sebagai hadiah untuk pendudukan Landmark pertama
- Tersedia di beberapa peristiwa musim yang sesuai
- Terutama menyangkut Tokyo, Bali dan Roma

**Auction House:**
- Tidak ada perhiasan Auction House

### Mobil
Mobil lebih sulit diperoleh daripada perhiasan.

**Mobil Klasik:**
- Kesulitan sedang
- Diperoleh dari hadiah peristiwa
- Diperoleh dari toko peristiwa
- Tersedia juga di VIP Shop, tapi biayanya tinggi

**Mobil Abroad:**
- Sulit diperoleh
- Diperoleh dari hadiah dan toko peristiwa musim yang sesuai
- Cukup sulit diperoleh untuk free-to-play

**Mobil Auction House:**
- Sangat sulit diperoleh
- Sekali seminggu di server rumah untuk cabang Nyanyian
- Sekali seminggu di lelang petualangan Abroad untuk cabang Tari
- Tidak ada mobil Auction House untuk Manajemen
- Harus finis pertama di lelang

### Properti
Properti mengikuti hampir logika yang sama dengan mobil.

**Properti Klasik:**
- Mirip dengan mobil klasik
- Diperoleh melalui hadiah peristiwa dan toko peristiwa
- Tidak tersedia di VIP Shop

**Properti Abroad:**
- Mirip dengan mobil Abroad
- Umumnya sekitar dua kali lebih mahal
- Oleh karena itu lebih sulit diperoleh

**Properti Auction House:**
- Logika yang sama dengan mobil Auction House
`,
    content_ru: `
## Гайд по Снаряжению

### Краткое объяснение
Снаряжение, также называемое Assets, является основным источником силы в Top Girl.
Каждый артист может экипировать 3 Assets: 1 украшение, 1 машину и 1 недвижимость.
Assets дают много статов и также увеличивают вместимость фанатов.
Если артист соответствует Assetу, вы получаете бонус статов 20%. Пример: артист Roma с assets Roma.

### Подробное объяснение
Снаряжение - это центральная система в игре. Служит для прямого усиления артиста.
Хороший Asset дает много статов. Также может дать большой прирост вместимости фанатов.
На основной команде хорошие Assets имеют очень большое значение.

У каждого артиста 3 слота:
- 1 украшение
- 1 машина
- 1 недвижимость

Важнейший бонус для знания - это бонус соответствия.
Когда артист экипирует Asset, соответствующий его происхождению или сезону, он получает +20% статов на этот Asset.
Пример: артист Roma с Assetом Roma.

Это делает Assets Abroad еще более сильными на артистах, которые уже соответствуют этому сезону.

### Украшения
Украшения - самая простая категория для получения в начале.

**Классические украшения:**
- Довольно простые в получении
- Доступны в VIP Shop
- Доступны как награда за первое занятие Landmark
- Доступны в Stock Market Shop

**Украшения Abroad:**
- Сложнее получить
- Доступны как награда за первое занятие Landmark
- Доступны в определенных событиях соответствующего сезона
- В основном касаются Tokyo, Bali и Roma

**Auction House:**
- Не существует украшений Auction House

### Машины
Машины сложнее получить, чем украшения.

**Классические машины:**
- Умеренная сложность
- Получаются из наград событий
- Получаются из магазинов событий
- Также доступны в VIP Shop, но стоимость высока

**Машины Abroad:**
- Сложно получить
- Получаются из наград и магазинов событий соответствующего сезона
- Достаточно сложно получить для free-to-play

**Машины Auction House:**
- Очень сложно получить
- Раз в неделю на домашнем сервере для ветки Пения
- Раз в неделю в аукционе приключений Abroad для ветки Танца
- Не существует машины Auction House для Менеджмента
- Нужно выиграть аукцион

### Недвижимость
Недвижимость следует почти той же логике, что и машины.

**Классическая Недвижимость:**
- Подобна классическим машинам
- Получается через награды событий и магазины событий
- Не доступна в VIP Shop

**Недвижимость Abroad:**
- Подобна машинам Abroad
- Обычно примерно в два раза дороже
- Поэтому сложнее получить

**Недвижимость Auction House:**
- Та же логика, что и у машин Auction House
`,
    tips: `
- Concentre tes meilleurs Assets sur ton équipe principale
- Dans la plupart des cas, il vaut mieux construire les 5 bijoux, 5 voitures et 5 propriétés de ton core team avant d'investir ailleurs
- L'exception, c'est si tu es une baleine et que tu peux élargir plus vite
- Choisis bien les Assets que tu veux promote
- Il faut penser à tes besoins réels et à tes futures promotions
- Essaie de maximiser un équipement un par un
- Le but est d'atteindre le niveau maximum pour pouvoir le promote
- La promotion donne un gros boost de stats
- Ne promote jamais un équipement si tu n'es pas sûr
- La promotion est non réversible
- Un équipement promu ne peut plus servir comme matériel de promotion pour un autre
- Évite de dépenser des Asset Coins sur les équipements violets
- Ce n'est presque jamais un bon investissement à long terme
- Le principal intérêt des équipements violets est de les échanger pendant l'événement Tipsy Date
    `,
    tips_en: `
- Concentrate your best Assets on your main team
- In most cases, it's better to build the 5 jewelry, 5 cars and 5 properties of your core team before investing elsewhere
- The exception is if you're a whale and can expand faster
- Choose the Assets you want to promote wisely
- Think about your real needs and future promotions
- Try to maximize one equipment at a time
- The goal is to reach the maximum level to be able to promote it
- Promotion gives a big stats boost
- Never promote an equipment if you're not sure
- Promotion is irreversible
- A promoted equipment can no longer serve as promotion material for another
- Avoid spending Asset Coins on purple equipment
- It's almost never a good long-term investment
- The main interest of purple equipment is to exchange them during the Tipsy Date event
    `,
    tips_it: `
- Concentra i tuoi migliori Assets sulla tua squadra principale
- Nella maggior parte dei casi, è meglio costruire i 5 gioielli, 5 auto e 5 proprietà del tuo team principale prima di investire altrove
- L'eccezione sei tu che puoi espanderti più velocemente
- Scegli bene gli Asset che vuoi promuovere
- Devi pensare alle tue esigenze reali e alle tue promozioni future
- Prova a massimizzare un equipaggiamento alla volta
- L'obiettivo è raggiungere il livello massimo per poterlo promuovere
- La promozione dà un grande boost di statistiche
- Non promuovere mai un equipaggiamento se non sei sicuro
- La promozione è irreversibile
- Un equipaggiamento promosso non può più servire come materiale di promozione per un altro
- Evita di spendere Asset Coins su equipaggiamento viola
- Non è quasi mai un buon investimento a lungo termine
- L'interesse principale dell'equipaggiamento viola è scambiarlo durante l'evento Tipsy Date
    `,
    tips_es: `
- Concentra tus mejores Assets en tu equipo principal
- En la mayoría de los casos, es mejor construir las 5 joyas, 5 coches y 5 propiedades de tu equipo base antes de invertir en otro lugar
- La excepción es si eres una ballena y puedes expandirte más rápido
- Elige bien los Assets que quieres promover
- Piensa en tus necesidades reales y promociones futuras
- Intenta maximizar un equipo a la vez
- El objetivo es alcanzar el nivel máximo para poder promoverlo
- La promoción da un gran impulso de stats
- Nunca promuevas un equipo si no estás seguro
- La promoción es irreversible
- Un equipo promovido ya no puede servir como material de promoción para otro
- Evita gastar Asset Coins en equipo violeta
- Casi nunca es una buena inversión a largo plazo
- El interés principal del equipo violeta es intercambiarlos durante el evento Tipsy Date
    `,
    tips_pt: `
- Concentre seus melhores Assets em sua equipe principal
- Na maioria dos casos, é melhor construir as 5 joias, 5 carros e 5 propriedades de sua equipe principal antes de investir em outro lugar
- A exceção é se você for uma baleia e puder expandir mais rápido
- Escolha bem os Assets que deseja promover
- Pense em suas necessidades reais e promoções futuras
- Tente maximizar um equipamento de cada vez
- O objetivo é atingir o nível máximo para poder promovê-lo
- Promoção dá um grande impulso de stats
- Nunca promova um equipamento se não tiver certeza
- A promoção é irreversível
- Um equipamento promovido não pode mais servir como material de promoção para outro
- Evite gastar Asset Coins em equipamento roxo
- Quase nunca é um bom investimento de longo prazo
- O principal interesse do equipamento roxo é trocá-los durante o evento Tipsy Date
    `,
    tips_pl: `
- Skoncentruj swoje najlepsze Assets na głównej drużynie
- W większości przypadków lepiej jest zbudować 5 biżuterii, 5 samochodów i 5 nieruchomości swojej głównej drużyny przed inwestowaniem gdzie indziej
- Wyjątkiem jest, jeśli jesteś wielorybem i możesz się szybciej rozszerzać
- Wybierz mądrze Assets, które chcesz promować
- Musisz myśleć o swoich rzeczywistych potrzebach i przyszłych promocjach
- Staraj się maksymalizować jeden sprzęt na raz
- Celem jest osiągnięcie maksymalnego poziomu, aby móc go promować
- Promocja daje duży wzrost statystyk
- Nigdy nie promuj sprzętu, jeśli nie jesteś pewien
- Promocja jest nieodwracalność
- Promowany sprzęt nie może już służyć jako materiał promocyjny dla innego
- Unikaj wydawania Asset Coins na fioletowy sprzęt
- To prawie nigdy nie jest dobra inwestycja długoterminowa
- Głównym zainteresowaniem fioletowego sprzętu jest wymiana ich podczas wydarzenia Tipsy Date
    `,
    tips_id: `
- Fokuskan Assets terbaik Anda di tim utama
- Di sebagian besar kasus, lebih baik membangun 5 perhiasan, 5 mobil, dan 5 properti tim inti Anda sebelum berinvestasi di tempat lain
- Pengecualiannya adalah jika Anda adalah paus dan dapat memperluas lebih cepat
- Pilih Assets yang ingin Anda promosikan dengan bijak
- Pikirkan kebutuhan nyata dan promosi masa depan Anda
- Coba maksimalkan satu peralatan pada satu waktu
- Tujuannya adalah mencapai level maksimum untuk dapat mempromikannya
- Promosi memberikan dorongan stats besar
- Jangan pernah promosikan peralatan jika Anda tidak yakin
- Promosi tidak dapat dibatalkan
- Peralatan yang dipromosikan tidak lagi dapat digunakan sebagai bahan promosi untuk yang lain
- Hindari menghabiskan Asset Coins untuk peralatan ungu
- Ini hampir tidak pernah merupakan investasi jangka panjang yang baik
- Minat utama peralatan ungu adalah menukarnya selama acara Tipsy Date
    `,
    tips_ru: `
- Сосредоточьте свои лучшие Assets на основной команде
- В большинстве случаев лучше сначала построить 5 украшений, 5 машин и 5 недвижимостей вашей основной команды
- Исключение - если вы киты и можете расширяться быстрее
- Мудро выбирайте Assets, которые хотите продвигать
- Думайте о своих реальных потребностях и будущих продвижениях
- Старайтесь максимизировать одно снаряжение за раз
- Цель - достичь максимального уровня, чтобы иметь возможность продвигать его
- Продвижение дает большой прирост статов
- Никогда не продвигайте снаряжение, если не уверены
- Продвижение необратимо
- Продвинутое снаряжение больше не может служить материалом для продвижения другого
- Избегайте траты Asset Coins на фиолетовое снаряжение
- Это почти никогда не бывает хорошим долгосрочным вложением
- Основной интерес фиолетового снаряжения - обменять их во время события Tipsy Date
    `,
    tips_de: `
- Konzentriere deine besten Assets auf dein Hauptteam
- In den meisten Fällen ist es besser, die 5 Schmuck, 5 Autos und 5 Immobilien deines Kernteams aufzubauen, bevor du woanders investierst
- Die Ausnahme ist, wenn du ein Wal bist und schneller expandieren kannst
- Wähle sorgfältig die Assets aus, die du fördern möchtest
- Denke an deine realen Bedürfnisse und zukünftige Förderungen
- Versuche, eine Ausrüstung nach der anderen zu maximieren
- Das Ziel ist es, das maximale Level zu erreichen, um sie fördern zu können
- Förderung gibt einen großen Stats-Schub
- Fördere niemals eine Ausrüstung, wenn du dir nicht sicher bist
- Förderung ist nicht umkehrbar
- Eine geförderte Ausrüstung kann nicht mehr als Förderungsmaterial für eine andere verwendet werden
- Vermeide es, Asset Coins für lila Ausrüstung auszugeben
- Es ist fast nie eine gute langfristige Investition
- Das Hauptinteresse an lila Ausrüstung ist, sie während des Tipsy Date-Events einzutauschen
    `,
  },
  {
    id: "team-builder",
    title: "Team Builder",
    title_de: "Team-Builder-Leitfaden",
    description: "Comment construire l'équipe parfaite. Calcul des synergies de genre et bonus d'équipement.",
    description_de: "Wie du das perfekte Team aufbaust. Genresynergie-Berechnung und Ausrüstungsboni.",
    icon: "👥",
    color: "#22d3ee",
    category: "Intermédiaire",
    category_de: "Fortgeschritten",
    readTime: "15 min",
    content: `
## Team Builder - TopGirl

### Composition d'équipe
Une équipe optimale contient 5 artistes avec des rôles bien définis:

1. **Vocalist (Lead)** - Highest stats, genre bonus
2. **Dancer (Support)** - Team buffs
3. **Center** - Balance
4. **Makestar** - Fan generation
5. **Support** - Defense/utility

### Synergies de Genre
Le bonus de genre s'applique quand vous avez 2+ artistes du même genre:

- **Pop + Pop**: +15% Vocal
- **EDM + EDM**: +15% Dance
- **Hip Hop + Hip Hop**: +15% Charm

### Bonus d'Équipement
Les équipements synergisent avec les rôles:
- Jewelry set: +20% main stat
- Vehicle set: +15% secondary stat
- Property set: +10% all stats

### Build Types
**Offensif:** 3 Offense / 1 Defense / 1 Support
**Défensif:** 2 Offense / 3 Defense / 0 Support
**Équilibré:** 2 Offense / 2 Defense / 1 Support
    `,
    content_de: `
## Team-Builder-Leitfaden - TopGirl

### Teamzusammensetzung
Ein optimales Team enthält 5 Künstlerinnen mit klar definierten Rollen:

1. **Vocalist (Lead)** - Höchste Stats, Genre-Bonus
2. **Dancer (Support)** - Team-Buffs
3. **Center** - Balance
4. **Makestar** - Fan-Generierung
5. **Support** - Defense/Utility

### Genresynergien
Der Genre-Bonus gilt, wenn du 2+ Künstlerinnen desselben Genres hast:

- **Pop + Pop**: +15% Vocal
- **EDM + EDM**: +15% Dance
- **Hip Hop + Hip Hop**: +15% Charm

### Ausrüstungsboni
Ausrüstungen synergieren mit den Rollen:
- Schmuck-Set: +20% Haupt-Stat
- Fahrzeug-Set: +15% sekundäre Stat
- Immobilien-Set: +10% alle Stats

### Build-Typen
**Offensiv:** 3 Offense / 1 Defense / 1 Support
**Defensiv:** 2 Offense / 3 Defense / 0 Support
**Ausgewogen:** 2 Offense / 2 Defense / 1 Support
    `
  },
  {
    id: "recommended-teams",
    title: "Équipes Recommandées",
    title_de: "Empfohlene Teams",
    description: "Les meilleures compositions d'équipes UR et SSR. Stratégies offensives, équilibrées et défensives.",
    description_de: "Beste UR und SSR Teamzusammensetzungen. Offensive, ausgewogene und defensive Strategien.",
    icon: "🏆",
    color: "#f472b6",
    category: "Avancé",
    category_de: "Fortgeschritten",
    readTime: "12 min",
    content: `
## Équipes Recommandées - TopGirl

### Top UR Teams

**Team 1 - Hyper Offense:**
- Kokoro (Vocalist)
- Aurora (Dancer)
- Claire (Center)
- Anastasia (Defense)
- Beatrice (Support)

**Team 2 - Balance:**
- Alexandra (Vocalist)
- Elizabeth (Dancer)
- Genevieve (Center)
- Marguerite (Defense)
- Gabriella (Support)

### Top SSR Teams

**Team 1 - Budget Meta:**
- Alice (Vocalist)
- Hestia (Dancer)
- Hikari (Center)
- Eri (Defense)
- Flora (Support)

### Stratégies

**Offensive:** Maximisez les damage dealers
- Focus: Skill Damage + Basic Attack
- Meta: Kokoro, Aurora, Claire

**Défensive:** Focus survival
- Focus: Damage Reduction + HP
- Meta: Anastasia, Genevieve, Marguerite

**Équilibrée:** Mix des deux
- Focus: Stats distribution
- Meta: Elizabeth, Gabriella
    `,
    content_de: `
## Empfohlene Teams - TopGirl

### Top UR Teams

**Team 1 - Hyper Offense:**
- Kokoro (Vocalist)
- Aurora (Dancer)
- Claire (Center)
- Anastasia (Defense)
- Beatrice (Support)

**Team 2 - Balance:**
- Alexandra (Vocalist)
- Elizabeth (Dancer)
- Genevieve (Center)
- Marguerite (Defense)
- Gabriella (Support)

### Top SSR Teams

**Team 1 - Budget Meta:**
- Alice (Vocalist)
- Hestia (Dancer)
- Hikari (Center)
- Eri (Defense)
- Flora (Support)

### Strategien

**Offensiv:** Maximiere die Damage Dealer
- Fokus: Skill Damage + Basic Attack
- Meta: Kokoro, Aurora, Claire

**Defensiv:** Fokus auf Überleben
- Fokus: Damage Reduction + HP
- Meta: Anastasia, Genevieve, Marguerite

**Ausgewogen:** Mix von beiden
- Fokus: Stats-Verteilung
- Meta: Elizabeth, Gabriella
    `
  },
  {
    id: "leveling-ssr",
    title: "Montée en Niveau SSR",
    title_de: "SSR-Leveling-Leitfaden",
    description: "Nombre de cartes nécessaires pour level up vos personnages SSR jusqu'au niveau 115.",
    description_de: "Anzahl der Karten, die benötigt werden, um deine SSR-Charaktere auf Level 115 zu bringen.",
    icon: "📈",
    color: "#34d399",
    category: "Débutant",
    category_de: "Anfänger",
    readTime: "8 min",
    content: `
## Montée en Niveau SSR - TopGirl

### Cartes nécessaires par niveau

| Niveau | Cartes SSR | Total |
|--------|-----------|-------|
| 1-10 | 10 | 10 |
| 10-20 | 20 | 30 |
| 20-40 | 40 | 70 |
| 40-60 | 60 | 130 |
| 60-80 | 80 | 210 |
| 80-100 | 100 | 310 |
| 100-115 | 150 | 460 |

### Tips Level Up
- Utilisez les cartes SSR excédentaires
- Focus sur vos mains first
- Level up pendant les événements x2 XP
- Priorisez les artistes avec haute thérapeutisten

### Coût Gold
Le coût en gold augmente avec le niveau:
- Niv 1-40: ~500,000 Gold
- Niv 40-70: ~2,000,000 Gold  
- Niv 70-100: ~8,000,000 Gold
- Niv 100-115: ~25,000,000 Gold
    `,
    content_de: `
## SSR-Leveling-Leitfaden - TopGirl

### Benötigte Karten pro Level

| Level | SSR-Karten | Gesamt |
|-------|-----------|--------|
| 1-10 | 10 | 10 |
| 10-20 | 20 | 30 |
| 20-40 | 40 | 70 |
| 40-60 | 60 | 130 |
| 60-80 | 80 | 210 |
| 80-100 | 100 | 310 |
| 100-115 | 150 | 460 |

### Level Up Tipps
- Verwende überschüssige SSR-Karten
- Fokussiere dich auf deine Hände zuerst
- Level up während x2 XP-Events
- Priorisiere Künstlerinnen mit hoher Therapeutisten

### Gold-Kosten
Die Gold-Kosten steigen mit dem Level:
- Level 1-40: ~500.000 Gold
- Level 40-70: ~2.000.000 Gold
- Level 70-100: ~8.000.000 Gold
- Level 100-115: ~25.000.000 Gold
    `
  },
  {
    id: "blueprints",
    title: "Guide Blueprints",
    title_de: "Blueprints-Leitfaden",
    description: "Requirements en blueprints par tier (1-21) pour améliorer vos installations. Tier 7-12 Gold.",
    description_de: "Blueprint-Anforderungen nach Stufe (1-21) zur Aufrüstung deiner Einrichtungen.",
    icon: "🛠️",
    color: "#818cf8",
    category: "Intermédiaire",
    category_de: "Fortgeschritten",
    readTime: "10 min",
    content: `
## Guide Blueprints - TopGirl

### Installation Tiers

| Tier | Blueprints | Gold | Effet |
|------|-----------|------|-------|
| 1-3 | 50-100 | 10K | +5% stats |
| 4-6 | 150-300 | 50K | +10% stats |
| 7-9 | 500-800 | 200K | +15% stats |
| 10-12 | 1000-1500 | 500K | +20% stats |
| 13-15 | 2000-3000 | 1M | +25% stats |
| 16-18 | 4000-5000 | 3M | +30% stats |
| 19-21 | 7000+ | 10M | +35% stats |

### Priorités
1. **Studio** - Production de songs
2. **Training** - Level up artists
3. **Fan Hall** - Génération fans
4. **Marketing** - Revenus passifs

### Tips
- Focus tier 7-12 Gold en premier
- Attend les événements pour les discounts
- Upgrade uniformément pour éviter le瓶颈
    `,
    content_de: `
## Blueprints-Leitfaden - TopGirl

### Einrichtungs-Stufen

| Stufe | Blueprints | Gold | Effekt |
|-------|-----------|------|-------|
| 1-3 | 50-100 | 10K | +5% Stats |
| 4-6 | 150-300 | 50K | +10% Stats |
| 7-9 | 500-800 | 200K | +15% Stats |
| 10-12 | 1000-1500 | 500K | +20% Stats |
| 13-15 | 2000-3000 | 1M | +25% Stats |
| 16-18 | 4000-5000 | 3M | +30% Stats |
| 19-21 | 7000+ | 10M | +35% Stats |

### Prioritäten
1. **Studio** - Song-Produktion
2. **Training** - Künstlerinnen leveln
3. **Fan Hall** - Fan-Generierung
4. **Marketing** - Passive Einkünfte

### Tipps
- Fokussiere Stufe 7-12 Gold zuerst
- Warte auf Events für Rabatte
- Rüste gleichmäßig auf, um den Flaschenhals zu vermeiden
    `
  },
  {
    id: "hq-upgrade",
    title: "Guide HQ (Quartier Général)",
    title_de: "HQ-Aufstiegs-Leitfaden",
    description: "Cartes de bâtiment nécessaires pour chaque niveau du HQ. Requirement total: 29,922 cartes.",
    description_de: "Benötigte Gebäude-Karten für jedes HQ-Level.",
    icon: "🏢",
    color: "#a855f7",
    category: "Débutant",
    category_de: "Anfänger",
    readTime: "5 min",
    content: `
## Guide HQ - TopGirl

### Cartes par Niveau HQ

| Niveau | Cartes | Coût Gold |
|-------|--------|----------|
| 1 | 50 | 1,000 |
| 2 | 100 | 2,500 |
| 3 | 200 | 5,000 |
| 4 | 400 | 10,000 |
| 5 | 800 | 25,000 |
| 6 | 1,500 | 50,000 |
| 7 | 2,500 | 100,000 |
| 8 | 4,000 | 200,000 |
| 9 | 6,000 | 400,000 |
| 10 | 8,000 | 800,000 |

**Total pour HQ Level 10:** ~29,922 cartes / ~1.6M Gold

### Bonus HQ
- Level 5: Unlock events supplémentaires
- Level 7: +10% toutes stats
- Level 10: Maximum bonus
    `,
    content_de: `
## HQ-Leitfaden - TopGirl

### Karten pro HQ-Level

| Level | Karten | Gold-Kosten |
|-------|--------|------------|
| 1 | 50 | 1.000 |
| 2 | 100 | 2.500 |
| 3 | 200 | 5.000 |
| 4 | 400 | 10.000 |
| 5 | 800 | 25.000 |
| 6 | 1.500 | 50.000 |
| 7 | 2.500 | 100.000 |
| 8 | 4.000 | 200.000 |
| 9 | 6.000 | 400.000 |
| 10 | 8.000 | 800.000 |

**Gesamt für HQ Level 10:** ~29.922 Karten / ~1,6M Gold

### HQ-Boni
- Level 5: Zusätzliche Events freischalten
- Level 7: +10% alle Stats
- Level 10: Maximale Boni
    `
  },
  {
    id: "vehicle-system",
    title: "Système de Véhicules",
    title_de: "Fahrzeug-System-Leitfaden",
    description: "Système complet: Avancement, Pièces (Moteur, Châssis, Suspension, Jantes), Skins débloqués.",
    description_de: "Vollständiges System: Aufstieg, Teile (Motor, Chassis, Federung, Felgen), freigeschaltete Skins.",
    icon: "🚗",
    color: "#f87171",
    category: "Avancé",
    category_de: "Fortgeschritten",
    readTime: "15 min",
    content: `
## Système de Véhicules - TopGirl

### Types de Véhicules

** Starter (Gratuit) **
- Speed: 100
- Stats bonus: +500

** Sports (50,000 Gold) **
- Speed: 150  
- Stats bonus: +1,500

** Luxury (500,000 Gold) **
- Speed: 200
- Stats bonus: +5,000

** Super (5,000,000 Gold) **
- Speed: 300
- Stats bonus: +15,000

### Pièces d'Upgrade

| Pièce | Effet | Tier Max |
|-------|-------|----------|
| Moteur | +Speed | 10 |
| Châassis | +Handling | 10 |
| Suspension | +Confort | 10 |
| Jantes | +Style | 10 |

### Skins
Les skins débloquent à certains niveaux de véhicule:
- Level 5: Skin Bronze
- Level 10: Skin Silver
- Level 20: Skin Gold
- Level 30: Skin Platinum
    `,
    content_de: `
## Fahrzeug-System-Leitfaden - TopGirl

### Fahrzeugtypen

** Starter (Kostenlos) **
- Speed: 100
- Stats-Bonus: +500

** Sports (50.000 Gold) **
- Speed: 150
- Stats-Bonus: +1.500

** Luxury (500.000 Gold) **
- Speed: 200
- Stats-Bonus: +5.000

** Super (5.000.000 Gold) **
- Speed: 300
- Stats-Bonus: +15.000

### Upgrade-Teile

| Teil | Effekt | Max. Stufe |
|------|-------|-----------|
| Motor | +Speed | 10 |
| Chassis | +Handling | 10 |
| Federung | +Confort | 10 |
| Felgen | +Style | 10 |

### Skins
Skins werden bei bestimmten Fahrzeug-Leveln freigeschaltet:
- Level 5: Bronze Skin
- Level 10: Silber Skin
- Level 20: Gold Skin
- Level 30: Platin Skin
    `
  },
  {
    id: "gold-equipment",
    title: "Équipement Gold Optimal",
    title_de: "Gold-Ausrüstungs-Leitfaden",
    description: "Setup complet Gold pour Vocalist, Dancer et Center. +19,730 stats et 86,000 fans par personnage.",
    description_de: "Vollständiges Gold-Setup für Vocalist, Dancer und Center.",
    icon: "✨",
    color: "#fbbf24",
    category: "Avancé",
    category_de: "Fortgeschritten",
    readTime: "10 min",
    content: `
## Équipement Gold Optimal - TopGirl

### Setup Gold Vocalist

**Bijoux:**
- Collier: Gold Diamond Necklace (+3,000 Vocal)
- Bague: Gold Diamond Ring (+2,500 Vocal)
- Montre: Gold Chrono (+2,000 Vocal)

**Véhicule:**
- Super Car (+15,000 all stats)

**Propriété:**
- Luxury Mansion (+5,000 all stats)

**Total: +27,500 Vocal / +20,000 autre / 86,000 fans**

### Setup Gold Dancer

**Bijoux:**
- Collier: Gold Diamond Necklace (+3,000 Dance)
- Bague: Gold Diamond Ring (+2,500 Dance)
- Montre: Gold Chrono (+2,000 Dance)

**Véhicule:** Super Car
**Propriété:** Luxury Mansion

**Total: +27,500 Dance**

### Setup Gold Center

**Bijoux:**
- Collier: Gold Diamond Necklace (+3,000 Vocal)
- Bague: Gold Diamond Ring (+2,500 Dance)
- Montre: Gold Chrono (+2,000 Charm)

**Véhicule + Propriété:** Same

**Total: +27,500混合 stats**

### Coût Total
~50,000,000 Gold par personnage full Gold
    `,
    content_de: `
## Optimale Gold-Ausrüstung - TopGirl

### Gold Vocalist Setup

**Schmuck:**
- Collier: Gold Diamond Necklace (+3.000 Vocal)
- Ring: Gold Diamond Ring (+2.500 Vocal)
- Uhr: Gold Chrono (+2.000 Vocal)

**Fahrzeug:**
- Super Car (+15.000 alle Stats)

**Immobilie:**
- Luxury Mansion (+5.000 alle Stats)

**Gesamt: +27.500 Vocal / +20.000 andere / 86.000 Fans**

### Gold Dancer Setup

**Schmuck:**
- Collier: Gold Diamond Necklace (+3.000 Dance)
- Ring: Gold Diamond Ring (+2.500 Dance)
- Uhr: Gold Chrono (+2.000 Dance)

**Fahrzeug:** Super Car
**Immobilie:** Luxury Mansion

**Gesamt: +27.500 Dance**

### Gold Center Setup

**Schmuck:**
- Collier: Gold Diamond Necklace (+3.000 Vocal)
- Ring: Gold Diamond Ring (+2.500 Dance)
- Uhr: Gold Chrono (+2.000 Charm)

**Fahrzeug + Immobilie:** Gleich

**Gesamt: +27.500 gemischte Stats**

### Gesamtkosten
~50.000.000 Gold pro Charakter volles Gold
    `
  },
  {
    id: "purple-equipment",
    title: "Équipement Purple (Budget)",
    title_de: "Lila-Ausrüstungs-Leitfaden",
    description: "Setup économique Purple. +13,730 stats mais pas de bonus fans. Stratégie Gold/Purple mixte.",
    description_de: "Budget Lila-Setup. Gemischte Gold/Lila Strategie.",
    icon: "💜",
    color: "#a855f7",
    category: "Intermédiaire",
    category_de: "Fortgeschritten",
    readTime: "8 min",
    content: `
## Équipement Purple - TopGirl

### Setup Purple Vocalist

**Bijoux:**
- Collier: Purple Gem Necklace (+2,000 Vocal)
- Bague: Purple Gem Ring (+1,500 Vocal)
- Montre: Purple Watch (+1,200 Vocal)

**Véhicule:** Sports Car (+1,500 all stats)

**Propriété:** House (+3,000 all stats)

**Total: +9,700 Vocal / +6,500 autre / 0 fans**

### Setup Purple Dancer

Similar to Vocalist but:
- Collier: +2,000 Dance
- Bague: +1,500 Dance
- Montre: +1,200 Dance

**Total: +9,700 Dance**

### Stratégie Gold/Purple Mix

**Option 1: Budget Optimal**
- 2 Gold Jewelry + Purple Car + Purple Property
- Coût: ~15M Gold
- Stats: ~70% du full Gold

**Option 2: Purple Only**
- Tout Purple
- Coût: ~5M Gold
- Stats: ~50% du full Gold

### Avantages Purple
- Plus accessible
- Bon rapport qualité/prix
- Still competitive en mid-game
    `,
    content_de: `
## Lila-Ausrüstung - TopGirl

### Lila Vocalist Setup

**Schmuck:**
- Collier: Purple Gem Necklace (+2.000 Vocal)
- Ring: Purple Gem Ring (+1.500 Vocal)
- Uhr: Purple Watch (+1.200 Vocal)

**Fahrzeug:** Sports Car (+1.500 alle Stats)

**Immobilie:** House (+3.000 alle Stats)

**Gesamt: +9.700 Vocal / +6.500 andere / 0 Fans**

### Lila Dancer Setup

Ähnlich wie Vocalist, aber:
- Collier: +2.000 Dance
- Ring: +1.500 Dance
- Uhr: +1.200 Dance

**Gesamt: +9.700 Dance**

### Gold/Lila Mix Strategie

**Option 1: Budget Optimal**
- 2 Gold Schmuck + Lila Auto + Lila Immobilie
- Kosten: ~15M Gold
- Stats: ~70% vom vollen Gold

**Option 2: Nur Lila**
- Alles Lila
- Kosten: ~5M Gold
- Stats: ~50% vom vollen Gold

### Lila Vorteile
- Leichter zugänglich
- Gutes Preis-Leistungs-Verhältnis
- Immer noch konkurrenzfähig im Mid-Game
    `
  },
  {
    id: "event-ancient-rome",
    title: "Guide Ancient Rome",
    title_de: "Altes Rom Leitfaden",
    description: "Guide complet de l'événement Adventure Abroad Rome",
    description_de: "Vollständiger Leitfaden zum Adventure Abroad Rom-Event.",
    icon: "🏛️",
    color: "#f97316",
    category: "Événements",
    category_de: "Events",
    readTime: "10 min",
    content: `
## Guide Ancient Rome - TopGirl

### Présentation
L'événement **Adventure Abroad: Rome** est un événement saisonnier de 12 jours qui se déroule dans la Rome antique. Le but est de收集 des items ROMA à travers 3 phases et de les échanger contre des rewards exclusifs.

### Phases de l'événement

**Phase 1: Colosseum (Jour 1-4)**
- **Objectif:** Collecter les items ROMA
- **Rewards:** ROMA Items, Diamonds
- **Conseil:** Focus sur les快速 battles pour accumuler rapidement

**Phase 2: Forum (Jour 5-8)**
- **Objectif:** Compléter des chansons
- **Rewards:** SSR Cards, ROMA Items
- **Conseil:** Utilisez vos meilleures équipes pour maximize les rewards

**Phase 3: Emperor (Jour 9-12)**
- **Objectif:** Échanger les rewards
- **Rewards:** UR Token, SSR+ Cards
- **Conseil:** Gardez enough ROMA Items pour les meilleurs échanges

### Stratégie
1. **Jour 1-4:** Maximisez la collecte d'items ROMA
2. **Jour 5-8:** Concentrez-vous sur les chanson completions
3. **Jour 9-12:** Échangez pour les meilleures rewards

### Meilleures Artists
- Cornelia, Aurelia, Xenia (bonus Rome)
    `,
    content_de: `
## Altes Rom Leitfaden - TopGirl

### Überblick
Das **Adventure Abroad: Rome** Event ist ein saisonales 12-Tage-Event, das im antiken Rom stattfindet. Das Ziel ist es, ROMA-Items durch 3 Phasen zu sammeln und sie gegen exklusive Belohnungen einzutauschen.

### Event-Phasen

**Phase 1: Kolosseum (Tag 1-4)**
- **Ziel:** ROMA-Items sammeln
- **Belohnungen:** ROMA Items, Diamanten
- **Tipp:** Fokussiere dich auf schnelle Kämpfe zum schnellen Sammeln

**Phase 2: Forum (Tag 5-8)**
- **Ziel:** Songs abschließen
- **Belohnungen:** SSR-Karten, ROMA Items
- **Tipp:** Verwende deine besten Teams, um die Belohnungen zu maximieren

**Phase 3: Kaiser (Tag 9-12)**
- **Ziel:** Belohnungen eintauschen
- **Belohnungen:** UR-Token, SSR+ Karten
- **Tipp:** Behalte genug ROMA-Items für die besten Tausche

### Strategie
1. **Tag 1-4:** Sammle ROMA-Items
2. **Tag 5-8:** Fokussiere dich auf Song-Abschlüsse
3. **Tag 9-12:** Tausche für die besten Belohnungen

### Beste Künstlerinnen
- Cornelia, Aurelia, Xenia (Rom-Bonus)
    `
  },
  {
    id: "event-radio-battle",
    title: "Guide Radio Battle",
    title_de: "Radio Battle Leitfaden",
    description: "Guide complet du Radio Battle",
    description_de: "Vollständiger Radio Battle Leitfaden.",
    icon: "📻",
    color: "#06b6d4",
    category: "Événements",
    category_de: "Events",
    readTime: "8 min",
    content: `
## Guide Radio Battle - TopGirl

### Présentation
Le **Radio Battle** est un événement récurrent où vous affrontez d'autres joueurs via la radio. Plus vous avez d'auditeurs, plus votre score est élevé.

### Les 5 Phases

**Phase 1: Opening (Day 1)**
- Préparez votre station radio
- Reward: Radio Coins x100

**Phase 2: Heat 1 (Day 1-2)**
- Accumulez des listeners
- Reward: Radio Coins x200

**Phase 3: Heat 2 (Day 2-3)**
- Défiez d'autres stations
- Reward: Radio Coins x300

**Phase 4: Finals (Day 3-4)**
- Bataille finale
- Reward: SSR Cards

**Phase 5: Exchange (Day 4-5)**
- Échangez vos Radio Coins
- Rewards: UR Tokens, SSR+

### Stratégie
1. **Releasez pendant les heures de pointe** (soir)
2. **Utilisez des artists avec compétences Charisma**
3. **Combinez différents genres** pour attract plus d'auditeurs

### Meilleures Artists
- Skylar, Nova, Sora, Evelyn
    `,
    content_de: `
## Radio Battle Leitfaden - TopGirl

### Überblick
Der **Radio Battle** ist ein wiederkehrendes Event, bei dem du über das Radio gegen andere Spieler antrittst. Je mehr Zuhörer du hast, desto höher ist deine Punktzahl.

### Die 5 Phasen

**Phase 1: Eröffnung (Tag 1)**
- Bereite deine Radiostation vor
- Belohnung: Radio Coins x100

**Phase 2: Heat 1 (Tag 1-2)**
- Sammle Zuhörer
- Belohnung: Radio Coins x200

**Phase 3: Heat 2 (Tag 2-3)**
- Fordere andere Stationen heraus
- Belohnung: Radio Coins x300

**Phase 4: Finale (Tag 3-4)**
- Finaler Kampf
- Belohnung: SSR-Karten

**Phase 5: Tausch (Tag 4-5)**
- Tausche deine Radio Coins
- Belohnungen: UR-Token, SSR+

### Strategie
1. **Veröffentliche während der Stoßzeiten** (abends)
2. **Verwende Künstlerinnen mit Charisma-Fähigkeiten**
3. **Kombiniere verschiedene Genres**, um mehr Zuhörer anzuziehen

### Beste Künstlerinnen
- Skylar, Nova, Sora, Evelyn
    `
  },
  {
    id: "event-grammy",
    title: "Guide Grammy Awards",
    title_de: "Grammy Awards Leitfaden",
    description: "Guide des 8 catégories Grammy",
    description_de: "Leitfaden zu den 8 Grammy-Kategorien.",
    icon: "🏆",
    color: "#fbbf24",
    category: "Événements",
    category_de: "Events",
    readTime: "10 min",
    content: `
## Guide Grammy Awards - TopGirl

### Présentation
Le **Grammy Contest** est un événement hebdomadaire de competition musicale avec 8 catégories différentes. Créez la meilleure chanson en combinant différents genres et artists.

### Les 8 Catégories

| Catégorie | Genre Requis | Meilleure Stratégie |
|-----------|--------------|---------------------|
| Best New Artist | Tous | Use rising stars avec high potential |
| Record of the Year | Pop + EDM | Combinez Pop + EDM pour max score |
| Album of the Year | Tous | Balancez tous les stats |
| Song of the Year | Tous | Focus sur Charisma skills |
| Best Pop | Pop only | Équipe 100% Pop |
| Best Hip Hop | Hip Hop only | Équipe Hip Hop |
| Best R&B | R&B only | Specialists R&B |
| Best Rock | Rock only | Équipe Rock |

### Stratégie
1. **Utilisez des artists avec high Singing stats**
2. **Combinez lead vocalist + supporting dancers**
3. **Pop et EDM ont tendance à scorer plus haut**

### Meilleures Artists
- Lestari, Brooklyn, Alice, Bella (general)
- Artists par genre: vérifier les stats
    `,
    content_de: `
## Grammy Awards Leitfaden - TopGirl

### Die 8 Kategorien
1. **Best New Artist** - Neue Künstlerinnen
2. **Best Pop Vocal Album** - Pop Vocal Alben
3. **Best Dance/Electronic Album** - Dance/Electronic Alben
4. **Best Hip-Hop Album** - Hip-Hop Alben
5. **Best Female Vocalist** - Beste weibliche Sängerin
6. **Best Male Vocalist** - Bester männlicher Sänger
7. **Best Group** - Beste Gruppe
8. **Album of the Year** - Album des Jahres

### Strategie
1. **Verwende Künstlerinnen mit hohen Gesangs-Stats**
2. **Kombiniere Lead-Vocalist + unterstützende Tänzerinnen**
3. **Pop und EDM haben tendenziell höhere Punktzahlen**

### Beste Künstlerinnen
- Lestari, Brooklyn, Alice, Bella (allgemein)
- Künstlerinnen nach Genre: Stats überprüfen
    `
  },
  {
    id: "event-ultimate-ceo",
    title: "Guide Ultimate CEO",
    title_de: "Ultimate CEO Leitfaden",
    description: "Guide complet de l'Ultimate CEO",
    description_de: "Vollständiger Ultimate CEO Leitfaden.",
    icon: "💼",
    color: "#ef4444",
    category: "Événements",
    category_de: "Events",
    readTime: "8 min",
    content: `
## Guide Ultimate CEO - TopGirl

### Présentation
L'**Ultimate CEO** est un événement hebdomadaire de 5 jours où vous affrontez le CEO pour earn des rewards exclusifs.

### Phases

**Phase 1 (Day 1)**
- Accumulez des CEO Points
- Rewards: Cartes communes

**Phase 2 (Day 2)**
- Défiez le CEO
- Rewards: Cartes SSR

**Phase 3 (Day 3-5)**
- Échangez vos rewards
- Rewards: UR Tokens, CEO Cards

### Stratégie
1. **Focus sur teams avec high DPS**
2. **Equilibrez attack et defense artists**
3. **Utilisez des artists avec Fan Capacity bonuses**

### Meilleures Artists
- Kokoro, Aurora, Claire, Alice
    `,
    content_de: `
## Ultimate CEO Leitfaden - TopGirl

### Überblick
Der **Ultimate CEO** ist ein wöchentliches 5-Tage-Event, bei dem du gegen den CEO antrittst, um exklusive Belohnungen zu erhalten.

### Phasen

**Phase 1 (Tag 1)**
- Sammle CEO-Punkte
- Belohnungen: Gewöhnliche Karten

**Phase 2 (Tag 2)**
- Fordere den CEO heraus
- Belohnungen: SSR-Karten

**Phase 3 (Tag 3-5)**
- Tausche deine Belohnungen
- Belohnungen: UR-Token, CEO-Karten

### Strategie
1. **Fokussiere dich auf Teams mit hohem DPS**
2. **Balanciere Angriffs- und Verteidigungskünstlerinnen**
3. **Verwende Künstlerinnen mit Fan-Kapazitäts-Boni**

### Beste Künstlerinnen
- Kokoro, Aurora, Claire, Alice
    `
  },
  {
    id: "event-echo-death-match",
    title: "Guide Echo Death Match",
    title_de: "Echo Death Match Leitfaden",
    description: "Guide du Echo Death Match",
    description_de: "Echo Death Match Leitfaden: Schwierigkeit, Stufen, Stufen-Belohnungen.",
    icon: "👻",
    color: "#8b5cf6",
    category: "Événements",
    category_de: "Events",
    readTime: "8 min",
    content: `
## Guide Echo Death Match

### Type
Guide événement

### Explication courte
Echo Death Match est un événement hebdomadaire de 3 jours. Il se déroule chaque vendredi, samedi et dimanche.
Avant le début, tu choisis une difficulté. Ce choix est fixe pendant l’événement.
Le but est de battre des stages et de récupérer des récompenses.

### Explication longue
Fonctionnement général
Avant l’événement, tu dois sélectionner une difficulté. Tu ne peux jouer qu’une difficulté par édition.
L’événement contient 15 stages. Chaque stage reste disponible 1 heure.
Si un stage disparaît, tu peux le faire réapparaître.
Tu dois invoquer un stage et lancer un challenge. Si tu gagnes, tu accèdes au stage suivant.
Chaque stage donne des récompenses de base. Elles sont proches des rewards de Concert Performance.
Des récompenses bonus sont données aux stages 3, 6, 9, 12 et 15.
Si tu termines tous les stages à ta difficulté, tu débloques la difficulté suivante pour la prochaine édition.
Les difficultés plus élevées donnent de meilleures récompenses.

### Conseils
- Choisis une difficulté que tu peux terminer entièrement.
- Joue régulièrement. Chaque stage ne reste disponible qu’une heure.
- Termine rapidement un stage pour ne pas rater le suivant.
- Garde en tête les stages 3, 6, 9, 12 et 15 pour les récompenses bonus.

### Récompenses
Récompenses de base
Rewards proches de Concert Performance.

Récompenses de paliers
- SR Private Photos
- SSR Private Photos
- SSR Cards
- EXP Cards

Les quantités dépendent de la difficulté et de la progression.

### Guides liés
- Guide de la structure du jeu
- Guide des stats : Chant, Danse et Management
- Guide des équipements
- Guide Top CEO

### Glossaire ajouté
- Concert Performance : mode de référence pour les rewards de base.
- Stage : niveau à terminer pendant l’événement.
- SR Private Photos
- SSR Private Photos
- SSR Cards
- EXP Cards
    `,
    content_de: `
## Echo Death Match Leitfaden

### Typ
Event-Leitfaden

### Kurze Erklärung
Echo Death Match ist ein PvP-Event, bei dem du in verschiedenen Schwierigkeitsstufen gegen andere Spieler antrittst.

### Lange Erklärung
Stufen und Struktur
Das Event hat mehrere Stufen mit zunehmender Schwierigkeit:
- Stufe 1-5: Leicht
- Stufe 6-10: Mittel
- Stufe 11-15: Schwer
- Stufe 16+: Extrem

Belohnungen pro Stufe
- Stufe 1-5: SR-Karten, EXP-Karten
- Stufe 6-10: SSR-Karten, Asset-Material
- Stufe 11-15: SSR+-Karten, Asset-Material
- Stufe 16+: UR-Token, exklusive Belohnungen

Strategie
1. **Fokussiere dich auf DPS-Künstlerinnen**
2. **Balanciere Angriff und Verteidigung**
3. **Sammle Ressourcen zwischen Events**

### Verwandte Leitfäden
- Spielstruktur-Leitfaden
- Stats-Leitfaden: Gesang, Tanz und Management
- Ausrüstungs-Leitfaden
- Top CEO Leitfaden

### Glossar hinzugefügt
- Concert Performance: Referenzmodus für Basisbelohnungen
- Stage: Niveau, das während des Events abgeschlossen werden muss
- SR Private Fotos
- SSR Private Fotos
- SSR-Karten
- EXP-Karten
    `
  },
  {
    id: "event-muse",
    title: "Guide Muse Event",
    title_de: "Muse Event Leitfaden",
    description: "Guide du Muse Event",
    description_de: "Muse Event Leitfaden: Musik-Gameplay, Crystals, Upgrades und Strategien.",
    icon: "🎵",
    color: "#a855f7",
    category: "Événements",
    category_de: "Events",
    readTime: "8 min",
    content: `
## Guide Muse Event

### Type
Guide événement

### Explication courte
Muse Event est un mini-jeu musical. Tu utilises des Entry Tickets pour jouer une piste.
Tu dois toucher les tiles au bon moment pour faire un Perfect et marquer des points.
Les Crystals servent à acheter des upgrades qui améliorent tes scores et tes rewards.

### Explication longue
Gameplay et contrôles
Pour jouer, tu consommes des Entry Tickets depuis le Battle Pass.
Tu peux miser 1x, 10x ou 100x tickets pour multiplier les rewards d’une run.
Le but est de toucher les tiles quand elles atteignent la ligne du bas.
Un timing parfait donne un Perfect et maximise le score.
Si tu tapes trop tôt ou trop tard, ton score baisse.
Sur les lignes longues, tu maintiens le doigt. Pour les carrés, tu tapes. Tu peux glisser entre des lignes longues adjacentes.
Astuce : tiens ton appareil à deux mains et joue avec les pouces pour plus de stabilité.

Progression et musiques
Tu peux choisir une piste avec Select Music ou lancer une piste au hasard avec Quick Start.
En jouant régulièrement, tu débloques de nouvelles tracks.
Les Tasks donnent des Crystals, la monnaie des upgrades.

Battle Pass et Tickets
Les Tasks et le Battle Pass sont les principales sources de Crystals et d’Entry Tickets.
Le Paid Pass donne une progression plus rapide et des rewards supplémentaires.
Le Premium Pass donne des tickets et des rewards exclusifs.
La section Gift permet d’acheter des tickets et des Crystals.

Upgrades et stratégie
Les upgrades améliorent tes stats : Base Score, Combo Score, Bonus Chance, Bonus Multiplier et Shield.
Plus tes stats sont élevées, meilleures sont les rewards par track.
Les Crystals sont limités. Ne les dépense pas au hasard.
Choisis tes upgrades selon ton style de jeu :
- Joueur régulier : Base Score puis Combo Score.
- Joueur très précis : Combo Score puis Bonus Multiplier.
- Joueur burst : Bonus Chance puis Bonus Multiplier.
- Joueur difficulté : Base Score puis Shield.

### Conseils
- Utilise 1x tickets quand tu testes une track. Passe en 10x ou 100x quand tu maîtrises.
- Concentre tes Crystals sur 2 stats clés au lieu de tout monter.
- Vise un timing propre. Les Perfects font la différence.
- Complète les Tasks chaque jour pour sécuriser les Crystals.

### Récompenses
- Crystals
- Entry Tickets
- Rewards du Battle Pass
- Rewards par track

Le montant dépend de tes stats et de ta progression.

### Guides liés
- Guide de la structure du jeu
- Guide des stats : Chant, Danse et Management
- Guide des équipements

### Glossaire ajouté
- Entry Tickets
- Battle Pass
- Paid Pass
- Premium Pass
- Tasks
- Crystals
- Base Score
- Combo Score
- Bonus Chance
- Bonus Multiplier
- Shield
- Perfect
- Quick Start
- Select Music
- Track
    `
  },
  {
    id: "event-chamber-territory",
    title: "Guide Chamber Territory",
    title_de: "Chamber Territory Leitfaden",
    description: "Guide du Chamber Territory",
    description_de: "Leitfaden zum Chamber Territory Event.",
    icon: "🏰",
    color: "#14b8a6",
    category: "Événements",
    category_de: "Events",
    readTime: "8 min",
    content: `
## Guide Chamber Territory - TopGirl

### Présentation
Le **Chamber Territory** est un événement de territoire. Capturez et défendez différentes chambres pour earn des rewards.

### Phases

**Phase 1 (Jour 1-3)**
- Capturez des territoires
- Reward: Territory Tokens x300

**Phase 2 (Jour 4-7)**
- Défendez et collectez
- Reward: SSR Cards, Tokens x500

**Phase 3 (Jour 8-10)**
- Échangez vos rewards
- Rewards: UR Token, SSR+ Cards

### Stratégie
1. **Capturez tôt** les territoires à haute valeur
2. **Défendez vos territoires** pour des bonus
3. **Coopérez avec d'autres joueurs**
    `,
    content_de: `
## Chamber Territory Leitfaden - TopGirl

### Überblick
Der **Chamber Territory** ist ein Gebiets-Event. Erobere und verteidige verschiedene Kammern, um Belohnungen zu erhalten.

### Phasen

**Phase 1 (Tag 1-3)**
- Erobere Gebiete
- Belohnung: Territory Tokens x300

**Phase 2 (Tag 4-7)**
- Verteidige und sammle
- Belohnung: SSR-Karten, Tokens x500

**Phase 3 (Tag 8-10)**
- Tausche deine Belohnungen
- Belohnungen: UR-Token, SSR+ Karten

### Strategie
1. **Erobere früh** hochwertige Gebiete
2. **Verteidige deine Gebiete** für Boni
3. **Kooperiere mit anderen Spielern**
    `
  },
  {
    id: "event-cleanup-party",
    title: "Guide Cleanup Party",
    title_en: "Cleanup Party Guide",
    title_it: "Guida alla Pulizia della Festa",
    title_es: "Guía de la Fiesta de Limpieza",
    title_pt: "Guia da Festa de Limpeza",
    title_pl: "Przewodnik po imprezie sprzątającej",
    title_id: "Panduan Pesta Bersih",
    title_ru: "Гид по уборке вечеринки",
    title_de: "Cleanup Party Leitfaden",
    description: "Guide du Cleanup Party - Comment jouer et optimiser vos rewards",
    description_en: "Cleanup Party Guide - How to play and optimize your rewards",
    description_it: "Guida alla Pulizia della Festa - Come giocare e ottimizzare le ricompense",
    description_es: "Guía de la Fiesta de Limpieza - Cómo jugar y optimizar tus recompensas",
    description_pt: "Guia da Festa de Limpeza - Como jogar e otimizar suas recompensas",
    description_pl: "Przewodnik po imprezie sprzątającej - Jak grać i optymalizować nagrody",
    description_id: "Panduan Pesta Bersih - Cara bermain dan mengoptimalkan reward",
    description_ru: "Гид по уборке вечеринки - Как играть и оптимизировать награды",
    description_de: "Cleanup Party Leitfaden. Kombiniere Kacheln, schließe Stufen ab und sammle Belohnungen.",
    icon: "🧹",
    color: "#22c55e",
    category: "Événements",
    category_en: "Events",
    category_it: "Eventi",
    category_es: "Eventos",
    category_pt: "Eventos",
    category_pl: "Wydarzenia",
    category_id: "Acara",
    category_ru: "События",
    category_de: "Events",
    readTime: "5 min",
    content: `
## Guide Cleanup Party — TopGirl

### Explication courte
Dans **Cleanup Party**, l'objectif est de vider entièrement le plateau en associant des tuiles. Les joueurs sélectionnent des tuiles sur le plateau et les placent dans 7 emplacements disponibles. Lorsque trois tuiles identiques sont placées, elles sont automatiquement éliminées, libérant de la place pour de nouvelles tuiles. Attention à ne pas remplir les 7 emplacements avec des tuiles non correspondantes, sinon la tentative échoue.

### Explication longue
Chaque tentative de stage consomme de la Stamina. Compléter des stages augmente l'Affection de la Girl, et atteindre l'affection maximale rapporte un Gift supplémentaire.

Si vous avez besoin d'objets, vous pouvez demander de l'aide à d'autres joueurs via les canaux City, Group ou Chamber.

Compléter les Quêtes Journalières et les Quêtes Objectif rapporte des récompenses supplémentaires. Chaque stage complété octroie également des points pour le classement de l'événement.
`,
  content_en: `
## Cleanup Party Event Guide — TopGirl

### Short Explanation
In **Cleanup Party**, the goal is to clear the entire board by matching tiles. Players select tiles from the board and place them into 7 available slots. When three identical tiles are placed, they are automatically cleared, freeing space for new tiles. Be careful not to fill all 7 slots with unmatched tiles, or the attempt will fail.

### Long Explanation
Each stage attempt consumes Stamina. Clearing stages increases the Girl's Affection, and reaching the maximum affection grants an additional Gift.

If you need items, you can request help from other players through the City, Group, or Chamber channels.

Completing Daily Quests and Target Quests provides additional rewards. Each cleared stage also grants points for the event ranking.
`,
  content_it: `
## Guida all'evento Pulizia della Festa - TopGirl

### Panoramica
Nel **Cleanup Party**, l'obiettivo è cancellare l'intero tabellone facendo corrispondere le tessere. I giocatori selezionano le tessere dal tabellone e le posizionano negli 7 slot disponibili. Quando tre tessere identiche vengono posizionate, vengono automaticamente cancellate, liberando spazio per nuove tessere. Fai attenzione a non riempire tutti i 7 slot con tessere non corrispondenti, altrimenti il tentativo fallirà.

### Come Giocare
- Ogni tentativo di stage consuma Stamina
- Cancellare le fasi aumenta l'Affetto della Ragazza
- Raggiungere l'affetto massimo concede un ulteriore Regalo
- Se hai bisogno di oggetti, puoi chiedere aiuto ad altri giocatori attraverso i canali City, Group o Chamber

### Missioni
- **Missioni Giornaliere**: Completa le attività giornaliere per ricompense aggiuntive
- **Missioni Obiettivo**: Obiettivi speciali dell'evento con ricompense bonus

### Classifica
- Ogni fase cancellata assegna punti per il ranking dell'evento
- Le classifiche più alte ricevono ricompense migliori

### Consigli
1. **Prima di selezionare una tessera**, controlla il tabellone per almeno tre tessere identiche per cancellarle rapidamente
2. **Dai priorità alle tessere** che già hanno due o più corrispondenze visibili
3. **Prova a mantenere liberi 2-3 slot** ogni volta che è possibile
4. **Le missioni giornaliere e obiettivo** aiutano a progredire più velocemente e a guadagnare ricompense extra
5. **Richiedi assistenza quotidianamente**, anche se non ne hai bisogno ancora, così puoi salvarla per i livelli più difficili successivi
`,
  content_es: `
## Guía del Evento de Fiesta de Limpieza - TopGirl

### Resumen
En **Cleanup Party**, el objetivo es limpiar todo el tablero coincidiendo las fichas. Los jugadores seleccionan fichas del tablero y las colocan en los 7 espacios disponibles. Cuando se colocan tres fichas idénticas, se eliminan automáticamente, liberando espacio para nuevas fichas. Ten cuidado de no llenar los 7 espacios con fichas que no coinciden, o el intento fallará.

### Cómo Jugar
- Cada intento de fase consume Stamina
- Limpiar las fases aumenta el Afecto de la Chica
- Alcanzar el afecto máximo otorga un Regalo adicional
- Si necesitas objetos, puedes pedir ayuda a otros jugadores a través de los canales City, Group o Chamber

### Misiones
- **Misiones Diarias**: Completa las tareas diarias para obtener recompensas adicionales
- **Misiones Objetivo**: Objetivos especiales del evento con recompensas bonus

### Clasificación
- Cada fase eliminada otorga puntos para el ranking del evento
- Las clasificaciones más altas reciben mejores recompensas

### Consejos
1. **Antes de seleccionar una ficha**, verifica el tablero para al menos tres fichas idénticas para eliminarlas rápidamente
2. **Da prioridad a las fichas** que ya tengan dos o más coincidencias visibles
3. **Intenta mantener libres 2-3 espacios** siempre que sea posible
4. **Las misiones diarias y de objetivo** te ayudan a progresar más rápido y a obtener recompensas extra
5. **Solicita asistencia diariamente**, incluso si no la necesitas todavía, así podrás guardarla para niveles más difíciles más adelante
`,
  content_pt: `
## Guia do Evento de Festa de Limpeza - TopGirl

### Visão Geral
Em **Cleanup Party**, o objetivo é limpar todo o quadro combinando as peças. Os jogadores selecionam peças do quadro e as colocam nos 7 slots disponíveis. Quando três peças idênticas são colocadas, elas são automaticamente limpas, liberando espaço para novas peças. Cuidado para não preencher todos os 7 slots com peças que não combinam, ou a tentativa falhará.

### Como Jogar
- Cada tentativa de fase consome Stamina
- Limpar as fases aumenta o Afeto da Menina
- Alcançar o afeto máximo concede um Presente adicional
- Se você precisar de itens, pode pedir ajuda a outros jogadores através dos canais City, Group ou Chamber

### Missões
- **Missões Diárias**: Complete as tarefas diárias para recompensas adicionais
- **Missões de Alvo**: Objetivos especiais do evento com recompensas bônus

### Classificação
- Cada fase limpa concede pontos para o ranking do evento
- Classificações mais altas recebem recompensas melhores

### Dicas
1. **Antes de selecionar uma peça**, verifique o tabuleiro por pelo menos três peças idênticas para limpá-las rapidamente
2. **Priorize peças** que já tenham duas ou mais correspondências visíveis
3. **Tente manter 2-3 slots livres** sempre que possível
4. **Missões diárias e de alvo** ajudam você a progredir mais rápido e a ganhar recompensas extras
5. **Solicite assistência diariamente**, mesmo que você não precise dela ainda, assim você pode salvá-la para níveis mais difíceis posteriormente
`,
  content_pl: `
## Przewodnik po imprezie sprzątającej - TopGirl

### Przegląd
W **Cleanup Party**, celem jest wyczyszczenie całej planszy poprzez dopasowanie kafelków. Gracze wybierają kafelki z planszy i umieszczają je w 7 dostępnych slotach. Gdy zostaną umieszczone trzy identyczne kafelki, są one automatycznie usuwane, zwalniając miejsce dla nowych kafelków. Uważaj, aby nie wypełnić wszystkich 7 slotów kafelkami niezgodnymi, w przeciwnym razie próba się nie powiedzie.

### Jak Grać
- Każda próba etapu zużywa Stamina
- Czyszczenie etapów zwiększa Ukochane Dziewczyny
- Osiągnięcie maksymalnego uczucia przyznaje dodatkowy Prezent
- Jeśli potrzebujesz przedmiotów, możesz poprosić o pomoc innych graczy poprzez kanały City, Group lub Chamber

### Zadania
- **Zadania Codzienne**: Wykonaj dzienne zadania, aby uzyskać dodatkowe nagrody
- **Zadania Celowe**: Specjalne cele wydarzeń z dodatkowymi nagrodami

### Ranking
- Każdy wyczyszczony etap przyznaje punkty do rankingu wydarzenia
- Wyższe pozycje otrzymują lepsze nagrody

### Wskazówki
1. **Przed wybraniem kafelka**, sprawdź planszę pod kątem co najmniej trzech identycznych kafelków, aby je szybko usunąć
2. **Priorytetowo traktuj kafelki**, które już mają dwa lub więcej widocznych dopasowań
3. **Staraj się utrzymywać wolne 2-3 sloty** whenever possible
4. **Codzienne i Celowe Zadania** pomagają ci postępować szybciej i zarabiać dodatkowe nagrody
5. **Proś o pomoc codziennie**, nawet jeśli jej jeszcze nie potrzebujesz, abyś mógł ją zaoszczędzić na trudniejsze poziomy później
`,
  content_id: `
## Panduan Pesta Bersih - TopGirl

### Ringkasan
Dalam **Cleanup Party**, tujuannya adalah menghapus seluruh papan dengan mencocokkan tegak. Pemain memilih tegak dari papan dan menempatkannya ke dalam 7 slot yang tersedia. Ketika tiga tegak identik ditempatkan, mereka akan otomatis dibersihkan, membebaskan ruang untuk tegak baru. Hati-hati untuk tidak mengisi semua 7 slot dengan tegak yang tidak cocok, atau percobaan akan gagal.

### Cara Bermain
- Setiap upaya tahap mengonsumsi Stamina
- Menghapus tahap meningkatkan Cintaan Gadis
- Mencapai cintaan maksimum memberikan Hadiah tambahan
- Jika Anda memerlukan item, Anda dapat meminta bantuan dari pemain lain melalui saluran City, Group, atau Chamber

### Misi
- **Misi Harian**: Selesaikan tugas harian untuk mendapatkan hadiah tambahan
- **Misi Target**: Tujuan spesial acara dengan hadiah bonus

### Peringkat
- Setiap tahap yang berhasil dibersihkan memberikan poin untuk peringkat acara
- Peringkat yang lebih tinggi menerima hadiah yang lebih baik

### Tips
1. **Sebelum memilih tegak**, periksa papan untuk setidaknya tiga tegak identik untuk menghapusnya dengan cepat
2. **Berikan prioritas pada tegak** yang sudah memiliki dua atau lebih kecocokan yang terlihat
3. **Coba menjaga 2-3 slot bebas** setiap kali mungkin
4. **Misi harian dan target** membantu Anda berkembang lebih cepat dan mendapatkan hadiah tambahan
5. **Meminta bantuan setiap hari**, bahkan jika Anda belum membutuhkannya, sehingga Anda dapat menyimpannya untuk level yang lebih sulit nanti
`,
  content_ru: `
## Руководство по уборке вечеринки - TopGirl

### Обзор
В **Cleanup Party**, цель состоит в том, чтобы очистить всю доску, совмещая плитки. Игроки выбирают плитки с доски и размещают их в 7 доступных слотах. Когда три идентичные плитки размещаются, они автоматически удаляются, освобождая место для новых плиток. Будьте осторожны, чтобы не заполнить все 7 слотов неподходящими плитками, или попытка потерпит неудачу.

### Как Играть
- Каждая попытка уровня потребляет Stamina
- Очистка уровней увеличивает Привязанность Девушки
- Достижение максимальной привязанности дает дополнительный Подарок
- Если вам нужны предметы, вы можете попросить помощи у других игроков через каналы City, Group или Chamber

### Квесты
- **Ежедневные квесты**: Выполняйте ежедневные задачи для дополнительных наград
- **Целевые квесты**: Специальные цели события с бонусными наградами

### Ранжирование
- Каждый очищенный уровень дает очки для ранжирования события
- Более высокие позиции получают лучшие награды

### Советы
1. **Перед выбором плитки**, проверьте доску на наличие как минимум трех идентичных плиток, чтобы быстро их удалить
2. **Приоритетом являются плитки**, которые уже имеют два или более видимых совпадений
3. **Постарайтесь держать 2-3 слота свободными** whenever possible
4. **Ежедневные и целевые квесты** помогут вам прогрессировать быстрее и получить дополнительные награды
5. **Запрашивайте помощь ежедневно**, даже если вам она еще не нужна, чтобы вы могли сохранить её для более сложных уровней позже
    `,
    content_de: `
## Cleanup Party Event Leitfaden - TopGirl

### Überblick
Bei **Cleanup Party** ist das Ziel, das gesamte Spielfeld zu räumen, indem du Kacheln kombinierst. Spieler wählen Kacheln vom Spielfeld und platzieren sie in den 7 verfügbaren Slots. Wenn drei identische Kacheln platziert werden, werden sie automatisch entfernt, was Platz für neue Kacheln schafft. Achte darauf, nicht alle 7 Slots mit nicht passenden Kacheln zu füllen, sonst scheitert der Versuch.

### Wie man spielt
- Jeder Phasenversuch verbraucht Ausdauer
- Das Räumen von Phasen erhöht die Zuneigung des Mädchens
- Das Erreichen der maximalen Zuneigung gewährt ein zusätzliches Geschenk
- Wenn du Gegenstände benötigst, kannst du über die City-, Group- oder Chamber-Kanäle um Hilfe bitten

### Missionen
- **Tägliche Missionen**: Schließe tägliche Aufgaben ab, um zusätzliche Belohnungen zu erhalten
- **Ziel-Missionen**: Besondere Event-Ziele mit Bonus-Belohnungen

### Rangliste
- Jede geräumte Phase gibt Punkte für die Event-Rangliste
- Höhere Platzierungen erhalten bessere Belohnungen

### Tipps
1. **Bevor du eine Kachel auswählst**, überprüfe das Spielfeld auf mindestens drei identische Kacheln, um sie schnell zu räumen
2. **Priorisiere Kacheln**, die bereits zwei oder mehr sichtbare Übereinstimmungen haben
3. **Versuche 2-3 Slots freizuhalten**, wann immer möglich
4. **Tägliche und Ziel-Missionen** helfen dir, schneller voranzukommen und Extra-Belohnungen zu erhalten
5. **Bitte täglich um Hilfe**, selbst wenn du sie noch nicht brauchst, damit du sie für schwierigere Level später aufheben kannst
    `,
    tips: `
- Avant de sélectionner une tuile, vérifiez qu'il existe au moins trois tuiles identiques sur le plateau.
- Priorisez les tuiles qui ont déjà deux correspondances ou plus visibles.
- Essayez de garder 2 à 3 emplacements libres autant que possible.
- Les Quêtes Journalières et Quêtes Objectif permettent de progresser plus vite.
- Demandez de l'aide quotidiennement pour la conserver pour les niveaux plus difficiles.
`,
    tips_en: `
- Before selecting a tile, check the board for at least three identical tiles to clear them quickly.
- Prioritize tiles that already have two or more visible matches.
- Try to keep 2–3 slots free whenever possible.
- Daily and Target Quests help you progress faster and earn extra rewards.
- Request assistance daily, even if you don't need it yet, to save it for harder levels later.
    `,
    tips_de: `
- Bevor du eine Kachel auswählst, überprüfe das Spielfeld auf mindestens drei identische Kacheln, um sie schnell zu räumen.
- Priorisiere Kacheln, die bereits zwei oder mehr sichtbare Übereinstimmungen haben.
- Versuche 2-3 Slots freizuhalten, wann immer möglich.
- Tägliche und Ziel-Missionen helfen dir, schneller voranzukommen und Extra-Belohnungen zu erhalten.
- Bitte täglich um Hilfe, selbst wenn du sie noch nicht brauchst, damit du sie für schwierigere Level später aufheben kannst.
    `,
  },
  {
    id: "event-metro-subway",
    title: "Guide Metro & Subway",
    title_en: "Metro & Subway Guide",
    title_it: "Guida Metro & Subway",
    title_es: "Guía Metro & Subway",
    title_pt: "Guia Metro & Subway",
    title_pl: "Przewodnik Metro & Subway",
    title_id: "Panduan Metro & Subway",
    title_ru: "Гайд Metro & Subway",
    title_de: "Metro & Subway Leitfaden",
    description: "Guide de l'événement Adventure Abroad Metro. Débloquez des stations, gérez vos Fonds d'Investissement et maximisez vos récompenses.",
    description_en: "Adventure Abroad Metro event guide. Unlock stations, manage your Investment Funds and maximize your rewards.",
    description_it: "Guida all'evento Metro di Adventure Abroad. Sblocca stazioni, gestisci i tuoi Fondi di Investimento e massimizza le ricompense.",
    description_es: "Guía del evento Metro de Adventure Abroad. Desbloquea estaciones, gestiona tus Fondos de Inversión y maximiza tus recompensas.",
    description_pt: "Guia do evento Metro de Adventure Abroad. Desbloqueie estações, gerencie seus Fundos de Investimento e maximize suas recompensas.",
    description_pl: "Przewodnik po metrze Adventure Abroad. Odblokuj stacje, zarządzaj funduszami inwestycyjnymi i zmaksymalizuj nagrody.",
    description_id: "Panduan event Metro Adventure Abroad. Buka stasiun, kelola Dana Investasi dan maksimalkan reward.",
    description_ru: "Гайд по Adventure Abroad Metro. Разблокируйте станции, управляйте инвестиционными фондами и максимизируйте награды.",
    description_de: "Vollständiger Leitfaden zum Adventure Abroad Metro-Event. Entsperre Stationen, verwalte deine Investitionsfonds und maximiere Belohnungen.",
    icon: "🚇",
    color: "#3b82f6",
    category: "Événements",
    category_en: "Events",
    category_it: "Eventi",
    category_es: "Eventos",
    category_pt: "Eventos",
    category_pl: "Wydarzenia",
    category_id: "Acara",
    category_ru: "События",
    category_de: "Events",
    readTime: "8 min",
    tips: `
- Concentrez-vous d'abord sur le déblocage de stations. C'est la principale source de progression.
- Ne dépensez pas les Fonds d'Investissement en investissement supplémentaire tôt. Cela ralentira votre progression.
- Utilisez les ressources supplémentaires uniquement pendant Ultimate Group, Ultimate CEO ou Group Battle.
- Planifiez votre consommation d'AP tôt. L'événement nécessite une activité quotidienne élevée (environ 1 700 AP/jour).
- Soyez prêt à utiliser des Diamonds si vous voulez atteindre une efficacité maximale.
- Utilisez le SR Photo Exchange quotidiennement pour des Fonds d'Investissement supplémentaires.
- Gardez vos Commemorative Coins pour les upgrades importants plutôt que de les dépenser immédiatement.
- Privilégiez les upgrades permanents aux bonus Metro temporaires.
`,
    tips_en: `
- Focus on unlocking stations first. This is the main source of progression.
- Do not spend Investment Funds on additional investment early. It will slow your progress.
- Use extra resources only during Ultimate Group, Ultimate CEO, or Group Battle.
- Plan your AP usage early. The event requires high daily activity (around 1,700 AP per day).
- Be ready to use Diamonds if you want to reach maximum efficiency.
- Use SR Photo Exchange daily for extra Investment Funds.
- Save Commemorative Coins for important upgrades instead of spending them immediately.
- Prioritize permanent upgrades over temporary Metro boosts.
    `,
    tips_de: `
- Fokussiere dich zuerst auf das Freischalten von Stationen. Das ist die Hauptquelle des Fortschritts.
- Gib nicht früh Investitionsfonds für zusätzliche Investitionen aus. Das wird deinen Fortschritt verlangsamen.
- Verwende zusätzliche Ressourcen nur während Ultimate Group, Ultimate CEO oder Group Battle.
- Plane deine AP-Nutzung früh. Das Event erfordert hohe tägliche Aktivität (ca. 1.700 AP/Tag).
- Sei bereit, Diamanten zu verwenden, wenn du maximale Effizienz erreichen willst.
- Verwende täglich den SR-Foto-Tausch für zusätzliche Investitionsfonds.
- Bewahre Gedenkmünzen für wichtige Upgrades auf, anstatt sie sofort auszugeben.
- Priorisiere permanente Upgrades vor temporären Metro-Boosts.
    `,
    rewards: `
- Points de Fréquentation : utilisés pour le classement pendant l'événement Metro.
- Commemorative Coins : utilisés dans l'Abroad Shop pour obtenir des ressources précieuses.

Priorités dans l'Abroad Shop :
- SSR Universal Photos — pour améliorer les artistes
- Featured Artist Photos — pour améliorer des artistes spécifiques
- Voitures — pour augmenter la puissance globale
- Propriétés — pour améliorer la croissance à long terme du compte
`,
    rewards_en: `
- Ridership Points: Used for ranking during the Metro event.
- Commemorative Coins: Used in the Abroad Shop to obtain valuable resources.

Abroad Shop priority items:
- SSR Universal Photos — used to upgrade artists
- Featured Artist Photos — improve specific artists
- Cars — increase overall power
- Properties — improve long-term account growth
    `,
    rewards_de: `
- Ridership Points: Werden für das Ranking während des Metro-Events verwendet.
- Gedenkmünzen: Werden im Abroad-Laden verwendet, um wertvolle Ressourcen zu erhalten.

Prioritäten im Abroad-Laden:
- SSR Universal Photos — zur Verbesserung von Künstlerinnen
- Featured Artist Photos — zur Verbesserung spezifischer Künstlerinnen
- Autos — zur Steigerung der Gesamtkraft
- Immobilien — zur Verbesserung des langfristigen Konto-Wachstums
    `,
    content: `
## Guide Metro & Subway — Adventure Abroad

### Explication courte
Le système Metro dans Adventure Abroad est un événement limité qui offre des bonus de stats temporaires et des récompenses de progression. Les joueurs utilisent des Fonds d'Investissement pour débloquer des stations et augmenter leurs Points de Fréquentation.

L'objectif principal est de progresser aussi loin que possible en utilisant efficacement ses ressources. Tous les bonus Metro sont réinitialisés à la fin de l'événement.

### Explication longue
L'événement Metro dure 3 semaines et offre des bonus de stats significatifs : Chant, Danse, Management, Capacité Fan et Rally Fan Capacity. Ces bonus aident pendant l'événement mais ne persistent pas après.

La progression repose sur deux systèmes principaux :

#### 1. Déblocage de stations
Les joueurs utilisent des Fonds d'Investissement pour débloquer des stations de métro. Chaque station offre des buffs et permet de progresser plus loin sur la carte. Débloquer des stations est le seul moyen d'avancer dans les lignes de métro.

#### 2. Investissement supplémentaire
Les joueurs peuvent dépenser des ressources supplémentaires pour augmenter leurs Points de Fréquentation. Cela améliore le classement mais ne débloque pas de nouvelles stations.

Pour les joueurs F2P, les Fonds d'Investissement peuvent être obtenus via :
- Calendrier Adventure Abroad
- Opération Personnelle
- Journey Adventure Abroad
- Stadium Rallies (lancement et participation, jusqu'à 20 par jour)
- Concert Performances
- Quêtes Journalières
- Agent Gigs

Avec une participation complète, les joueurs peuvent gagner suffisamment de Fonds d'Investissement pour progresser loin dans le système Metro sans dépenser.

Cependant, utiliser les Fonds d'Investissement de manière incorrecte réduira considérablement la progression. Les dépenser en investissement supplémentaire plutôt qu'en déblocage de stations peut stopper la progression bien plus tôt.

Un autre système clé est l'efficacité des ressources. Plus on investit dans une station, plus le coût augmente tandis que la valeur par ressource diminue. Cela crée des rendements décroissants, rendant l'investissement massif inefficace.

Pour maximiser la valeur, les joueurs doivent synchroniser leur utilisation de ressources avec les grands événements comme :
- Ultimate Group
- Ultimate CEO
- Group Battle

Cela permet de gagner à la fois des Points de Fréquentation et des récompenses d'événement simultanément.

L'événement nécessite également une consommation importante d'AP. Compléter les activités principales (concerts et rallies) nécessite environ 35 000 AP au total, soit environ 1 700 AP par jour. La régénération naturelle d'AP n'est généralement pas suffisante, donc des AP supplémentaires peuvent nécessiter des Diamonds.

Sources supplémentaires de Fonds d'Investissement :
- SR Photo Exchange (conversion quotidienne)
- Récompenses Territory (Landmarks et Toll Stations)
- Stadium Rallies et Concerts de haut niveau
- Stock Store (achat hebdomadaire avec des Yens)

L'Abroad Shop permet d'échanger des Commemorative Coins contre des objets précieux. Il reste disponible peu de temps après la fin de l'événement.
`,
    content_en: `
## Metro & Subway Guide — Adventure Abroad

### Short Explanation
The Metro system in Adventure Abroad is a limited-time event that provides temporary stat boost and progression rewards. Players use Investment Funds to unlock stations and increase Ridership Points.

The main goal is to progress as far as possible while using resources efficiently. All Metro bonuses reset after the event ends.

### Long Explanation
The Metro event lasts for 3 weeks and offers significant stat boost such as Sing, Dance, Manage, Fan Capacity, and Rally Fan Capacity. These bonuses help during the event but do not carry over afterward.

Progression is based on two main systems:

#### 1. Unlocking Stations
Players use Investment Funds to unlock Metro stations. Each station provides buffs and allows further progression on the map. Unlocking stations is the only way to advance deeper into the Metro lines.

#### 2. Additional Investment
Players can spend extra resources to increase Ridership Points. This improves ranking but does not unlock new stations or extend progression.

For F2P players, Investment Funds can be obtained through:
- Adventure Abroad Calendar
- Personal Operation
- Adventure Abroad Journey
- Stadium Rallies (launching and joining, up to 20 per day)
- Concert Performances
- Daily Quests
- Agent Gigs

With full participation, players can earn enough Investment Funds to progress far into the Metro system without spending.

However, using Investment Funds incorrectly will significantly reduce progression. Spending them on additional investment instead of unlocking stations can stop progress much earlier.

Another key system is resource efficiency. As more resources are invested into a station, the cost increases while the value per resource decreases. This creates diminishing returns, making heavy investment inefficient.

To maximize value, players should synchronize their resource usage with major events such as:
- Ultimate Group
- Ultimate CEO
- Group Battle

This allows players to gain both Ridership Points and event rewards at the same time.

The event also requires high AP consumption. Completing the main activities (concerts and rallies) requires around 35,000 AP total, or about 1,700 AP per day. Natural AP regeneration is usually not enough, so additional AP may require Diamonds.

Additional sources of Investment Funds include:
- SR Photo Exchange (daily conversion)
- Territory rewards (Landmarks and Toll Stations)
- High-level Stadium Rallies and Concerts
- Stock Store (weekly purchase using Yen)

The Abroad Shop allows players to exchange Commemorative Coins for valuable items. It remains available for a short time after the event ends.
    `,
    content_de: `
## Metro & Subway Leitfaden — Adventure Abroad

### Kurze Erklärung
Das Metro-System in Adventure Abroad ist ein zeitlich begrenztes Event, das temporäre Stats-Boosts und Fortschrittsbelohnungen bietet. Spieler verwenden Investitionsfonds, um Stationen freizuschalten und ihre Fahrgastzahlen zu erhöhen.

Das Hauptziel ist es, so weit wie möglich voranzukommen, während man Ressourcen effizient nutzt. Alle Metro-Boni werden nach Ende des Events zurückgesetzt.

### Lange Erklärung
Das Metro-Event dauert 3 Wochen und bietet erhebliche Stats-Boosts: Sing, Tanz, Management, Fan-Kapazität und Rally-Fan-Kapazität. Diese Boni helfen während des Events, bleiben aber danach nicht erhalten.

Der Fortschritt basiert auf zwei Hauptsystemen:

#### 1. Freischalten von Stationen
Spieler verwenden Investitionsfonds, um Metro-Stationen freizuschalten. Jede Station bietet Boosts und ermöglicht weiteren Fortschritt auf der Karte. Das Freischalten von Stationen ist der einzige Weg, um tiefer in die Metro-Linien vorzudringen.

#### 2. Zusätzliche Investition
Spieler können zusätzliche Ressourcen ausgeben, um ihre Fahrgastzahlen zu erhöhen. Dies verbessert das Ranking, schaltet aber keine neuen Stationen frei.

Für F2P-Spieler können Investitionsfonds erhalten werden durch:
- Adventure Abroad Kalender
- Persönliche Operation
- Adventure Abroad Reise
- Stadion-Rallys (Starten und Teilnehmen, bis zu 20 pro Tag)
- Konzert-Auftritte
- Tägliche Quests
- Agent Gigs

Mit vollständiger Teilnahme können Spieler genug Investitionsfonds verdienen, um weit im Metro-System voranzukommen, ohne zu investieren.

Jedoch wird die falsche Verwendung von Investitionsfonds den Fortschritt erheblich reduzieren. Sie für zusätzliche Investitionen statt für das Freischalten von Stationen auszugeben, kann den Fortschritt viel früher stoppen.

Ein weiteres wichtiges System ist die Ressourceneffizienz. Je mehr Ressourcen in eine Station investiert werden, desto höher steigen die Kosten, während der Wert pro Ressource sinkt. Dies erzeugt abnehmende Erträge, was massive Investitionen ineffizient macht.

Um den Wert zu maximieren, sollten Spieler ihre Ressourcennutzung mit großen Events synchronisieren wie:
- Ultimate Group
- Ultimate CEO
- Group Battle

Dies ermöglicht es, sowohl Fahrgastzahlen als auch Event-Belohnungen gleichzeitig zu erhalten.

Das Event erfordert auch einen hohen AP-Verbrauch. Das Abschließen der Hauptaktivitäten (Konzerte und Rallys) erfordert insgesamt etwa 35.000 AP, also etwa 1.700 AP pro Tag. Natürliche AP-Regeneration reicht normalerweise nicht aus, daher können zusätzliche AP Diamanten erfordern.

Zusätzliche Quellen für Investitionsfonds:
- SR-Foto-Tausch (tägliche Konvertierung)
- Territorium-Belohnungen (Wahrzeichen und Mautstationen)
- Hochstufige Stadion-Rallys und Konzerte
- Aktienladen (wöchentlicher Kauf mit Yen)

Der Abroad-Laden ermöglicht es Spielern, Gedenkmünzen gegen wertvolle Items einzutauschen. Er bleibt noch kurze Zeit nach Ende des Events verfügbar.
    `
  },
  {
    id: "event-adventure-abroad-tokyo",
    title: "Guide Adventure Abroad : Tokyo",
    title_en: "Adventure Abroad: Tokyo Guide",
    title_it: "Guida Adventure Abroad: Tokyo",
    title_es: "Guía Adventure Abroad: Tokyo",
    title_pt: "Guia Adventure Abroad: Tokyo",
    title_pl: "Poradnik Adventure Abroad: Tokyo",
    title_id: "Panduan Adventure Abroad: Tokyo",
    title_ru: "Гайд Adventure Abroad: Tokyo",
    title_de: "Adventure Abroad: Tokyo Leitfaden",
    description: "Guide complet de l'événement Adventure Abroad Tokyo. Warmup, système de conquête, Metro, événements et récompenses.",
    description_en: "Complete guide to the Adventure Abroad Tokyo event. Warmup, conquest system, Metro, events and rewards.",
    description_it: "Guida completa dell'evento Adventure Abroad Tokyo. Warmup, sistema di conquista, Metro, eventi e ricompense.",
    description_es: "Guía completa del evento Adventure Abroad Tokyo. Warmup, sistema de conquista, Metro, eventos y recompensas.",
    description_pt: "Guia completo do evento Adventure Abroad Tokyo. Warmup, sistema de conquista, Metro, eventos e recompensas.",
    description_pl: "Kompletny poradnik wydarzenia Adventure Abroad Tokyo. Warmup, system podboju, Metro, wydarzenia i nagrody.",
    description_id: "Panduan lengkap acara Adventure Abroad Tokyo. Warmup, sistem penaklukan, Metro, acara dan hadiah.",
    description_ru: "Полный гайд по событию Adventure Abroad Tokyo. Warmup, система завоевания, Metro, события и награды.",
    description_de: "Vollständiger Leitfaden zum Adventure Abroad Tokyo-Event. Warmup, Eroberungssystem, Metro, Ereignisse und Belohnungen.",
    icon: "🗼",
    color: "#ef4444",
    category: "Événements",
    category_en: "Events",
    category_it: "Eventi",
    category_es: "Eventos",
    category_pt: "Eventos",
    category_pl: "Wydarzenia",
    category_id: "Acara",
    category_ru: "События",
    category_de: "Events",
    readTime: "12 min",
    content: `
## Guide Adventure Abroad : Tokyo

### Explication courte
Tokyo est la première aventure Abroad de Top Girl. C'est aussi la première grande étape du jeu après la phase initiale sur le serveur d'origine. L'événement commence par Tokyo Warmup, puis continue avec 3 semaines sur une nouvelle map. Tokyo reprend la logique de conquête du début du jeu, avec des Landmarks, des UR, et un objectif final : la Tokyo Tower.

### Explication longue

#### Tokyo dans la structure du jeu
Tokyo est la première aventure après la phase de départ sur le serveur d'origine. C'est la base de toutes les aventures Abroad. Pour bien comprendre Tokyo, il faut aussi lire le [Guide de la structure du jeu](/fr/guides/structure-du-jeu/).

Tokyo revient ensuite par cycle dans le jeu : Tokyo, puis Tokyo 2, puis Tokyo 3, etc. Le premier Tokyo est très important car il pose les bases de progression pour la suite du jeu.

#### Tokyo Warmup
Avant d'entrer sur la map de Tokyo, il y a une semaine de préparation : Tokyo Warmup.

Pendant ce Warmup :
- 6 serveurs sont regroupés
- lors du premier Tokyo, les serveurs sont en général regroupés avec des serveurs du même âge
- Le Warmup donne déjà des récompenses très importantes :
  - Les 25 premiers peuvent débloquer **Chizuru**
  - **Chizuru** est la première artiste avec un sort de rally capacity
  - Le serveur qui finit 1er gagne un bonus de **+10% de stats** pendant toute l'aventure Tokyo
  - Les serveurs 2e et 3e gagnent un bonus de **+5% de stats**

Le Warmup est donc très important. Bien performer avant même l'ouverture de la map donne un vrai avantage pour toute l'aventure.

#### Fonctionnement général de Tokyo
Tokyo dure **3 semaines** sur une nouvelle map dédiée.

Le système général ressemble à la première phase du jeu :
- Placement du HQ
- Farm de ressources
- Progression sur la map
- Conquête de Landmarks
- Bataille pour des UR
- Objectif final de contrôle

La grande différence est que Tokyo se joue dans un environnement Abroad, avec plusieurs serveurs, plus de pression, et plus de coordination nécessaire.

L'objectif final de l'aventure est la **Tokyo Tower**, qui joue un rôle similaire au Burj Khalifa sur le serveur d'origine.

#### Les nouveaux systèmes de Tokyo

**Le métro** — Tokyo introduit le Metro. Ce système permet d'obtenir des boosts, des récompenses et une progression supplémentaire pendant l'aventure. Voir le [Guide Metro & Subway](/fr/guides/event-metro-subway/).

**Les bâtiments de Tokyo** — Tokyo ajoute aussi des bâtiments spécifiques. Ces bâtiments génèrent de l'expérience selon le niveau des shops et ton niveau de Management. Cela rend la stat Management / Economy encore plus importante dans cette aventure.

#### Importance du groupe à Tokyo
Tokyo punit beaucoup les serveurs mal organisés. Les serveurs qui ont de mauvais leaders, des conflits internes, un manque de coordination ou des groupes qui ne coopèrent pas souffrent énormément pendant Tokyo.

Comme les transferts arrivent bien plus tard, un mauvais départ peut coûter très cher. Tokyo récompense donc les serveurs unis, actifs et bien organisés.

#### Chronologie de Tokyo

**Arrivée à Tokyo** — Au début de l'aventure, il faut positionner le HQ, commencer à farm rapidement et avancer comme sur le serveur d'origine. À l'arrivée, il y a aussi différents packages, un event de recharge, et **Kokoro** dans le Tokyo Shop. Kokoro est une artiste importante pour la composition EDM très forte au début du jeu. Il y a aussi le début de l'événement **Who is the richest in Tokyo?**.

**Semaine 1** — La première semaine contient : Ultimate CEO, Ayaka dans la Slot Machine, la phase initiale dans la Chamber, début du Stock Market au day 3, ouverture du toll 1 au day 4, ouverture des premières zones partagées avec d'autres serveurs et premiers Landmarks contestés. La Chamber est la zone sûre de ton serveur au début de Tokyo.

**Semaine 2** — La deuxième semaine contient : les batailles pour les UR, le Dice Event avec Sora, Ultimate Group Event et Versus Event. C'est une semaine de forte montée en tension. La coordination de groupe devient encore plus importante.

**Semaine 3** — La troisième semaine contient : un nouvel Ultimate CEO, Yuuko dans la Slot Machine, l'ouverture de la dernière zone et la bataille finale pour la Tokyo Tower. C'est la phase décisive de l'aventure.

#### Classements pendant Tokyo
Pendant tout Tokyo, il existe plusieurs classements : individuel, group et chamber.

Pour marquer des points dans l'événement, il faut notamment :
- Collecter de l'or dans les hotels
- Faire des concerts
- Faire des stadium
- Tuer des fans
- Dépenser de l'argent dans les lignes de métro

Tokyo ne se résume donc pas à la conquête de map. Il faut aussi scorer régulièrement dans les systèmes annexes.
`,
    content_en: `
## Adventure Abroad: Tokyo Guide

### Short Explanation
Tokyo is the first Abroad adventure in Top Girl. It's also the first major step in the game after the initial phase on the home server. The event starts with Tokyo Warmup, then continues with 3 weeks on a new map. Tokyo follows the conquest logic of the early game, with Landmarks, URs, and a final objective: the Tokyo Tower.

### Long Explanation

#### Tokyo in the Game Structure
Tokyo is the first adventure after the departure phase on the home server. It's the foundation of all Abroad adventures. To understand Tokyo well, you should also read the [Game Structure Guide](/en/guides/structure-du-jeu/).

Tokyo then returns in cycles: Tokyo, then Tokyo 2, then Tokyo 3, etc. The first Tokyo is very important because it sets the progression foundations for the rest of the game.

#### Tokyo Warmup
Before entering the Tokyo map, there's a preparation week: Tokyo Warmup.

During this Warmup:
- 6 servers are grouped together
- During the first Tokyo, servers are generally matched with servers of similar age
- The Warmup already gives very important rewards:
  - The top 25 can unlock **Chizuru**
  - **Chizuru** is the first artist with a rally capacity skill
  - The server that finishes 1st gains a **+10% stats bonus** for the entire Tokyo adventure
  - Servers finishing 2nd and 3rd gain a **+5% stats bonus**

The Warmup is therefore very important. Performing well before the map opens gives a real advantage for the entire adventure.

#### General Tokyo Operation
Tokyo lasts **3 weeks** on a dedicated new map.

The general system resembles the early game phase:
- HQ placement
- Resource farming
- Map progression
- Landmarks conquest
- Battles for URs
- Final control objective

The big difference is that Tokyo is played in an Abroad environment, with multiple servers, more pressure, and more coordination needed.

The final objective of the adventure is the **Tokyo Tower**, which plays a similar role to the Burj Khalifa on the home server.

#### New Systems in Tokyo

**The Metro** — Tokyo introduces the Metro. This system allows you to get boosts, rewards and additional progression during the adventure. See the [Metro & Subway Guide](/en/guides/event-metro-subway/).

**Tokyo Buildings** — Tokyo also adds specific buildings. These buildings generate experience based on shop levels and your Management level. This makes the Management / Economy stat even more important in this adventure.

#### Group Importance in Tokyo
Tokyo heavily punishes poorly organized servers. Servers with bad leaders, internal conflicts, lack of coordination, or groups that don't cooperate suffer greatly during Tokyo.

Since transfers come much later, a bad start can be very costly. Tokyo rewards servers that are united, active, and well organized.

#### Tokyo Timeline

**Arrival at Tokyo** — At the start of the adventure, you need to position the HQ, start farming quickly, and progress as on the home server. On arrival, there are also various packages, a recharge event, and **Kokoro** in the Tokyo Shop. Kokoro is an important artist for the very strong early-game EDM composition. There's also the start of the **Who is the richest in Tokyo?** event.

**Week 1** — The first week contains: Ultimate CEO, Ayaka in the Slot Machine, the initial phase in the Chamber, Stock Market start on day 3, toll 1 opening on day 4, opening of the first shared zones with other servers, and first contested Landmarks. The Chamber is your server's safe zone at the start of Tokyo.

**Week 2** — The second week contains: battles for URs, the Dice Event with Sora, Ultimate Group Event, and Versus Event. It's a week of high tension. Group coordination becomes even more important.

**Week 3** — The third week contains: a new Ultimate CEO, Yuuko in the Slot Machine, opening of the last zone, and the final battle for the Tokyo Tower. This is the decisive phase of the adventure.

#### Rankings During Tokyo
Throughout Tokyo, there are several rankings: individual, group, and chamber.

To score points in the event, you mainly need to:
- Collect gold from hotels
- Do concerts
- Do stadium rallies
- Kill fans
- Spend money on metro lines

Tokyo is therefore not just about map conquest. You also need to score regularly in the ancillary systems.
`,
    content_it: `
## Guida Adventure Abroad: Tokyo

### Breve Spiegazione
Tokyo è la prima avventura Abroad in Top Girl. È anche il primo grande passo nel gioco dopo la fase iniziale sul server home. L'evento inizia con Tokyo Warmup, poi continua con 3 settimane su una nuova mappa. Tokyo segue la logica di conquista dell'inizio del gioco, con Landmarks, UR e un obiettivo finale: la Tokyo Tower.

### Spiegazione Dettagliata

#### Tokyo nella Struttura del Gioco
Tokyo è la prima avventura dopo la fase iniziale sul server home. È la base di tutte le avventure Abroad. Per capire bene Tokyo, dovresti anche leggere la [Guida Struttura del Gioco](/it/guides/structure-du-jeu/).

Tokyo poi ritorna in cicli: Tokyo, poi Tokyo 2, poi Tokyo 3, ecc. Il primo Tokyo è molto importante perché pone le basi di progressione per il resto del gioco.

#### Tokyo Warmup
Prima di entrare nella mappa di Tokyo, c'è una settimana di preparazione: Tokyo Warmup.

Durante questo Warmup:
- 6 server vengono raggruppati
- durante il primo Tokyo, i server sono generalmente abbinati con server di età simile
- Il Warmup dà già ricompense molto importanti:
  - I primi 25 possono sbloccare **Chizuru**
  - **Chizuru** è la prima artista con una skill di rally capacity
  - Il server che finisce 1° guadagna un bonus di **+10% di stats** per tutta l'avventura Tokyo
  - I server che finiscono 2° e 3° guadagnano un bonus di **+5% di stats**

Il Warmup è quindi molto importante. Performare bene prima dell'apertura della mappa dà un vero vantaggio per tutta l'avventura.

#### Funzionamento Generale di Tokyo
Tokyo dura **3 settimane** su una nuova mappa dedicata.

Il sistema generale assomiglia alla fase iniziale del gioco:
- Posizionamento del HQ
- Farming di risorse
- Progressione sulla mappa
- Conquista di Landmarks
- Battaglie per UR
- Obiettivo finale di controllo

La grande differenza è che Tokyo si gioca in un ambiente Abroad, con più server, più pressione e più coordinazione necessaria.

L'obiettivo finale dell'avventura è la **Tokyo Tower**, che ha un ruolo simile al Burj Khalifa sul server home.

#### Sistemi Nuovi in Tokyo

**Il Metro** — Tokyo introduce il Metro. Questo sistema permette di ottenere boost, ricompense e progressione aggiuntiva durante l'avventura. Vedi la [Guida Metro & Subway](/it/guides/event-metro-subway/).

**Edifici di Tokyo** — Tokyo aggiunge anche edifici specifici. Questi edifici generano esperienza in base al livello degli shop e al tuo livello di Management. Questo rende la stat Management / Economy ancora più importante in questa avventura.

#### Importanza del Gruppo a Tokyo
Tokyo punisce molto i server mal organizzati. I server con cattivi leader, conflitti interni, mancanza di coordinazione o gruppi che non cooperano soffrono enormemente durante Tokyo.

Poiché i trasferimenti arrivano molto dopo, una cattiva partenza può costare molto caro. Tokyo premia i server uniti, attivi e ben organizzati.

#### Timeline di Tokyo

**Arrivo a Tokyo** — All'inizio dell'avventura, devi posizionare il HQ, iniziare a farmare rapidamente e avanzare come sul server home. All'arrivo, ci sono anche vari pacchetti, un evento di ricarica e **Kokoro** nel Tokyo Shop. Kokoro è un'artista importante per la composizione EDM molto forte all'inizio del gioco. C'è anche l'inizio dell'evento **Who is the richest in Tokyo?**.

**Settimana 1** — La prima settimana contiene: Ultimate CEO, Ayaka nella Slot Machine, la fase iniziale nella Chamber, inizio del Stock Market al giorno 3, apertura del pedaggio 1 al giorno 4, apertura delle prime zone condivise con altri server e primi Landmarks contesi. La Chamber è la zona sicura del tuo server all'inizio di Tokyo.

**Settimana 2** — La seconda settimana contiene: battaglie per UR, il Dice Event con Sora, Ultimate Group Event e Versus Event. È una settimana di forte aumento della tensione. La coordinazione del gruppo diventa ancora più importante.

**Settimana 3** — La terza settimana contiene: un nuovo Ultimate CEO, Yuuko nella Slot Machine, apertura dell'ultima zona e la battaglia finale per la Tokyo Tower. Questa è la fase decisiva dell'avventura.

#### Classifiche Durante Tokyo
Durante tutto Tokyo, ci sono diverse classifiche: individuale, gruppo e camera.

Per segnare punti nell'evento, devi principalmente:
- Raccogliere oro dagli hotel
- Fare concerti
- Fare stadium rally
- Uccidere fan
- Spendere soldi sulle linee metropolitane

Tokyo quindi non si riduce alla conquista della mappa. Devi anche segnare regolarmente nei sistemi annessi.
`,
    content_es: `
## Guía Adventure Abroad: Tokyo

### Explicación Corta
Tokyo es la primera aventura Abroad en Top Girl. También es el primer paso importante en el juego después de la fase inicial en el servidor local. El evento comienza con Tokyo Warmup, luego continúa con 3 semanas en un nuevo mapa. Tokyo sigue la lógica de conquista del inicio del juego, con Landmarks, UR y un objetivo final: la Tokyo Tower.

### Explicación Larga

#### Tokyo en la Estructura del Juego
Tokyo es la primera aventura después de la fase inicial en el servidor local. Es la base de todas las aventuras Abroad. Para entender bien Tokyo, también deberías leer la [Guía de Estructura del Juego](/es/guides/structure-du-jeu/).

Tokyo luego regresa en ciclos: Tokyo, luego Tokyo 2, luego Tokyo 3, etc. El primer Tokyo es muy importante porque establece las bases de progresión para el resto del juego.

#### Tokyo Warmup
Antes de entrar en el mapa de Tokyo, hay una semana de preparación: Tokyo Warmup.

Durante este Warmup:
- 6 servidores se agrupan
- durante el primer Tokyo, los servidores generalmente se emparejan con servidores de edad similar
- El Warmup ya da recompensas muy importantes:
  - Los primeros 25 pueden desbloquear **Chizuru**
  - **Chizuru** es la primera artista con una habilidad de rally capacity
  - El servidor que termina 1° gana un bono de **+10% de stats** durante toda la aventura Tokyo
  - Los servidores que terminan 2° y 3° ganan un bono de **+5% de stats**

El Warmup es muy importante. Performar bien antes de la apertura del mapa da una ventaja real para toda la aventura.

#### Funcionamiento General de Tokyo
Tokyo dura **3 semanas** en un nuevo mapa dedicado.

El sistema general se parece a la fase inicial del juego:
- Colocación del HQ
- Farming de recursos
- Progresión en el mapa
- Conquista de Landmarks
- Batallas por UR
- Objetivo final de control

La gran diferencia es que Tokyo se juega en un entorno Abroad, con múltiples servidores, más presión y más coordinación necesaria.

El objetivo final de la aventura es la **Tokyo Tower**, que tiene un papel similar al Burj Khalifa en el servidor local.

#### Sistemas Nuevos en Tokyo

**El Metro** — Tokyo introduce el Metro. Este sistema permite obtener boosts, recompensas y progresión adicional durante la aventura. Ver la [Guía Metro & Subway](/es/guides/event-metro-subway/).

**Edificios de Tokyo** — Tokyo también añade edificios específicos. Estos edificios generan experiencia según el nivel de las tiendas y tu nivel de Management. Esto hace que la stat Management / Economy sea aún más importante en esta aventura.

#### Importancia del Grupo en Tokyo
Tokyo castiga mucho a los servidores mal organizados. Los servidores con malos líderes, conflictos internos, falta de coordinación o grupos que no cooperan sufren enormemente durante Tokyo.

Como las transferencias llegan mucho después, un mal comienzo puede costar muy caro. Tokyo premia a los servidores unidos, activos y bien organizados.

#### Cronología de Tokyo

**Llegada a Tokyo** — Al principio de la aventura, necesitas posicionar el HQ, empezar a farmear rápidamente y avanzar como en el servidor local. A la llegada, también hay varios paquetes, un evento de recarga y **Kokoro** en la Tokyo Shop. Kokoro es una artista importante para la composición EDM muy fuerte al principio del juego. También está el inicio del evento **Who is the richest in Tokyo?**.

**Semana 1** — La primera semana contiene: Ultimate CEO, Ayaka en la Slot Machine, la fase inicial en la Chamber, inicio del Stock Market en el día 3, apertura del peaje 1 en el día 4, apertura de las primeras zonas compartidas con otros servidores y primeros Landmarks disputados. La Chamber es la zona segura de tu servidor al principio de Tokyo.

**Semana 2** — La segunda semana contiene: batallas por UR, el Dice Event con Sora, Ultimate Group Event y Versus Event. Es una semana de fuerte aumento de tensión. La coordinación del grupo se vuelve aún más importante.

**Semana 3** — La tercera semana contiene: un nuevo Ultimate CEO, Yuuko en la Slot Machine, apertura de la última zona y la batalla final por la Tokyo Tower. Esta es la fase decisiva de la aventura.

#### Clasificaciones Durante Tokyo
Durante todo Tokyo, hay varias clasificaciones: individual, grupo y cámara.

Para puntuar en el evento, necesitas principalmente:
- Recolectar oro de los hoteles
- Hacer conciertos
- Hacer stadium rallies
- Matar fans
- Gastar dinero en las líneas de metro

Tokyo no se reduce a la conquista del mapa. También necesitas puntuar regularmente en los sistemas anexos.
`,
    content_pt: `
## Guia Adventure Abroad: Tokyo

### Explicação Curta
Tokyo é a primeira aventura Abroad em Top Girl. Também é o primeiro grande passo no jogo após a fase inicial no servidor local. O evento começa com Tokyo Warmup, depois continua com 3 semanas em um novo mapa. Tokyo segue a lógica de conquista do início do jogo, com Landmarks, UR e um objetivo final: a Tokyo Tower.

### Explicação Longa

#### Tokyo na Estrutura do Jogo
Tokyo é a primeira aventura após a fase inicial no servidor local. É a base de todas as aventuras Abroad. Para entender bem Tokyo, você também deve ler o [Guia de Estrutura do Jogo](/pt/guides/structure-du-jeu/).

Tokyo depois retorna em ciclos: Tokyo, depois Tokyo 2, depois Tokyo 3, etc. O primeiro Tokyo é muito importante porque estabelece as bases de progressão para o resto do jogo.

#### Tokyo Warmup
Antes de entrar no mapa de Tokyo, há uma semana de preparação: Tokyo Warmup.

Durante este Warmup:
- 6 servidores são agrupados
- durante o primeiro Tokyo, os servidores geralmente são pareados com servidores de idade similar
- O Warmup já dá recompensas muito importantes:
  - Os primeiros 25 podem desbloquear **Chizuru**
  - **Chizuru** é a primeira artista com uma habilidade de rally capacity
  - O servidor que termina em 1° ganha um bônus de **+10% de stats** durante toda a aventura Tokyo
  - Os servidores que terminam em 2° e 3° ganham um bônus de **+5% de stats**

O Warmup é muito importante. Performar bem antes da abertura do mapa dá uma vantagem real para toda a aventura.

#### Funcionamento Geral de Tokyo
Tokyo dura **3 semanas** em um novo mapa dedicado.

O sistema geral se parece com a fase inicial do jogo:
- Posicionamento do HQ
- Farming de recursos
- Progressão no mapa
- Conquista de Landmarks
- Batalhas por UR
- Objetivo final de controle

A grande diferença é que Tokyo é jogado em um ambiente Abroad, com múltiplos servidores, mais pressão e mais coordenação necessária.

O objetivo final da aventura é a **Tokyo Tower**, que tem um papel similar ao Burj Khalifa no servidor local.

#### Sistemas Novos em Tokyo

**O Metro** — Tokyo introduz o Metro. Este sistema permite obter boosts, recompensas e progressão adicional durante a aventura. Ver o [Guia Metro & Subway](/pt/guides/event-metro-subway/).

**Edifícios de Tokyo** — Tokyo também adiciona edifícios específicos. Estes edifícios geram experiência de acordo com o nível das lojas e seu nível de Management. Isso torna a stat Management / Economy ainda mais importante nesta aventura.

#### Importância do Grupo em Tokyo
Tokyo pune muito os servidores mal organizados. Servidores com maus líderes, conflitos internos, falta de coordenação ou grupos que não cooperam sofrem enormemente durante Tokyo.

Como as transferências chegam muito depois, um mau começo pode custar muito caro. Tokyo premia os servidores unidos, ativos e bem organizados.

#### Cronologia de Tokyo

**Chegada a Tokyo** — No início da aventura, você precisa posicionar o HQ, começar a farmear rapidamente e avançar como no servidor local. Na chegada, também há vários pacotes, um evento de recarga e **Kokoro** na Tokyo Shop. Kokoro é uma artista importante para a composição EDM muito forte no início do jogo. Também há o início do evento **Who is the richest in Tokyo?**.

**Semana 1** — A primeira semana contém: Ultimate CEO, Ayaka na Slot Machine, a fase inicial na Chamber, início do Stock Market no dia 3, abertura do pedágio 1 no dia 4, abertura das primeiras zonas compartilhadas com outros servidores e primeiros Landmarks disputados. A Chamber é a zona segura do seu servidor no início de Tokyo.

**Semana 2** — A segunda semana contém: batalhas por UR, o Dice Event com Sora, Ultimate Group Event e Versus Event. É uma semana de forte aumento de tensão. A coordenação do grupo se torna ainda mais importante.

**Semana 3** — A terceira semana contém: um novo Ultimate CEO, Yuuko na Slot Machine, abertura da última zona e a batalha final pela Tokyo Tower. Esta é a fase decisiva da aventura.

#### Classificações Durante Tokyo
Durante todo Tokyo, há várias classificações: individual, grupo e câmara.

Para pontuar no evento, você precisa principalmente:
- Coletar ouro dos hotéis
- Fazer shows
- Fazer stadium rallies
- Matar fans
- Gastar dinheiro nas linhas de metrô

Tokyo não se resume à conquista do mapa. Você também precisa pontuar regularmente nos sistemas anexos.
`,
    content_pl: `
## Poradnik Adventure Abroad: Tokyo

### Krótkie wyjaśnienie
Tokyo jest pierwszą przygodą Abroad w Top Girl. To również pierwszy duży krok w grze po fazie początkowej na serwerze domowym. Wydarzenie rozpoczyna się od Tokyo Warmup, a następnie trwa 3 tygodnie na nowej mapie. Tokyo podąża za logiką podboju z początku gry, z Landmarks, UR i końcowym celem: Tokyo Tower.

### Długie wyjaśnienie

#### Tokyo w strukturze gry
Tokyo jest pierwszą przygodą po fazie początkowej na serwerze domowym. To fundament wszystkich przygód Abroad. Aby dobrze zrozumieć Tokyo, powinieneś również przeczytać [Poradnik Struktury Gry](/pl/guides/structure-du-jeu/).

Tokyo następnie powraca w cyklach: Tokyo, potem Tokyo 2, potem Tokyo 3, itp. Pierwsze Tokyo jest bardzo ważne, ponieważ stanowi podstawy progresji na resztę gry.

#### Tokyo Warmup
Przed wejściem na mapę Tokyo jest tydzień przygotowawczy: Tokyo Warmup.

Podczas tego Warmup:
- 6 serwerów jest grupowanych razem
- podczas pierwszego Tokyo serwery są generalnie dopasowywane z serwerami podobnego wieku
- Warmup daje już bardzo ważne nagrody:
  - Pierwsze 25 może odblokować **Chizuru**
  - **Chizuru** jest pierwszą artystką ze zdolnością rally capacity
  - Serwer który skończy 1. zdobywa bonus **+10% statów** na całą przygodę Tokyo
  - Serwery które skończą 2. i 3. zdobywają bonus **+5% statów**

Warmup jest więc bardzo ważny. Dobra forma przed otwarciem mapy daje prawdziwą przewagę na całą przygodę.

#### Ogólne działanie Tokyo
Tokyo trwa **3 tygodnie** na dedykowanej nowej mapie.

Ogólny system przypomina fazę początkową gry:
- Umiejscowienie HQ
- Farming zasobów
- Progresja na mapie
- Podbój Landmarks
- Walki o UR
- Końcowy cel kontrolny

Duża różnica polega na tym, że Tokyo jest grane w środowisku Abroad, z wieloma serwerami, większą presją i większą potrzebą koordynacji.

Końcowym celem przygody jest **Tokyo Tower**, która pełni podobną rolę co Burj Khalifa na serwerze domowym.

#### Nowe systemy w Tokyo

**Metro** — Tokyo wprowadza Metro. Ten system pozwala uzyskać boosty, nagrody i dodatkową progresję podczas przygody. Zobacz [Poradnik Metro & Subway](/pl/guides/event-metro-subway/).

**Budynki Tokyo** — Tokyo dodaje również specyficzne budynki. Te budynki generują doświadczenie na podstawie poziomu sklepów i Twojego poziomu Management. To sprawia, że stat Management / Economy jest jeszcze ważniejszy w tej przygodzie.

#### Znaczenie grupy w Tokyo
Tokyo bardzo karze słabo zorganizowane serwery. Serwery z złymi liderami, konfliktami wewnętrznymi, brakiem koordynacji lub grupami które nie współpracują cierpią ogromnie podczas Tokyo.

Ponieważ transfery przychodzą dużo później, zły start może być bardzo kosztowny. Tokyo nagradza serwery które są zjednoczone, aktywne i dobrze zorganizowane.

#### Oś czasu Tokyo

**Przybycie do Tokyo** — Na początku przygody musisz umiejscowić HQ, zacząć szybko farmić i awansować jak na serwerze domowym. Po przybyciu są również różne pakiety, wydarzenie doładowania i **Kokoro** w Tokyo Shop. Kokoro jest ważną artystką dla bardzo silnej wczesnej kompozycji EDM. Jest również początek wydarzenia **Who is the richest in Tokyo?**.

**Tydzień 1** — Pierwszy tydzień zawiera: Ultimate CEO, Ayaka w Slot Machine, początkowa faza w Chamber, start Stock Market w dzień 3, otwarcie opłaty 1 w dzień 4, otwarcie pierwszych stref dzielonych z innymi serwerami i pierwsze kwestionowane Landmarks. Chamber jest bezpieczną strefą Twojego serwera na początku Tokyo.

**Tydzień 2** — Drugi tydzień zawiera: walki o UR, Dice Event z Sora, Ultimate Group Event i Versus Event. To tydzień silnego wzrostu napięcia. Koordynacja grupy staje się jeszcze ważniejsza.

**Tydzień 3** — Trzeci tydzień zawiera: nowe Ultimate CEO, Yuuko w Slot Machine, otwarcie ostatniej strefy i ostateczna walka o Tokyo Tower. To decydująca faza przygody.

#### Rankingi podczas Tokyo
Przez całe Tokyo istnieją różne rankingi: indywidualny, grupowy i chamber.

Aby zdobywać punkty w wydarzeniu, musisz głównie:
- Zbierać złoto z hoteli
- Robić koncerty
- Robić stadium rally
- Zabijać fanów
- Wydawać pieniądze na liniach metra

Tokyo nie ogranicza się więc do podboju mapy. Musisz też regularnie zdobywać punkty w systemach pomocniczych.
`,
    content_id: `
## Panduan Adventure Abroad: Tokyo

### Penjelasan Singkat
Tokyo adalah petualangan Abroad pertama di Top Girl. Ini juga langkah besar pertama dalam permainan setelah fase awal di server rumah. Acara dimulai dengan Tokyo Warmup, lalu berlanjut dengan 3 minggu di peta baru. Tokyo mengikuti logika penaklukan dari awal permainan, dengan Landmarks, UR, dan tujuan akhir: Tokyo Tower.

### Penjelasan Panjang

#### Tokyo dalam Struktur Permainan
Tokyo adalah petualangan pertama setelah fase awal di server rumah. Ini adalah fondasi dari semua petualangan Abroad. Untuk memahami Tokyo dengan baik, Anda juga harus membaca [Panduan Struktur Permainan](/id/guides/structure-du-jeu/).

Tokyo kemudian kembali dalam siklus: Tokyo, lalu Tokyo 2, lalu Tokyo 3, dll. Tokyo pertama sangat penting karena menetapkan fondasi progresi untuk sisa permainan.

#### Tokyo Warmup
Sebelum memasuki peta Tokyo, ada minggu persiapan: Tokyo Warmup.

Selama Warmup ini:
- 6 server dikelompokkan bersama
- selama Tokyo pertama, server umumnya dicocokkan dengan server usia serupa
- Warmup sudah memberikan hadiah yang sangat penting:
  - 25 teratas dapat membuka **Chizuru**
  - **Chizuru** adalah artis pertama dengan skill rally capacity
  - Server yang finishes 1st mendapat bonus **+10% stats** selama seluruh petualangan Tokyo
  - Server yang finishes 2nd dan 3rd mendapat bonus **+5% stats**

Warmup sangat penting. Performanya dengan baik sebelum pembukaan peta memberikan keuntungan nyata untuk seluruh petualangan.

#### Pengoperasian Umum Tokyo
Tokyo berlangsung **3 minggu** di peta baru yang ditentukan.

Sistem umum menyerupai fase awal permainan:
- Penempatan HQ
- Farming sumber daya
- Progresi di peta
- Penaklukan Landmarks
- Pertempuran untuk UR
- Tujuan kontrol akhir

Perbedaan besar adalah Tokyo dimainkan di lingkungan Abroad, dengan banyak server, lebih banyak tekanan, dan lebih banyak koordinasi yang diperlukan.

Tujuan akhir petualangan adalah **Tokyo Tower**, yang memainkan peran serupa dengan Burj Khalifa di server rumah.

#### Sistem Baru di Tokyo

**Metro** — Tokyo memperkenalkan Metro. Sistem ini memungkinkan Anda mendapatkan boost, hadiah, dan progresi tambahan selama petualangan. Lihat [Panduan Metro & Subway](/id/guides/event-metro-subway/).

**Bangunan Tokyo** — Tokyo juga menambahkan bangunan spesifik. Bangunan-bangunan ini menghasilkan pengalaman berdasarkan tingkat toko dan tingkat Management Anda. Ini membuat stat Management / Economy menjadi lebih penting dalam petualangan ini.

#### Pentingnya Grup di Tokyo
Tokyo sangat menghukum server yang tidak terorganisir dengan baik. Server dengan pemimpin buruk, konflik internal, kurang koordinasi, atau grup yang tidak bekerja sama sangat menderita selama Tokyo.

Karena transfer datang jauh kemudian, awal yang buruk bisa sangat mahal. Tokyo memberi penghargaan kepada server yang bersatu, aktif, dan terorganisir dengan baik.

#### Timeline Tokyo

**Kedatangan di Tokyo** — Di awal petualangan, Anda perlu memposisikan HQ, mulai farming dengan cepat, dan maju seperti di server rumah. Saat kedatangan, ada juga berbagai paket, acara isi ulang, dan **Kokoro** di Tokyo Shop. Kokoro adalah artis penting untuk komposisi EDM yang sangat kuat di awal permainan. Ada juga awal acara **Who is the richest in Tokyo?**.

**Minggu 1** — Minggu pertama berisi: Ultimate CEO, Ayaka di Slot Machine, fase awal di Chamber, awal Stock Market di hari 3, pembukaan toll 1 di hari 4, pembukaan zona pertama yang dibagikan dengan server lain dan Landmarks pertama yang disengketakan. Chamber adalah zona aman server Anda di awal Tokyo.

**Minggu 2** — Minggu kedua berisi: pertempuran untuk UR, Dice Event dengan Sora, Ultimate Group Event dan Versus Event. Ini adalah minggu dengan peningkatan ketegangan yang kuat. Koordinasi grup menjadi lebih penting.

**Minggu 3** — Minggu ketiga berisi: Ultimate CEO baru, Yuuko di Slot Machine, pembukaan zona terakhir dan pertempuran akhir untuk Tokyo Tower. Ini adalah fase décisif dari petualangan.

#### Peringkat Selama Tokyo
Sepanjang Tokyo, ada beberapa peringkat: individu, grup, dan chamber.

Untuk mendapatkan poin dalam acara, Anda terutama perlu:
- Mengumpulkan emas dari hotel
- Melakukan konser
- Melakukan rally stadium
- Membunuh fans
- Menghabiskan uang di jalur metro

Tokyo tidak hanya tentang penaklukan peta. Anda juga perlu mendapatkan poin secara teratur di sistem tambahan.
`,
    content_de: `
## Adventure Abroad: Tokyo Leitfaden

### Kurze Erklärung
Tokyo ist das erste Abroad-Abenteuer in Top Girl. Es ist auch der erste große Schritt im Spiel nach der Anfangsphase auf dem Heimat-Server. Das Event beginnt mit Tokyo Warmup und setzt sich dann 3 Wochen lang auf einer neuen Karte fort. Tokyo folgt der Eroberungslogik des Spielanfangs, mit Landmarks, URs und einem Endziel: dem Tokyo Tower.

### Lange Erklärung

#### Tokyo in der Spielstruktur
Tokyo ist das erste Abenteuer nach der Startphase auf dem Heimat-Server. Es ist die Basis aller Abroad-Abenteuer. Um Tokyo gut zu verstehen, solltest du auch den [Spielstruktur-Leitfaden](/de/guides/structure-du-jeu/) lesen.

Tokyo kehrt dann in Zyklen zurück: Tokyo, dann Tokyo 2, dann Tokyo 3, usw. Das erste Tokyo ist sehr wichtig, da es die Grundlagen für den Fortschritt im weiteren Spielverlauf legt.

#### Tokyo Warmup
Bevor du auf die Tokyo-Karte kommst, gibt es eine Vorbereitungswoche: Tokyo Warmup.

Während dieses Warmups:
- 6 Server werden zusammengefasst
- beim ersten Tokyo werden Server normalerweise mit Servern ähnlichen Alters zusammengefasst
- Das Warmup gibt bereits sehr wichtige Belohnungen:
  - Die Top 25 können **Chizuru** freischalten
  - **Chizuru** ist die erste Künstlerin mit einer Rally-Capacity-Fähigkeit
  - Der Server, der den 1. Platz belegt, erhält einen Bonus von **+10% Stats** während des gesamten Tokyo-Abenteuers
  - Server auf Platz 2 und 3 erhalten einen Bonus von **+5% Stats**

Das Warmup ist also sehr wichtig. Gut abzuschneiden, bevor die Karte überhaupt geöffnet wird, gibt einen echten Vorteil für das gesamte Abenteuer.

#### Allgemeiner Betrieb von Tokyo
Tokyo dauert **3 Wochen** auf einer neuen, dedizierten Karte.

Das allgemeine System ähnelt der ersten Phase des Spiels:
- HQ-Platzierung
- Ressourcen-Farming
- Fortschritt auf der Karte
- Landmarks erobern
- Kampf um URs
- Finale Kontroll-Ziel

Der große Unterschied ist, dass Tokyo in einer Abroad-Umgebung mit mehreren Servern, mehr Druck und mehr erforderlicher Koordination gespielt wird.

Das Endziel des Abenteuers ist der **Tokyo Tower**, der eine ähnliche Rolle wie das Burj Khalifa auf dem Heimat-Server spielt.

#### Die neuen Systeme von Tokyo

**Die Metro** — Tokyo führt die Metro ein. Dieses System ermöglicht es, Boosts, Belohnungen und zusätzlichen Fortschritt während des Abenteuers zu erhalten. Sieh dir den [Metro & Subway Leitfaden](/de/guides/event-metro-subway/) an.

**Die Tokyo-Gebäude** — Tokyo fügt auch spezifische Gebäude hinzu. Diese Gebäude generieren Erfahrung basierend auf dem Level der Shops und deinem Management-Level. Dies macht die Management/Economy-Stat in diesem Abenteuer noch wichtiger.

#### Die Bedeutung von Gruppen in Tokyo
Tokyo bestraft schlecht organisierte Server stark. Server mit schlechten Anführern, internen Konflikten, fehlender Koordination oder nicht zusammenarbeitenden Gruppen leiden sehr während Tokyo.

Da Transfers erst viel später kommen, kann ein schlechter Start sehr teuer werden. Tokyo belohnt Server, die vereint, aktiv und gut organisiert sind.

#### Tokyo-Zeitplan

**Ankunft in Tokio** — Zu Beginn des Abenteuers musst du dein HQ positionieren, schnell mit dem Farming beginnen und wie auf dem Heimat-Server vorankommen. Bei der Ankunft gibt es auch verschiedene Pakete, Auffüllungs-Events und **Kokoro** im Tokio-Shop. Kokoro ist eine wichtige Künstlerin für eine sehr starke EDM-Zusammensetzung zu Beginn des Spiels. Es gibt auch den Start des Events **Wer ist der Reichste in Tokio?**.

**Woche 1** — Woche 1 enthält: Ultimate CEO, Ayaka im Slot Machine, anfängliche Phase in der Chamber, Beginn des Stock Market am Tag 3, Öffnung des ersten Zolls am Tag 4, Öffnung der ersten Zone, die mit anderen Servern geteilt wird, und erste umstrittene Landmarks. Die Chamber ist deine sichere Server-Zone zu Beginn von Tokio.

**Woche 2** — Woche 2 enthält: Kampf um URs, Dice Event mit Sora, Ultimate Group Event und Versus Event. Dies ist die Woche mit stark steigender Spannung. Gruppenkoordination wird wichtiger.

**Woche 3** — Woche 3 enthält: Neues Ultimate CEO, Yuuko im Slot Machine, Öffnung der letzten Zone und finaler Kampf um den Tokio Tower. Dies ist die entscheidende Phase des Abenteuers.

#### Ranglisten während Tokio
Während Tokio gibt es mehrere Ranglisten: individuell, Gruppe und Chamber.

Um Punkte im Event zu erhalten, musst du hauptsächlich:
- Gold aus Hotels sammeln
- Konzerte geben
- Stadion-Rallys machen
- Fans töten
- Geld auf Metro-Linien ausgeben

Tokyo geht nicht nur um Karten-Eroberung. Du musst auch regelmäßig Punkte in den Zusatzsystemen sammeln.
`,
    content_ru: `
## Гайд Adventure Abroad: Tokyo

### Краткое объяснение
Tokyo — первое приключение Abroad в Top Girl. Это также первый большой шаг в игре после начальной фазы на домашнем сервере. Событие начинается с Tokyo Warmup, затем продолжается 3 недели на новой карте. Tokyo следует логике завоевания начала игры, с Landmarks, UR и конечной целью: Tokyo Tower.

### Подробное объяснение

#### Tokyo в структуре игры
Tokyo — первое приключение после начальной фазы на домашнем сервере. Это основа всех приключений Abroad. Чтобы хорошо понять Tokyo, вам также следует прочитать [Гайд по структуре игры](/ru/guides/structure-du-jeu/).

Tokyo затем возвращается в циклах: Tokyo, затем Tokyo 2, затем Tokyo 3 и т.д. Первый Tokyo очень важен, потому что он закладывает основы прогрессии для остальной игры.

#### Tokyo Warmup
Перед входом на карту Tokyo есть неделя подготовки: Tokyo Warmup.

Во время этого Warmup:
- 6 серверов группируются вместе
- во время первого Tokyo серверы обычно объединяются с серверами схожего возраста
- Warmup уже даёт очень важные награды:
  - Первые 25 могут разблокировать **Chizuru**
  - **Chizuru** — первая артистка со скиллом rally capacity
  - Сервер, занявший 1 место, получает бонус **+10% статов** на всю авантюру Tokyo
  - Серверы, занявшие 2 и 3 места, получают бонус **+5% статов**

Warmup очень важен. Хорошая игра до открытия карты даёт реальное преимущество на всю авантюру.

#### Общая работа Tokyo
Tokyo длится **3 недели** на выделенной новой карте.

Общая система похожа на начальную фазу игры:
- Размещение HQ
- Фарм ресурсов
- Прогресс на карте
- Завоевание Landmarks
- Битвы за UR
- Конечная цель контроля

Большая разница в том, что Tokyo играется в среде Abroad, с несколькими серверами, большим давлением и большей потребностью в координации.

Конечная цель авантюры — **Tokyo Tower**, которая играет роль, аналогичную Бурдж-Халифа на домашнем сервере.

#### Новые системы в Tokyo

**Метро** — Tokyo представляет Метро. Эта система позволяет получать бусты, награды и дополнительный прогресс во время авантюры. См. [Гайд по Metro & Subway](/ru/guides/event-metro-subway/).

**Здания Tokyo** — Tokyo также добавляет специфические здания. Эти здания генерируют опыт в зависимости от уровня магазинов и вашего уровня Management. Это делает стат Management / Economy ещё более важным в этой авантюре.

#### Важность группы в Tokyo
Tokyo сильно наказывает плохо организованные серверы. Серверы с плохими лидерами, внутренними конфликтами, отсутствием координации или группами, которые не сотрудничают, очень страдают во время Tokyo.

Поскольку трансферы приходят намного позже, плохой старт может стоить очень дорого. Tokyo вознаграждает объединённые, активные и хорошо организованные серверы.

#### Хронология Tokyo

**Прибытие в Tokyo** — В начале авантюры вам нужно разместить HQ, быстро начать фармить и продвигаться как на домашнем сервере. По прибытии также есть различные пакеты, событие пополнения и **Kokoro** в Tokyo Shop. Kokoro — важная артистка для очень сильной начальной EDM-композиции. Также есть начало события **Who is the richest in Tokyo?**.

**Неделя 1** — Первая неделя содержит: Ultimate CEO, Ayaka в Slot Machine, начальную фазу в Chamber, начало Stock Market в день 3, открытие toll 1 в день 4, открытие первых общих зон с другими серверами и первые оспариваемые Landmarks. Chamber — безопасная зона вашего сервера в начале Tokyo.

**Неделя 2** — Вторая неделя содержит: битвы за UR, Dice Event с Sora, Ultimate Group Event и Versus Event. Это неделя сильного нарастания напряжения. Координация группы становится ещё важнее.

**Неделя 3** — Третья неделя содержит: новый Ultimate CEO, Yuuko в Slot Machine, открытие последней зоны и финальную битву за Tokyo Tower. Это решающая фаза авантюры.

#### Рейтинги во время Tokyo
На протяжении всего Tokyo существует несколько рейтингов: индивидуальный, групповой и chamber.

Чтобы набирать очки в событии, вам в основном нужно:
- Собирать золото в отелях
- Делать концерты
- Делать stadium rally
- Убивать фанов
- Тратить деньги на линиях метро

Tokyo — это не только завоевание карты. Вам также нужно регулярно набирать очки в дополнительных системах.
`,
    tips: `
- Prépare ton arrivée avant l'ouverture de Tokyo. Regarde la map à l'avance si possible.
- Essaie aussi de contacter rapidement les serveurs voisins ou les groupes proches de ta zone.
- Garde de l'AP avant d'arriver à Tokyo si le classement chamber ou individuel est déjà joué. Cela peut te donner un peu plus de monnaie, ce qui aide beaucoup pour avancer dans le Metro.
- Ne sous-estime pas le Tokyo Warmup. Les bonus de stats et Chizuru peuvent faire une vraie différence sur toute l'aventure.
- Organise ton serveur très tôt. Tokyo punit fortement les serveurs avec des conflits internes.
- Fais attention aux UR de Tokyo. Une Tokyo UR ne peut être liée qu'à une artiste de Tokyo.
- Surveille bien les événements secondaires de Tokyo. Ils donnent souvent des objets exclusifs très importants pour la progression.
`,
    tips_en: `
- Prepare your arrival before Tokyo opens. Look at the map in advance if possible.
- Also try to contact neighboring servers or groups close to your area quickly.
- Save AP before arriving at Tokyo if the chamber or individual ranking is already played. This can give you a bit more currency, which helps a lot for progressing in the Metro.
- Don't underestimate Tokyo Warmup. The stats bonuses and Chizuru can make a real difference throughout the adventure.
- Organize your server very early. Tokyo heavily punishes servers with internal conflicts.
- Be careful with Tokyo URs. A Tokyo UR can only be linked to a Tokyo artist.
- Watch Tokyo's secondary events closely. They often give exclusive items that are very important for progression.
`,
    tips_it: `
- Prepara il tuo arrivo prima dell'apertura di Tokyo. Guarda la mappa in anticipo se possibile.
- Prova anche a contattare rapidamente i server vicini o i gruppi vicini alla tua zona.
- Risparmia AP prima di arrivare a Tokyo se la classifica chamber o individuale è già giocata. Questo può darti un po' più di valuta, il che aiuta molto per avanzare nel Metro.
- Non sottovalutare Tokyo Warmup. I bonus di stats e Chizuru possono fare una vera differenza per tutta l'avventura.
- Organizza il tuo server molto presto. Tokyo punisce pesantemente i server con conflitti interni.
- Fai attenzione agli UR di Tokyo. Un UR di Tokyo può essere collegato solo a un'artista di Tokyo.
- Osserva bene gli eventi secondari di Tokyo. Spesso danno oggetti esclusivi molto importanti per la progressione.
`,
    tips_es: `
- Prepara tu llegada antes de la apertura de Tokyo. Mira el mapa de antemano si es posible.
- También intenta contactar rápidamente con los servidores vecinos o los grupos cercanos a tu zona.
- Ahorra AP antes de llegar a Tokyo si la clasificación chamber o individual ya se ha jugado. Esto puede darte un poco más de moneda, lo cual ayuda mucho para avanzar en el Metro.
- No subestimes Tokyo Warmup. Los bonos de stats y Chizuru pueden hacer una diferencia real durante toda la aventura.
- Organiza tu servidor muy temprano. Tokyo castiga fuertemente a los servidores con conflictos internos.
- Ten cuidado con los UR de Tokyo. Un UR de Tokyo solo puede vincularse a una artista de Tokyo.
- Observa bien los eventos secundarios de Tokyo. A menudo dan objetos exclusivos muy importantes para la progresión.
`,
    tips_pt: `
- Prepare sua chegada antes da abertura de Tokyo. Olhe o mapa com antecedência se possível.
- Também tente contatar rapidamente servidores vizinhos ou grupos próximos da sua zona.
- Economize AP antes de chegar a Tokyo se a classificação chamber ou individual já foi jogada. Isso pode te dar um pouco mais de moeda, o que ajuda muito para avançar no Metro.
- Não subestime Tokyo Warmup. Os bônus de stats e Chizuru podem fazer uma diferença real durante toda a aventura.
- Organize seu servidor muito cedo. Tokyo pune fortemente servidores com conflitos internos.
- Tenha cuidado com os UR de Tokyo. Um UR de Tokyo só pode ser vinculado a uma artista de Tokyo.
- Observe bem os eventos secundários de Tokyo. Eles frequentemente dão objetos exclusivos muito importantes para a progressão.
`,
    tips_pl: `
- Przygotuj swoje przybycie przed otwarciem Tokyo. Sprawdź mapę wcześniej, jeśli to możliwe.
- Spróbuj również szybko skontaktować się z sąsiednimi serwerami lub grupami bliskimi Twojej strefie.
- Oszczędzaj AP przed przybyciem do Tokyo, jeśli ranking chamber lub indywidualny jest już rozegrany. To może dać Ci trochę więcej waluty, co bardzo pomaga w postępie w Metro.
- Nie lekceważ Tokyo Warmup. Bonusy do statów i Chizuru mogą naprawdę zrobić różnicę przez całą przygodę.
- Zorganizuj swój serwer bardzo wcześnie. Tokyo mocno karze serwery z konfliktami wewnętrznymi.
- Uważaj na UR Tokyo. UR Tokyo może być powiązany tylko z artystką Tokyo.
- Uważnie obserwuj drugorzędne wydarzenia Tokyo. Często dają wyłączne przedmioty bardzo ważne dla progresji.
`,
    tips_id: `
- Siapkan kedatangan Anda sebelum pembukaan Tokyo. Lihat peta sebelumnya jika memungkinkan.
- Juga coba hubungi server tetangga atau grup dekat zona Anda dengan cepat.
- Hemat AP sebelum tiba di Tokyo jika ranking chamber atau individu sudah dimainkan. Ini bisa memberi Anda sedikit lebih banyak mata uang, yang sangat membantu untuk maju di Metro.
- Jangan remehkan Tokyo Warmup. Bonus stats dan Chizuru bisa membuat perbedaan nyata sepanjang petualangan.
- Organisir server Anda lebih awal. Tokyo sangat menghukum server dengan konflik internal.
- Berhati-hatilah dengan UR Tokyo. UR Tokyo hanya bisa ditautkan ke artis Tokyo.
- Perhatikan baik-baik acara sekunder Tokyo. Mereka sering memberikan item eksklusif yang sangat penting untuk progresi.
`,
    tips_ru: `
- Подготовьте своё прибытие до открытия Tokyo. Заранее посмотрите карту, если возможно.
- Также попробуйте быстро связаться с соседними серверами или группами рядом с вашей зоной.
- Сэкономьте AP перед прибытием в Tokyo, если рейтинг chamber или индивидуальный уже сыгран. Это может дать вам немного больше валюты, что очень помогает для продвижения в Метро.
- Не недооценивайте Tokyo Warmup. Бонусы к статам и Chizuru могут реально повлиять на всю авантюру.
- Организуйте свой сервер очень рано. Tokyo сильно наказывает серверы с внутренними конфликтами.
- Будьте осторожны с UR Tokyo. UR Tokyo может быть привязан только к артистке Tokyo.
- Внимательно следите за второстепенными событиями Tokyo. Они часто дают эксклюзивные предметы, очень важные для прогрессии.
    `,
    tips_de: `
- Bereite deine Ankunft vor dem Tokyo-Opening vor. Schau dir die Karte vorher an, wenn möglich.
- Versuche auch, dich schnell mit benachbarten Servern oder Gruppen in deiner Nähe zu verbinden.
- Spare AP vor der Ankunft in Tokyo, wenn die Chamber- oder individuelle Rangliste bereits gespielt wurde. Das kann dir etwas mehr Währung geben, was beim Fortschritt im Metro sehr hilft.
- Unterschätze Tokyo Warmup nicht. Stats-Boni und Chizuru können einen echten Unterschied während des gesamten Abenteuers machen.
- Organisiere deinen Server früh. Tokyo bestraft Server mit internen Konflikten stark.
- Sei vorsichtig mit UR Tokyo. UR Tokyo kann nur an Tokyo-Künstlerinnen gebunden werden.
- Achte auf die sekundären Tokyo-Events. Sie geben oft exklusive Gegenstände, die für den Fortschritt sehr wichtig sind.
    `,
    rewards: `
**Récompenses du Warmup :**
- Chizuru pour les 25 premiers
- +10% de stats pendant toute l'aventure pour le serveur 1er
- +5% de stats pour les serveurs 2e et 3e

**Récompenses et gains importants pendant Tokyo :**
Tokyo et ses événements liés peuvent donner :
- Kokoro dans le Tokyo Shop
- Des objets exclusifs pour une voiture T4
- Des Exclusive Tokyo Assets
- Des skins
- Des Tokyo artists
- Beaucoup d'autres récompenses utiles

Les Exclusive Tokyo Assets donnent un bonus sur les Tokyo artists.

Le Stock Auction de Tokyo donne aussi des récompenses différentes, dont :
- L'un des meilleurs skins du jeu
- La meilleure artiste du jeu
`,
    rewards_en: `
**Warmup Rewards:**
- Chizuru for the top 25
- +10% stats for the entire adventure for the 1st place server
- +5% stats for 2nd and 3rd place servers

**Important Rewards and Gains During Tokyo:**
Tokyo and its related events can give:
- Kokoro in the Tokyo Shop
- Exclusive items for a T4 car
- Exclusive Tokyo Assets
- Skins
- Tokyo artists
- Many other useful rewards

Exclusive Tokyo Assets give a bonus on Tokyo artists.

The Tokyo Stock Auction also gives different rewards, including:
- One of the best skins in the game
- The best artist in the game
    `,
    rewards_de: `
**Warmup-Belohnungen:**
- Chizuru für die Top 25
- +10% Stats für das gesamte Abenteuer für den 1. Platz Server
- +5% Stats für 2. und 3. Platz Server

**Wichtige Belohnungen und Gewinne während Tokio:**
Tokio und seine verwandten Events können geben:
- Kokoro im Tokio-Laden
- Exklusive Gegenstände für ein T4-Auto
- Exklusive Tokio-Assets
- Skins
- Tokio-Künstlerinnen
- Viele andere nützliche Belohnungen

Exklusive Tokio-Assets geben einen Bonus auf Tokio-Künstlerinnen.

Der Tokio-Börsenauktion gibt auch verschiedene Belohnungen, einschließlich:
- Eines der besten Skins im Spiel
- Die beste Künstlerin im Spiel
    `,
  },
  // New guides from images
  {
    id: "event-vs-group",
    title: "Guide VS Group Event",
    title_en: "Group Battle Guide",
    title_it: "Guida Group Battle",
    title_es: "Guía Group Battle",
    title_pt: "Guia Group Battle",
    title_pl: "Przewodnik Group Battle",
    title_id: "Panduan Group Battle",
    title_ru: "Гайд Group Battle",
    title_de: "VS Group Event Leitfaden",
    description: "Group Battle est un événement de groupe qui dure 6 jours. Bataille entre groupes avec 5 jours de préparation et 1 jour de combat final.",
    description_en: "Group Battle is a 6-day group event. Battle between groups with 5 days preparation and 1 day final combat.",
    description_it: "Group Battle è un evento di gruppo della durata di 6 giorni. Battaglia tra gruppi con 5 giorni di preparazione e 1 giorno di combattimento finale.",
    description_es: "Group Battle es un evento de grupo que dura 6 días. Batalla entre grupos con 5 días de preparación y 1 día de combate final.",
    description_pt: "Group Battle é um evento de grupo que dura 6 dias. Batalha entre grupos com 5 dias de preparação e 1 dia de combate final.",
    description_pl: "Group Battle to wydarzenie grupowe trwające 6 dni. Bitwa między grupami z 5 dniami przygotowań i 1 dniem walki.",
    description_id: "Group Battle adalah acara grup yang berlangsung 6 hari. Pertarungan antar grup dengan 5 hari persiapan dan 1 hari pertarungan final.",
    description_ru: "Group Battle - это групповое событие длительностью 6 дней. Битва между группами с 5 днями подготовки и 1 днём финальной битвы.",
    description_de: "VS Group Event ist ein 6-tägiges Gruppen-Event. Rush Attack, Blueprints und Strategien.",
    icon: "⚔️",
    color: "#ef4444",
    category: "Événements",
    category_en: "Events",
    category_it: "Eventi",
    category_es: "Eventos",
    category_pt: "Eventos",
    category_pl: "Wydarzenia",
    category_id: "Acara",
    category_ru: "События",
    category_de: "Events",
    readTime: "8 min",
    content: `
## Guide Group Battle

### Explication courte
Group Battle est un événement de groupe qui dure 6 jours.
Pendant les 5 premiers jours, les groupes gagnent des points en réalisant des actions quotidiennes.
Le jour 6, une phase finale appelée Rush Attack permet d'attaquer des zones ennemies pour gagner encore plus de points.
Le groupe avec le meilleur score total à la fin remporte la Ultimate Victory.

### Explication longue
#### Fonctionnement général
Group Battle est un événement centré sur la coopération de groupe.
Chaque membre doit participer pour faire monter le score global.

L'événement dure 6 jours :
- Jours 1 à 5 : Preparation Phase
- Jour 6 : Final Battle Phase

Le but est simple : ton groupe doit accumuler plus de points que le groupe adverse.

#### Jours 1 à 5 : Preparation Phase
Pendant les 5 premiers jours, les joueuses réalisent des actions quotidiennes pour gagner des Battle Points.

Chaque jour, il y a un résultat journalier entre les groupes opposés.
Le groupe qui a le plus de points gagne le score du jour.

Si deux groupes atteignent exactement le même score, le groupe qui a atteint ce score en premier gagne.
Cette règle rend la vitesse importante, pas seulement le total.

#### Jour 6 : Final Battle Phase
Le jour 6 est la phase décisive.
C'est à ce moment que se joue la Ultimate Victory.

Pendant cette journée, les joueuses peuvent participer à la phase Rush Attack pour gagner des points supplémentaires.
À la fin des 6 jours, le groupe avec le meilleur score cumulé remporté l'événement.

#### Rush Attack
Pendant Rush Attack, les joueuses peuvent se téléporter vers les zones du groupe adverse.

Zones disponibles :
- Landmark 2
- Landmark 3
- Landmark 4

Dans ces zones, il est possible de gagner des points supplémentaires en battant des membres du groupe rival.

Le bouton Back permet de retourner sur son propre territoire.
Mais utiliser Back lance un cooldown avant le prochain téléport gratuit.

Cela veut dire qu'il faut bien choisir ses déplacements pendant la phase finale.

#### Blueprints
Pendant Group Battle, il est possible d'améliorer les Battle Blueprints.

Les améliorations permettent de :
- débloquer des paliers de récompenses plus élevés
- augmenter les points gagnés
- débloquer des bonus de stats permanents

Il existe aussi des Master Blueprints, qui servent eux aussi à améliorer la performance pendant l'événement.

Les Blueprints sont donc très importants si tu veux progresser sur le long terme dans Group Battle.

#### Conditions de participation
Pour participer, il faut :
- être CEO Level 20 ou plus
- être membre d'un groupe avec une Financial Power suffisante

Changer de groupe pendant l'événement a une conséquence importante :
- la contribution en Group Points est bloquée pendant 1 jour
- les Personal Points ne sont pas affectés

Cela rend les changements de groupe risqués pendant l'événement.
`,
    content_en: `
## Group Battle Guide

### Short Explanation
Group Battle is a 6-day group event.
During the first 5 days, groups earn points by completing daily actions.
On day 6, a final phase called Rush Attack allows attacking enemy zones to earn even more points.
The group with the best total score at the end wins the Ultimate Victory.

### Long Explanation
#### General Operation
Group Battle is an event focused on group cooperation.
Every member must participate to increase the overall score.

The event lasts 6 days:
- Days 1-5: Preparation Phase
- Day 6: Final Battle Phase

The goal is simple: your group must accumulate more points than the opposing group.

#### Days 1-5: Preparation Phase
During the first 5 days, players complete daily actions to earn Battle Points.

Each day, there's a daily result between opposing groups.
The group with the most points wins the day's score.

If two groups reach exactly the same score, the group that reached that score first wins.
This rule makes speed important, not just the total.

#### Day 6: Final Battle Phase
Day 6 is the decisive phase.
This is when the Ultimate Victory is decided.

During this day, players can participate in the Rush Attack phase to earn additional points.
At the end of 6 days, the group with the best cumulative score wins the event.

#### Rush Attack
During Rush Attack, players can teleport to enemy group zones.

Available zones:
- Landmark 2
- Landmark 3
- Landmark 4

In these zones, it's possible to earn additional points by defeating members of the rival group.

The Back button allows returning to your own territory.
But using Back launches a cooldown before the next free teleport.

This means you need to choose your movements carefully during the final phase.

#### Blueprints
During Group Battle, it's possible to upgrade Battle Blueprints.

Upgrades allow:
- unlocking higher reward tiers
- increasing points earned
- unlocking permanent stat bonuses

There are also Master Blueprints, which also help improve performance during the event.

Blueprints are therefore very important if you want to progress long-term in Group Battle.

#### Participation Requirements
To participate, you need:
- Be CEO Level 20 or higher
- Be a member of a group with sufficient Financial Power

Changing groups during the event has an important consequence:
- Group Points contribution is blocked for 1 day
- Personal Points are not affected

This makes group changes risky during the event.
`,
    content_it: `
## Guida Group Battle

### Breve Spiegazione
Group Battle è un evento di gruppo della durata di 6 giorni.
Durante i primi 5 giorni, i gruppi guadagnano punti completando azioni quotidiane.
Il giorno 6, una fase finale chiamata Rush Attack permette di attaccare zone nemiche per guadagnare ancora più punti.
Il gruppo con il miglior punteggio totale alla fine vince la Ultimate Victory.

### Spiegazione Dettagliata
#### Funzionamento Generale
Group Battle è un evento incentrato sulla cooperazione di gruppo.
Ogni membro deve partecipare per aumentare il punteggio complessivo.

L'evento dura 6 giorni:
- Giorni 1-5: Preparation Phase
- Giorno 6: Final Battle Phase

L'obiettivo è semplice: il tuo gruppo deve accumulare più punti del gruppo avversario.

#### Giorni 1-5: Preparation Phase
Durante i primi 5 giorni, i giocatori completano azioni quotidiane per guadagnare Battle Points.

Ogni giorno, c'è un risultato giornaliero tra i gruppi opposti.
Il gruppo con più punti vince il punteggio del giorno.

Se due gruppi raggiungono esattamente lo stesso punteggio, il gruppo che ha raggiunto quel punteggio per primo vince.
Questa regola rende la velocità importante, non solo il totale.

#### Giorno 6: Final Battle Phase
Il giorno 6 è la fase decisiva.
È in questo momento che si decide la Ultimate Victory.

Durante questo giorno, i giocatori possono partecipare alla fase Rush Attack per guadagnare punti aggiuntivi.
Alla fine dei 6 giorni, il gruppo con il miglior punteggio cumulato vince l'evento.

#### Rush Attack
Durante Rush Attack, i giocatori possono teletrasportarsi nelle zone del gruppo nemico.

Zone disponibili:
- Landmark 2
- Landmark 3
- Landmark 4

In queste zone, è possibile guadagnare punti aggiuntivi sconfiggendo membri del gruppo rivale.

Il pulsante Back permette di tornare al proprio territorio.
Ma usare Back avvia un cooldown prima del prossimo teletrasporto gratuito.

Questo significa che devi scegliere attentamente i tuoi spostamenti durante la fase finale.

#### Blueprints
Durante Group Battle, è possibile migliorare i Battle Blueprints.

I miglioramenti permettono di:
- sbloccare tier di ricompense più alti
- aumentare i punti guadagnati
- sbloccare bonus di statistiche permanenti

Esistono anche Master Blueprints, che aiutano anche a migliorare le prestazioni durante l'evento.

I Blueprints sono quindi molto importanti se vuoi progredire a lungo termine in Group Battle.

#### Requisiti di Partecipazione
Per partecipare, devi:
- Essere CEO Level 20 o superiore
- Essere membro di un gruppo con Financial Power sufficiente

Cambiare gruppo durante l'evento ha una conseguenza importante:
- Il contributo in Group Points viene bloccato per 1 giorno
- I Personal Points non sono influenzati

Questo rende i cambiamenti di gruppo rischiosi durante l'evento.
`,
    content_es: `
## Guía Group Battle

### Explicación Corta
Group Battle es un evento de grupo que dura 6 días.
Durante los primeros 5 días, los grupos ganan puntos completando acciones diarias.
El día 6, una fase final llamada Rush Attack permite atacar zonas enemigas para ganar aún más puntos.
El grupo con la mejor puntuación total al final gana la Ultimate Victory.

### Explicación Larga
#### Funcionamiento General
Group Battle es un evento centrado en la cooperación de grupo.
Cada miembro debe participar para aumentar la puntuación global.

El evento dura 6 días:
- Días 1-5: Preparation Phase
- Día 6: Final Battle Phase

El objetivo es simple: tu grupo debe acumular más puntos que el grupo oponente.

#### Días 1-5: Preparation Phase
Durante los primeros 5 días, los jugadores completan acciones diarias para ganar Battle Points.

Cada día, hay un resultado diario entre los grupos opuestos.
El grupo con más puntos gana la puntuación del día.

Si dos grupos alcanzan exactamente la misma puntuación, el grupo que alcanzó esa puntuación primero gana.
Esta regla hace que la velocidad sea importante, no solo el total.

#### Día 6: Final Battle Phase
El día 6 es la fase decisiva.
Es en este momento cuando se decide la Ultimate Victory.

Durante este día, los jugadores pueden participar en la fase Rush Attack para ganar puntos adicionales.
Al final de los 6 días, el grupo con la mejor puntuación acumulada gana el evento.

#### Rush Attack
Durante Rush Attack, los jugadores pueden teletransportarse a las zonas del grupo enemigo.

Zonas disponibles:
- Landmark 2
- Landmark 3
- Landmark 4

En estas zonas, es posible ganar puntos adicionales derrotando miembros del grupo rival.

El botón Back permite volver a tu propio territorio.
Pero usar Back inicia un cooldown antes del próximo teletransporte gratuito.

Esto significa que debes elegir bien tus movimientos durante la fase final.

#### Blueprints
Durante Group Battle, es posible mejorar los Battle Blueprints.

Las mejoras permiten:
- desbloquear niveles de recompensas más altos
- aumentar los puntos ganados
- desbloquear bonos de estadísticas permanentes

También existen Master Blueprints, que también ayudan a mejorar el rendimiento durante el evento.

Los Blueprints son muy importantes si quieres progresar a largo plazo en Group Battle.

#### Requisitos de Participación
Para participar, necesitas:
- Ser CEO Level 20 o superior
- Ser miembro de un grupo con Financial Power suficiente

Cambiar de grupo durante el evento tiene una consecuencia importante:
- La contribución en Group Points se bloquea por 1 día
- Los Personal Points no se ven afectados

Esto hace que los cambios de grupo sean arriesgados durante el evento.
`,
    content_pt: `
## Guia Group Battle

### Explicação Curta
Group Battle é um evento de grupo que dura 6 dias.
Durante os primeiros 5 dias, os grupos ganham pontos completando ações diárias.
No dia 6, uma fase final chamada Rush Attack permite atacar zonas inimigas para ganhar ainda mais pontos.
O grupo com a melhor pontuação total no final vence a Ultimate Victory.

### Explicação Longa
#### Funcionamento Geral
Group Battle é um evento focado na cooperação de grupo.
Cada membro deve participar para aumentar a pontuação geral.

O evento dura 6 dias:
- Dias 1-5: Preparation Phase
- Dia 6: Final Battle Phase

O objetivo é simples: seu grupo deve acumular mais pontos que o grupo oponente.

#### Dias 1-5: Preparation Phase
Durante os primeiros 5 dias, os jogadores completam ações diárias para ganhar Battle Points.

Cada dia, há um resultado diário entre os grupos opostos.
O grupo com mais pontos ganha a pontuação do dia.

Se dois grupos atingirem exatamente a mesma pontuação, o grupo que atingiu essa pontuação primeiro ganha.
Esta regra torna a velocidade importante, não apenas o total.

#### Dia 6: Final Battle Phase
O dia 6 é a fase decisiva.
É neste momento que a Ultimate Victory é decidida.

Durante este dia, os jogadores podem participar da fase Rush Attack para ganhar pontos adicionais.
No final dos 6 dias, o grupo com a melhor pontuação acumulada vence o evento.

#### Rush Attack
Durante Rush Attack, os jogadores podem se teletransportar para as zonas do grupo inimigo.

Zonas disponíveis:
- Landmark 2
- Landmark 3
- Landmark 4

 nessas zonas, é possível ganhar pontos adicionais derrotando membros do grupo rival.

O botão Back permite retornar ao seu próprio território.
Mas usar o Back inicia um cooldown antes do próximo teletransporte gratuito.

Isso significa que você precisa escolher seus movimentos cuidadosamente durante a fase final.

#### Blueprints
Durante Group Battle, é possível melhorar os Battle Blueprints.

As melhorias permitem:
- desbloquear camadas de recompensas mais altas
- aumentar os pontos ganhos
- desbloquear bônus de estatísticas permanentes

Também existem Master Blueprints, que também ajudam a melhorar o desempenho durante o evento.

Os Blueprints são muito importantes se você quiser progredir a longo prazo em Group Battle.

#### Requisitos de Participação
Para participar, você precisa:
- Ser CEO Level 20 ou superior
- Ser membro de um grupo com Financial Power suficiente

Mudar de grupo durante o evento tem uma consequência importante:
- A contribuição em Group Points é bloqueada por 1 dia
- Os Personal Points não são afetados

Isso torna as mudanças de grupo arriscadas durante o evento.
`,
    content_pl: `
## Przewodnik Group Battle

### Krótka Wyjaśnienie
Group Battle to wydarzenie grupowe trwające 6 dni.
Pierwsze 5 dni grupy zdobywają punkty wykonując codzienne działania.
Dzień 6, faza zwana Rush Attack pozwala atakować strefy wroga, aby zdobyć jeszcze więcej punktów.
Grupa z najlepszą łączną punktacją na końcu wygrywa Ultimate Victory.

### Długie Wyjaśnienie
#### Ogólne Działanie
Group Battle to wydarzenie skoncentrowane na współpracy grupy.
Każdy członek musi uczestniczyć, aby zwiększyć ogólny wynik.

Wydarzenie trwa 6 dni:
- Dni 1-5: Preparation Phase
- Dzień 6: Final Battle Phase

Cel jest prosty: Twoja grupa musi zgromadzić więcej punktów niż grupa przeciwna.

#### Dni 1-5: Preparation Phase
Przez pierwsze 5 dni gracze wykonują codzienne działania, aby zdobyć Battle Points.

Każdego dnia jest wynik dzienny między przeciwnymi grupami.
Grupa z większą liczbą punktów wygrywa wynik dnia.

Jeśli dwie grupy osiągną dokładnie taką samą punktację, grupa, która osiągnęła tę punktację pierwsza, wygrywa.
Ta sprawia, że prędkość jest ważna, nie tylko suma.

#### Dzień 6: Final Battle Phase
Dzień 6 jest decydującą fazą.
To wtedy rozstrzyga się Ultimate Victory.

W tym dniu gracze mogą uczestniczyć w fazie Rush Attack, aby zdobyć dodatkowe punkty.
Pod koniec 6 dni grupa z najlepszą łączną punktacją wygrywa wydarzenie.

#### Rush Attack
Podczas Rush Attack gracze mogą teleportować się do stref wrogiej grupy.

Dostępne strefy:
- Landmark 2
- Landmark 3
- Landmark 4

W tych strefach można zdobywać dodatkowe punkty pokonując członków grupy rywalnej.

Przycisk Back pozwala wrócić na własne terytorium.
Ale użycie Back uruchamia cooldown przed kolejną darmową teleportacją.

Oznacza to, że musisz ostrożnie wybierać swoje ruchy podczas fazy końcowej.

#### Blueprints
Podczas Group Battle można ulepszać Battle Blueprints.

Ulepszenia pozwalają na:
- odblokowanie wyższych poziomów nagród
- zwiększenie zdobywanych punktów
- odblokowanie stałych bonusów statystyk

Istnieją również Master Blueprints, które również pomagają poprawić wydajność podczas wydarzenia.

Blueprints są bardzo ważne, jeśli chcesz rozwijać się długoterminowo w Group Battle.

#### Wymagania Uczestnictwa
Aby uczestniczyć, musisz:
- Mieć CEO Level 20 lub wyższy
- Być członkiem grupy z wystarczającą Financial Power

Zmiana grupy podczas wydarzenia ma ważną konsekwencję:
- Kontrybucja w Group Points jest blokowana na 1 dzień
- Personal Points nie są dotknięte

To sprawia, że zmiany grup są ryzykowne podczas wydarzenia.
`,
    content_id: `
## Panduan Group Battle

### Penjelasan Singkat
Group Battle adalah acara grup yang berlangsung 6 hari.
Selama 5 hari pertama, grup mendapatkan poin dengan menyelesaikan tindakan harian.
Pada hari 6, fase final disebut Rush Attack memungkinkan menyerang zona musuh untuk mendapatkan lebih banyak poin.
Grup dengan skor total terbaik di akhir memenangkan Ultimate Victory.

### Penjelasan Panjang
#### Operasi Umum
Group Battle adalah acara yang fokus pada kerja sama grup.
Setiap anggota harus berpartisipasi untuk meningkatkan skor keseluruhan.

Acara berlangsung 6 hari:
- Hari 1-5: Preparation Phase
- Hari 6: Final Battle Phase

Tujuannya sederhana: grup Anda harus mengakumulasi lebih banyak poin daripada grup lawan.

#### Hari 1-5: Preparation Phase
Selama 5 hari pertama, pemain menyelesaikan tindakan harian untuk mendapatkan Battle Points.

Setiap hari, ada hasil harian antara grup yang berlawanan.
Grup dengan poin paling banyak memenangkan skor hari.

Jika dua grup mencapai skor yang sama persis, grup yang mencapai skor itu lebih dulu menang.
Aturan ini membuat kecepatan penting, bukan hanya total.

#### Hari 6: Final Battle Phase
Hari 6 adalah fase yang menentukan.
Inilah saat Ultimate Victory diputuskan.

Selama hari ini, pemain dapat berpartisipasi dalam fase Rush Attack untuk mendapatkan poin tambahan.
Di akhir 6 hari, grup dengan skor kumulatif terbaik memenangkan acara.

#### Rush Attack
Selama Rush Attack, pemain dapat teleportasi ke zona grup musuh.

Zona yang tersedia:
- Landmark 2
- Landmark 3
- Landmark 4

Di zona-zona ini, mungkin untuk mendapatkan poin tambahan dengan mengalahkan anggota grup lawan.

Tombol Back memungkinkan kembali ke wilayah Anda sendiri.
Tetapi menggunakan Back memulai cooldown sebelum teleport gratis berikutnya.

Ini berarti Anda harus memilih gerakan dengan hati-hati selama fase final.

#### Blueprints
Selama Group Battle, mungkin untuk meningkatkan Battle Blueprints.

Peningkatan memungkinkan:
- membuka tier hadiah yang lebih tinggi
- meningkatkan poin yang diperoleh
- membuka bonus statistik permanen

Ada juga Master Blueprints, yang juga membantu meningkatkan kinerja selama acara.

Blueprints sangat penting jika Anda ingin berkembang dalam jangka panjang di Group Battle.

#### Persyaratan Partisipasi
Untuk berpartisipasi, Anda perlu:
- Menjadi CEO Level 20 atau lebih tinggi
- Menjadi anggota grup dengan Financial Power yang cukup

Mengubah grup selama acara memiliki konsekuensi penting:
- Kontribusi Group Points diblokir selama 1 hari
- Personal Points tidak terpengaruh

Ini membuat perubahan grup berisiko selama acara.
`,
    content_ru: `
## Гайд Group Battle

### Краткое объяснение
Group Battle - это групповое событие длительностью 6 дней.
В первые 5 дней группы зарабатывают очки, выполняя ежедневные действия.
На 6 день финальная фаза под названием Rush Attack позволяет атаковать вражеские зоны для получения еще большего количества очков.
Группа с лучшим общим счетом в конце побеждает в Ultimate Victory.

### Подробное объяснение
#### Общее функционирование
Group Battle - это событие, ориентированное на групповое сотрудничество.
Каждый участник должен участвовать для увеличения общего счета.

Событие длится 6 дней:
- Дни 1-5: Preparation Phase
- День 6: Final Battle Phase

Цель проста: ваша группа должна накопить больше очков, чем противоборствующая группа.

#### Дни 1-5: Preparation Phase
В первые 5 дней игроки выполняют ежедневные действия для получения Battle Points.

Каждый день есть ежедневный результат между противоборствующими группами.
Группа с наибольшим количеством очков выигрывает дневной счет.

Если две группы набирают абсолютно одинаковый счет, группа, которая первой достигла этого счета, выигрывает.
Это правило делает скорость важной, не только общее количество.

#### День 6: Final Battle Phase
День 6 - решающая фаза.
Именно в это время решается Ultimate Victory.

В этот день игроки могут участвовать в фазе Rush Attack для получения дополнительных очков.
В конце 6 дней группа с лучшим совокупным счетом побеждает в событии.

#### Rush Attack
Во время Rush Attack игроки могут телепортироваться в зоны вражеской группы.

Доступные зоны:
- Landmark 2
- Landmark 3
- Landmark 4

В этих зонах можно заработать дополнительные очки, побеждая членов вражеской группы.

Кнопка Back позволяет вернуться на свою территорию.
Но использование Back запускает кулдаун перед следующей бесплатной телепортацией.

Это означает, что вам нужно тщательно выбирать свои перемещения во время финальной фазы.

#### Blueprints
Во время Group Battle можно улучшать Battle Blueprints.

Улучшения позволяют:
- открывать более высокие уровни наград
- увеличивать зарабатываемые очки
- открывать постоянные бонусы к статистикам

Существуют также Master Blueprints, которые также помогают улучшить производительность во время события.

Blueprints очень важны, если вы хотите прогрессировать долгосрочно в Group Battle.

#### Условия участия
Для участия вам нужно:
- Иметь CEO Level 20 или выше
- Быть членом группы с достаточной Financial Power

Смена группы во время события имеет важное последствие:
- Вклад в Group Points заблокирован на 1 день
- Personal Points не затрагиваются

Это делает смену группы рискованной во время события.
`,
    tips: `
- Participe tous les jours pendant les Days 1-5
- Essaie d'atteindre au moins 12 millions de points personnels par jour
- Améliore tes Battle Blueprints dès que possible
- Prépare-toi pour Rush Attack avant le Day 6
- Coordonne-toi avec ton groupe
- Évite de changer de groupe pendant l'événement
    `,
    tips_en: `
- Participate every day during Days 1-5
- Try to reach at least 12 million personal points per day
- Upgrade your Battle Blueprints as soon as possible
- Prepare for Rush Attack before Day 6
- Coordinate with your group
- Avoid changing groups during the event
    `,
    tips_it: `
- Partecipa ogni giorno durante i Days 1-5
- Prova a raggiungere almeno 12 milioni di punti personali al giorno
- Aggiorna i tuoi Battle Blueprints il prima possibile
- Preparati per Rush Attack prima del Day 6
- Coordina con il tuo gruppo
- Evita di cambiare gruppo durante l'evento
    `,
    tips_es: `
- Participa todos los días durante los Days 1-5
- Intenta alcanzar al menos 12 millones de puntos personales por día
- Mejora tus Battle Blueprints lo antes posible
- Prepárate para Rush Attack antes del Day 6
- Coordina con tu grupo
- Evita cambiar de grupo durante el evento
    `,
    tips_pt: `
- Participe todos os dias durante os Days 1-5
- Tente alcançar pelo menos 12 milhões de pontos pessoais por dia
- Atualize seus Battle Blueprints o mais rápido possível
- Prepare-se para Rush Attack antes do Day 6
- Coordene-se com seu grupo
- Evite mudar de grupo durante o evento
    `,
    tips_pl: `
- Uczestnicz każdego dnia podczas Days 1-5
- Staraj się osiągnąć co najmniej 12 milionów punktów osobistych dziennie
- Ulepszaj swoje Battle Blueprints jak najszybciej
- Przygotuj się do Rush Attack przed Day 6
- Koordynuj ze swoją grupą
- Unikaj zmiany grupy podczas wydarzenia
    `,
    tips_id: `
- Berpartisipasi setiap hari selama Days 1-5
- Cobalah mencapai setidaknya 12 juta poin pribadi per hari
- Tingkatkan Battle Blueprints Anda segera
- Bersiaplah untuk Rush Attack sebelum Day 6
- Koordinasikan dengan grup Anda
- Hindari mengubah grup selama acara
    `,
    tips_ru: `
- Участвуйте каждый день в Days 1-5
- Постарайтесь достичь как минимум 12 миллионов личных очков в день
- Улучшайте свои Battle Blueprints как можно скорее
- Готовьтесь к Rush Attack до Day 6
- Координируйте со своей группой
- Избегайте смены группы во время события
    `,
    tips_de: `
- Nimm jeden Tag während Days 1-5 teil
- Versuche mindestens 12 Millionen persönliche Punkte pro Tag zu erreichen
- Verbessere deine Battle Blueprints so bald wie möglich
- Bereite dich auf Rush Attack vor Day 6 vor
- Koordiniere dich mit deiner Gruppe
- Vermeide es, die Gruppe während des Events zu wechseln
    `,
    content_de: `
## Group Battle Leitfaden

### Kurze Erklärung
Group Battle ist ein 6-tägiges Gruppen-Event.
Während der ersten 5 Tage verdienen Gruppen Punkte, indem sie tägliche Aktionen abschließen.
Am Tag 6 ermöglicht eine finale Phase namens Rush Attack das Angreifen feindlicher Zonen, um noch mehr Punkte zu verdienen.
Die Gruppe mit der besten Gesamtpunktzahl am Ende gewinnt den Ultimate Victory.

### Lange Erklärung
#### Allgemeiner Betrieb
Group Battle ist ein auf Gruppenzusammenarbeit fokussiertes Event.
Jedes Mitglied muss teilnehmen, um die Gesamtpunktzahl zu erhöhen.

Das Event dauert 6 Tage:
- Tage 1-5: Vorbereitungsphase
- Tag 6: Finale Kampiphase

Das Ziel ist einfach: Deine Gruppe muss mehr Punkte als die gegnerische Gruppe ansammeln.

#### Tage 1-5: Vorbereitungsphase
Während der ersten 5 Tage schließen Spieler täglich Aktionen ab, um Battle Points zu verdienen.

Jeden Tag gibt es ein tägliches Ergebnis zwischen gegnerischen Gruppen.
Die Gruppe mit den meisten Punkten gewinnt die Tagespunktzahl.

Wenn zwei Gruppen genau die gleiche Punktzahl erreichen, gewinnt die Gruppe, die diese Punktzahl zuerst erreicht.
Diese Regel macht Geschwindigkeit wichtig, nicht nur die Gesamtsumme.

#### Tag 6: Finale Kampiphase
Tag 6 ist die entscheidende Phase.
Hier wird der Ultimate Victory entschieden.

#### Rush Attack
Während Rush Attack können sich Spieler in Zonen der feindlichen Gruppe teleportieren.

Verfügbare Zonen:
- Landmark 2
- Landmark 3
- Landmark 4

In diesen Zonen können zusätzliche Punkte verdient werden, indem man Mitglieder der feindlichen Gruppe besiegt.

Der Zurück-Button ermöglicht es, auf eigenes Territorium zurückzukehren.
Aber die Verwendung von Zurück startet eine Abklingzeit vor dem nächsten kostenlosen Teleport.

Das bedeutet, dass du deine Bewegungen während der finalen Phase sorgfältig wählen musst.

#### Blueprints
Während Group Battle ist es möglich, Battle Blueprints zu verbessern.

Verbesserungen ermöglichen:
- Höhere Belohnungsstufen freischalten
- Verdiente Punkte erhöhen
- Permanente Stats-Boni freischalten

Es gibt auch Master Blueprints, die ebenfalls helfen, die Leistung während des Events zu verbessern.

Blueprints sind also sehr wichtig, wenn du langfristig in Group Battle vorankommen willst.

#### Teilnahmebedingungen
Um teilzunehmen, brauchst du:
- CEO Level 20 oder höher
- Mitglied einer Gruppe mit ausreichender Financial Power

Gruppenwechsel während des Events hat eine wichtige Konsequenz:
- Beitrag zu Group Points ist für 1 Tag gesperrt
- Persönliche Punkte sind nicht betroffen

Das macht Gruppenwechsel während des Events riskant.
    `,
  },
  {
    id: "event-fishing",
    title: "Guide Fishing Event",
    title_en: "Fishing Event Guide",
    title_it: "Guida Fishing Event",
    title_es: "Guía Fishing Event",
    title_pt: "Guia Fishing Event",
    title_pl: "Przewodnik Fishing Event",
    title_id: "Panduan Fishing Event",
    title_ru: "Гайд Fishing Event",
    title_de: "Angel-Event Leitfaden",
    description: "Fishing Event dure 7 jours. Attrapez des poissons, gérez votre Aquarium et échangez des Vouchers contre des récompenses.",
    description_en: "Fishing Event lasts 7 days. Catch fish, manage your Aquarium and exchange Vouchers for rewards.",
    description_it: "Fishing Event dura 7 giorni. Cattura pesci, gestisci il tuo Aquarium e scambia Vouchers per ricompense.",
    description_es: "Fishing Event dura 7 días. Atrapa peces, administra tu Aquarium e intercambia Vouchers por recompensas.",
    description_pt: "Fishing Event dura 7 dias. Pegue peixes, gerencie seu Aquarium e troque Vouchers por recompensas.",
    description_pl: "Fishing Event trwa 7 dni. Łów ryby, zarządzaj swoim Aquarium i wymieniaj Vouchery na nagrody.",
    description_id: "Fishing Event berlangsung 7 hari. Tangkap ikan, kelola Aquarium Anda dan tukarkan Vouchers untuk hadiah.",
    description_ru: "Fishing Event длится 7 дней. Ловите рыб, управляйте своим Aquarium и обменивайте Vouchers на награды.",
    description_de: "Angel-Event dauert 7 Tage. Fange Fische, verwalte dein Aquarium und tausche Gutscheine gegen Belohnungen ein.",
    icon: "🎣",
    color: "#06b6d4",
    category: "Événements",
    category_en: "Events",
    category_it: "Eventi",
    category_es: "Eventos",
    category_pt: "Eventos",
    category_pl: "Wydarzenia",
    category_id: "Acara",
    category_ru: "События",
    category_de: "Events",
    readTime: "10 min",
    content: `
## Guide Fishing Event

### Explication courte
Fishing Event dure 7 jours.
Pendant cet événement, les joueuses attrapent des poissons avec du Free Bait ou du Paid Bait.
Les poissons produisent des Vouchers, qui sont la monnaie de l'événement.
Plus le poisson est rare, plus il produit de Vouchers.
Il est aussi possible d'agrandir l'Aquarium pour garder plus de poissons et augmenter les gains.

### Explication longue
#### Fonctionnement général
Pendant Fishing Event, tu attrapes des poissons pour générer des Vouchers.
Les Vouchers servent ensuite à acheter des récompenses dans la boutique de l'événement.

Chaque capture coûte 5 bait.
Il existe 2 types de bait :
- Free Bait
- Paid Bait

Le Free Bait se régénère avec le temps.
Le Paid Bait doit être obtenu via la boutique ou via certaines récompenses d'événement.

#### Rareté des poissons
Les poissons ont 4 niveaux de rareté :
- 1★ Fish
- 2★ Fish
- 3★ Fish
- 4★ Fish

Plus un poisson a d'étoiles, plus il génère de Vouchers par minute.
Les 4★ Fish sont beaucoup plus fréquents avec le Paid Bait.

Quand tu obtiens un poisson plus fort, un poisson faible peut être remplacé automatiquement.
Cela permet d'améliorer progressivement ton Aquarium.

#### Pity system
L'événement a un pity system.
Toutes les 50 captures, tu es garantie d'obtenir au moins un 3★ Fish ou un 4★ Fish.
Ce système aide à éviter les longues séries de mauvais résultats.

#### Fish refresh system
Les poissons apparaissent dans 2 pools :
- Free Pool
- Paid Pool

Chaque fois qu'un poisson est attrapé, le timer de refresh repart à zéro.
Si aucun poisson n'apparaît pendant 30 minutes, le pool se refresh automatiquement.
Il est aussi possible de reset ce timer en attrapant un poisson.

Ce point est important, car il faut surveiller les pools régulièrement pour ne pas gaspiller le bait.

#### Aquarium et slots
Les poissons sont gardés dans l'Aquarium.
Il faut débloquer des tank slots pour pouvoir conserver plus de poissons.

Plus tu gardes de poissons, plus tu gagnes de Vouchers.
Les poissons en trop peuvent être convertis en Blue Shells.
Les Blue Shells servent à débloquer des slots supplémentaires.

L'Aquarium est donc une partie centrale de l'événement.
Un plus grand Aquarium donne une meilleure génération de Vouchers sur toute la durée du Fishing Event.

#### Fin de l'événement
Quand l'événement se termine :
- tout le Free Bait inutilisé est converti en Diamonds
- tout le Paid Bait inutilisé est converti en Diamonds
- la progression ne continue pas sur le prochain Fishing Event

Cela veut dire qu'il faut optimiser ses ressources pendant les 7 jours, car rien n'est conservé pour la prochaine édition.
`,
    content_en: `
## Fishing Event Guide

### Short Explanation
Fishing Event lasts 7 days.
During this event, players catch fish with Free Bait or Paid Bait.
Fish produce Vouchers, which are the event currency.
The rarer the fish, the more Vouchers it produces.
It's also possible to expand the Aquarium to keep more fish and increase earnings.

### Long Explanation
#### General Operation
During Fishing Event, you catch fish to generate Vouchers.
Vouchers are then used to buy rewards in the event shop.

Each catch costs 5 bait.
There are 2 types of bait:
- Free Bait
- Paid Bait

Free Bait regenerates over time.
Paid Bait must be obtained through the shop or through certain event rewards.

#### Fish Rarity
Fish have 4 rarity levels:
- 1★ Fish
- 2★ Fish
- 3★ Fish
- 4★ Fish

The more stars a fish has, the more Vouchers it generates per minute.
4★ Fish are much more common with Paid Bait.

When you get a stronger fish, a weak fish can be replaced automatically.
This allows you to gradually improve your Aquarium.

#### Pity System
The event has a pity system.
Every 50 catches, you're guaranteed to get at least a 3★ Fish or 4★ Fish.
This system helps avoid long streaks of bad results.

#### Fish Refresh System
Fish appear in 2 pools:
- Free Pool
- Paid Pool

Each time a fish is caught, the refresh timer resets.
If no fish appears for 30 minutes, the pool automatically refreshes.
It's also possible to reset this timer by catching a fish.

This point is important because you need to monitor pools regularly to avoid wasting bait.

#### Aquarium and Slots
Fish are kept in the Aquarium.
You need to unlock tank slots to keep more fish.

The more fish you keep, the more Vouchers you earn.
Excess fish can be converted into Blue Shells.
Blue Shells are used to unlock additional slots.

The Aquarium is therefore a central part of the event.
A larger Aquarium gives better Voucher generation throughout the Fishing Event.

#### End of Event
When the event ends:
- All unused Free Bait is converted to Diamonds
- All unused Paid Bait is converted to Diamonds
- Progress does not continue to the next Fishing Event

This means you need to optimize your resources during the 7 days, as nothing is saved for the next edition.
`,
    content_it: `
## Guida Fishing Event

### Breve Spiegazione
Fishing Event dura 7 giorni.
Durante questo evento, i giocatori catturano pesci con Free Bait o Paid Bait.
I pesci producono Voucher, che sono la valuta dell'evento.
Più il pesce è raro, più produce Voucher.
È anche possibile espandere l'Aquarium per tenere più pesci e aumentare i guadagni.

### Spiegazione Dettagliata
#### Funzionamento Generale
Durante Fishing Event, catturi pesci per generare Voucher.
I Voucher vengono poi utilizzati per acquistare ricompense nel negozio dell'evento.

Ogni cattura costa 5 bait.
Esistono 2 tipi di bait:
- Free Bait
- Paid Bait

Il Free Bait si rigenera nel tempo.
Il Paid Bait deve essere ottenuto tramite il negozio o tramite alcune ricompense dell'evento.

#### Rarità dei Pesci
I pesci hanno 4 livelli di rarità:
- 1★ Fish
- 2★ Fish
- 3★ Fish
- 4★ Fish

Più stelle ha un pesce, più Voucher genera al minuto.
I 4★ Fish sono molto più frequenti con il Paid Bait.

Quando ottieni un pesce più forte, un pesce debole può essere sostituito automaticamente.
Questo ti permette di migliorare gradualmente il tuo Aquarium.

#### Pity System
L'evento ha un pity system.
Ogni 50 catture, sei garantito di ottenere almeno un 3★ Fish o un 4★ Fish.
Questo sistema aiuta a evitare lunghe serie di risultati negativi.

#### Sistema Refresh dei Pesci
I pesci appaiono in 2 pool:
- Free Pool
- Paid Pool

Ogni volta che un pesce viene catturato, il timer di refresh si riazzera.
Se nessun pesce appare per 30 minuti, il pool si refresha automaticamente.
È anche possibile resettare questo timer catturando un pesce.

Questo punto è importante, perché devi monitorare i pool regolarmente per non sprecare il bait.

#### Aquarium e Slot
I pesci sono tenuti nell'Aquarium.
Devi sbloccare tank slot per conservare più pesci.

Più pesci tieni, più Voucher guadagni.
I pesci in più possono essere convertiti in Blue Shells.
I Blue Shells servono per sbloccare slot aggiuntivi.

L'Aquarium è quindi una parte centrale dell'evento.
Un Aquarium più grande dà una migliore generazione di Voucher per tutta la durata del Fishing Event.

#### Fine dell'Evento
Quando l'evento termina:
- Tutto il Free Bait inutilizzato viene convertito in Diamonds
- Tutto il Paid Bait inutilizzato viene convertito in Diamonds
- La progressione non continua sul prossimo Fishing Event

Questo significa che devi ottimizzare le tue risorse durante i 7 giorni, poiché nulla viene salvato per la prossima edizione.
`,
    content_es: `
## Guía Fishing Event

### Explicación Corta
Fishing Event dura 7 días.
Durante este evento, las jugadoras atrapan peces con Free Bait o Paid Bait.
Los peces producen Vouchers, que son la moneda del evento.
Cuanto más raro es el pez, más Vouchers produce.
También es posible agrandar el Aquarium para mantener más peces y aumentar las ganancias.

### Explicación Larga
#### Funcionamiento General
Durante Fishing Event, atrapas peces para generar Vouchers.
Los Vouchers sirven luego para comprar recompensas en la tienda del evento.

Cada captura cuesta 5 bait.
Existen 2 tipos de bait:
- Free Bait
- Paid Bait

El Free Bait se regenera con el tiempo.
El Paid Bait debe obtenerse a través de la tienda o a través de ciertas recompensas del evento.

#### Rareza de los Peces
Los peces tienen 4 niveles de rareza:
- 1★ Fish
- 2★ Fish
- 3★ Fish
- 4★ Fish

Cuantas más estrellas tenga un pez, más Vouchers genera por minuto.
Los 4★ Fish son mucho más frecuentes con el Paid Bait.

Cuando obtienes un pez más fuerte, un pez débil puede ser reemplazado automáticamente.
Esto permite mejorar progresivamente tu Aquarium.

#### Sistema Pity
El evento tiene un sistema pity.
Cada 50 capturas, estás garantizado de obtener al menos un 3★ Fish o un 4★ Fish.
Este sistema ayuda a evitar largas rachas de malos resultados.

#### Sistema de Actualización de Peces
Los peces aparecen en 2 pools:
- Free Pool
- Paid Pool

Cada vez que se atrapa un pez, el temporizador de actualización se reinicia.
Si no aparece ningún pez durante 30 minutos, el pool se actualiza automáticamente.
También es posible restablecer este temporizador atrapando un pez.

Este punto es importante, ya que debes monitorear los pools regularmente para no desperdiciar el bait.

#### Aquarium y Slots
Los peces se guardan en el Aquarium.
Necesitas desbloquear tank slots para conservar más peces.

Cuantos más peces guardas, más Vouchers ganas.
Los peces sobrantes pueden convertirse en Blue Shells.
Los Blue Shells sirven para desbloquear slots adicionales.

Por lo tanto, el Aquarium es una parte central del evento.
Un Aquarium más grande da una mejor generación de Vouchers durante todo el Fishing Event.

#### Fin del Evento
Cuando el evento termina:
- Todo el Free Bait no utilizado se convierte en Diamonds
- Todo el Paid Bait no utilizado se convierte en Diamonds
- La progresión no continúa en el próximo Fishing Event

Esto significa que debes optimizar tus recursos durante los 7 días, ya que nada se guarda para la próxima edición.
`,
    content_pt: `
## Guia Fishing Event

### Explicação Curta
Fishing Event dura 7 dias.
Durante este evento, as jogadoras pegam peixes com Free Bait ou Paid Bait.
Os peixes produzem Vouchers, que são a moeda do evento.
Quanto mais raro o peixe, mais Vouchers ele produz.
Também é possível expandir o Aquarium para manter mais peixes e aumentar os ganhos.

### Explicação Longa
#### Funcionamento Geral
Durante Fishing Event, você pega peixes para gerar Vouchers.
Os Vouchers são usados para comprar recompensas na loja do evento.

Cada captura custa 5 bait.
Existem 2 tipos de bait:
- Free Bait
- Paid Bait

O Free Bait se regenera com o tempo.
O Paid Bait deve ser obtido através da loja ou através de certas recompensas do evento.

#### Raridade dos Peixes
Os peixes têm 4 níveis de raridade:
- 1★ Fish
- 2★ Fish
- 3★ Fish
- 4★ Fish

Quanto mais estrelas um peixe tem, mais Vouchers ele gera por minuto.
Os 4★ Fish são muito mais frequentes com o Paid Bait.

Quando você obtém um peixe mais forte, um peixe fraco pode ser substituído automaticamente.
Isso permite melhorar progressivamente seu Aquarium.

#### Sistema Pity
O evento tem um sistema pity.
A cada 50 capturas, você tem garantia de obter pelo menos um 3★ Fish ou um 4★ Fish.
Este sistema ajuda a evitar longas sequências de maus resultados.

#### Sistema de Atualização de Peixes
Os peixes aparecem em 2 pools:
- Free Pool
- Paid Pool

Cada vez que um peixe é pego, o temporizador de atualização reinicia.
Se nenhum peixe aparecer por 30 minutos, o pool atualiza automaticamente.
Também é possível redefinir este temporizador pegando um peixe.

Este ponto é importante, pois você precisa monitorar os pools regularmente para não desperdiçar o bait.

#### Aquarium e Slots
Os peixes são mantidos no Aquarium.
Você precisa desbloquear tank slots para manter mais peixes.

Quanto mais peixes você mantém, mais Vouchers você ganha.
Peixes extras podem ser convertidos em Blue Shells.
Os Blue Shells são usados para desbloquear slots adicionais.

Portanto, o Aquarium é uma parte central do evento.
Um Aquarium maior dá melhor geração de Vouchers durante todo o Fishing Event.

#### Fim do Evento
Quando o evento termina:
- Todo o Free Bait não utilizado é convertido em Diamonds
- Todo o Paid Bait não utilizado é convertido em Diamonds
- A progressão não continua no próximo Fishing Event

Isso significa que você precisa otimizar seus recursos durante os 7 dias, pois nada é salvo para a próxima edição.
`,
    content_pl: `
## Przewodnik Fishing Event

### Krótka Wyjaśnienie
Fishing Event trwa 7 dni.
Podczas tego wydarzenia gracze łowią ryby za pomocą Free Bait lub Paid Bait.
Ryby produkują Vouchery, które są walutą wydarzenia.
Im rzadsza ryba, tym więcej Voucherów produkuje.
Możliwe jest również powiększenie Aquarium, aby pomieścić więcej ryb i zwiększyć zarobki.

### Długie Wyjaśnienie
#### Ogólne Działanie
Podczas Fishing Event łowisz ryby, aby generować Vouchery.
Vouchery są następnie wykorzystywane do kupowania nagród w sklepie wydarzenia.

Każde połów kosztuje 5 bait.
Istnieją 2 rodzaje bait:
- Free Bait
- Paid Bait

Free Bait regeneruje się z czasem.
Paid Bait musi być uzyskany poprzez sklep lub poprzez określone nagrody wydarzenia.

#### Rzadkość Ryb
Ryby mają 4 poziomy rzadkości:
- 1★ Fish
- 2★ Fish
- 3★ Fish
- 4★ Fish

Im więcej gwiazdek ma ryba, tym więcej Voucherów generuje na minutę.
4★ Fish są znacznie częstsze przy Paid Bait.

Gdy otrzymujesz silniejszą rybę, słaba ryba może zostać automatycznie zastąpiona.
To pozwala stopniowo ulepszać swój Aquarium.

#### System Pity
Wydarzenie ma system pity.
Każdych 50 połowów masz gwarancję uzyskania co najmniej 3★ Fish lub 4★ Fish.
Ten system pomaga uniknąć długich serii złych wyników.

#### System Odświeżania Ryb
Ryby pojawiają się w 2 pulach:
- Free Pool
- Paid Pool

Za każdym razem, gdy ryba jest złowiona, timer odświeżania resetuje się.
Jeśli żadna ryba nie pojawi się przez 30 minut, pula automatycznie się odświeża.
Możliwe jest również zresetowanie tego timera łowiąc rybę.

Ten punkt jest ważny, ponieważ musisz regularnie monitorować pule, aby nie marnować bait.

#### Aquarium i Sloty
Ryby są trzymane w Aquarium.
Musisz odblokować tank slots, aby pomieścić więcej ryb.

Im więcej ryb trzymasz, tym więcej Voucherów zarabiasz.
Nadwyżkę ryb można zamienić w Blue Shells.
Blue Shells służy do odblokowywania dodatkowych slotów.

Aquarium jest więc centralną częścią wydarzenia.
Większy Aquarium daje lepszą generację Voucherów przez cały Fishing Event.

#### Koniec Wydarzenia
Gdy wydarzenie się kończy:
- Wszystkie niewykorzystane Free Bait jest zamieniane na Diamonds
- Wszystkie niewykorzystane Paid Bait jest zamieniane na Diamonds
- Postęp nie jest kontynuowany w następnym Fishing Event

Oznacza to, że musisz zoptymalizować swoje zasoby przez 7 dni, ponieważ nic nie jest zapisywane na następną edycję.
`,
    content_id: `
## Panduan Fishing Event

### Penjelasan Singkat
Fishing Event berlangsung 7 hari.
Selama acara ini, pemain menangkap ikan dengan Free Bait atau Paid Bait.
Ikan menghasilkan Voucher, yang merupakan mata uang acara.
Semakin langka ikan, semakin banyak Voucher yang dihasilkannya.
Mungkin juga untuk memperbesar Aquarium untuk menyimpan lebih banyak ikan dan meningkatkan pendapatan.

### Penjelasan Panjang
#### Operasi Umum
Selama Fishing Event, Anda menangkap ikan untuk menghasilkan Voucher.
Voucher kemudian digunakan untuk membeli hadiah di toko acara.

Setiap penangkapan biaya 5 bait.
Ada 2 jenis bait:
- Free Bait
- Paid Bait

Free Bait regenerasi seiring waktu.
Paid Bait harus diperoleh melalui toko atau melalui hadiah acara tertentu.

#### Kelangkaan Ikan
Ikan memiliki 4 tingkat kelangkaan:
- 1★ Fish
- 2★ Fish
- 3★ Fish
- 4★ Fish

Semakin banyak bintang pada ikan, semakin banyak Voucher yang dihasilkannya per menit.
4★ Fish jauh lebih umum dengan Paid Bait.

Ketika Anda mendapatkan ikan yang lebih kuat, ikan yang lemah dapat diganti secara otomatis.
Ini memungkinkan Anda untuk secara bertahap meningkatkan Aquarium.

#### Sistem Pity
Acara ini memiliki sistem pity.
Setiap 50 penangkapan, Anda dijamin mendapatkan setidaknya 3★ Fish atau 4★ Fish.
Sistem ini membantu menghindari rentetan hasil buruk yang panjang.

#### Sistem Segarkan Ikan
Ikan muncul di 2 kolam:
- Free Pool
- Paid Pool

Setiap kali seekor ikan tertangkap, timer segarkan akan diatur ulang.
Jika tidak ada ikan yang muncul selama 30 menit, kolam akan segarkan secara otomatis.
Mungkin juga untuk mengatur ulang timer ini dengan menangkap ikan.

Poin ini penting, karena Anda perlu memantau kolam secara teratur untuk tidak membuang-buang bait.

#### Aquarium dan Slot
Ikan disimpan di Aquarium.
Anda perlu membuka tank slot untuk menyimpan lebih banyak ikan.

Semakin banyak ikan yang Anda simpan, semakin banyak Voucher yang Anda hasilkan.
Ikan berlebih dapat dikonversi menjadi Blue Shells.
Blue Shells digunakan untuk membuka slot tambahan.

Aquarium merupakan bagian sentral dari acara.
Aquarium yang lebih besar memberikan generasi Voucher yang lebih baik sepanjang Fishing Event.

#### Akhir Acara
Ketika acara berakhir:
- Semua Free Bait yang tidak terpakai dikonversi ke Diamonds
- Semua Paid Bait yang tidak terpakai dikonversi ke Diamonds
- Progresi tidak berlanjut ke Fishing Event berikutnya

Ini berarti Anda perlu mengoptimalkan sumber daya Anda selama 7 hari, karena tidak ada yang disimpan untuk edisi berikutnya.
`,
    content_ru: `
## Гайд Fishing Event

### Краткое объяснение
Fishing Event длится 7 дней.
Во время этого события игроки ловят рыбу с помощью Free Bait или Paid Bait.
Рыбы производят Vouchers, которые являются валютой события.
Чем реже рыба, тем больше Vouchers она производит.
Также можно расширить Aquarium, чтобы держать больше рыбы и увеличить доход.

### Подробное объяснение
#### Общее функционирование
Во время Fishing Event вы ловите рыбу для генерации Vouchers.
Vouchers затем используются для покупки наград в магазине события.

Каждый улов стоит 5 bait.
Существует 2 типа bait:
- Free Bait
- Paid Bait

Free Bait регенерирует со временем.
Paid Bait должен быть получен через магазин или через определённые награды события.

#### Редкость рыбы
Рыбы имеют 4 уровня редкости:
- 1★ Fish
- 2★ Fish
- 3★ Fish
- 4★ Fish

Чем больше звёзд у рыбы, тем больше Vouchers она производит в минуту.
4★ Fish гораздо чаще встречаются с Paid Bait.

Когда вы получаете более сильную рыбу, слабая рыба может быть автоматически заменена.
Это позволяет постепенно улучшать ваш Aquarium.

#### Pity System
Событие имеет pity system.
Каждые 50 уловов вам гарантированно выпадает как минимум 3★ Fish или 4★ Fish.
Эта система помогает избежать длинных серий плохих результатов.

#### Система обновления рыбы
Рыбы появляются в 2 пулах:
- Free Pool
- Paid Pool

Каждый раз, когда рыба поймана, таймер обновления сбрасывается.
Если рыба не появляется в течение 30 минут, пул автоматически обновляется.
Также можно сбросить этот таймер, поймав рыбу.

Это важный момент, поскольку вам нужно регулярно следить за пулами, чтобы не тратить впустую bait.

#### Aquarium и слоты
Рыбы хранятся в Aquarium.
Вам нужно разблокировать tank slots, чтобы хранить больше рыбы.

Чем больше рыбы вы держите, тем больше Vouchers зарабатываете.
Лишнюю рыбу можно конвертировать в Blue Shells.
Blue Shells используются для разблокировки дополнительных слотов.

Поэтому Aquarium является центральной частью события.
Больший Aquarium даёт лучшую генерацию Vouchers на протяжении всего Fishing Event.

#### Конец события
Когда событие заканчивается:
- Все неиспользованные Free Bait конвертируются в Diamonds
- Все неиспользованные Paid Bait конвертируются в Diamonds
- Прогресс не продолжается на следующий Fishing Event

Это означает, что вам нужно оптимизировать свои ресурсы в течение 7 дней, поскольку ничего не сохраняется для следующего издания.
`,
    tips: `
- Au début de l'événement, utilise activement ton Free Bait
- Transforme les poissons inutiles en Blue Shells pour ouvrir des slots plus vite
- L'objectif du début est de monter rapidement à 10 aquarium slots minimum
- Essaie d'atteindre 20 tank slots le plus tôt possible
- Pense à vérifier les pools toutes les 30 minutes
- N'utilise pas le Free Bait sur des 1★ Fish
- N'utilise le Paid Bait que quand un 4★ Fish est visible dans le Paid Pool
    `,
    tips_en: `
- At the beginning of the event, actively use your Free Bait
- Transform useless fish into Blue Shells to open slots faster
- The goal at the start is to quickly reach at least 10 aquarium slots
- Try to reach 20 tank slots as soon as possible
- Remember to check the pools every 30 minutes
- Don't use Free Bait on 1★ Fish
- Only use Paid Bait when a 4★ Fish is visible in the Paid Pool
    `,
    tips_it: `
- All'inizio dell'evento, usa attivamente il tuo Free Bait
- Trasforma i pesci inutili in Blue Shells per aprire slot più velocemente
- L'obiettivo all'inizio è raggiungere rapidamente almeno 10 aquarium slot
- Prova a raggiungere 20 tank slot il prima possibile
- Ricorda di controllare i pool ogni 30 minuti
- Non usare Free Bait su pesci 1★
- Usa il Paid Bait solo quando un 4★ Fish è visibile nel Paid Pool
    `,
    tips_es: `
- Al principio del evento, usa activamente tu Free Bait
- Transforma los peces inútiles en Blue Shells para abrir slots más rápido
- El objetivo al principio es llegar rápidamente a al menos 10 aquarium slots
- Intenta alcanzar 20 tank slots lo antes posible
- Recuerda revisar los pools cada 30 minutos
- No uses Free Bait en peces 1★
- Usa Paid Bait solo cuando un 4★ Fish sea visible en el Paid Pool
    `,
    tips_pt: `
- No início do evento, use ativamente seu Free Bait
- Transforme peixes inúteis em Blue Shells para abrir slots mais rapidamente
- O objetivo no início é alcançar rapidamente pelo menos 10 aquarium slots
- Tente atingir 20 tank slots o mais rápido possível
- Lembre-se de verificar os pools a cada 30 minutos
- Não use Free Bait em peixes 1★
- Use Paid Bait apenas quando um 4★ Fish estiver visível no Paid Pool
    `,
    tips_pl: `
- Na początku wydarzenia aktywnie używaj swojego Free Bait
- Zmieniaj niepotrzebne ryby w Blue Shells, aby szybciej otwierać sloty
- Celem na początku jest szybkie osiągnięcie co najmniej 10 aquarium slots
- Staraj się osiągnąć 20 tank slots jak najszybciej
- Pamiętaj o sprawdzaniu pul co 30 minut
- Nie używaj Free Bait na rybach 1★
- Używaj Paid Bait tylko gdy 4★ Fish jest widoczny w Paid Pool
    `,
    tips_id: `
- Di awal acara, gunakan Free Bait Anda secara aktif
- Ubah ikan yang tidak berguna menjadi Blue Shells untuk membuka slot lebih cepat
- Tujuan di awal adalah dengan cepat mencapai setidaknya 10 aquarium slots
- Coba capai 20 tank slots segera
- Ingatlah untuk memeriksa kolam setiap 30 menit
- Jangan gunakan Free Bait pada ikan 1★
- Gunakan Paid Bait hanya ketika 4★ Fish terlihat di Paid Pool
    `,
    tips_ru: `
- В начале события активно используйте свой Free Bait
- Превращайте бесполезную рыбу в Blue Shells, чтобы быстрее открывать слоты
- Цель в начале - быстро достичь как минимум 10 aquarium slots
- Постарайтесь достичь 20 tank slots как можно скорее
- Не забывайте проверять пулы каждые 30 минут
- Не используйте Free Bait на рыбе 1★
- Используйте Paid Bait только когда 4★ Fish виден в Paid Pool
    `,
    tips_de: `
- Nutze zu Beginn des Events aktiv dein Free Bait
- Verwandle unnütze Fische in Blue Shells, um Slots schneller zu öffnen
- Das Ziel zu Beginn ist, schnell mindestens 10 Aquarium-Slots zu erreichen
- Versuche so schnell wie möglich 20 Tank-Slots zu erreichen
- Denke daran, die Pools alle 30 Minuten zu überprüfen
- Verwende kein Free Bait auf 1★-Fischen
- Verwende Paid Bait nur, wenn ein 4★-Fisch im Paid Pool sichtbar ist
    `,
    content_de: `
## Angel-Event Leitfaden

### Kurze Erklärung
Angel-Event dauert 7 Tage.
Während dieses Events fangen Spieler Fische mit Free Bait oder Paid Bait.
Fische produzieren Gutscheine, die die Event-Währung sind.
Je seltener der Fisch, desto mehr Gutscheine produziert er.
Es ist auch möglich, das Aquarium zu erweitern, um mehr Fische zu halten und die Einnahmen zu erhöhen.

### Lange Erklärung
#### Allgemeiner Betrieb
Während des Angel-Events fängst du Fische, um Gutscheine zu generieren.
Gutscheine werden dann verwendet, um Belohnungen im Event-Shop zu kaufen.

Jeder Fang kostet 5 Köder.
Es gibt 2 Arten von Ködern:
- Free Bait
- Paid Bait

Free Bait regeneriert sich über Zeit.
Paid Bait muss über den Shop oder durch bestimmte Event-Belohnungen erhalten werden.

#### Fisch-Seltenheit
Fische haben 4 Seltenheitsstufen:
- 1★ Fish
- 2★ Fish
- 3★ Fish
- 4★ Fish

Je mehr Sterne ein Fisch hat, desto mehr Gutscheine generiert er pro Minute.
4★-Fische sind viel häufiger mit Paid Bait.

Wenn du einen stärkeren Fisch bekommst, kann ein schwacher Fisch automatisch ersetzt werden.
Dies ermöglicht es dir, dein Aquarium schrittweise zu verbessern.

#### Pity-System
Das Event hat ein Pity-System.
Alle 50 Fänge bist du garantiert, mindestens einen 3★-Fisch oder 4★-Fisch zu erhalten.
Dieses System hilft, lange Serien schlechter Ergebnisse zu vermeiden.

#### Fisch-Aktualisierungssystem
Fische erscheinen in 2 Pools:
- Free Pool
- Paid Pool

Jedes Mal, wenn ein Fisch gefangen wird, wird der Aktualisierungs-Timer zurückgesetzt.
Wenn 30 Minuten lang kein Fisch erscheint, wird der Pool automatisch aktualisiert.
Es ist auch möglich, diesen Timer zurückzusetzen, indem man einen Fisch fängt.

Dieser Punkt ist wichtig, da du die Pools regelmäßig überwachen musst, um den Köder nicht zu verschwenden.

#### Aquarium und Slots
Fische werden im Aquarium gehalten.
Du musst Tank-Slots freischalten, um mehr Fische behalten zu können.

Je mehr Fische du behältst, desto mehr Gutscheine verdienst du.
Überschüssige Fische können in Blue Shells umgewandelt werden.
Blue Shells werden verwendet, um zusätzliche Slots freizuschalten.

Das Aquarium ist daher ein zentraler Teil des Events.
Ein größeres Aquarium gibt eine bessere Gutschein-Generierung während des gesamten Angel-Events.

#### Ende des Events
Wenn das Event endet:
- Alle ungenutzten Free Bait werden in Diamanten umgewandelt
- Alle ungenutzten Paid Bait werden in Diamanten umgewandelt
- Der Fortschritt wird nicht auf das nächste Angel-Event übertragen

Das bedeutet, dass du deine Ressourcen während der 7 Tage optimieren musst, da nichts für die nächste Ausgabe aufbewahrt wird.
    `,
  },
  {
    id: "world-building",
    title: "World Building Guide",
    title_de: "World Building Leitfaden",
    description: "Guide World Building",
    description_de: "Leitfaden zum Bau und zur Entwicklung der Welt.",
    icon: "🌍",
    color: "#10b981",
    category: "Intermédiaire",
    category_de: "Fortgeschritten",
    readTime: "10 min",
    content: `
## World Building Guide - TopGirl

[Content to be completed]

### Overview
Build and develop your world in the game. This guide covers the basics of world building mechanics.

(Content from WorldBuildingGuide.jpg to be added)
    `,
    content_de: `
## World Building Leitfaden - TopGirl

[Inhalt wird ergänzt]

### Übersicht
Baue und entwickle deine Welt im Spiel. Dieser Leitfaden behandelt die Grundlagen des World-Building-Systems.

(Inhalt von WorldBuildingGuide.jpg wird ergänzt)
    `
  },
  {
    id: "vip-level",
    title: "VIP Level Guide",
    title_de: "VIP Level Leitfaden",
    description: "Guide VIP Level",
    description_de: "Punkte, die für jedes VIP-Level und zugehörige Vorteile erforderlich sind.",
    icon: "⭐",
    color: "#f59e0b",
    category: "Avancé",
    category_de: "Fortgeschritten",
    readTime: "15 min",
    content: `
## VIP Level Guide - TopGirl

### Overview
Detailed guide on points required for each VIP level.

### VIP Benefits
- VIP players receive various bonuses and exclusive rewards
- Higher VIP levels unlock more benefits

(Content from VIPLevelGuide.jpg to be added)
    `,
    content_de: `
## VIP Level Leitfaden - TopGirl

### Übersicht
Detaillierter Leitfaden zu den für jedes VIP-Level erforderlichen Punkten.

### VIP-Vorteile
- VIP-Spieler erhalten verschiedene Boni und exklusive Belohnungen
- Höhere VIP-Stufen schalten mehr Vorteile frei

(Inhalt von VIPLevelGuide.jpg wird ergänzt)
    `
  },
  {
    id: "ceo-coins",
    title: "CEO Coins Purchase Guide",
    title_de: "CEO Coins Kaufleitfaden",
    description: "Guide d'achat de CEO Coins",
    description_de: "Wie man CEO Coins auf der offiziellen Zahlungswebsite kauft.",
    icon: "💰",
    color: "#84cc16",
    category: "Avancé",
    category_de: "Fortgeschritten",
    readTime: "5 min",
    content: `
## CEO Coins Purchase Guide - TopGirl

### How to Purchase CEO Coins

**Step 1: Visit Payment Website**
Using your mobile browser, visit: https://pay2.a3games.com/topgirl

**Step 2: Select Region**
In the upper right corner of the page, select your region and set the payment currency to a supported currency

**Step 3: Enter Account Info**
Enter your ID and nickname
(Please make sure that the ID and nickname you enter are correct, otherwise you may not be able to receive CEO coins normally)

**Step 4: Select Amount**
Select the amount of CEO coins you want to purchase and add a bank card to complete the payment

**Step 5: Redeem in Game**
After completing the purchase of CEO coins, enter the game, select the gift package you need, click the gift package price, and choose to use CEO coins to complete the redemption.
    `,
    content_de: `
## CEO Coins Kaufleitfaden - TopGirl

### Wie man CEO Coins kauft

**Schritt 1: Zahlungswebsite besuchen**
Besuche mit deinem mobilen Browser: https://pay2.a3games.com/topgirl

**Schritt 2: Region auswählen**
Wähle in der oberen rechten Ecke der Seite deine Region und stelle die Zahlungswährung auf eine unterstützte Währung ein

**Schritt 3: Kontoinformationen eingeben**
Gib deine ID und deinen Spitznamen ein
(Bitte stelle sicher, dass die ID und der Spitzname korrekt sind, da du sonst möglicherweise keine CEO Coins normal erhalten kannst)

**Schritt 4: Betrag auswählen**
Wähle die Menge an CEO Coins, die du kaufen möchtest, und füge eine Bankkarte hinzu, um die Zahlung abzuschließen

**Schritt 5: Im Spiel einlösen**
Nach dem Kauf der CEO Coins, betritt das Spiel, wähle das Geschenkpaket, das du brauchst, klicke auf den Geschenkpaketpreis und wähle CEO Coins zur Einlösung.
    `
  },
  {
    id: "alliance-management",
    title: "Alliance Management Guide",
    title_de: "Allianz-Management Leitfaden",
    description: "Guide de gestion d'alliance",
    description_de: "Rollen, Verantwortlichkeiten und Strategien für die Verwaltung einer Allianz in TopGirl.",
    icon: "🏰",
    color: "#8b5cf6",
    category: "Avancé",
    category_de: "Fortgeschritten",
    readTime: "12 min",
    content: `
## Alliance Management Guide - TopGirl

### Group Responsibilities

#### Leadership & Strategy
- **Strategist / Meta Analyst**: Sets long-term server goals, advises build & expansion focus
- **Builder / Group Developer**: Oversees club construction, gathers progression resources, plans club growth paths
- **Rally Leader / War General**: Launches rallies & attacks, chooses targets & timing, coordinates war operations
- **Trainer / Mentor**: Supports new players, guides artist development, helps with squad formation

#### Communication & Diplomacy
- **Group Communicator**: Posts announcements, summarizes updates, manages Discord & In-game mail
- **Diplomat / Alliance Manager**: Manages alliances & NAPs, handles negotiations, coordinates cooperation
- **Recruiter / HR**: Recruits new members, screens applicants, onboards members

#### Intel & Support
- **Intel Officer / Spy**: Scans enemy clubs, tracks activity & movement, monitors deployments
- **Event Organizer**: Supports radio battles, assists wars & events
- **Fanmeeting Coordinator**: Manages fan interactions and events

### Strategy & War
Develop your alliance through careful planning and coordination with members.
    `,
    content_de: `
## Allianz-Management Leitfaden - TopGirl

### Gruppenverantwortlichkeiten

#### Führung & Strategie
- **Stratege / Meta-Analyst**: Setzt langfristige Server-Ziele, berät zu Bau- und Expansionsfokus
- **Bauleiter / Gruppenentwickler**: Überwacht den Klubbau, sammelt Fortschritts-Ressourcen, plant Klub-Wachstumspfade
- **Rally-Leiter / Kriegsgeneral**: Startet Rallys & Angriffe, wählt Ziele & Timing, koordiniert Kriegsoperationen
- **Trainer / Mentor**: Unterstützt neue Spieler, leitet Künstlerinentwicklung, hilft bei Truppenzusammenstellung

#### Kommunikation & Diplomatie
- **Gruppenkommunikator**: Postet Ankündigungen, fasst Updates zusammen, verwaltet Discord & Ingame-Mail
- **Diplomat / Allianzmanager**: Verwaltet Allianzen & NAPs, handhabt Verhandlungen, koordiniert Zusammenarbeit
- **Rekrutierer / Personaler**: Rekrutiert neue Mitglieder, prüft Bewerber, nimmt Mitglieder auf

#### Aufklärung & Unterstützung
- **Aufklärungsoffizier / Spion**: Scannt feindliche Klubs, verfolgt Aktivität & Bewegung, überwacht Einsätze
- **Veranstaltungsorganisator**: Unterstützt Radio-Schlachten, hilft bei Kriegen & Veranstaltungen
- **Fanmeeting-Koordinator**: Verwaltet Fan-Interaktionen und Veranstaltungen

### Strategie & Krieg
Entwickle deine Allianz durch sorgfältige Planung und Koordination mit Mitgliedern.
    `
  },
  {
    id: "peak-level",
    title: "Peak Level Guide",
    title_de: "Peak Level Leitfaden",
    description: "Guide Peak Level",
    description_de: "Peak Level System für SSR-Künstler. Wichtige Meilensteine und F2P-Strategien.",
    icon: "📊",
    color: "#ec4899",
    category: "Avancé",
    category_de: "Fortgeschritten",
    readTime: "15 min",
    content: `
## Peak Level Guide - TopGirl

### Overview
Peak Level is a late-game progression system for SSR girls. Each SSR girl with 3 skills and 5x (gold stars) becomes eligible for Peak Level upgrades.

### Key Points
- **Focus on Total Peak Level**, not only your main team
- Push top SSR girls as high as possible (100-400+) for strong milestone buffs
- Important milestones: Lv40 / Lv70 / Lv100 / Lv300 / Lv400
- Use SSR Universal Photos freely - efficiency > saving

### Minimum Goal
Your minimum goal is to bring EVERY SSR girl to Peak Level 10.
Each SSR at Peak Lv10 gives +0.5% Sing & +0.5% Dance (global buff)

### For F2P Players
Best Peak candidates (easy photo access):
- **Zendaya** (Stock Shop)
- **Skylar** (Group Shop)
- **Claire** (Collection Rewards)

Aim for Peak Lv5-10 on 1-2 girls max. Max your main team before investing more into Peak Levels.

Peak Level is a long-term global power system, perfect for whales.
    `,
    content_de: `
## Peak Level Leitfaden - TopGirl

### Übersicht
Peak Level ist ein Spätispiel-Fortschrittssystem für SSR-Mädchen. Jedes SSR-Mädchen mit 3 Fähigkeiten und 5x (Goldsterne) wird für Peak Level-Upgrades freigeschaltet.

### Wichtige Punkte
- **Fokussiere dich auf das Gesamte Peak Level**, nicht nur auf dein Hauptteam
- Bringe Top-SSR-Mädchen so weit wie möglich (100-400+) für starke Meilenstein-Buffs
- Wichtige Meilensteine: Lv40 / Lv70 / Lv100 / Lv300 / Lv400
- Verwende SSR Universal Photos frei - Effizienz > Sparen

### Mindestziel
Dein Mindestziel ist es, JEDES SSR-Mädchen auf Peak Level 10 zu bringen.
Jedes SSR auf Peak Lv10 gibt +0,5% Sing & +0,5% Dance (globaler Buff)

### Für F2P-Spieler
Beste Peak-Kandidaten (einfacher Foto-Zugang):
- **Zendaya** (Aktienladen)
- **Skylar** (Gruppenladen)
- **Claire** (Sammelbelohnungen)

Ziele auf Peak Lv5-10 auf maximal 1-2 Mädchen. Maxe dein Hauptteam, bevor du mehr in Peak Levels investierst.

Peak Level ist ein langfristiges globales Kraftsystem, perfekt für Whales.
    `
  },
  {
    id: "construction-equipe-debut",
    title: "Construction d'équipe début de jeu",
    title_de: "Frühspiel-Teamaufbau",
    description: "Choisir ses artistes au début et éviter de gaspiller des ressources.",
    description_de: "Wähle dein frühes Team und vermeide verschwendete Ressourcen.",
    icon: "🎯",
    color: "#f97316",
    category: "Avancé - Début de jeu",
    category_de: "Fortgeschritten - Frühspiel",
    readTime: "12 min",
    content: `
## Guide Construction d'équipe début de jeu

### Type
Guide classique

### Explication courte
Le choix des artistes est la décision la plus importante du jeu.
Les artistes se débloquent par étapes. Une équipe forte au début peut devenir moyenne plus tard.
Tu dois décider tôt pour éviter de gaspiller des ressources.

### Explication longue
Progression des artistes
Les artistes se débloquent par saisons. Tu peux voir la saison sur la fiche artiste.
Plus tu avances, plus les artistes ont des compétences puissantes. La tierlist aide à situer leur valeur.
Le choix est plus complexe que la plupart des joueurs le pensent.

Bonus de genre
Jouer plusieurs artistes du même genre donne un bonus global de stats.
Les paliers sont 3/5, 4/5 et 5/5.
Plus tu avances, plus ces bonus deviennent importants.

Artistes recommandées au début
Claire : très forte et facile à monter grâce à ses photos.
Alice : double dommage et EDM, un genre dominant au début.
Aurora : double dommage.
Everly : EDM, deux bons skills.
Zendayah : moins forte, mais stable pour F2P et petits achats sur une longue période.
Paisley : via Monthly Card, excellente pour monter une équipe Rock.
Longkui : via Auction House, très forte sur toute la durée du jeu et en EDM.

Déblocages clés autour de Tokyo
Chizuru : première artiste avec Rally Capacity, très utile à Tokyo.
Kokoro : disponible très tôt, EDM avec les mêmes compétences qu'Alice.
Yuuko : utile pour les joueurs Rock.

Exemples d'équipes au début d'Abroad
Équipe baleine : Everly, Longkui, Alice, Kokoro, Chizuru.
Équipe middle : Claire, Yuuko, Paisley, Zendayah, une 5e artiste au choix.
La 5e peut être Alice, Aurora, Kokoro ou Skylar pour renforcer le genre Rock et préparer Peak.

Équipe F2P : Zendayah, Claire, Nova, Julia, et 1 autre artiste selon tes interviews.
Julia n'est pas 100% F2P. Elle demande un petit achat pendant l'événement Midnight Race.
Le but est de limiter les investissements sur des artistes que tu ne monteras pas.

Suite de la progression
Pendant Bali Warmup et Roma Warmup, tu débloques des artistes EDM avec Rally Capacity et damage to player.
Elles sont très fortes pour les leaders de groupe.
Sari arrive à Bali. Xenia arrive à Roma.

### Conseils
- Décide tôt de ton genre principal pour profiter des bonus 3/5, 4/5, 5/5.
- Ne gaspille pas tes ressources sur des artistes que tu n'utiliseras pas à long terme.
- Pense toujours au serveur et au groupe. La progression dépend du collectif.

### Guides liés
- Team Builder
- Guide Peak Level
- Guide des équipements
- Guide de la structure du jeu
- Guide des stats : Chant, Danse et Management
- Guide Fishing Event
- Guide VS Group Event

### Glossaire ajouté
- Bonus de genre
- 3/5, 4/5, 5/5
- Rally Capacity
- Damage to player
- Monthly Card
- Interviews
- Baleine
- F2P
- Petit achat
    `,
    content_de: `
## Leitfaden: Frühspiel-Teamaufbau

### Typ
Klassischer Leitfaden

### Kurze Erklärung
Die Wahl der Künstlerinnen ist die wichtigste Entscheidung im Spiel.
Künstlerinnen werden nach Jahreszeiten freigeschaltet. Du kannst die Jahreszeit auf der Künstlerinnen-Karte sehen.
Ein starkes Team am Anfang kann später durchschnittlich werden.
Du musst frühzeitig entscheiden, um Ressourcen nicht zu verschwenden.

### Lange Erklärung
Künstlerinnen-Fortschritt
Künstlerinnen werden nach Jahreszeiten freigeschaltet. Du kannst die Jahreszeit auf der Künstlerinnen-Karte sehen.
Je weiter du kommst, desto stärkere Fähigkeiten haben die Künstlerinnen. Die Tierliste hilft, ihren Wert einzuschätzen.
Die Wahl ist komplizierter als die meisten Spieler denken.

Genre-Boni
Mehrere Künstlerinnen desselben Genres zu spielen gibt einen globalen Stats-Bonus.
Die Schwellen sind 3/5, 4/5 und 5/5.
Je weiter du kommst, desto wichtiger werden diese Boni.

Empfohlene Künstlerinnen am Anfang
Claire: sehr stark und leicht zu leveln dank ihrer Fotos.
Alice: doppelter Schaden und EDM, ein dominantes Genre am Anfang.
Aurora: doppelter Schaden.
Everly: EDM, zwei gute Fähigkeiten.
Zendayah: weniger stark, aber stabil für F2P und kleine Käufe über einen langen Zeitraum.
Paisley: über Monthly Card, ausgezeichnet um ein Rock-Team aufzubauen.
Longkui: über Auction House, sehr stark für die gesamte Spieldauer und in EDM.

Wichtige Freischaltungen um Tokio
Chizuru: erste Künstlerin mit Rally Capacity, sehr nützlich in Tokio.
Kokoro: sehr früh verfügbar, EDM mit denselben Fähigkeiten wie Alice.
Yuuko: nützlich für Rock-Spieler.

Beispiele für Teams am Anfang von Abroad
Wal-Team: Everly, Longkui, Alice, Kokoro, Chizuru.
Middle-Team: Claire, Yuuko, Paisley, Zendayah, eine 5. Künstlerin nach Wahl.
Die 5. kann Alice, Aurora, Kokoro oder Skylar sein, um das Rock-Genre zu verstärken und auf Peak vorzubereiten.

F2P-Team: Zendayah, Claire, Nova, Julia, und eine andere Künstlerin je nach deinen Interviews.
Julia ist nicht 100% F2P. Sie erfordert einen kleinen Kauf während des Midnight Race-Events.
Das Ziel ist es, Investitionen in Künstlerinnen zu begrenzen, die du nicht langfristig nutzen wirst.

Fortsetzung des Fortschritts
Während Bali Warmup und Roma Warmup schaltest du EDM-Künstlerinnen mit Rally Capacity und Damage to Player frei.
Sie sind sehr stark für Gruppenleiter.
Sari kommt bei Bali. Xenia kommt bei Roma.

### Tipps
- Entscheide frühzeitig für dein Hauptgenre, um von den 3/5, 4/5, 5/5-Boni zu profitieren.
- Verschwende deine Ressourcen nicht für Künstlerinnen, die du langfristig nicht nutzen wirst.
- Denke immer an den Server und die Gruppe. Der Fortschritt hängt von der Gemeinschaft ab.

### Verwandte Leitfäden
- Team Builder
- Peak Level Leitfaden
- Ausrüstungs-Leitfaden
- Spielstruktur-Leitfaden
- Stats-Leitfaden: Sing, Tanz und Management
- Fishing Event Leitfaden
- VS Group Event Leitfaden

### Glossar
- Genre-Bonus
- 3/5, 4/5, 5/5
- Rally Capacity
- Damage to player
- Monthly Card
- Interviews
- Wal
- F2P
- Kleiner Kauf
    `
  },
  {
    id: "construction-equipe-fin",
    title: "Construction d'équipe fin de jeu",
    title_de: "Spätspiel-Teamaufbau",
    description: "Construire une équipe optimisée en fin de jeu selon l'adversaire.",
    description_de: "Erstelle ein optimiertes Team basierend auf Gegner und Kontext.",
    icon: "🧠",
    color: "#f59e0b",
    category: "Avancé - Fin de jeu",
    category_de: "Fortgeschritten - Spätspiel",
    readTime: "12 min",
    content: `
## Guide Construction d'équipe fin de jeu

### Type
Guide classique

### Explication courte
En fin de jeu, une bonne équipe se construit selon le contexte.
Il faut tenir compte des bonus de genre et du type d'équipe adverse.
Une équipe optimisée change selon le serveur et les événements.

### Explication longue
Bonus de genre
Jouer plusieurs artistes du même genre donne un bonus global de stats.
Les paliers sont 3/5, 4/5 et 5/5.
Ces bonus sont un pilier de la construction d'équipe en fin de jeu.

Adapter l'équipe à l'adversaire
Une composition optimale dépend de l'équipe adverse.
Contre une équipe orientée Basic Attack, il faut plus de résistance Basic Attack.
Contre une équipe orientée Skill Damage, il faut plus de résistance Skill Damage.
Sans cette adaptation, tu perds en efficacité même avec de bons artistes.

Rally Capacity et pertes de fans
Les grandes équipes utilisent beaucoup de Rally Capacity pour gagner les combats.
Le point faible est la faible résistance.
Tu gagnes, mais tu perds plus de fans sur le long terme.

Notes sur les artistes Auction House
Longkui et Monica sont obtenues via Auction House.
Ce sont deux des artistes les plus puissantes du jeu.
Elles restent excellentes à long terme.

Notes par genre
EDM est dominant sur toute la durée du jeu.
Le combo Rally Capacity + damage to player est très fort.

Rock est le meilleur rapport qualité/prix.
Le combo résistance + damage to player est très stable.
Ce n'est pas toujours le plus efficace pour la baleine du serveur, mais c'est la meilleure équipe pour le ratio éliminations / pertes de fans.

Pop revient très fort en fin de jeu.
La combinaison Monica + les derniers artistes sortis rend le genre très compétitif.

### Conseils
- Analyse toujours l'équipe adverse avant de choisir ta composition.
- Pense à l'objectif : victoire rapide, pertes faibles, ou classement d'événement.
- Utilise le Team Builder pour comparer tes options.

### Guides liés
- Team Builder
- Guide Peak Level
- Guide des équipements
- Guide de la structure du jeu
- Guide des stats : Chant, Danse et Management

### Glossaire ajouté
- Basic Attack
- Skill Damage
- Rally Capacity
- Auction House
- Damage to player
- Éliminations / pertes de fans
    `,
    content_de: `
## Leitfaden: Spätspiel-Teamaufbau

### Typ
Klassischer Leitfaden

### Kurze Erklärung
Im Spätspiel wird ein gutes Team je nach Kontext aufgebaut.
Man muss die Genre-Boni und die Art des gegnerischen Teams berücksichtigen.
Ein optimiertes Team ändert sich je nach Server und Ereignissen.

### Lange Erklärung
Genre-Boni
Mehrere Künstlerinnen desselben Genres zu spielen gibt einen globalen Stats-Bonus.
Die Schwellen sind 3/5, 4/5 und 5/5.
Diese Boni sind ein Grundpfeiler des Teamaufbaus im Spätspiel.

Das Team an den Gegner anpassen
Eine optimale Zusammensetzung hängt vom gegnerischen Team ab.
Gegen ein Team mit Basic Attack-Fokus braucht man mehr Basic Attack-Resistenz.
Gegen ein Team mit Skill Damage-Fokus braucht man mehr Skill Damage-Resistenz.
Ohne diese Anpassung verliert man an Effizienz, selbst mit guten Künstlerinnen.

Rally Capacity und Fan-Verluste
Große Teams nutzen viel Rally Capacity um Kämpfe zu gewinnen.
Der Schwachpunkt ist die geringe Resistenz.
Man gewinnt, verliert aber langfristig mehr Fans.

Auktionshaus-Künstlerinnen
Longkui und Monica sind über das Auktionshaus erhältlich.
Das sind zwei der stärksten Künstlerinnen im Spiel.
Sie bleiben langfristig ausgezeichnet.

Hinweise nach Genre
EDM ist während der gesamten Spieldauer dominant.
Die Kombination Rally Capacity + Damage to Player ist sehr stark.

Rock hat das beste Preis-Leistungs-Verhältnis.
Die Kombination Resistenz + Damage to Player ist sehr stabil.
Es ist nicht immer das effektivste für den Server-Wal, aber es ist das beste Team für das Verhältnis Eliminierungen / Fan-Verluste.

Pop kommt im Spätspiel sehr stark zurück.
Die Kombination Monica + die neuesten Künstlerinnen macht das Genre sehr kompetitiv.

### Tipps
- Analysiere immer das gegnerische Team, bevor du deine Zusammensetzung wählst.
- Denke an das Ziel: schneller Sieg, geringe Verluste, oder Event-Ranking.
- Nutze den Team Builder um deine Optionen zu vergleichen.

### Verwandte Leitfäden
- Team Builder
- Peak Level Leitfaden
- Ausrüstungs-Leitfaden
- Spielstruktur-Leitfaden
- Stats-Leitfaden: Sing, Tanz und Management

### Glossar
- Basic Attack
- Skill Damage
- Rally Capacity
- Auktionshaus
- Damage to Player
- Eliminierungen / Fan-Verluste
    `
  },
  {
    id: "group-shop",
    title: "Group Shop Guide",
    title_de: "Group Shop Leitfaden",
    description: "Guide Group Shop",
    description_de: "Was du im Group Shop kaufen solltest? Kaufprioritätsreihenfolge.",
    icon: "🛒",
    color: "#f97316",
    category: "Débutant",
    category_de: "Anfänger",
    readTime: "5 min",
    content: `
## Group Shop Guide - TopGirl

### What to Buy

**1. Promotion Manuals**
- Always buy them first
- Very few of them are available
- Frequently required if you fight often

**2. SSR Promote Cards**
- Promote cards will always be required
- New SSR artists are added every event

**3. Asset Coins**
- A lot of asset coins will be required to max the promoted assets

**4. Vehicle Parts**
- Buy them if you haven't maxed your car yet

**5. Skylar Photos**
- Only buy them if you intend to max Skylar
- Very expensive

**6. HQ Cards**
- Buy them if your HQ isn't maxed yet

**7. Migration Tickets**
- Buy them if you want to migrate to another server
    `,
    content_de: `
## Group Shop Leitfaden - TopGirl

### Was man kaufen sollte

**1. Förderhandbücher**
- Kaufe sie immer zuerst
- Sehr wenige davon sind verfügbar
- Häufig erforderlich, wenn du oft kämpfst

**2. SSR Förderkarten**
- Kaufe sie an zweiter Stelle
- Werden immer für die Entwicklung von SSR-Künstlerinnen benötigt
- Neue SSR-Künstlerinnen werden bei jedem Event hinzugefügt

**3. Asset-Münzen**
- Viele Asset-Münzen werden benötigt, um die geförderten Assets zu maximieren

**4. Fahrzeugteile**
- Kaufe sie, wenn du dein Auto noch nicht maximiert hast

**5. Skylar-Fotos**
- Kaufe sie nur, wenn du Skylar maximieren willst
- Sehr teuer

**6. HQ-Karten**
- Kaufe sie, wenn dein HQ noch nicht maximiert ist

**7. Migrations-Tickets**
- Kaufe sie, wenn du zu einem anderen Server migrieren möchtest
    `
  },
];

const slugify = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');

const allGuides: Guide[] = (() => {
  const merged = new Map<string, Guide>();
  [...guides, ...((guidesData as Guide[]) || [])].forEach((guide) => {
    if (!guide?.id) return;
    merged.set(guide.id, guide);
  });
  return Array.from(merged.values());
})();

const artistsBySlug = new Map(
  (artistsData as { name: string }[]).map((artist) => [slugify(artist.name), artist])
);

export default function GuideDetailClient({ lang, slug }: { lang: string; slug: string }) {
  const t = guideTranslations[lang] || guideTranslations.en;
  
  const guide = allGuides.find(g => g.id === slug);
  const [glossaryContent, setGlossaryContent] = useState<string>("");

  useEffect(() => {
    fetch("/glossaire.txt")
      .then((res) => (res.ok ? res.text() : ""))
      .then((text) => setGlossaryContent(text))
      .catch(() => setGlossaryContent(""));
  }, []);

  if (!guide) {
    return (
      <div className="container" style={{ padding: "40px 20px", textAlign: "center" }}>
        <h1 style={{ color: "#fff", marginBottom: "20px" }}>{t.notFound}</h1>
        <Link href={`/${lang}/guides/`} style={{ color: "#8b5cf6" }}>
          {t.backToGuides}
        </Link>
      </div>
    );
  }

  // Helper to parse inline bold text **text** into styled spans
  const parseInlineBold = (text: string, accentColor: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={idx} style={{ fontWeight: 700 }}>{part.slice(2, -2)}</strong>;
      }
      return <span key={idx}>{part}</span>;
    });
  };

  // Helper to render markdown-like content
  const renderContent = (text: string, color: string) => {
    const normalizedText = text.replace(/\n{3,}/g, '\n\n');
    const lines = normalizedText.split('\n');
    const elements: ReactNode[] = [];
    let listMode = false;
    let lastNonEmpty = '';
    let lastWasEmpty = false;
    const isSectionTitle = (line: string, nextLine?: string) => {
      const trimmed = line.trim();
      if (!trimmed) return false;
      if (trimmed.endsWith(':')) return false;
      if (trimmed.startsWith('- ') || /^\d+\.\s/.test(trimmed)) return false;
      if (/[.!?]/.test(trimmed)) return false;
      if (trimmed.length > 70) return false;
      const nextTrimmed = (nextLine || '').trim();
      return nextTrimmed === '' || nextTrimmed.startsWith('- ') || nextTrimmed.length < 40;
    };

    const pushParagraph = (contentLine: string, key: number) => {
      elements.push(
        <p key={key} className="guide-p">
          {parseInlineBold(contentLine, color)}
        </p>
      );
    };

    for (let i = 0; i < lines.length; i += 1) {
      const line = lines[i];
      const trimmed = line.trim();

      if (trimmed === '•' || trimmed === '-' || trimmed === '·') {
        continue;
      }

      if (!trimmed) {
        if (lastWasEmpty) continue;
        lastWasEmpty = true;
        if (listMode) {
          elements.push(<div key={i} style={{ height: "4px" }} />);
          continue;
        }
        listMode = false;
        elements.push(<div key={i} style={{ height: "8px" }} />);
        continue;
      }
      lastWasEmpty = false;

      if (listMode && lastNonEmpty.endsWith(':')) {
        if (trimmed.length <= 80 && !/[.!?]$/.test(trimmed)) {
          elements.push(
            <div key={i} className="guide-li">
              <span className="guide-li-dot">•</span>
              <span className="guide-li-text">{parseInlineBold(trimmed, color)}</span>
            </div>
          );
          continue;
        }
        listMode = false;
      }

      if (isSectionTitle(trimmed, lines[i + 1])) {
        listMode = false;
        elements.push(
          <h3 key={i} className="guide-section">
            {parseInlineBold(trimmed, color)}
          </h3>
        );
        lastNonEmpty = trimmed;
        continue;
      }

      if (line.startsWith('## ')) {
        listMode = false;
        elements.push(
          <h2 key={i} className="guide-h2">
            {parseInlineBold(line.replace('## ', ''), color)}
          </h2>
        );
        lastNonEmpty = trimmed;
        continue;
      }
      if (line.startsWith('### ')) {
        listMode = false;
        elements.push(
          <h3 key={i} className="guide-h3">
            {parseInlineBold(line.replace('### ', ''), color)}
          </h3>
        );
        lastNonEmpty = trimmed;
        continue;
      }
      if (line.startsWith('#### ')) {
        listMode = false;
        elements.push(
          <div key={i} className="guide-h4">
            {parseInlineBold(line.replace('#### ', ''), color)}
          </div>
        );
        lastNonEmpty = trimmed;
        continue;
      }
      if (/^(explication courte|explication longue|short explanation|long explanation|spiegazione breve|spiegazione dettagliata|explicación corta|explicación larga|explicação curta|explicação longa|krótkie wyjaśnienie|długie wyjaśnienie|penjelasan singkat|penjelasan panjang|краткое объяснение|подробное объяснение|kurze erklärung|lange erklärung|conseils|tips|tipps|rewards|récompenses|guides liés|glossaire)/i.test(trimmed)) {
        listMode = false;
        elements.push(
          <h3 key={i} className="guide-label">
            {parseInlineBold(trimmed, color)}
          </h3>
        );
        lastNonEmpty = trimmed;
        continue;
      }
      if (/^(type\s*:\s*|niveau\s*:\s*|level\s*:\s*)/i.test(trimmed)) {
        listMode = false;
        elements.push(
          <div key={i} className="guide-meta">
            {parseInlineBold(trimmed, color)}
          </div>
        );
        lastNonEmpty = trimmed;
        continue;
      }
      if (line.startsWith('| ')) {
        listMode = false;
        const cells = line.split('|').filter(c => c.trim() && !c.match(/^[-\s]+$/));
        if (cells.length === 0) continue;
        elements.push(
          <div key={i} className="guide-table-row">
            {cells.map((cell, j) => (
              <span key={j} className="guide-table-cell">{cell.trim()}</span>
            ))}
          </div>
        );
        lastNonEmpty = trimmed;
        continue;
      }

      if (line.startsWith('- ')) {
        listMode = true;
        elements.push(
          <div key={i} className="guide-li">
            <span className="guide-li-dot">▸</span>
            <span className="guide-li-text">{parseInlineBold(line.replace('- ', ''), color)}</span>
          </div>
        );
        lastNonEmpty = trimmed;
        continue;
      }
      if (/^\d+\.\s/.test(line)) {
        listMode = true;
        elements.push(
          <div key={i} className="guide-num">
            <span className="guide-num-badge">{line.match(/^\d+/)![0]}.</span>
            <span className="guide-li-text">{parseInlineBold(line.replace(/^\d+\.\s/, ''), color)}</span>
          </div>
        );
        lastNonEmpty = trimmed;
        continue;
      }
      if (line.startsWith('**') && line.endsWith('**')) {
        listMode = false;
        elements.push(
          <div key={i} className="guide-strong">
            {parseInlineBold(line.replace(/\*\*/g, ''), color)}
          </div>
        );
        lastNonEmpty = trimmed;
        continue;
      }

      if (trimmed.endsWith(':') && trimmed.length <= 90) {
        elements.push(
          <div key={i} className="guide-subhead">
            {parseInlineBold(trimmed, color)}
          </div>
        );
      } else {
        pushParagraph(trimmed, i);
      }
      lastNonEmpty = trimmed;
      listMode = lastNonEmpty.endsWith(':');
    }

    return (
      <div className="guide-content" style={{ "--accent": color } as React.CSSProperties}>
        {elements}
      </div>
    );
  };

  const parseGlossaryEntries = (text: string) => {
    if (!text) return [] as { term: string; definition: string }[];
    return text
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const parts = line.split(' — ');
        if (parts.length < 2) return null;
        const term = parts[0].trim();
        const definition = parts.slice(1).join(' — ').trim();
        if (!term || !definition) return null;
        return { term, definition };
      })
      .filter(Boolean) as { term: string; definition: string }[];
  };

  const getGlossaryForGuide = (entries: { term: string; definition: string }[], contentText: string) => {
    if (!entries.length || !contentText) return [] as { term: string; definition: string }[];
    const contentLower = contentText.toLowerCase();
    const matches = entries
      .map((entry) => {
        const termLower = entry.term.toLowerCase();
        const index = contentLower.indexOf(termLower);
        if (index === -1) return null;
        return { ...entry, index };
      })
      .filter(Boolean) as { term: string; definition: string; index: number }[];

    return matches
      .sort((a, b) => a.index - b.index)
      .map(({ term, definition }) => ({ term, definition }));
  };

  const sectionHeadings = {
    fr: { short: ["Explication courte"], long: ["Explication longue"] },
    en: { short: ["Short Explanation"], long: ["Long Explanation"] },
    it: { short: ["Spiegazione Breve"], long: ["Spiegazione Dettagliata"] },
    es: { short: ["Explicación Corta"], long: ["Explicación Larga"] },
    pt: { short: ["Explicação Curta"], long: ["Explicação Longa"] },
    pl: { short: ["Krótkie Wyjaśnienie", "Krótka Wyjaśnienie"], long: ["Długie Wyjaśnienie"] },
    id: { short: ["Penjelasan Singkat"], long: ["Penjelasan Panjang"] },
    ru: { short: ["Краткое объяснение"], long: ["Подробное Объяснение"] },
    de: { short: ["Kurze Erklärung"], long: ["Lange Erklärung"] },
  } as const;

  const categoryLabels = {
    type: {
      classic: { fr: "Classique", en: "Classic", it: "Classica", es: "Clásica", pt: "Clássico", pl: "Klasyczny", id: "Klasik", ru: "Классический", de: "Klassisch" },
      event: { fr: "Événement", en: "Event", it: "Evento", es: "Evento", pt: "Evento", pl: "Wydarzenie", id: "Event", ru: "Событие", de: "Event" },
      special: { fr: "Spécial", en: "Special", it: "Speciale", es: "Especial", pt: "Especial", pl: "Specjalny", id: "Spesial", ru: "Специальный", de: "Spezial" },
    },
    stage: {
      early: { fr: "Early", en: "Early", it: "Early", es: "Early", pt: "Early", pl: "Early", id: "Early", ru: "Early", de: "Early" },
      mid: { fr: "Mid", en: "Mid", it: "Mid", es: "Mid", pt: "Mid", pl: "Mid", id: "Mid", ru: "Mid", de: "Mid" },
      late: { fr: "Late", en: "Late", it: "Late", es: "Late", pt: "Late", pl: "Late", id: "Late", ru: "Late", de: "Late" },
    },
    difficulty: {
      beginner: { fr: "Débutant", en: "Beginner", it: "Principiante", es: "Principiante", pt: "Iniciante", pl: "Początkujący", id: "Pemula", ru: "Начинающий", de: "Anfänger" },
      intermediate: { fr: "Intermédiaire", en: "Intermediate", it: "Intermedio", es: "Intermedio", pt: "Intermediário", pl: "Średni", id: "Menengah", ru: "Средний", de: "Fortgeschritten" },
      advanced: { fr: "Avancé", en: "Advanced", it: "Avanzato", es: "Avanzado", pt: "Avançado", pl: "Zaawansowany", id: "Lanjutan", ru: "Продвинутый", de: "Experte" },
    },
  } as const;

  const getCategoryLabel = (currentGuide: Guide, currentLang: string) => {
    const localized = currentGuide[`category_${currentLang}` as keyof typeof currentGuide] as string | undefined;
    if (localized) return localized;
    if (currentGuide.category) return currentGuide.category;

    const parts: string[] = [];
    if (currentGuide.guideType) {
      const label = categoryLabels.type[currentGuide.guideType]?.[currentLang as keyof typeof categoryLabels.type.classic]
        || categoryLabels.type[currentGuide.guideType]?.en;
      if (label) parts.push(label);
    }
    if (currentGuide.stage) {
      const label = categoryLabels.stage[currentGuide.stage]?.[currentLang as keyof typeof categoryLabels.stage.early]
        || categoryLabels.stage[currentGuide.stage]?.en;
      if (label) parts.push(label);
    }
    if (currentGuide.difficulty) {
      const label = categoryLabels.difficulty[currentGuide.difficulty]?.[currentLang as keyof typeof categoryLabels.difficulty.beginner]
        || categoryLabels.difficulty[currentGuide.difficulty]?.en;
      if (label) parts.push(label);
    }
    return parts.join(" • ");
  };

  const rewardsContent = guide[`rewards_${lang}` as keyof typeof guide] as string || guide.rewards;
  const rawContent = guide[`content_${lang}` as keyof typeof guide] as string || guide.content;
  const descriptionText = (guide[`description_${lang}` as keyof typeof guide] as string) || guide.description;
  const extractedContent = rawContent || '';
  const stripLeadingTitle = (contentText: string, titleText: string) => {
    if (!contentText) return contentText;
    const lines = contentText.split('\n');
    const firstIndex = lines.findIndex((line) => line.trim());
    if (firstIndex === -1) return contentText;
    const firstLine = lines[firstIndex].trim();
    const normalizedTitle = titleText.toLowerCase();
    const normalizedLine = firstLine.toLowerCase();
    if (normalizedLine === normalizedTitle || normalizedLine === `guide ${normalizedTitle}`) {
      return [...lines.slice(0, firstIndex), ...lines.slice(firstIndex + 1)].join('\n').trim();
    }
    return contentText;
  };
  const stripLeadingDescription = (contentText: string, description: string) => {
    if (!contentText || !description) return contentText;
    const lines = contentText.split('\n');
    const firstIndex = lines.findIndex((line) => line.trim());
    if (firstIndex === -1) return contentText;
    const firstLine = lines[firstIndex].trim();
    if (firstLine === description.trim()) {
      return [...lines.slice(0, firstIndex), ...lines.slice(firstIndex + 1)].join('\n').trim();
    }
    return contentText;
  };
  const stripMetaLines = (contentText: string) => {
    if (!contentText) return contentText;
    const lines = contentText.split('\n');
    const filtered = lines.filter((line) => {
      const trimmed = line.trim();
      if (!trimmed) return true;
      if (/^type\b/i.test(trimmed)) return false;
      if (/^niveau\b/i.test(trimmed)) return false;
      if (/^level\b/i.test(trimmed)) return false;
      return true;
    });
    return filtered.join('\n').replace(/\n{3,}/g, '\n\n').trim();
  };

  let mainContent = stripLeadingTitle(extractedContent, guide.title);
  mainContent = stripLeadingDescription(mainContent, descriptionText);
  mainContent = stripMetaLines(mainContent);
  const glossaryEntries = getGlossaryForGuide(parseGlossaryEntries(glossaryContent), rawContent || "");
  const relatedGuideEntries = (guide.relatedGuides || [])
    .map((id) => allGuides.find((g) => g.id === id))
    .filter(Boolean) as Guide[];
  const relatedArtistEntries = (guide.relatedArtists || [])
    .map((slugValue) => {
      const artist = artistsBySlug.get(slugValue);
      return {
        slug: slugValue,
        name: artist?.name || slugValue,
      };
    });

  return (
    <>
      {/* Hero Header */}
      <div style={{
        background: "rgba(15,15,26,0.78)",
        backdropFilter: "blur(16px)",
        borderBottom: `1px solid ${guide.color}44`,
        padding: "32px 0 24px",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 20px" }}>
          <Link href={`/${lang}/guides/`} style={{
            color: "rgba(255,255,255,0.45)",
            fontSize: "0.85rem",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            marginBottom: "12px",
            transition: "color 0.2s",
          }}>
            ← {t.backToGuides}
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
            <div style={{
              width: "52px", height: "52px", borderRadius: "14px", flexShrink: 0,
              background: `linear-gradient(135deg, ${guide.color}, ${guide.color}88)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1.6rem",
              boxShadow: `0 8px 24px ${guide.color}55`,
            }}>
              {guide.icon}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px", flexWrap: "wrap" }}>
                <span style={{
                  padding: "3px 10px", borderRadius: "20px",
                  background: `${guide.color}22`, color: guide.color,
                  fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em",
                }}>
                  {getCategoryLabel(guide, lang)}
                </span>
                <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem" }}>⏱️ {guide.readTime}</span>
              </div>
              <h1 style={{
                fontSize: "1.7rem", fontWeight: 800, margin: 0,
                background: `linear-gradient(135deg, ${guide.color}, #fff)`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>
                {guide.title}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "32px 20px 0" }}>

        {/* Rewards */}
        {rewardsContent && (
          <div style={{
            background: "rgba(8,32,14,0.78)",
            borderRadius: "16px",
            border: "1px solid rgba(34,197,94,0.3)",
            padding: "24px",
            marginBottom: "16px",
            backdropFilter: "blur(10px)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
              <span style={{
                width: "28px", height: "28px", borderRadius: "8px",
                background: "rgba(34,197,94,0.15)", display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: "0.9rem",
              }}>🎁</span>
              <h2 style={{ margin: 0, color: "#22c55e", fontSize: "1rem", fontWeight: 700 }}>
                {t.rewards}
              </h2>
            </div>
            {/* Rewards en grille si liste de bullet points */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: "8px",
            }}>
              {rewardsContent.split('\n').map((line, i) => {
                if (!line.trim()) return null;
                const text = line.startsWith('- ') ? line.replace('- ', '') : line;
                return (
                  <div key={i} style={{
                    display: "flex", gap: "10px", alignItems: "flex-start",
                    background: "rgba(34,197,94,0.08)",
                    borderRadius: "10px", padding: "10px 14px",
                    border: "1px solid rgba(34,197,94,0.15)",
                  }}>
                    <span style={{ color: "#22c55e", flexShrink: 0, fontSize: "0.85rem", marginTop: "1px" }}>✦</span>
                    <span style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.88rem", lineHeight: 1.5 }}>{text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Main content */}
        {mainContent && (
          <div className="guide-article">
            {renderContent(mainContent, guide.color)}
          </div>
        )}

        {(relatedGuideEntries.length > 0 || relatedArtistEntries.length > 0) && (
          <div style={{
            background: "rgba(12,12,28,0.82)",
            borderRadius: "16px",
            border: "1px solid rgba(255,255,255,0.08)",
            marginBottom: "24px",
            overflow: "hidden",
            backdropFilter: "blur(10px)",
          }}>
            <div style={{ padding: "18px 20px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
              <h2 style={{ margin: 0, color: "rgba(255,255,255,0.85)", fontSize: "1rem", fontWeight: 700 }}>
                {t.relatedGuides}
              </h2>
            </div>
            <div style={{ padding: "18px 20px" }}>
              {relatedGuideEntries.length ? (
                <div style={{ display: "grid", gap: "10px" }}>
                  {relatedGuideEntries.map((relatedGuide) => (
                    <Link
                      key={relatedGuide.id}
                      href={`/${lang}/guides/${relatedGuide.id}/`}
                      style={{
                        textDecoration: "none",
                        padding: "12px 14px",
                        borderRadius: "10px",
                        border: `1px solid ${relatedGuide.color}33`,
                        background: "rgba(255,255,255,0.03)",
                        color: "rgba(255,255,255,0.85)",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <span>{relatedGuide.icon}</span>
                      <span>{relatedGuide[`title_${lang}` as keyof typeof relatedGuide] as string || relatedGuide.title}</span>
                    </Link>
                  ))}
                </div>
              ) : (
                <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem" }}>{t.noRelatedGuides}</div>
              )}
            </div>

            <div style={{ padding: "0 20px 18px" }}>
              <h3 style={{ margin: "0 0 12px", color: "rgba(255,255,255,0.7)", fontSize: "0.9rem", fontWeight: 700 }}>
                {t.relatedArtists}
              </h3>
              {relatedArtistEntries.length ? (
                <div style={{ display: "grid", gap: "10px" }}>
                  {relatedArtistEntries.map((artist) => (
                    <Link
                      key={artist.slug}
                      href={`/${lang}/artist/${artist.slug}/`}
                      style={{
                        textDecoration: "none",
                        padding: "12px 14px",
                        borderRadius: "10px",
                        border: "1px solid rgba(255,255,255,0.12)",
                        background: "rgba(255,255,255,0.03)",
                        color: "rgba(255,255,255,0.85)",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <span>🎤</span>
                      <span>{artist.name}</span>
                    </Link>
                  ))}
                </div>
              ) : (
                <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem" }}>{t.noRelatedArtists}</div>
              )}
            </div>
          </div>
        )}

        {glossaryEntries.length > 0 && (
          <div style={{
            background: "rgba(8,12,22,0.82)",
            borderRadius: "16px",
            border: "1px solid rgba(255,255,255,0.08)",
            marginBottom: "24px",
            padding: "20px",
          }}>
            <h2 style={{ margin: "0 0 14px", color: "rgba(255,255,255,0.85)", fontSize: "1rem", fontWeight: 700 }}>
              {t.glossary}
            </h2>
            <div style={{ display: "grid", gap: "12px" }}>
              {glossaryEntries.map((entry) => (
                <div key={entry.term} style={{
                  borderRadius: "12px",
                  padding: "12px 14px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}>
                  <div style={{ color: guide.color, fontWeight: 700, fontSize: "0.9rem", marginBottom: "6px" }}>
                    {entry.term}
                  </div>
                  <div style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.88rem", lineHeight: 1.6 }}>
                    {entry.definition}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <AdBanner />

        {/* Autres guides */}
        <div style={{ marginTop: "32px", marginBottom: "24px" }}>
          <h3 style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.85rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "14px" }}>
            {t.otherGuides}
          </h3>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {allGuides.filter(g => g.id !== guide.id).slice(0, 5).map(g => (
              <Link
                key={g.id}
                href={`/${lang}/guides/${g.id}/`}
                style={{
                  padding: "10px 16px",
                   background: "rgba(10,10,24,0.72)",
                   borderRadius: "10px",
                  color: "rgba(255,255,255,0.8)",
                  textDecoration: "none",
                  border: `1px solid ${g.color}33`,
                  display: "flex", alignItems: "center", gap: "8px",
                  fontSize: "0.85rem", fontWeight: 500,
                  transition: "all 0.2s",
                }}
              >
                <span>{g.icon}</span>
                <span>{g[`title_${lang}` as keyof typeof g] as string || g.title}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Internal Linking Hubs */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
          <Link href={`/${lang}/teambuilder/`} style={{
            padding: "18px", background: "rgba(244,114,182,0.1)",
            borderRadius: "12px", border: "1px solid rgba(244,114,182,0.25)",
            textDecoration: "none", display: "block",
            transition: "all 0.2s",
          }}>
            <div style={{ fontSize: "1.4rem", marginBottom: "6px" }}>🎤</div>
            <div style={{ color: "#f472b6", fontWeight: 600, fontSize: "0.9rem", marginBottom: "3px" }}>
              {t.artistDatabaseTitle}
            </div>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.78rem" }}>
              {t.artistDatabaseDesc}
            </div>
          </Link>

          <Link href={`/${lang}/tierlist/`} style={{
            padding: "18px", background: "rgba(251,191,36,0.1)",
            borderRadius: "12px", border: "1px solid rgba(251,191,36,0.25)",
            textDecoration: "none", display: "block",
            transition: "all 0.2s",
          }}>
            <div style={{ fontSize: "1.4rem", marginBottom: "6px" }}>🏆</div>
            <div style={{ color: "#fbbf24", fontWeight: 600, fontSize: "0.9rem", marginBottom: "3px" }}>
              {t.tierListTitle}
            </div>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.78rem" }}>
              {t.tierListDesc}
            </div>
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
        .guide-top-row {
          grid-template-columns: 1fr !important;
        }
      }

      .guide-article {
        background: linear-gradient(180deg, rgba(12,12,28,0.92), rgba(10,10,24,0.92));
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 18px;
        padding: 28px;
        margin-bottom: 24px;
        box-shadow: 0 12px 30px rgba(0,0,0,0.35);
      }

        .guide-content {
          color: rgba(230,232,245,0.92);
          font-size: 0.98rem;
          line-height: 1.85;
          font-weight: 430;
          letter-spacing: 0.01em;
        }

        .guide-h2 {
          margin: 28px 0 12px;
          font-size: 1.3rem;
          font-weight: 700;
          color: #fff;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          padding-bottom: 6px;
          position: relative;
        }

        .guide-h2::before {
          content: "";
          position: absolute;
          left: 0;
          bottom: -1px;
          width: 48px;
          height: 2px;
          background: var(--accent);
          opacity: 0.6;
        }

        .guide-h3 {
          margin: 18px 0 8px;
          font-size: 1.02rem;
          font-weight: 700;
          color: rgba(255,255,255,0.95);
        }

        .guide-h4 {
          margin: 14px 0 6px;
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--accent);
        }

        .guide-label {
          margin: 18px 0 6px;
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--accent);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .guide-section {
          margin: 18px 0 6px;
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--accent);
        }

        .guide-subhead {
          margin: 12px 0 6px;
          font-size: 0.95rem;
          font-weight: 600;
          color: rgba(255,255,255,0.9);
          border-left: 2px solid var(--accent);
          padding-left: 10px;
        }

        .guide-meta {
          font-size: 0.85rem;
          color: rgba(255,255,255,0.6);
          margin-bottom: 6px;
        }

      .guide-p {
        margin: 0 0 12px;
        color: rgba(240,240,255,0.88);
      }

      .guide-li,
      .guide-num {
        display: flex;
        gap: 10px;
        margin-bottom: 8px;
        align-items: flex-start;
        color: rgba(255,255,255,0.85);
      }

        .guide-li-dot {
          color: var(--accent);
          margin-top: 2px;
          flex-shrink: 0;
          font-size: 0.85rem;
          opacity: 0.85;
        }

      .guide-li-text {
        color: rgba(240,240,255,0.86);
        font-size: 0.95rem;
        line-height: 1.7;
      }

        .guide-num-badge {
          min-width: 20px;
          color: var(--accent);
          margin-top: 2px;
          font-weight: 700;
          font-size: 0.85rem;
        }

        .guide-table-row {
          display: flex;
          gap: 8px;
          margin: 2px 0;
          font-size: 0.82rem;
        }

      .guide-table-cell {
        color: rgba(255,255,255,0.8);
        flex: 1;
        padding: 6px 8px;
        background: rgba(255,255,255,0.05);
        border-radius: 8px;
        border: 1px solid rgba(255,255,255,0.08);
      }

        .guide-strong {
          margin-top: 12px;
          font-weight: 700;
          color: var(--accent);
          font-size: 0.95rem;
        }
      `}</style>
    </>
  );
}
