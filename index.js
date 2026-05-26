import { Client, GatewayIntentBits, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, MessageFlags } from 'discord.js';
import crypto from 'crypto';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent
  ]
});

const games = new Map();

// FOOTBALL CATEGORY
const footballGoalkeepers = [
  "Alisson Becker","Ederson Moraes","Thibaut Courtois","Jan Oblak","Marc-Andre ter Stegen","Gianluigi Donnarumma","Mike Maignan","Manuel Neuer","Aaron Ramsdale","David Raya",
  "Emiliano Martinez","Andre Onana","Yassine Bounou","Gregor Kobel","Unai Simon","Jordan Pickford","Keylor Navas","Nick Pope","Diogo Costa","Dominik Livakovic",
  "Wojciech Szczesny","Bernd Leno","Edouard Mendy","David De Gea","Giorgi Mamardashvili"
];

const footballDefenders = [
  "Virgil van Dijk","Trent Alexander-Arnold","Andrew Robertson","Ruben Dias","Joao Cancelo","Kyle Walker","John Stones","Antonio Rudiger","Eder Militao","David Alaba",
  "Raphael Varane","Theo Hernandez","Lucas Hernandez","Achraf Hakimi","Alphonso Davies","Jules Kounde","Ronald Araujo","Matthijs de Ligt","Dayot Upamecano","Marquinhos Silva",
  "Pau Torres","Ben White","Reece James","Lisandro Martinez","Aymeric Laporte"
];

const footballMidfielders = [
  "Kevin De Bruyne","Luka Modric","Toni Kroos","Jude Bellingham","Bernardo Silva","Bruno Fernandes","Martin Odegaard","Joshua Kimmich","Federico Valverde","Eduardo Camavinga",
  "Aurelien Tchouameni","Pedri Gonzalez","Pablo Gavi","Ilkay Gundogan","Declan Rice","Nicolo Barella","Rodri Hernandez","Frenkie de Jong","Phil Foden","Kai Havertz",
  "Enzo Fernandez","Cole Palmer","Kobbie Mainoo","Alexis Mac Allister","Florian Wirtz"
];

const footballForwards = [
  "Lionel Messi","Cristiano Ronaldo","Erling Haaland","Kylian Mbappe","Vinicius Junior","Mohamed Salah","Harry Kane","Robert Lewandowski","Lautaro Martinez","Jude Bellingham",
  "Julian Alvarez","Paulo Dybala","Antoine Griezmann","Marcus Rashford","Bukayo Saka","Jack Grealish","Riyad Mahrez","Son Heung-Min","Joao Felix","Victor Osimhen",
  "Khvicha Kvaratskhelia","Rafael Leao","Ousmane Dembele","Randal Kolo Muani","Darwin Nunez"
];

// MOVIES CATEGORY
const moviesDrama = [
  "The Shawshank Redemption","The Godfather","Forrest Gump","Titanic","Schindlers List","Parasite","The Green Mile","Fight Club","Gladiator","The Dark Knight",
  "Oppenheimer","The Pursuit of Happyness","Good Will Hunting","The Departed","A Beautiful Mind","Cast Away","The Pianist","Saving Private Ryan","Whiplash","La La Land",
  "The Social Network","Room","The Fault in Our Stars","The Notebook","Slumdog Millionaire","12 Years a Slave","Moonlight","Everything Everywhere All at Once","The Revenant","1917",
  "The Irishman","The Wolf of Wall Street","Little Women","Dallas Buyers Club","Spotlight","Bohemian Rhapsody","A Star is Born","Joker","The Lion King","Life is Beautiful",
  "Rain Man","American History X","The King's Speech","Braveheart","Green Book","The Blind Side","Hidden Figures","The Help","Erin Brockovich","A Few Good Men"
];

const moviesComedy = [
  "Barbie","The Hangover","Bridesmaids","Superbad","Anchorman","Step Brothers","Mean Girls","Knives Out","Deadpool","21 Jump Street",
  "Crazy Rich Asians","Jojo Rabbit","Free Guy","The Proposal","Hot Fuzz","Zoolander","School of Rock","Borat","Tropic Thunder","Ted",
  "Pitch Perfect","Zombieland","The Grand Budapest Hotel","Groundhog Day","Mrs Doubtfire"
];

const moviesActionSuperhero = [
  "The Avengers","Iron Man","Black Panther","Spider-Man","Wonder Woman","The Batman","Guardians of the Galaxy","Deadpool","Logan","Thor Ragnarok",
  "Aquaman","Doctor Strange","Shang-Chi","Black Widow","Top Gun Maverick"
];

const moviesSciFi = [
  "Inception","Interstellar","The Matrix","Dune","Arrival","Blade Runner","Avatar","Star Wars","Jurassic Park","E.T.","Back to the Future","Gravity",
  "Edge of Tomorrow","The Terminator","Alien","District 9","The Martian","Ready Player One","Minority Report","Wall-E","Ex Machina","Her","The Fifth Element","Total Recall","Tenet"
];

