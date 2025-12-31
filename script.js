// ========================================
// CONFIGURATION
// ========================================
const NEW_YEAR = new Date('2026-01-01T00:00:00').getTime();

// ========================================
// DOM ELEMENTS
// ========================================
const elements = {
    days: document.getElementById('days'),
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds'),
    countdownSection: document.getElementById('countdownSection'),
    celebrationSection: document.getElementById('celebrationSection'),
    nameInput: document.getElementById('nameInput'),
    greetBtn: document.getElementById('greetBtn'),
    personalizedMessage: document.getElementById('personalizedMessage'),
    userName: document.getElementById('userName'),
    fullscreenBtn: document.getElementById('fullscreenBtn'),
    fullscreenIcon: document.getElementById('fullscreenIcon'),
    shareBtn: document.getElementById('shareBtn'),
    particles: document.getElementById('particles'),
    fireworksContainer: document.getElementById('fireworksContainer'),
    confettiContainer: document.getElementById('confettiContainer')
};

// ========================================
// STATE
// ========================================
let countdownInterval = null;
let celebrationTriggered = false;

// ========================================
// COUNTDOWN LOGIC
// ========================================
function updateCountdown() {
    const now = new Date().getTime();
    const timeLeft = NEW_YEAR - now;

    // Check if New Year has arrived
    if (timeLeft <= 0) {
        clearInterval(countdownInterval);
        triggerCelebration();
        return;
    }

    // Calculate time units
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    // Update DOM with zero-padding
    elements.days.textContent = String(days).padStart(2, '0');
    elements.hours.textContent = String(hours).padStart(2, '0');
    elements.minutes.textContent = String(minutes).padStart(2, '0');
    elements.seconds.textContent = String(seconds).padStart(2, '0');

    // Add pulse effect when seconds change
    elements.seconds.style.animation = 'none';
    setTimeout(() => {
        elements.seconds.style.animation = 'pulse 2s ease-in-out infinite';
    }, 10);
}

// ========================================
// CELEBRATION EFFECTS
// ========================================
function triggerCelebration() {
    if (celebrationTriggered) return;
    celebrationTriggered = true;

    // Hide countdown, show celebration
    elements.countdownSection.classList.add('hidden');
    elements.celebrationSection.classList.remove('hidden');

    // Change background gradient
    document.body.style.background = 'linear-gradient(135deg, #1a0033 0%, #330066 50%, #660099 100%)';

    // Start celebration effects
    launchFireworks();
    launchConfetti();

    // Optional: Play celebration sound (uncomment if you add an audio file)
    // const audio = new Audio('celebration.mp3');
    // audio.play();
}

function launchFireworks() {
    const colors = ['#ffd700', '#ff006e', '#00f5ff', '#8b5cf6', '#ff6b6b', '#4ecdc4'];

    // Create multiple fireworks
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createFirework(colors);
        }, i * 300);
    }

    // Continue launching fireworks
    setInterval(() => {
        createFirework(colors);
    }, 2000);
}

function createFirework(colors) {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * (window.innerHeight * 0.5);
    const color = colors[Math.floor(Math.random() * colors.length)];

    // Create particles for explosion
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'firework';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.backgroundColor = color;

        // Random explosion direction
        const angle = (Math.PI * 2 * i) / 30;
        const velocity = 50 + Math.random() * 100;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;

        particle.style.setProperty('--tx', tx + 'px');
        particle.style.setProperty('--ty', ty + 'px');

        elements.fireworksContainer.appendChild(particle);

        // Remove particle after animation
        setTimeout(() => {
            particle.remove();
        }, 1500);
    }
}

function launchConfetti() {
    const colors = ['#ffd700', '#ff006e', '#00f5ff', '#8b5cf6', '#ff6b6b', '#4ecdc4'];
    const shapes = ['square', 'circle', 'triangle'];

    // Create confetti pieces
    setInterval(() => {
        for (let i = 0; i < 5; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * window.innerWidth + 'px';
            confetti.style.top = '-10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 0.5 + 's';
            confetti.style.animationDuration = (2 + Math.random() * 2) + 's';

            // Random shape
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            if (shape === 'circle') {
                confetti.style.borderRadius = '50%';
            } else if (shape === 'triangle') {
                confetti.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
            }

            elements.confettiContainer.appendChild(confetti);

            // Remove confetti after animation
            setTimeout(() => {
                confetti.remove();
            }, 4000);
        }
    }, 300);
}

