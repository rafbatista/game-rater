const { MongoClient } = require('mongodb')

MongoClient.connect('mongodb://localhost/game-rater', (err, db) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }

  const games = db.collection('games')
  games
    .deleteMany({})
    .then(() => games.insertMany([
      {
        id: 1,
        name: 'The Witcher 3: Wild Hunt',
        genre: 'Action',
        rating: 5,
        esrb: 'Mature',
        developer: 'CD Projekt RED',
        publisher: 'CD Projekt',
        release_date: '19 May 2015',
        mode: 'Single-player',
        imgSrc: 'images/the_witcher_3.jpg',
        synopsis: 'The Witcher 3: Wild Hunt is a 2015 action role-playing video ' +
        'game developed by CD Projekt RED and published by CD Projekt. Based on ' +
        'The Witcher series of fantasy novels by Polish author Andrzej Sapkowski, ' +
        'it is the sequel to the 2011 video game The Witcher 2: Assassins of Kings ' +
        'and the third installment in The Witcher video game series. Played in an ' +
        'open world with a third-person perspective, players control protagonist ' +
        'Geralt of Rivia, a monster hunter known as a Witcher, who seeks to find ' +
        'his missing adopted daughter on the run from the Wild Hunt, an otherworldly ' +
        'force determined to capture and use her powers. Throughout the game, ' +
        'players battle against the world\'s many dangers using weapons and magic, ' +
        'interact with various non-player characters, and complete main story quests ' +
        'and side quests to acquire experience points and gold used to increase ' +
        'Geralt\'s various abilities and gear. The game\'s central story features ' +
        'multiple endings that are determined by Geralt\'s choices made by the ' +
        'player during certain points of the story.'
      },
      {
        id: 2,
        name: 'Cuphead',
        genre: 'Action',
        rating: 4,
        esrb: 'Rating Pending',
        developer: 'Studio MDHR Entertainment',
        publisher: 'StudioMDHR Entertainment',
        release_date: '19 September 2017',
        mode: 'Single-player, Multiplayer',
        imgSrc: 'images/cuphead.jpg',
        synopsis: 'Cuphead is a run and gun indie video game developed and published ' +
        'by StudioMDHR Entertainment. As the titular character Cuphead, the player ' +
        'fights a series of bosses in order to repay a debt to the devil. The game ' +
        'was heavily inspired by the works of 1930s cartoonists such as Max Fleischer\'s ' +
        'Fleischer Studios, and sought to keep the works\' subversive and surrealist ' +
        'qualities.'
      },
      {
        id: 3,
        name: 'Middle-earth: Shadow of Mordor',
        genre: 'Action',
        rating: 5,
        esrb: 'Mature',
        developer: 'Studio MDHR Entertainment',
        publisher: 'Warner Bros. Interactive Entertainment',
        release_date: '30 September 2014',
        mode: 'Single-player',
        imgSrc: 'images/middle-earth_shadow_of_mordor.jpg',
        synopsis: 'Middle-earth: Shadow of Mordor is an open world Action-adventure ' +
        'video game developed by Monolith Productions and published by Warner Bros. ' +
        'Interactive Entertainment. An original story set in the legendarium created ' +
        'by J. R. R. Tolkien, the game takes place between the events of The ' +
        'Hobbit and The Lord of the Rings. The player controls Talion, a Ranger ' +
        'who bonds with the wraith of the Elf Lord Celebrimbor, as the two set ' +
        'out to avenge the deaths of their loved ones. Players can engage in melee ' +
        'combat, and utilize wraith abilities to fight and manipulate enemies. ' +
        'The game introduces the Nemesis System, which allows the artificial ' +
        'intelligence of non-playable characters to remember the deaths of the ' +
        'game\'s protagonist and react accordingly.'
      },
      {
        id: 4,
        name: 'Ryse: Son of Rome',
        genre: 'Action',
        rating: 5,
        esrb: 'Mature',
        developer: 'Cyrtek',
        publisher: 'Microsoft Studios',
        release_date: '30 September 2014',
        mode: 'Single-player, multiplayer',
        imgSrc: 'images/ryse_son_of_rome.jpg',
        synopsis: 'Ryse: Son of Rome is a third-person action-adventure hack and ' +
        'slash video game developed by Crytek and published by Microsoft Studios. ' +
        'Set in an alternate version of Ancient Rome, Ryse follows the life of ' +
        'the Roman centurion Marius Titus as he becomes one of the leaders in the ' +
        'Roman Legion. Gameplay revolves around Marius using his sword to strike ' +
        'enemies and shield to deflect attacks. Execution sequences are featured ' +
        'in the game, which are quick-time events that serve as an extension to ' +
        'combat. Th e game\'s combat emphasizes on \'flow\', a term referring to a ' +
        'player\'s ability to move on to fight against another enemy upon defeating ' +
        'an enemy with few limitations in between. The game features a cooperative ' +
        'multiplayer mode, which tasks players to fight against waves of enemies ' +
        'in maps that are changing dynamically. '
      },
      {
        id: 5,
        name: 'Marvel vs. Capcom: Infinite',
        genre: 'Fighting',
        rating: 3,
        esrb: 'Teen',
        developer: 'Capcom',
        publisher: 'Capcom',
        release_date: '19 September 2017',
        mode: 'Single-player, multiplayer',
        imgSrc: 'images/mvc_infinite.jpg',
        synopsis: 'Marvel vs. Capcom: Infinite is a fighting video game ' +
        'developed and published by Capcom. It is the sixth main entry in the ' +
        'Marvel vs. Capcom series of crossover games. Like previous installments, ' +
        'players control characters from both the Marvel Comics and Capcom ' +
        'universes to compete in tag team battles. Infinite features two-on-two ' +
        'fights, as opposed to the three-on-three format used in its preceding titles. ' +
        'The series\' traditional character assists have been removed; instead, ' +
        'the game incorporates a tag-based combo system, which allows players ' +
        'to instantly switch between their two characters to form continuous ' +
        'combos. It also introduces a new gameplay mechanic in the form of the ' +
        'Infinity Stones, which temporarily bestow players with unique abilities ' +
        'and stat boosts depending on the type of stone selected.'
      },
      {
        id: 6,
        name: 'Tekken 7',
        genre: 'Fighting',
        rating: 4.5,
        esrb: 'Teen',
        developer: 'Bandai Namco Studios',
        publisher: 'Bandai Namco Entertainment',
        release_date: '2 June 2017',
        mode: 'Single-player, multiplayer',
        imgSrc: 'images/tekken7.jpg',
        synopsis: 'Tekken 7 is a fighting game developed and published by Bandai ' +
        'Namco Entertainment. The game is the ninth installment in the Tekken ' +
        'series, and the first to make use of the Unreal Engine. Tekken 7 had a ' +
        'limited arcade release in Japan in March 2015. Set shortly after the ' +
        'events of Tekken 6, the plot focuses on the fights between martial ' +
        'artist Heihachi Mishima and his son, Kazuya. Across the series it is ' +
        'revealed the reasons why Heihachi tried to kill Kazuya when he was only ' +
        'a child as well as what happened to Kazuya\'s mother. Besides the main ' +
        'story, Tekken 7 introduces new elements for the fighting system such ' +
        'as the Rage and the Power Crush to increase the characters\' powers.'
      },
      {
        id: 7,
        name: 'Mortal Kombat X',
        genre: 'Fighting',
        rating: 4,
        esrb: 'Mature',
        developer: 'NetherRealm Studios',
        publisher: 'Warner Bros. Interactive Entertainment',
        release_date: '14 April 2015',
        mode: 'Single-player, multiplayer',
        imgSrc: 'images/mortal_kombat_x.jpg',
        synopsis: 'Mortal Kombat X is a fighting video game developed by ' +
        'NetherRealm Studios and published by Warner Bros. Interactive ' +
        'Entertainment. Running on the Unreal Engine 3, it is the tenth main ' +
        'installment in the Mortal Kombat video game series and a sequel to the ' +
        '2011 game Mortal Kombat. Like previous Mortal Kombat games, Mortal ' +
        'Kombat X\'s gameplay consists of two players, or one player and the CPU, ' +
        'fighting against each other with their selected character, using a ' +
        'large, varied array of character specific attacks. The game contains ' +
        'several modes, such as a story mode, which takes place twenty years ' +
        'after the previous Mortal Kombat game, several \'Tower\' modes, which ' +
        'feature dynamically changing challenges, numerous online modes, and ' +
        'the \'Krypt\', a mode played in a first-person perspective where players ' +
        'explore the areas unlocking a variety of in-game items.'
      },
      {
        id: 8,
        name: 'Injustice 2',
        genre: 'Fighting',
        rating: 4,
        esrb: 'Teen',
        developer: 'NetherRealm Studios',
        publisher: 'Warner Bros. Interactive Entertainment',
        release_date: '16 May 2017',
        mode: 'Single-player, multiplayer',
        imgSrc: 'images/injustice_2.jpg',
        synopsis: 'Injustice 2 is a fighting video game developed by NetherRealm ' +
        'Studios and published by Warner Bros. Interactive Entertainment. It is ' +
        'the sequel to 2013\'s Injustice: Gods Among Us. The game was released ' +
        'in May 2017 for the PlayStation 4 and Xbox One. Similar to the previous ' +
        'installment, a companion mobile app was released for Android and iOS devices. ' +
        'The core gameplay remains similar to its predecessor, albeit with minor ' +
        'adjustments to returning game mechanics. Injustice 2 introduces a new ' +
        'feature called the Gear System, a loot-dropping system that rewards ' +
        'players with costume pieces and equipment that can be used to customize ' +
        'characters\' appearances and modify their abilities and stats. Injustice ' +
        '2\'s storyline centers around Batman and his insurgency\'s attempt to ' +
        'restore society after the fall of Superman\'s regime; however, the ' +
        'arrivals of the newly formed supervillain group "The Society" and the ' +
        'alien Brainiac forces Batman to consider freeing the imprisoned Superman ' +
        'to help combat the threats. '
      },
      {
        id: 9,
        name: 'Battlefield 1',
        genre: 'Shooter',
        rating: 5,
        esrb: 'Mature',
        developer: 'EA DICE',
        publisher: 'Electronic Arts',
        release_date: '21 October 2016',
        mode: 'Single-player, multiplayer',
        imgSrc: 'images/battlefield-1.jpg',
        synopsis: 'Discover classic Battlefield gameplay with epic multiplayer ' +
        'and an adventure-filled campaign. Experience the Dawn of All-Out War, ' +
        'Only in Battlefield 1. Fight your way through epic battles going ' +
        'from tight urban combat in a besieged French city to big open spaces ' +
        'in the Italian Alps or frantic combats in the Arabic sand dunes. ' +
        'Experience large-scale battles as infantry or piloting vehicles on ' +
        'land, air and sea, from the tanks and bikes on the ground, to ' +
        'bi-planes and gigantic battleships. Discover a new world at war ' +
        'through an adventure-filled campaign, or join in epic multiplayer ' +
        'battles with up to 64 players. Adapt your tactics and strategy to the ' +
        'earth-shattering, dynamic environments and destruction.'
      },
      {
        id: 10,
        name: 'Overwatch',
        genre: 'Shooter',
        rating: 5,
        esrb: 'Teen',
        developer: 'Blizzard Entertainment',
        publisher: 'Blizzard Entertainment',
        release_date: '24 May 2016',
        mode: 'Multiplayer',
        imgSrc: 'images/overwatch.jpg',
        synopsis: 'Overwatch assigns players into two teams of six, with each ' +
        'player selecting from a roster of 25 pre-defined characters, known ' +
        'as heroes, each with a unique style of play, whose roles are divided ' +
        'into four general categories: Offense, Defense, Tank, and Support. ' +
        'Players on a team work together to secure and defend control points ' +
        'on a map or escort a payload across the map in a limited amount of ' +
        'time. Players gain cosmetic rewards that do not affect gameplay, such ' +
        'as character skins and victory poses, as they play the game. The game ' +
        'was initially launched with casual play, with a competitive ranked mode' +
        'various \'arcade\' game modes, and a player-customizable server browser ' +
        'subsequently included following its release. Additionally, Blizzard ' +
        'has developed and added new characters, maps, and game modes post-release, ' +
        'while stating that all Overwatch updates will remain free, with the ' +
        'only additional cost to players being microtransactions to earn ' +
        'additional cosmetic rewards.'
      },
      {
        id: 11,
        name: 'Call of Duty: Infinite Warfare',
        genre: 'Shooter',
        rating: 3.5,
        esrb: 'Mature',
        developer: 'Infinity Ward',
        publisher: 'Activision',
        release_date: '4 November 2016',
        mode: 'Single-player, Multiplayer',
        imgSrc: 'images/call_of_duty_infinite_warfare.jpg',
        synopsis: 'Call of Duty: Infinite Warfare delivers three unique game ' +
        'modes: Campaign, Multiplayer, and Zombies. Campaign is a return to ' +
        'the gritty, military roots of the franchise, while boldly looking ' +
        'ahead, delivering a rich and engaging narrative that is unlike ' +
        'anything to date in a Call of Duty game. The player will embark on a ' +
        'classically-styled story about grand scale warfare, set in a future ' +
        'where human conflict has spread throughout our solar system. Multiplayer ' +
        'combines popular mechanics such as the chained-based movement system, ' +
        'with a load of gameplay innovations to deliver one of the deepest and ' +
        'most engaging online experiences in gaming. The new Zombies mode will ' +
        'thrill co-op players with an original, distinctive approach and an ' +
        'uproarious narrative sure to excite fans. The title introduces ' +
        'stunning, multi-planetary environments, new weaponry, and all-new ' +
        'player abilities.'
      },
      {
        id: 12,
        name: 'Tom Clancy\'s Ghost Recon Wildlands',
        genre: 'Shooter',
        rating: 3.5,
        esrb: 'Teen',
        developer: 'Ubisoft Paris',
        publisher: 'Ubisoft',
        release_date: '7 March 2017',
        mode: 'Multiplayer',
        imgSrc: 'images/tom_clancys_ghost_recon_wildlands.jpg',
        synopsis: 'Bolivia, a few years from now: this beautiful South American ' +
        'country has become the largest cocaine producer in the world. The ' +
        'influential and vicious Santa Blanca drug cartel has turned the ' +
        'country into a narco-state, leading to lawlessness, fear, injustice, ' +
        'and violence. The cartel is on track to becoming a major underworld ' +
        'power and global threat. An all-out war is not the answer. A surgical, ' +
        'stealthy, lethal approach is the only way to stop the disease at its ' +
        'source. The Ghosts, an elite US Special Forces team, are sent behind ' +
        'enemy lines to wreak havoc, destabilize, and eventually break the ' +
        'alliance between the cartel and the corrupted government. Facing an ' +
        'almighty enemy in a massive and hostile environment, the Ghosts will ' +
        'need to make critical moral choices and engage in tough battles to ' +
        'complete their mission – their grittiest and most dangerous ' +
        'operation to date.'
      }
    ]))
    .catch(err => {
      console.error(err)
      process.exit(1)
    })
    .then(() => console.log('Games are seeded!'))
    .then(() => db.close())
})