const moviesThriller = [
  "Get Out","A Quiet Place","The Sixth Sense","The Silence of the Lambs","Se7en","Shutter Island","Gone Girl","Prisoners","The Conjuring","It",
  "Split","Us","Zodiac","No Country for Old Men","The Prestige","Memento","Black Swan","The Others","The Ring","Scream",
  "Dont Breathe","Bird Box","Glass Onion","Orphan","Misery"
];

// CELEBRITIES CATEGORY
const celebritiesActors = [
  "Tom Holland","Zendaya","Timothee Chalamet","Florence Pugh","Margot Robbie","Ryan Gosling","Ana de Armas","Pedro Pascal","Anya Taylor-Joy","Austin Butler",
  "Jenna Ortega","Sydney Sweeney","Jacob Elordi","Barry Keoghan","Paul Mescal","Dwayne Johnson","Chris Hemsworth","Scarlett Johansson","Leonardo DiCaprio","Brad Pitt",
  "Tom Cruise","Will Smith","Denzel Washington","Morgan Freeman","Samuel L Jackson"
];

const celebritiesMusicians = [
  "Taylor Swift","Beyonce","Drake","Bad Bunny","The Weeknd","Ariana Grande","Billie Eilish","Ed Sheeran","Justin Bieber","Kanye West",
  "Travis Scott","Dua Lipa","Olivia Rodrigo","Harry Styles","Post Malone","Rihanna","Adele","Bruno Mars","Eminem","Lady Gaga",
  "Selena Gomez","Miley Cyrus","Sabrina Carpenter","Charli XCX","SZA"
];

const celebritiesAthletes = [
  "Cristiano Ronaldo","Lionel Messi","LeBron James","Stephen Curry","Tom Brady","Patrick Mahomes","Giannis Antetokounmpo","Kylian Mbappe","Erling Haaland","Usain Bolt",
  "Michael Jordan","Serena Williams","Rafael Nadal","Roger Federer","Novak Djokovic","Simone Biles","Katie Ledecky","Naomi Osaka","Lewis Hamilton","Max Verstappen",
  "Conor McGregor","Canelo Alvarez","Tyson Fury","Anthony Joshua","Shohei Ohtani"
];

const celebritiesInternetPersonalities = [
  "MrBeast","PewDiePie","Markiplier","Jacksepticeye","Logan Paul","KSI","Emma Chamberlain","Charli D'Amelio","Addison Rae","Khaby Lame",
  "Bella Poarch","Zach King","David Dobrik","Liza Koshy","Lele Pons","James Charles","Jeffree Star","Tana Mongeau","Trisha Paytas","Nikita Dragun",
  "Kylie Jenner","Kim Kardashian","Cristiano Ronaldo","Dwayne Johnson","Selena Gomez"
];

const CATEGORIES = {
  football: {
    name: "Football",
    subcategories: {
      Goalkeepers: footballGoalkeepers,
      Defenders: footballDefenders,
      Midfielders: footballMidfielders,
      Forwards: footballForwards
    }
  },
  movies: {
    name: "Movies",
    subcategories: {
      Drama: moviesDrama,
      Comedy: moviesComedy,
      "Action/Superhero": moviesActionSuperhero,
      "Sci-Fi": moviesSciFi,
      Thriller: moviesThriller
    }
  },
  celebrities: {
    name: "Celebrities",
    subcategories: {
      Actors: celebritiesActors,
      Musicians: celebritiesMusicians,
      Athletes: celebritiesAthletes,
      "Internet Personalities": celebritiesInternetPersonalities
    }
  }
};

client.once('clientReady', async () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log('\n✅ IMPOSTA! Game Bot Ready\n');
  verifyImpostaDistribution();
  
  const command = new SlashCommandBuilder()
    .setName('newgame')
    .setDescription('Start a new IMPOSTA! game')
    .addStringOption(option =>
      option.setName('category')
        .setDescription('Category for the game')
        .setRequired(true)
        .addChoices(
          { name: 'Football', value: 'football' },
          { name: 'Movies', value: 'movies' },
          { name: 'Celebrities', value: 'celebrities' }
        ))
    .addIntegerOption(option =>
      option.setName('clues_per_player')
        .setDescription('Number of spoken rounds (Round 0 typed + your chosen spoken rounds)')
        .setRequired(true)
        .setMinValue(2)
        .setMaxValue(6));
  
  try {
    const commands = await client.application.commands.fetch();
    for (const cmd of commands.values()) {
      await client.application.commands.delete(cmd.id);
    }
    await client.application.commands.create(command);
    console.log('✅ Only /newgame command registered\n');
  } catch (error) {
    console.error('Error managing commands:', error);
  }
});

client.on('interactionCreate', async interaction => {
  console.log(`Interaction received: ${interaction.type} / ${interaction.customId || interaction.commandName || 'unknown'}`);
  try {
    if (interaction.isChatInputCommand()) {
      await handleCommand(interaction);
    } else if (interaction.isButton()) {
      await handleButton(interaction);
    }
  } catch (error) {
    console.error('interactionCreate error:', error);
    try {
      if (!interaction.replied && !interaction.deferred) {
        await interaction.reply({ content: 'Something went wrong!', flags: MessageFlags.Ephemeral });
      }
    } catch (e) {}
  }
});


