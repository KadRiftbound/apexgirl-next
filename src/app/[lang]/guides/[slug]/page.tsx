"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { AdBanner } from "@/components/AdSense";

const guideTranslations: Record<string, any> = {
   fr: { notFound: "Guide non trouvé", backToGuides: "← Retour aux guides", otherGuides: "Autres guides", tips: "Conseils", rewards: "Récompenses", explanation: "Explication" },
   en: { notFound: "Guide not found", backToGuides: "← Back to Guides", otherGuides: "Other Guides", tips: "Tips", rewards: "Rewards", explanation: "Explanation" },
   it: { notFound: "Guida non trovata", backToGuides: "← Torna alle guide", otherGuides: "Altre guide", tips: "Consigli", rewards: "Ricompense", explanation: "Spiegazione" },
   es: { notFound: "Guía no encontrada", backToGuides: "← Volver a las guías", otherGuides: "Otras guías", tips: "Consejos", rewards: "Recompensas", explanation: "Explicación" },
   pt: { notFound: "Guia não encontrado", backToGuides: "← Voltar aos guias", otherGuides: "Outros guias", tips: "Dicas", rewards: "Recompensas", explanation: "Explicação" },
   pl: { notFound: "Poradnik nie znaleziony", backToGuides: "← Wróć do poradników", otherGuides: "Inne poradniki", tips: "Wskazówki", rewards: "Nagrody", explanation: "Wyjaśnienie" },
   id: { notFound: "Panduan tidak ditemukan", backToGuides: "← Kembali ke panduan", otherGuides: "Panduan lain", tips: "Tips", rewards: "Hadiah", explanation: "Penjelasan" },
   ru: { notFound: "Гайд не найден", backToGuides: "← Вернуться к гайдам", otherGuides: "Другие гайды", tips: "Советы", rewards: "Награды", explanation: "Объяснение" },
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
  description: string;
  description_en?: string;
  description_it?: string;
  description_es?: string;
  description_pt?: string;
  description_pl?: string;
  description_id?: string;
  description_ru?: string;
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
  readTime: string;
  content?: string;
  content_en?: string;
  content_it?: string;
  content_es?: string;
  content_pt?: string;
  content_pl?: string;
  content_id?: string;
  content_ru?: string;
  tips?: string;
  tips_en?: string;
  tips_it?: string;
  tips_es?: string;
  tips_pt?: string;
  tips_pl?: string;
  tips_id?: string;
  tips_ru?: string;
  rewards?: string;
  rewards_en?: string;
  rewards_it?: string;
  rewards_es?: string;
  rewards_pt?: string;
  rewards_pl?: string;
  rewards_id?: string;
  rewards_ru?: string;
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
    description: "Comprendre la structure du jeu Top Girl. Serveur d'origine, cycles Abroad, City Supremacy et boucle principale.",
    description_en: "Understand the structure of Top Girl game. Home server, Abroad cycles, City Supremacy and main loop.",
    description_it: "Comprendi la struttura del gioco Top Girl. Server home, cicli Abroad, City Supremacy e ciclo principale.",
    description_es: "Comprende la estructura del juego Top Girl. Servidor local, ciclos Abroad, City Supremacy y ciclo principal.",
    description_pt: "Compreenda a estrutura do jogo Top Girl. Servidor principal, ciclos Abroad, City Supremacy e ciclo principal.",
    description_pl: "Zrozum strukturę gry Top Girl. Serwer główny, cykle Abroad, City Supremacy i główna pętla.",
    description_id: "Pahami struktur permainan Top Girl. Server utama, siklus Abroad, City Supremacy dan loop utama.",
    description_ru: "Понять структуру игры Top Girl. Родной сервер, циклы Abroad, City Supremacy и основной цикл.",
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

Durante las primeras 3 semanas,开始在 una zona exterior. Esta fase sirve casi como tutorial, pero sigue siendo muy importante.
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

Ta pętla followuje ten model:
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

Te trzy główne fazy followują ten sam princip:
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
- objetivo akhir di sekitar Tokyo Tower

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
    description: "Bijoux, Voitures et Propriétés pour optimiser vos statistiques. Comparaison Gold vs Purple et priorités d'achat.",
    description_en: "Jewelry, Cars and Properties to optimize your stats. Gold vs Purple comparison and purchase priorities.",
    description_it: "Gioielli, Auto e Proprietà per ottimizzare le tue statistiche. Confronto Gold vs Purple e priorità d'acquisto.",
    description_es: "Joyas, Coches y Propiedades para optimizar tus estadísticas. Comparación Gold vs Purple y prioridades de compra.",
    description_pt: "Joias, Carros e Imóveis para otimizar suas estatísticas. Comparação Gold vs Purple e prioridades de compra.",
    description_pl: "Biżuteria, Samochody i Nieruchomości, aby zoptymalizować statystyki. Porównanie Gold vs Purple i priorytety zakupów.",
    description_id: "Perhiasan, Mobil, dan Properti untuk mengoptimalkan statistik Anda. Perbandingan Gold vs Purple dan prioritas pembelian.",
    description_ru: "Украшения, машины и недвижимость для оптимизации ваших статов. Сравнение Gold vs Purple и приоритеты покупки.",
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
- Disponíveis como recompensa de primeira ocupação de событий correspondentes
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
- Mainly menyangkut Tokyo, Bali dan Roma

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
- Ini hampir nunca merupakan investasi jangka panjang yang baik
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
  },
  {
    id: "team-builder",
    title: "Team Builder",
    description: "Comment construire l'équipe parfaite. Calcul des synergies de genre et bonus d'équipement.",
    icon: "👥",
    color: "#22d3ee",
    category: "Intermédiaire",
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
    `
  },
  {
    id: "recommended-teams",
    title: "Équipes Recommandées",
    description: "Les meilleures compositions d'équipes UR et SSR. Stratégies offensives, équilibrées et défensives.",
    icon: "🏆",
    color: "#f472b6",
    category: "Avancé",
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
    `
  },
  {
    id: "leveling-ssr",
    title: "Montée en Niveau SSR",
    description: "Nombre de cartes nécessaires pour level up vos personnages SSR jusqu'au niveau 115.",
    icon: "📈",
    color: "#34d399",
    category: "Débutant",
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
    `
  },
  {
    id: "blueprints",
    title: "Guide Blueprints",
    description: "Requirements en blueprints par tier (1-21) pour améliorer vos installations. Tier 7-12 Gold.",
    icon: "🛠️",
    color: "#818cf8",
    category: "Intermédiaire",
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
    `
  },
  {
    id: "hq-upgrade",
    title: "Guide HQ (Quartier Général)",
    description: "Cartes de bâtiment nécessaires pour chaque niveau du HQ. Requirement total: 29,922 cartes.",
    icon: "🏢",
    color: "#a855f7",
    category: "Débutant",
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
    `
  },
  {
    id: "vehicle-system",
    title: "Système de Véhicules",
    description: "Système complet: Avancement, Pièces (Moteur, Châassis, Suspension, Jantes), Skins débloqués.",
    icon: "🚗",
    color: "#f87171",
    category: "Avancé",
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
    `
  },
  {
    id: "gold-equipment",
    title: "Équipement Gold Optimal",
    description: "Setup complet Gold pour Vocalist, Dancer et Center. +19,730 stats et 86,000 fans par personnage.",
    icon: "✨",
    color: "#fbbf24",
    category: "Avancé",
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
    `
  },
  {
    id: "purple-equipment",
    title: "Équipement Purple (Budget)",
    description: "Setup économique Purple. +13,730 stats mais pas de bonus fans. Stratégie Gold/Purple mixte.",
    icon: "💜",
    color: "#a855f7",
    category: "Intermédiaire",
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
    `
  },
  {
    id: "event-ancient-rome",
    title: "Guide Ancient Rome",
    description: "Guide complet de l'événement Adventure Abroad Rome",
    icon: "🏛️",
    color: "#f97316",
    category: "Événements",
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
    `
  },
  {
    id: "event-radio-battle",
    title: "Guide Radio Battle",
    description: "Guide complet du Radio Battle",
    icon: "📻",
    color: "#06b6d4",
    category: "Événements",
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
    `
  },
  {
    id: "event-grammy",
    title: "Guide Grammy Awards",
    description: "Guide des 8 catégories Grammy",
    icon: "🏆",
    color: "#fbbf24",
    category: "Événements",
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
    `
  },
  {
    id: "event-ultimate-ceo",
    title: "Guide Ultimate CEO",
    description: "Guide complet de l'Ultimate CEO",
    icon: "💼",
    color: "#ef4444",
    category: "Événements",
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
    `
  },
  {
    id: "event-echo-death-match",
    title: "Guide Echo Death Match",
    description: "Guide du Echo Death Match",
    icon: "👻",
    color: "#8b5cf6",
    category: "Événements",
    readTime: "8 min",
    content: `
## Guide Echo Death Match - TopGirl

### Présentation
Le **Echo Death Match** est un événement où vous affrontez des échos. Accumulez des Echo Stones à travers des battles solo et team.

### Phases

**Phase 1 (Jour 1-2)**
- Solo battles
- Objectif: Accumuler Echo Stones
- Reward: Echo Stones x500

**Phase 2 (Jour 3-5)**
- Team battles
- Objectif: Bonus Echo Stones
- Reward: Echo Stones x1000, SSR Shards

**Phase 3 (Jour 6-7)**
- Échange des rewards
- Rewards: UR Token, SSR+ Cards

### Stratégie
1. **Phase 1:** Focus sur solo battles pour stocker
2. **Phase 2:** Team battles pour bonus
3. **Gardez des Echo Stones** pour les meilleurs échanges
    `
  },
  {
    id: "event-chamber-territory",
    title: "Guide Chamber Territory",
    description: "Guide du Chamber Territory",
    icon: "🏰",
    color: "#14b8a6",
    category: "Événements",
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
    description: "Guide du Cleanup Party - Comment jouer et optimiser vos rewards",
    description_en: "Cleanup Party Guide - How to play and optimize your rewards",
    description_it: "Guida alla Pulizia della Festa - Come giocare e ottimizzare le ricompense",
    description_es: "Guía de la Fiesta de Limpieza - Cómo jugar y optimizar tus recompensas",
    description_pt: "Guia da Festa de Limpeza - Como jogar e otimizar suas recompensas",
    description_pl: "Przewodnik po imprezie sprzątającej - Jak grać i optymalizować nagrody",
    description_id: "Panduan Pesta Bersih - Cara bermain dan mengoptimalkan reward",
    description_ru: "Гид по уборке вечеринки - Как играть и оптимизировать награды",
    icon: "🧹",
    color: "#22c55e",
    category: "Événements",
    category_en: "Events",
    readTime: "5 min",
content: `
## Cleanup Party Event Guide - TopGirl

### Overview
In **Cleanup Party**, the goal is to clear the entire board by matching tiles. Players select tiles from the board and place them into 7 available slots. When three identical tiles are placed, they are automatically cleared, freeing space for new tiles. Be careful not to fill all 7 slots with unmatched tiles, or the attempt will fail.

### How to Play
- Each stage attempt consumes Stamina
- Clearing stages increases the Girl's Affection
- Reaching the maximum affection grants an additional Gift
- If you need items, you can request help from other players through the City, Group, or Chamber channels

### Quests
- **Daily Quests**: Complete daily tasks for additional rewards
- **Target Quests**: Special event objectives with bonus rewards

### Ranking
- Each cleared stage grants points for the event ranking
- Higher rankings receive better rewards

### Tips
1. **Before selecting a tile**, check the board for at least three identical tiles to clear them quickly
2. **Prioritize tiles** that already have two or more visible matches
3. **Try to keep 2-3 slots free** whenever possible
4. **Daily and Target Quests** help you progress faster and earn extra rewards
5. **Request assistance daily**, even if you don't need it yet, so you can save it for harder levels later
`,
  content_en: `
## Cleanup Party Event Guide - TopGirl

### Overview
In **Cleanup Party**, the goal is to clear the entire board by matching tiles. Players select tiles from the board and place them into 7 available slots. When three identical tiles are placed, they are automatically cleared, freeing space for new tiles. Be careful not to fill all 7 slots with unmatched tiles, or the attempt will fail.

### How to Play
- Each stage attempt consumes Stamina
- Clearing stages increases the Girl's Affection
- Reaching the maximum affection grants an additional Gift
- If you need items, you can request help from other players through the City, Group, or Chamber channels

### Quests
- **Daily Quests**: Complete daily tasks for additional rewards
- **Target Quests**: Special event objectives with bonus rewards

### Ranking
- Each cleared stage grants points for the event ranking
- Higher rankings receive better rewards

### Tips
1. **Before selecting a tile**, check the board for at least three identical tiles to clear them quickly
2. **Prioritize tiles** that already have two or more visible matches
3. **Try to keep 2-3 slots free** whenever possible
4. **Daily and Target Quests** help you progress faster and earn extra rewards
5. **Request assistance daily**, even if you don't need it yet, so you can save it for harder levels later
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
    tips: `
- Always check for 3+ matching tiles before selecting
- Keep 2-3 slots free for better flexibility
- Prioritize tiles with visible matches
- Complete daily quests for bonus rewards
- Request help early, save for harder levels
    `,
    rewards: `
- SSR Artist Cards (rare drop)
- Gold Coins (100,000 - 500,000)
- Energy Drinks
- Skill Enhancement Materials
- Exclusive Event Avatar Frame
- Top 100: Additional SSR+ selection box
    `
  },
  {
    id: "event-metro-subway",
    title: "Guide Metro & Subway",
    description: "Guide du Metro & Subway",
    icon: "🚇",
    color: "#3b82f6",
    category: "Événements",
    readTime: "5 min",
    content: `
## Guide Metro & Subway - TopGirl

### Présentation
Le **Metro & Subway** est un événement où vous prenez le métro pour collecter des tickets et earn des rewards.

### Phases

**Phase 1 (Jour 1-2)**
- Collectez les tickets
- Reward: Tickets x150

**Phase 2 (Jour 3-5)**
- Complétez les lignes
- Reward: Tickets x300, SSR Shards

**Phase 3 (Jour 6-7)**
- Échangez les rewards
- Rewards: UR Token, SSR+ Cards

### Stratégie
1. **Complétez les lignes de métro** pour bonus tickets
2. **Différentes lignes** ont différentes rewards
3. **Échangez** vos tickets pour les meilleures rewards
    `
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
    description: "Group Battle est un événement de groupe qui dure 6 jours. Bataille entre groupes avec 5 jours de préparation et 1 jour de combat final.",
    description_en: "Group Battle is a 6-day group event. Battle between groups with 5 days preparation and 1 day final combat.",
    description_it: "Group Battle è un evento di gruppo della durata di 6 giorni. Battaglia tra gruppi con 5 giorni di preparazione e 1 giorno di combattimento finale.",
    description_es: "Group Battle es un evento de grupo que dura 6 días. Batalla entre grupos con 5 días de preparación y 1 día de combate final.",
    description_pt: "Group Battle é um evento de grupo que dura 6 dias. Batalha entre grupos com 5 dias de preparação e 1 dia de combate final.",
    description_pl: "Group Battle to wydarzenie grupowe trwające 6 dni. Bitwa między grupami z 5 dniami przygotowań i 1 dniem walki.",
    description_id: "Group Battle adalah acara grup yang berlangsung 6 hari. Pertarungan antar grup dengan 5 hari persiapan dan 1 hari pertarungan final.",
    description_ru: "Group Battle - это групповое событие длительностью 6 дней. Битва между группами с 5 днями подготовки и 1 днём финальной битвы.",
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
É neste momento que a Ultimate Victory é決定.

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
    description: "Fishing Event dure 7 jours. Attrapez des poissons, gérez votre Aquarium et échangez des Vouchers contre des récompenses.",
    description_en: "Fishing Event lasts 7 days. Catch fish, manage your Aquarium and exchange Vouchers for rewards.",
    description_it: "Fishing Event dura 7 giorni. Cattura pesci, gestisci il tuo Aquarium e scambia Vouchers per ricompense.",
    description_es: "Fishing Event dura 7 días. Atrapa peces, administra tu Aquarium e intercambia Vouchers por recompensas.",
    description_pt: "Fishing Event dura 7 dias. Pegue peixes, gerencie seu Aquarium e troque Vouchers por recompensas.",
    description_pl: "Fishing Event trwa 7 dni. Łów ryby, zarządzaj swoim Aquarium i wymieniaj Vouchery na nagrody.",
    description_id: "Fishing Event berlangsung 7 hari. Tangkap ikan, kelola Aquarium Anda dan tukarkan Vouchers untuk hadiah.",
    description_ru: "Fishing Event длится 7 дней. Ловите рыб, управляйте своим Aquarium и обменивайте Vouchers на награды.",
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
    readTime: "6 min",
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
Durante Fishing Event, attrapas peces para generar Vouchers.
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

Cuantos más peces guards, más Vouchers ganas.
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

Aquarium therefore merupakan bagian sentral dari acara.
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
  },
  {
    id: "world-building",
    title: "World Building Guide",
    description: "Guide World Building",
    icon: "🌍",
    color: "#10b981",
    category: "Intermédiaire",
    readTime: "10 min",
    content: `
## World Building Guide - TopGirl

[Content to be completed]

### Overview
Build and develop your world in the game. This guide covers the basics of world building mechanics.

(Content from WorldBuildingGuide.jpg to be added)
    `
  },
  {
    id: "vip-level",
    title: "VIP Level Guide",
    description: "Guide VIP Level",
    icon: "⭐",
    color: "#f59e0b",
    category: "Avancé",
    readTime: "15 min",
    content: `
## VIP Level Guide - TopGirl

### Overview
Detailed guide on points required for each VIP level.

### VIP Benefits
- VIP players receive various bonuses and exclusive rewards
- Higher VIP levels unlock more benefits

(Content from VIPLevelGuide.jpg to be added)
    `
  },
  {
    id: "ceo-coins",
    title: "CEO Coins Purchase Guide",
    description: "Guide d'achat de CEO Coins",
    icon: "💰",
    color: "#84cc16",
    category: "Avancé",
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
    `
  },
  {
    id: "alliance-management",
    title: "Alliance Management Guide",
    description: "Guide de gestion d'alliance",
    icon: "🏰",
    color: "#8b5cf6",
    category: "Avancé",
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
    `
  },
  {
    id: "peak-level",
    title: "Peak Level Guide",
    description: "Guide Peak Level",
    icon: "📊",
    color: "#ec4899",
    category: "Avancé",
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
    `
  },
  {
    id: "group-shop",
    title: "Group Shop Guide",
    description: "Guide Group Shop",
    icon: "🛒",
    color: "#f97316",
    category: "Débutant",
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
    `
  },
];

export default function GuideDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const lang = params?.lang as string || "fr";
  const t = guideTranslations[lang] || guideTranslations.en;
  
  const guide = guides.find(g => g.id === slug);

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

  // Helper to render markdown-like content
  const renderContent = (text: string, color: string) =>
    text.split('\n').map((line, i) => {
      if (line.startsWith('## '))
        return <h2 key={i} style={{ color: "#fff", fontSize: "1.3rem", fontWeight: 700, marginTop: "20px", marginBottom: "10px" }}>{line.replace('## ', '')}</h2>;
      if (line.startsWith('### '))
        return <h3 key={i} style={{ color, fontSize: "1rem", fontWeight: 600, marginTop: "16px", marginBottom: "6px" }}>{line.replace('### ', '')}</h3>;
      if (line.startsWith('| '))
        return <div key={i} style={{ fontFamily: "monospace", fontSize: "0.82rem", margin: "4px 0", color: "rgba(255,255,255,0.75)" }}>{line}</div>;
      if (line.startsWith('- '))
        return (
          <div key={i} style={{ display: "flex", gap: "8px", marginBottom: "6px", alignItems: "flex-start" }}>
            <span style={{ color, flexShrink: 0, marginTop: "2px" }}>▸</span>
            <span style={{ color: "rgba(255,255,255,0.85)" }}>{line.replace('- ', '')}</span>
          </div>
        );
      if (line.startsWith('**') && line.endsWith('**'))
        return <div key={i} style={{ fontWeight: 700, marginTop: "12px", color: "#fff" }}>{line.replace(/\*\*/g, '')}</div>;
      return line.trim()
        ? <div key={i} style={{ marginBottom: "6px", color: "rgba(255,255,255,0.8)", lineHeight: 1.7 }}>{line}</div>
        : <div key={i} style={{ height: "10px" }} />;
    });

  const tipsContent = guide[`tips_${lang}` as keyof typeof guide] as string || guide.tips;
  const rewardsContent = guide[`rewards_${lang}` as keyof typeof guide] as string || guide.rewards;
  const mainContent = guide[`content_${lang}` as keyof typeof guide] as string || guide.content;

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(180deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%)",
      paddingBottom: "80px",
    }}>

      {/* Hero Header */}
      <div style={{
        background: "rgba(15,15,26,0.97)",
        backdropFilter: "blur(20px)",
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
                  {guide.category}
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

        {/* ROW 1 : Explication rapide + Tips côte à côte */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "16px",
          marginBottom: "16px",
        }}
          className="guide-top-row"
        >
          {/* Explication rapide */}
          <div style={{
            background: "rgba(30,30,50,0.8)",
            borderRadius: "16px",
            border: `1px solid ${guide.color}33`,
            padding: "24px",
            backdropFilter: "blur(10px)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
              <span style={{
                width: "28px", height: "28px", borderRadius: "8px",
                background: `${guide.color}22`, display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: "0.9rem",
              }}>📋</span>
              <h2 style={{ margin: 0, color: guide.color, fontSize: "1rem", fontWeight: 700 }}>
                {t.explanation || "En résumé"}
              </h2>
            </div>
            <p style={{
              color: "rgba(255,255,255,0.75)", fontSize: "0.95rem",
              lineHeight: 1.7, margin: 0,
            }}>
              {guide[`description_${lang}` as keyof typeof guide] as string || guide.description}
            </p>
          </div>

          {/* Tips */}
          {tipsContent ? (
            <div style={{
              background: "rgba(34,211,238,0.06)",
              borderRadius: "16px",
              border: "1px solid rgba(34,211,238,0.25)",
              padding: "24px",
              backdropFilter: "blur(10px)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
                <span style={{
                  width: "28px", height: "28px", borderRadius: "8px",
                  background: "rgba(34,211,238,0.15)", display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: "0.9rem",
                }}>💡</span>
                <h2 style={{ margin: 0, color: "#22d3ee", fontSize: "1rem", fontWeight: 700 }}>
                  {t.tips}
                </h2>
              </div>
              <div style={{ fontSize: "0.9rem" }}>
                {renderContent(tipsContent, "#22d3ee")}
              </div>
            </div>
          ) : (
            /* Si pas de tips, explication prend toute la largeur */
            <div />
          )}
        </div>

        {/* ROW 2 : Récompenses — pleine largeur */}
        {rewardsContent && (
          <div style={{
            background: "rgba(34,197,94,0.07)",
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

        {/* ROW 3 : Description complète — pleine largeur */}
        {mainContent && (
          <div style={{
            background: "rgba(20,20,40,0.8)",
            borderRadius: "16px",
            border: `1px solid ${guide.color}22`,
            overflow: "hidden",
            marginBottom: "24px",
            backdropFilter: "blur(10px)",
          }}>
            <div style={{
              padding: "16px 24px",
              borderBottom: `1px solid ${guide.color}22`,
              background: `${guide.color}0a`,
              display: "flex", alignItems: "center", gap: "8px",
            }}>
              <span style={{
                width: "28px", height: "28px", borderRadius: "8px",
                background: `${guide.color}22`, display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: "0.9rem",
              }}>📖</span>
              <h2 style={{ margin: 0, color: guide.color, fontSize: "1rem", fontWeight: 700 }}>
                {t.explanation || "Guide complet"}
              </h2>
            </div>
            <div style={{ padding: "24px", fontSize: "0.92rem", lineHeight: 1.8 }}>
              {renderContent(mainContent, guide.color)}
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
            {guides.filter(g => g.id !== guide.id).slice(0, 5).map(g => (
              <Link
                key={g.id}
                href={`/${lang}/guides/${g.id}/`}
                style={{
                  padding: "10px 16px",
                  background: "rgba(30,30,50,0.8)",
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
          <Link href={`/${lang}/artists/`} style={{
            padding: "18px", background: "rgba(244,114,182,0.1)",
            borderRadius: "12px", border: "1px solid rgba(244,114,182,0.25)",
            textDecoration: "none", display: "block",
            transition: "all 0.2s",
          }}>
            <div style={{ fontSize: "1.4rem", marginBottom: "6px" }}>🎤</div>
            <div style={{ color: "#f472b6", fontWeight: 600, fontSize: "0.9rem", marginBottom: "3px" }}>
              {lang === "fr" ? "Base de Données Artistes" : "Artist Database"}
            </div>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.78rem" }}>
              {lang === "fr" ? "Découvrez tous les artistes" : "Discover all artists"}
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
              {lang === "fr" ? "Tier List" : "Tier List"}
            </div>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.78rem" }}>
              {lang === "fr" ? "Classement des meilleurs artistes" : "Best artists ranking"}
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
      `}</style>
    </div>
  );
}
