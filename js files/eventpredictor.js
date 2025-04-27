let questions = [
    {
      question: "Who will win the match?",
      options: ["Team A", "Team B"],
      answer: "Team A"
    },
    {
      question: "Will it rain tomorrow?",
      options: ["Yes", "No"],
      answer: "No"
    },
    {
      question: "Which car will win the race?",
      options: ["Red Car", "Blue Car"],
      answer: "Red Car"
    },
    {
      question: "Will the stock price go up?",
      options: ["Yes", "No"],
      answer: "Yes"
    }
  ];
  
  let currentQuestion = 0;
  let score = 0;
  
  function startGame() {
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');
    loadQuestion();
  }
  
  function loadQuestion() {
    const questionObj = questions[currentQuestion];
    document.getElementById('question-text').innerText = questionObj.question;
  
    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = '';
  
    questionObj.options.forEach(option => {
      const button = document.createElement('button');
      button.classList.add('option-button');
      button.innerText = option;
      button.onclick = () => selectOption(option);
      optionsDiv.appendChild(button);
    });
  }
  
  function selectOption(choice) {
    const correctAnswer = questions[currentQuestion].answer;
    let resultText = "";
  
    if (choice === correctAnswer) {
      resultText = "🎉 Correct!";
      score++;
    } else {
      resultText = "❌ Wrong!";
    }
  
    document.getElementById('result').innerText = resultText;
  
    // Wait 1 second before moving to next question
    setTimeout(() => {
      currentQuestion++;
      if (currentQuestion < questions.length) {
        loadQuestion();
        document.getElementById('result').innerText = "";
      } else {
        showLeaderboard();
      }
    }, 1000);
  }
  
  function showLeaderboard() {
    document.getElementById('game-screen').classList.add('hidden');
    document.getElementById('leaderboard-screen').classList.remove('hidden');
    document.getElementById('final-score').innerText = score + "/" + questions.length;
  }
  
  function restartGame() {
    currentQuestion = 0;
    score = 0;
    document.getElementById('leaderboard-screen').classList.add('hidden');
    document.getElementById('start-screen').classList.remove('hidden');
  }
  