async function handleCommand(interaction) {
  if (interaction.commandName === 'newgame') {
    const channelId = interaction.channelId;
    
    if (games.has(channelId)) {
      return interaction.reply({ content: 'A game is already in progress in this channel!', flags: MessageFlags.Ephemeral });
    }
    
    const category = interaction.options.getString('category');
    const cluesPerPlayer = interaction.options.getInteger('clues_per_player');
    
    games.set(channelId, {
      players: [],
      impostaId: null,
      category: category,
      rounds: cluesPerPlayer,
      round: 0,
      turnIndex: 0,
      turnOrder: [],
      secretWord: null,
      subcategory: null,
      phase: 'lobby',
      busyUntil: 0,
      round1Clues: [],
      votes: new Map(),
      voteTally: new Map(),
      accused: null,
      votingMessage: null,
      tieMessage: null,
      wrongAccusation: false
    });
    
    const categoryName = CATEGORIES[category].name;
    
    const embed = new EmbedBuilder()
      .setColor('#FF6B35')
      .setTitle('🎭 IMPOSTA! Game Lobby')
      .setDescription(`**Category:** ${categoryName}\n**Rounds:** Round 0 (typed) + ${cluesPerPlayer} spoken rounds`)
      .addFields({ name: 'Players (0)', value: 'No players yet. Click Join to play!', inline: false });
    
    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('join')
          .setLabel('Join')
          .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
          .setCustomId('leave')
          .setLabel('Leave')
          .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
          .setCustomId('randomize_order')
          .setLabel('Randomize Order')
          .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
          .setCustomId('start')
          .setLabel('Start Game')
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId('end')
          .setLabel('End Game')
          .setStyle(ButtonStyle.Danger)
      );
    
    await interaction.reply({ embeds: [embed], components: [row] });
  }
}

