document.addEventListener('DOMContentLoaded', () => {
  // Dark mode functionality
  const darkModeToggle = document.getElementById('darkModeToggle');
  const sunIcon = document.getElementById('sunIcon');
  const moonIcon = document.getElementById('moonIcon');
  
  // Check for saved user preference or use system preference
  if (localStorage.getItem('darkMode') === 'true' || 
      (!localStorage.getItem('darkMode') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
    sunIcon.classList.add('hidden');
    moonIcon.classList.remove('hidden');
  } else {
    document.documentElement.classList.remove('dark');
    sunIcon.classList.remove('hidden');
    moonIcon.classList.add('hidden');
  }
  
  // Toggle dark mode
  darkModeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    sunIcon.classList.toggle('hidden');
    moonIcon.classList.toggle('hidden');
    localStorage.setItem('darkMode', document.documentElement.classList.contains('dark'));
  });

  // Kata Baku game functionality
  const baku = ['akta', 'esai', 'frasa', 'kendaraan', 'masjid', 'saksama', 'sekadar', /* ... rest of your baku words ... */];
  const tidakBaku = ['akte', 'esay', 'frase', 'kenderaan', 'mesjid', 'seksama', 'sekedar', /* ... rest of your tidakBaku words ... */];

  const btn1 = document.querySelector('.btn-1');
  const btn2 = document.querySelector('.btn-2');
  const answerText1 = document.querySelector('.answer-text-1');
  const answerText2 = document.querySelector('.answer-text-2');
  const correctStat = document.querySelector('.correct-count');
  const wrongStat = document.querySelector('.wrong-count');
  const answerText = document.querySelector('.answer-text');
  const answerFeedback = document.querySelector('.answer-feedback');
  const soundButton = document.querySelector(".btn-sound");

  let lastIndex = -1;
  let index = -1;
  let correctCount = 0;
  let wrongCount = 0;
  let sound = true;

  const correctSound = new Audio("SFX/correct.mp3");
  const wrongSound = new Audio("SFX/wrong_5.mp3");

  soundButton.addEventListener("click", function () {
    const icon = soundButton.querySelector("i");
    icon.classList.toggle("fa-volume-up");
    icon.classList.toggle("fa-volume-mute");
    sound = !sound;
  });

  function SetUp() {
    while (index === lastIndex) {
      index = Math.floor(Math.random() * baku.length);
    }
    const correctButton = Math.floor(Math.random() * 2);
    if (correctButton === 0) {
      answerText1.textContent = baku[index];
      answerText2.textContent = tidakBaku[index];
    } else {
      answerText1.textContent = tidakBaku[index];
      answerText2.textContent = baku[index];
    }
    lastIndex = index;
  }

  function answer(e) {
    const selectedAnswer = e.currentTarget.querySelector('.answer-text-1') ? 
      e.currentTarget.querySelector('.answer-text-1').textContent : 
      e.currentTarget.querySelector('.answer-text-2').textContent;
    
    if (selectedAnswer === baku[lastIndex]) {
      answerText.textContent = `✅ Jawaban "${selectedAnswer}" benar!`;
      answerFeedback.classList.remove('bg-red-100', 'dark:bg-red-900/20', 'text-red-600');
      answerFeedback.classList.add('bg-green-100', 'dark:bg-green-900/20', 'text-green-600');
      correctCount += 1;
      correctStat.textContent = correctCount;
      if (sound) correctSound.play();
    } else {
      answerText.textContent = `❌ Jawaban "${selectedAnswer}" salah!`;
      answerFeedback.classList.remove('bg-green-100', 'dark:bg-green-900/20', 'text-green-600');
      answerFeedback.classList.add('bg-red-100', 'dark:bg-red-900/20', 'text-red-600');
      wrongCount += 1;
      wrongStat.textContent = wrongCount;
      if (sound) wrongSound.play();
    }
    
    // Add animation class
    answerFeedback.classList.add('animate-pulse');
    setTimeout(() => {
      answerFeedback.classList.remove('animate-pulse');
      SetUp();
    }, 1000);
  }

  btn1.addEventListener('click', answer);
  btn2.addEventListener('click', answer);

  SetUp();
});