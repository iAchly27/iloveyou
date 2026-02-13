const overlay = document.getElementById('startOverlay');
const startHeart = document.getElementById('startHeart');
const bgMusic = document.getElementById('bgMusic');
const storyTitle = document.getElementById('storyTitle');
const storyText = document.getElementById('storyText');
const questionContainer = document.getElementById('questionContainer');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');

const story = [
  {title:"Once upon a time…", text:"There was someone who made every day brighter just by being themselves. Their laugh was like sunshine."},
  {title:"Then I met you…", text:"Everything changed the moment I met you. Even a simple hello made my heart skip a beat."},
  {title:"Every adventure with you…", text:"From silly moments to deep conversations, life feels fuller and happier with you by my side."},
  {title:"Through the ups and downs…", text:"We’ve had our arguments, but no matter what, we always choose each other."},
  {title:"Even miles apart…", text:"Being in a long-distance relationship isn’t easy, but thinking of you keeps me going."},
  {title:"For always…", text:"Farah Fae, you are the most special person in my life."}
];

let index = 0;
let heartsInterval;

/* Typing effect */
function typeMessage(element, text, speed=40, callback=null){
  element.textContent = '';
  let i = 0;
  const typing = setInterval(() => {
    element.textContent += text.charAt(i);
    i++;
    if(i >= text.length){
      clearInterval(typing);
      if(callback) callback();
    }
  }, speed);
}

/* Create floating heart/flower */
function createOneHeart(){
  const icons = ['💖','💜','🌸'];
  const heart = document.createElement('div');
  heart.className = 'floating-heart';
  heart.textContent = icons[Math.floor(Math.random()*icons.length)];
  heart.style.left = Math.random()*100 + 'vw';
  heart.style.top = Math.random()*80 + 'vh';
  heart.style.fontSize = (20 + Math.random()*30) + 'px';
  document.body.appendChild(heart);

  heart.animate([
    { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
    { transform: 'translateY(-120vh) rotate(360deg)', opacity: 0 }
  ], { duration: 8000 + Math.random()*4000, iterations: 1 });

  setTimeout(() => heart.remove(), 12000);
}

/* Confetti */
function createConfetti(){
  for(let i=0;i<50;i++){
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random()*window.innerWidth + 'px';
    confetti.style.background = `hsl(${Math.random()*360},70%,80%)`;
    confetti.style.animationDuration = (2 + Math.random()*2) + 's';
    document.body.appendChild(confetti);
    setTimeout(()=>confetti.remove(), 4000);
  }
}

/* Show story */
function showStory(i){
  if(i >= story.length){
    storyTitle.textContent = "💌 Will you be my Valentine, my Farah Fae ?";
    storyText.textContent = "";
    questionContainer.classList.add('show');
    return;
  }

  const s = story[i];
  typeMessage(storyTitle, s.title, 50);
  typeMessage(storyText, s.text, 35, () => {
    setTimeout(()=>{
      index++;
      showStory(index);
    }, 4000);
  });
}

/* Start overlay click */
startHeart.addEventListener('click', () => {
  overlay.style.display = 'none';
  bgMusic.play();

  for(let i=0;i<15;i++) createOneHeart(); // initial hearts
  heartsInterval = setInterval(createOneHeart, 500); // continuous

  showStory(index);
});

/* YES button - now shows GIF */
yesBtn.addEventListener('click', ()=>{
  createConfetti();
  storyTitle.textContent = "💖 Yay! 💖";
  storyText.textContent = "I knew you'd say YES 💖";
  questionContainer.classList.remove('show');

  // Create GIF in center
  const gif = document.createElement('img');
  gif.src = 'lingorm.gif'; // magical heart GIF
  gif.style.position = 'fixed';
  gif.style.top = '50%';
  gif.style.left = '50%';
  gif.style.transform = 'translate(-50%, -50%)';
  gif.style.width = '400px';
  gif.style.height = '400px';
  gif.style.zIndex = '1000';
  document.body.appendChild(gif);

  setTimeout(()=>gif.remove(), 6000); // remove after 6 seconds
});

/* NO button smooth sliding */
let noHoverCount = 0;
const excuses = ["Are you sure? 😢","Think again 💔","Really??? 😭","Don't break my heart 💖","Please? 🥺","Noooo 😝"];
noBtn.style.position = 'relative';
noBtn.style.transition = 'transform 0.3s ease';

noBtn.addEventListener('mouseenter', ()=>{
  const container = questionContainer.getBoundingClientRect();
  const btnWidth = noBtn.offsetWidth;
  const btnHeight = noBtn.offsetHeight;
  const maxX = container.width - btnWidth;
  const maxY = container.height - btnHeight;

  const randomX = Math.random() * maxX;
  const randomY = Math.random() * maxY;

  noBtn.style.transform = `translate(${randomX - noBtn.offsetLeft}px, ${randomY - noBtn.offsetTop}px) scale(${Math.max(1 - (noHoverCount % 5)*0.05,0.8)})`;
  noBtn.textContent = excuses[noHoverCount % excuses.length];
  noHoverCount++;
});