async function handleButton(interaction) {
  try {
    const channelId = interaction.channelId;
    const game = games.get(channelId);
    
    if (!game) {
      return interaction.reply({ content: 'No active game in this channel!', flags: MessageFlags.Ephemeral });
    }
    
    const userId = interaction.user.id;
    const customId = interaction.customId;
    
    // LOBBY PHASE BUTTONS
    if (customId === 'join') {
      if (game.phase !== 'lobby') {
        return interaction.reply({ content: 'Cannot join - game already started!', flags: MessageFlags.Ephemeral });
      }
      
      if (game.players.includes(userId)) {
        return interaction.reply({ content: 'You already joined!', flags: MessageFlags.Ephemeral });
      }
      
      await interaction.deferUpdate();
      game.players.push(userId);
      await updateLobby(interaction, game);
    }
    
    else if (customId === 'leave') {
      if (game.phase !== 'lobby') {
        return interaction.reply({ content: 'Cannot leave - game already started!', flags: MessageFlags.Ephemeral });
      }
      
      const index = game.players.indexOf(userId);
      if (index === -1) {
        return interaction.reply({ content: 'You are not in the game!', flags: MessageFlags.Ephemeral });
      }
      
      await interaction.deferUpdate();
      game.players.splice(index, 1);
      await updateLobby(interaction, game);
    }
    
    else if (customId === 'start') {
      if (game.phase !== 'lobby') {
        return interaction.reply({ content: 'Game already started!', flags: MessageFlags.Ephemeral });
      }
      
      if (!game.players.includes(userId)) {
        return interaction.reply({ content: "You're not in this game.", flags: MessageFlags.Ephemeral });
      }
      
      if (game.players.length < 3) {
        return interaction.reply({ content: 'Need at least 3 players to start!', flags: MessageFlags.Ephemeral });
      }
      
      await interaction.deferUpdate();
      await startGame(interaction, game);
    }
    
    else if (customId === 'end') {
      if (!game.players.includes(userId)) {
        return interaction.reply({ content: "You're not in this game.", flags: MessageFlags.Ephemeral });
      }
      
      games.delete(channelId);
      
      const embed = new EmbedBuilder()
        .setColor('#808080')
        .setTitle('Game Ended')
        .setDescription('The game has been ended.');
      await interaction.update({ embeds: [embed], components: [] });
    }
    
    else if (customId === 'randomize_order') {
      if (game.phase !== 'lobby') {
        return interaction.reply({ content: 'Can only randomize in lobby!', flags: MessageFlags.Ephemeral });
      }
      
      if (!game.players.includes(userId)) {
        return interaction.reply({ content: "You're not in this game.", flags: MessageFlags.Ephemeral });
      }
      
      await interaction.deferUpdate();
      game.players = shuffle([...game.players]);
      await updateLobby(interaction, game);
    }
    
    // SPOKEN ROUNDS BUTTONS
    else if (customId === 'next_player') {
      if (game.phase !== 'speaking') {
        return interaction.reply({ content: 'Not in speaking phase!', flags: MessageFlags.Ephemeral });
      }
      
      if (!game.players.includes(userId)) {
        return interaction.reply({ content: "You're not in this game.", flags: MessageFlags.Ephemeral });
      }
      
      if (Date.now() < game.busyUntil) {
        return interaction.reply({ content: 'Please wait a moment.', flags: MessageFlags.Ephemeral });
      }
      
      game.busyUntil = Date.now() + 900;
      await interaction.deferUpdate();
      
      game.turnIndex++;
      
      if (game.turnIndex >= game.players.length) {
        // Round complete - auto-advance
        if (game.round >= game.rounds) {
          // Last round complete - go to voting
          game.phase = 'voting';
          await startVoting(interaction, game);
        } else {
          // Auto-advance to next round
          game.round++;
          game.turnIndex = 0;
          game.phase = 'speaking';
          
          await interaction.editReply({
            content: `**Round ${game.round} begins!** <@${game.players[0]}>, you start.`,
            embeds: [],
            components: []
          });
          
          setTimeout(async () => {
            await updateSpeakingPhase(interaction, game);
          }, 2000);
        }
      } else {
        await updateSpeakingPhase(interaction, game);
      }
    }
    
    else if (customId === 'next_round') {
      if (!game.players.includes(userId)) {
        return interaction.reply({ content: "You're not in this game.", flags: MessageFlags.Ephemeral });
      }
      
      await interaction.deferUpdate();
      game.round++;
      game.turnIndex = 0;
      game.phase = 'speaking';
      
      await interaction.editReply({
        content: `**Round ${game.round} begins!** <@${game.players[0]}>, you start.`,
        embeds: [],
        components: []
      });
      
      setTimeout(async () => {
        await updateSpeakingPhase(interaction, game);
      }, 2000);
    }
    
    else if (customId === 'skip_to_guessing') {
      if (!game.players.includes(userId)) {
        return interaction.reply({ content: "You're not in this game.", flags: MessageFlags.Ephemeral });
      }
      
      await interaction.deferUpdate();
      game.phase = 'voting'; // Set phase before starting voting to prevent round messages
      await startVoting(interaction, game);
    }
    
    // VOTING BUTTONS
    else if (customId.startsWith('vote_')) {
      if (game.phase !== 'voting') {
        return interaction.reply({ content: 'Not in voting phase!', flags: MessageFlags.Ephemeral });
      }
      
      if (!game.players.includes(userId)) {
        return interaction.reply({ content: "You're not in this game.", flags: MessageFlags.Ephemeral });
      }
      
      if (game.votes.has(userId)) {
        return interaction.reply({ content: 'You already voted!', flags: MessageFlags.Ephemeral });
      }
      
      const targetId = customId.replace('vote_', '');
      
      game.votes.set(userId, targetId);
      game.voteTally.set(targetId, (game.voteTally.get(targetId) || 0) + 1);
      
      await interaction.deferUpdate();
      
      await updateVoteTally(game);
      
      if (game.votes.size === game.players.length) {
        await finalizeVoting(interaction, game);
      }
    }
    
    // REVEAL BUTTON
    else if (customId === 'reveal_role') {
      if (!game.players.includes(userId)) {
        return interaction.reply({ content: "You're not in this game.", flags: MessageFlags.Ephemeral });
      }
      
      await interaction.deferUpdate();
      
      if (game.accused !== game.impostaId) {
        // Wrong accusation - but IMPOSTA! can still guess for SUPER WIN!
        game.wrongAccusation = true;
        
        const embed = new EmbedBuilder()
          .setColor('#FF6B35')
          .setTitle('❌ Wrong Accusation!')
          .setDescription(
            `<@${game.accused}> was NOT the IMPOSTA!\n\n` +
            `The real IMPOSTA! is <@${game.impostaId}>.\n\n` +
            `**But wait!** The IMPOSTA! can still guess the secret word for a **🔥 SUPER WIN! 🔥**\n\n` +
            `IMPOSTA!, speak your guess aloud now!`
          );
        
        const row = new ActionRowBuilder()
          .addComponents(
            new ButtonBuilder()
              .setCustomId('correct_guess')
              .setLabel('Correct Guess')
              .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
              .setCustomId('wrong_guess')
              .setLabel('Wrong Guess')
              .setStyle(ButtonStyle.Danger),
            new ButtonBuilder()
              .setCustomId('end')
              .setLabel('End Game')
              .setStyle(ButtonStyle.Danger)
          );
        
        game.phase = 'guessing';
        await interaction.editReply({ embeds: [embed], components: [row] });
      } else {
        const embed = new EmbedBuilder()
          .setColor('#00FF00')
          .setTitle('✅🎉 You Caught the IMPOSTA! 🎉✅')
          .setDescription(`<@${game.impostaId}> is the IMPOSTA!\n\nThe IMPOSTA! may now guess the secret word aloud.`);
        
        const row = new ActionRowBuilder()
          .addComponents(
            new ButtonBuilder()
              .setCustomId('correct_guess')
              .setLabel('Correct Guess')
              .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
              .setCustomId('wrong_guess')
              .setLabel('Wrong Guess')
              .setStyle(ButtonStyle.Danger),
            new ButtonBuilder()
              .setCustomId('end')
              .setLabel('End Game')
              .setStyle(ButtonStyle.Danger)
          );
        
        game.phase = 'guessing';
        await interaction.editReply({ embeds: [embed], components: [row] });
      }
    }
    
    // GUESSING PHASE BUTTONS
    else if (customId === 'correct_guess') {
      if (!game.players.includes(userId)) {
        return interaction.reply({ content: "You're not in this game.", flags: MessageFlags.Ephemeral });
      }
      
      let embed;
      
      if (game.wrongAccusation) {
        // SUPER WIN! - Fooled everyone AND guessed the word!
        embed = new EmbedBuilder()
          .setColor('#FFD700')
          .setTitle('🎉🔥 SUPER WIN! SUPER WIN! 🔥🎉')
          .setDescription(
            `**The IMPOSTA! fooled everyone AND guessed the secret word!**\n\n` +
            `🏆 LEGENDARY PERFORMANCE! 🏆`
          )
          .addFields(
            { name: '🔥 IMPOSTA! Champion', value: `<@${game.impostaId}>`, inline: false },
            { name: '✨ Secret Word', value: `**${game.secretWord}** (${game.subcategory})`, inline: false }
          );
      } else {
        // Regular IMPOSTA! win (caught but guessed correctly)
        embed = new EmbedBuilder()
          .setColor('#FF0000')
          .setTitle('🎉 IMPOSTA! Wins! 🎉')
          .setDescription('**The IMPOSTA! guessed correctly!**')
          .addFields(
            { name: 'IMPOSTA!', value: `<@${game.impostaId}>`, inline: false },
            { name: 'Secret Word', value: `**${game.secretWord}** (${game.subcategory})`, inline: false }
          );
      }
      
      games.delete(channelId);
      await interaction.update({ embeds: [embed], components: [] });
    }
    
    else if (customId === 'wrong_guess') {
      if (!game.players.includes(userId)) {
        return interaction.reply({ content: "You're not in this game.", flags: MessageFlags.Ephemeral });
      }
      
      let embed;
      
      if (game.wrongAccusation) {
        // Wrong accusation + wrong guess = Normal IMPOSTA! win (they already won by not being caught)
        embed = new EmbedBuilder()
          .setColor('#FF0000')
          .setTitle('🎉 IMPOSTA! Wins! 🎉')
          .setDescription(
            `**The IMPOSTA! escaped detection!**\n\n` +
            `They didn't guess the word, but they still win!`
          )
          .addFields(
            { name: 'IMPOSTA!', value: `<@${game.impostaId}>`, inline: false },
            { name: 'Secret Word', value: `**${game.secretWord}** (${game.subcategory})`, inline: false }
          );
      } else {
        // Caught the IMPOSTA! and they guessed wrong - Citizens win!
        embed = new EmbedBuilder()
          .setColor('#00FF00')
          .setTitle('✅🎉 Citizens Win! 🎉✅')
          .setDescription('**You caught the IMPOSTA! and they guessed wrong!**')
          .addFields(
            { name: 'IMPOSTA!', value: `<@${game.impostaId}>`, inline: false },
            { name: 'Secret Word', value: `**${game.secretWord}** (${game.subcategory})`, inline: false }
          );
      }
      
      games.delete(channelId);
      await interaction.update({ embeds: [embed], components: [] });
    }
    
  } catch (error) {
    console.error('Button handler error:', error);
    try {
      if (!interaction.replied && !interaction.deferred) {
        await interaction.reply({ content: 'Something went wrong. Please try again.', flags: MessageFlags.Ephemeral });
      }
    } catch (e) {
      console.error('Failed to send error message:', e);
    }
  }
}