// ========================================
// PERSONALIZED GREETING
// ========================================
const greetingMessages = [
    {
        message: "May this New Year bring you endless joy, boundless success, and moments that take your breath away!",
        emoji: "🌟💫✨"
    },
    {
        message: "Wishing you a year filled with love, laughter, and dreams that come true. You deserve all the happiness in the world!",
        emoji: "💖🎊🌈"
    },
    {
        message: "Here's to new adventures, cherished memories, and a year that's as amazing as you are!",
        emoji: "🚀🎯💝"
    },
    {
        message: "May every day of this year sparkle with joy and be filled with love, peace, and prosperity!",
        emoji: "✨🌺🎁"
    },
    {
        message: "Cheers to a fresh start, new opportunities, and a year where all your wishes come true!",
        emoji: "🥂🌟🎈"
    },
    {
        message: "Wishing you 365 days of smiles, success, and beautiful moments that make your heart sing!",
        emoji: "😊🎵💐"
    },
    {
        message: "May this year be your best chapter yet, filled with courage, kindness, and incredible achievements!",
        emoji: "📖🏆💪"
    },
    {
        message: "Here's to chasing dreams, creating magic, and making this year absolutely unforgettable!",
        emoji: "🌠🎪🎨"
    },
    {
        message: "Sending you warm wishes for a year overflowing with health, happiness, and heartfelt connections!",
        emoji: "💕🌸🤗"
    },
    {
        message: "May the New Year illuminate your path with hope, fill your days with wonder, and your heart with pure joy!",
        emoji: "🌟💖🎆"
    }
];

function showPersonalizedGreeting() {
    const name = elements.nameInput.value.trim();

    if (name === '') {
        elements.nameInput.focus();
        elements.nameInput.style.borderColor = '#ff006e';
        setTimeout(() => {
            elements.nameInput.style.borderColor = '';
        }, 500);
        return;
    }

    // Get random greeting
    const randomGreeting = greetingMessages[Math.floor(Math.random() * greetingMessages.length)];

    // Update DOM elements
    elements.userName.textContent = name;
    const messageElement = document.getElementById('personalGreetingMessage');
    const emojiElement = document.getElementById('personalGreetingEmoji');

    messageElement.textContent = randomGreeting.message;
    emojiElement.textContent = randomGreeting.emoji;

    elements.personalizedMessage.classList.remove('hidden');

    // Clear input
    elements.nameInput.value = '';
}

// ========================================
// FULLSCREEN TOGGLE
// ========================================
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.log('Fullscreen error:', err);
        });
        elements.fullscreenIcon.textContent = '⛶';
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
            elements.fullscreenIcon.textContent = '⛶';
        }
    }
}

// Listen for fullscreen changes
document.addEventListener('fullscreenchange', () => {
    if (document.fullscreenElement) {
        elements.fullscreenIcon.textContent = '✕';
    } else {
        elements.fullscreenIcon.textContent = '⛶';
    }
});

// ========================================
// SHARE FUNCTIONALITY
// ========================================
function shareWebsite() {
    const shareData = {
        title: '🎆 New Year 2026 Countdown',
        text: 'Join me in counting down to New Year 2026! 🎉',
        url: window.location.href
    };

    // Check if Web Share API is supported
    if (navigator.share) {
        navigator.share(shareData)
            .catch(err => console.log('Share error:', err));
    } else {
        // Fallback: Copy to clipboard
        navigator.clipboard.writeText(window.location.href)
            .then(() => {
                const originalText = elements.shareBtn.innerHTML;
                elements.shareBtn.innerHTML = '✓ Link Copied!';
                elements.shareBtn.style.backgroundColor = 'rgba(0, 245, 255, 0.3)';

                setTimeout(() => {
                    elements.shareBtn.innerHTML = originalText;
                    elements.shareBtn.style.backgroundColor = '';
                }, 2000);
            })
            .catch(err => console.log('Clipboard error:', err));
    }
}

// ========================================
// ANIMATED PARTICLES BACKGROUND
// ========================================
function createParticles() {
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';

        // Random size
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';

        // Random animation delay and duration
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (10 + Math.random() * 10) + 's';

        elements.particles.appendChild(particle);
    }
}

// ========================================
// EVENT LISTENERS
// ========================================
elements.greetBtn.addEventListener('click', showPersonalizedGreeting);
elements.nameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        showPersonalizedGreeting();
    }
});
elements.fullscreenBtn.addEventListener('click', toggleFullscreen);
elements.shareBtn.addEventListener('click', shareWebsite);

// ========================================
// INITIALIZATION
// ========================================
function init() {
    // Create background particles
    createParticles();

    // Start countdown
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);

    // Check if already New Year (for testing)
    const now = new Date().getTime();
    if (NEW_YEAR - now <= 0) {
        triggerCelebration();
    }
}

// Start the application
init();

// ========================================
// TESTING HELPER (Remove in production)
// ========================================
// Uncomment to test celebration immediately:
// setTimeout(() => {
//     triggerCelebration();
// }, 3000);