async function updateLobby(interaction, game) {
  const categoryName = CATEGORIES[game.category].name;
  const playerList = game.players.length > 0 
    ? game.players.map(id => `• <@${id}>`).join('\n')
    : 'No players yet. Click Join to play!';
  
  const embed = new EmbedBuilder()
    .setColor('#FF6B35')
    .setTitle('🎭 IMPOSTA! Game Lobby')
    .setDescription(`**Category:** ${categoryName}\n**Rounds:** Round 0 (typed) + ${game.rounds} spoken rounds`)
    .addFields({ name: `Players (${game.players.length})`, value: playerList, inline: false });
  
  const row = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId('join')
        .setLabel('Join')
        .setStyle(ButtonStyle.Success),
      new ButtonBuilder()
        .setCustomId('leave')
        .setLabel('Leave')
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId('randomize_order')
        .setLabel('Randomize Order')
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId('start')
        .setLabel('Start Game')
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId('end')
        .setLabel('End Game')
        .setStyle(ButtonStyle.Danger)
    );
  
  await interaction.editReply({ embeds: [embed], components: [row] });
}

async function startGame(interaction, game) {
  // Shuffle turn order using cryptographically secure RNG
  game.players = shuffle([...game.players]);
  
  // Select IMPOSTA! independently with cryptographically secure RNG — equal probability for all
  game.impostaId = selectImposta(game.players);
  
  const categoryData = CATEGORIES[game.category];
  const subcategoryNames = Object.keys(categoryData.subcategories);
  const chosenSubcategory = subcategoryNames[secureRandInt(subcategoryNames.length)];
  const wordsArray = categoryData.subcategories[chosenSubcategory];
  const secretWord = wordsArray[secureRandInt(wordsArray.length)];
  
  game.secretWord = secretWord;
  game.subcategory = chosenSubcategory;
  game.phase = 'round1_collecting';
  game.round = 0;
  game.round1Clues = [];
  
  console.log('\n=== GAME STARTED ===');
  console.log(`Category: ${categoryData.name}`);
  console.log(`Subcategory: ${chosenSubcategory}`);
  console.log('====================\n');
  
  // Send DMs
  for (const playerId of game.players) {
    try {
      const user = await client.users.fetch(playerId);
      const isImposta = playerId === game.impostaId;
      
      if (isImposta) {
        await user.send(
          `**IMPOSTA! – Game Start**\n\n` +
          `**Role:** IMPOSTA!\n` +
          `**Category:** ${categoryData.name}\n` +
          `**Subcategory:** ${chosenSubcategory}\n\n` +
          `You do not know the secret word.\n\n` +
          `**Reply with one single-word clue** that fits this subcategory. This Round 0 clue is anonymous and text-based.`
        );
      } else {
        await user.send(
          `**IMPOSTA! – Game Start**\n\n` +
          `**Role:** Citizen\n` +
          `**Category:** ${categoryData.name}\n` +
          `**Subcategory:** ${chosenSubcategory}\n` +
          `**Secret word:** ${secretWord}\n\n` +
          `**Reply with one single-word clue.** This Round 0 clue is anonymous and text-based.`
        );
      }
      
      // Collect DM response
      collectDMClue(user, playerId, game, interaction.channel).catch(err => {
        console.error(`Error collecting DM from ${playerId}:`, err);
      });
      
    } catch (error) {
      console.error(`Failed to DM player ${playerId}:`, error.message);
    }
  }
  
  const embed = new EmbedBuilder()
    .setColor('#FF6B35')
    .setTitle('🎭 IMPOSTA! Game Started')
    .setDescription(
      `**Round 0 – Anonymous Typed Clues**\n\n` +
      `DMs have been sent to all players.\n` +
      `Reply in your DM with one single-word clue.\n\n` +
      `Waiting for ${game.players.length} clues...`
    );
  
  const row = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId('end')
        .setLabel('End Game')
        .setStyle(ButtonStyle.Danger)
    );
  
  await interaction.editReply({ embeds: [embed], components: [row] });
}

async function finalizeRound1(channel, game) {
  const shuffledClues = shuffle([...game.round1Clues]);
  
  const embed = new EmbedBuilder()
    .setColor('#4ECDC4')
    .setTitle('Round 0 – Anonymous Typed Clues')
    .setDescription(
      shuffledClues.map(clue => `• ${clue}`).join('\n') + '\n\n' +
      `These clues are anonymous. The next rounds (1-${game.rounds}) will be spoken aloud.`
    );
  
  const row = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId('next_round')
        .setLabel('Next Round')
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId('skip_to_guessing')
        .setLabel('Skip to Guessing')
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId('end')
        .setLabel('End Game')
        .setStyle(ButtonStyle.Danger)
    );
  
  // IMPORTANT: Use channel.send() to create a NEW message that persists throughout the game.
  // Round 0 clues must remain visible in the channel for the entire game duration.
  // Do NOT store this message or edit it - it should stay exactly as posted until game ends.
  await channel.send({ embeds: [embed], components: [row] });
}

async function updateSpeakingPhase(interaction, game) {
  const currentPlayer = game.players[game.turnIndex];
  const numPlayers = game.players.length;
  const currentTurn = game.turnIndex + 1;
  
  const embed = new EmbedBuilder()
    .setColor('#F7B801')
    .setTitle('IMPOSTA! — Game')
    .setDescription(
      `**Round ${game.round}/${game.rounds}**\n` +
      `**Player ${currentTurn}/${numPlayers}**\n` +
      `**Current speaker:** <@${currentPlayer}>`
    )
    .addFields({ 
      name: 'Players', 
      value: game.players.map(id => `• <@${id}>`).join('\n'), 
      inline: false 
    });
  
  const row = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId('next_player')
        .setLabel('Next Player')
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId('skip_to_guessing')
        .setLabel('Skip to Guessing')
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId('end')
        .setLabel('End Game')
        .setStyle(ButtonStyle.Danger)
    );
  
  await interaction.editReply({ embeds: [embed], components: [row] });
}


async function startVoting(interaction, game) {
  game.phase = 'voting';
  game.votes.clear();
  game.voteTally.clear();
  
  const votingCandidates = game.players;
  
  for (const playerId of votingCandidates) {
    game.voteTally.set(playerId, 0);
  }
  
  const embed = new EmbedBuilder()
    .setColor('#E74C3C')
    .setTitle('🗳️ Voting Time!')
    .setDescription(
      'Vote for who you think the IMPOSTA! is.\n' +
      'Each player may vote once. Results update live.'
    )
    .addFields({
      name: 'Vote Tally',
      value: votingCandidates.map(id => `<@${id}>: 0 votes`).join('\n'),
      inline: false
    });
  
  // Get user objects to display names on buttons
  const buttons = [];
  for (const playerId of votingCandidates) {
    try {
      const user = await client.users.fetch(playerId);
      const displayName = user.username.substring(0, 20);
      buttons.push(
        new ButtonBuilder()
          .setCustomId(`vote_${playerId}`)
          .setLabel(displayName)
          .setStyle(ButtonStyle.Danger)
      );
    } catch (error) {
      console.error(`Failed to fetch user ${playerId}:`, error);
      buttons.push(
        new ButtonBuilder()
          .setCustomId(`vote_${playerId}`)
          .setLabel(`Player ${votingCandidates.indexOf(playerId) + 1}`)
          .setStyle(ButtonStyle.Danger)
      );
    }
  }
  
  const rows = [];
  for (let i = 0; i < buttons.length; i += 5) {
    const row = new ActionRowBuilder().addComponents(buttons.slice(i, i + 5));
    rows.push(row);
  }
  
  // Add End Game button row
  const endGameRow = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId('end')
        .setLabel('End Game')
        .setStyle(ButtonStyle.Danger)
    );
  rows.push(endGameRow);
  
  const playerList = votingCandidates.map((id, index) => `${index + 1}. <@${id}>`).join('\n');
  embed.addFields({ name: 'Players', value: playerList, inline: false });
  
  const message = await interaction.editReply({ embeds: [embed], components: rows });
  game.votingMessage = message;
}

async function startVotingNewMessage(interaction, game) {
  const votingCandidates = game.tiedPlayers;
  
  const embed = new EmbedBuilder()
    .setColor('#E74C3C')
    .setTitle('🗳️ Tie Revote!')
    .setDescription(
      'Vote for who you think the IMPOSTA! is.\n' +
      'Each player may vote once. Results update live.'
    )
    .addFields({
      name: 'Vote Tally',
      value: votingCandidates.map(id => `<@${id}>: 0 votes`).join('\n'),
      inline: false
    });
  
  // Get user objects to display names on buttons
  const buttons = [];
  for (const playerId of votingCandidates) {
    try {
      const user = await client.users.fetch(playerId);
      const displayName = user.username.substring(0, 20);
      buttons.push(
        new ButtonBuilder()
          .setCustomId(`vote_${playerId}`)
          .setLabel(displayName)
          .setStyle(ButtonStyle.Danger)
      );
    } catch (error) {
      console.error(`Failed to fetch user ${playerId}:`, error);
      buttons.push(
        new ButtonBuilder()
          .setCustomId(`vote_${playerId}`)
          .setLabel(`Player ${votingCandidates.indexOf(playerId) + 1}`)
          .setStyle(ButtonStyle.Danger)
      );
    }
  }
  
  const rows = [];
  for (let i = 0; i < buttons.length; i += 5) {
    const row = new ActionRowBuilder().addComponents(buttons.slice(i, i + 5));
    rows.push(row);
  }
  
  // Add End Game button row
  const endGameRow = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId('end')
        .setLabel('End Game')
        .setStyle(ButtonStyle.Danger)
    );
  rows.push(endGameRow);
  
  const playerList = votingCandidates.map((id, index) => `${index + 1}. <@${id}>`).join('\n');
  embed.addFields({ name: 'Tied Candidates', value: playerList, inline: false });
  
  const message = await interaction.channel.send({ embeds: [embed], components: rows });
  game.votingMessage = message;
}

async function updateVoteTally(game) {
  const votingCandidates = game.tiedPlayers || game.players;
  
  const tallyText = votingCandidates.map(id => {
    const votes = game.voteTally.get(id) || 0;
    return `<@${id}>: ${votes} vote${votes !== 1 ? 's' : ''}`;
  }).join('\n');
  
  const embed = new EmbedBuilder()
    .setColor('#E74C3C')
    .setTitle(game.tiedPlayers ? '🗳️ Tie Revote!' : '🗳️ Voting Time!')
    .setDescription(
      'Vote for who you think the IMPOSTA! is.\n' +
      'Each player may vote once. Results update live.'
    )
    .addFields({
      name: 'Vote Tally',
      value: tallyText,
      inline: false
    });
  
  const playerList = votingCandidates.map((id, index) => `${index + 1}. <@${id}>`).join('\n');
  embed.addFields({ name: game.tiedPlayers ? 'Tied Candidates' : 'Players', value: playerList, inline: false });
  
  // Update the stored voting message
  if (game.votingMessage) {
    await game.votingMessage.edit({ embeds: [embed] });
  }
}

async function finalizeVoting(interaction, game) {
  const votingCandidates = game.tiedPlayers || game.players;
  let maxVotes = 0;
  let accused = null;
  let tied = [];
  
  for (const [playerId, voteCount] of game.voteTally) {
    if (voteCount > maxVotes) {
      maxVotes = voteCount;
      accused = playerId;
      tied = [playerId];
    } else if (voteCount === maxVotes && voteCount > 0) {
      tied.push(playerId);
    }
  }
  
  if (tied.length > 1) {
    // Disable buttons on old voting message
    const closedEmbed = new EmbedBuilder()
      .setColor('#808080')
      .setTitle('🗳️ Voting Closed')
      .setDescription('Voting closed — tie detected.');
    
    if (game.votingMessage) {
      await game.votingMessage.edit({ embeds: [closedEmbed], components: [] });
    }
    
    // Disable old tie message if it exists
    if (game.tieMessage) {
      try {
        const disabledTieEmbed = new EmbedBuilder()
          .setColor('#808080')
          .setTitle('⚠️ Previous Tie')
          .setDescription('Previous tie voting — see new voting below.');
        await game.tieMessage.edit({ embeds: [disabledTieEmbed], components: [] });
      } catch (error) {
        console.error('Failed to disable old tie message:', error);
      }
    }
    
    // Reset for revote
    game.votes.clear();
    game.voteTally.clear();
    game.tiedPlayers = tied;
    
    for (const playerId of tied) {
      game.voteTally.set(playerId, 0);
    }
    
    const tieEmbed = new EmbedBuilder()
      .setColor('#FFA500')
      .setTitle('⚠️ Tie!')
      .setDescription(`There was a tie. Voting again between:\n${tied.map(id => `• <@${id}>`).join('\n')}`);
    
    const endRow = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('end')
          .setLabel('End Game')
          .setStyle(ButtonStyle.Danger)
      );
    
    const tieMessage = await interaction.channel.send({ embeds: [tieEmbed], components: [endRow] });
    game.tieMessage = tieMessage;
    
    // Clear old voting message reference and post new voting message
    game.votingMessage = null;
    
    setTimeout(async () => {
      await startVotingNewMessage(interaction, game);
    }, 2000);
    
    return;
  }
  
  // Clear tied players after successful vote
  game.tiedPlayers = null;
  game.accused = accused;
  game.phase = 'reveal';
  
  const embed = new EmbedBuilder()
    .setColor('#9B59B6')
    .setTitle('🎯 Voting Complete')
    .setDescription(`The accused player is <@${accused}>.`);
  
  const row = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId('reveal_role')
        .setLabel('Reveal Role')
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId('end')
        .setLabel('End Game')
        .setStyle(ButtonStyle.Danger)
    );
  
  await game.votingMessage.edit({ embeds: [embed], components: [row] });
  
  // Clear voting message after using it
  game.votingMessage = null;
}

async function collectDMClue(user, playerId, game, channel) {
  try {
    const dmChannel = await user.createDM();
    
    const collected = await dmChannel.awaitMessages({
      filter: m => m.author.id === playerId,
      max: 1,
      time: 120000, // 2 minutes
      errors: ['time']
    });
    
    if (game.phase !== 'round1_collecting') return;
    
    const message = collected.first();
    const words = message.content.trim().split(/\s+/);
    
    if (words.length === 1) {
      game.round1Clues.push(message.content.trim());
      await message.reply('✅ Your clue has been recorded!');
      
      if (game.round1Clues.length === game.players.length) {
        await finalizeRound1(channel, game);
      }
    } else {
      await message.reply('❌ Please send only ONE word as your clue. Try again:');
      // Recursively collect again
      await collectDMClue(user, playerId, game, channel);
    }
  } catch (error) {
    if (error.message === 'time') {
      console.error(`Player ${playerId} timed out on Round 1 clue`);
      // Submit a default clue
      if (game.phase === 'round1_collecting') {
        game.round1Clues.push('...');
        if (game.round1Clues.length === game.players.length) {
          await finalizeRound1(channel, game);
        }
      }
    } else {
      console.error(`Error collecting DM from ${playerId}:`, error);
    }
  }
}

// Cryptographically secure integer in range [0, max) using crypto.randomInt
function secureRandInt(max) {
  return crypto.randomInt(0, max);
}

// Fisher-Yates shuffle backed by cryptographically secure RNG
function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = secureRandInt(i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Cryptographically secure IMPOSTA! selection — every player has exactly equal probability
function selectImposta(players) {
  return players[secureRandInt(players.length)];
}

// Startup verification: run 10000 draws across 5 test slots and print distribution
function verifyImpostaDistribution() {
  const n = 10000;
  const slots = 5;
  const players = Array.from({ length: slots }, (_, i) => `P${i + 1}`);
  const counts = Object.fromEntries(players.map(p => [p, 0]));

  for (let i = 0; i < n; i++) {
    counts[selectImposta(players)]++;
  }

  const expected = n / slots;
  console.log(`\n=== IMPOSTA! Secure Selection Verification (n=${n}, slots=${slots}) ===`);
  let maxDeviation = 0;
  for (const [player, count] of Object.entries(counts)) {
    const pct = ((count / n) * 100).toFixed(2);
    const deviation = Math.abs(count - expected) / expected * 100;
    if (deviation > maxDeviation) maxDeviation = deviation;
    console.log(`  ${player}: ${count} (${pct}%) — deviation ${deviation.toFixed(2)}%`);
  }
  console.log(`  Expected per slot: ~${expected} (${(100 / slots).toFixed(2)}%)`);
  console.log(`  Max deviation from uniform: ${maxDeviation.toFixed(2)}%`);
  console.log('=====================================================================\n');
}

const token = process.env.DISCORD_BOT_TOKEN;

if (!token) {
  console.error('ERROR: DISCORD_BOT_TOKEN environment variable is not set!');
  process.exit(1);
}

client.login(token);
