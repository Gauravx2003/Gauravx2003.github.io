// Store original video source
const originalVideoSrc = "./public/images/no11.mp4";

// Initialize video functionality
function initializeVideo() {
    const banner = document.getElementById('banner');
    
    // Function to handle video loading and playing
    const startVideo = async () => {
        try {
            await banner.play();
            console.log("Video started successfully");
        } catch (error) {
            console.log("Autoplay failed, waiting for user interaction:", error);
            
            // Add click handler to start video on first user interaction
            document.body.addEventListener('click', () => {
                banner.play().catch(console.error);
            }, { once: true });
        }
    };

    // Start video when it's loaded
    banner.addEventListener('loadeddata', startVideo);
    
    // Handle video source updates (for subsequent videos)
    banner.addEventListener('sourcechange', () => {
        // If it's not the initial video, ensure it's unmuted
        if (!banner.querySelector('source').src.includes('no11.mp4')) {
            banner.muted = false;
        }
    });
}

const answers_no = [
    "No",
    "Are you sure?",
    "Are you really sure??",
    "You're kidding right?",
    "My Queen !!😒",
    "What if I sing this ??",
    "Abe Jaa na ❤️de",
    "NO NO NO NO",
    "Yes kr na ee aaighale !!!😒",
    "Maazli ka re lai..Chomnee ?? 😠😠",
    "Aata dab na NO..Dab Dab!! 😠",
    "Why are you doing this to me?",
    "Please give me a chance!",
    "I am begging you to stop!",
    "Ok, Let's just start over.."
];

const tooSoonMessages = [
    "O Come on please, itni jaldi nhi manna hota!! 😒",
    "You are a girlll....do some nakhrebazi...no daba !! 😏😏",
    "Wow, Somebody need to be my Valentine ASAP 😊",
    "Tharkiii Itni kya jaldi hai YES ki 😉",
    "Naaa lets play a little !! 💝",
    "Where's the fun in saying yes right away? 🎭"
];

// Replace this array with your video paths
const videoSequence = [
    "public/images/no10.mp4",
    "public/images/no10.mp4",
    "public/images/no12.mp4",
    "public/images/no9.mp4",
    "public/images/no7.mp4",
    "public/images/no8.mp4",
    "public/images/no2.mp4",
    "public/images/no3.mp4",
    "public/images/no4.mp4",
    "public/images/no5.mp4",
    "public/images/no6.mp4",
    "public/images/no.mp4"
];

const no_button = document.getElementById('no-button');
const yes_button = document.getElementById('yes-button');
let noClicks = 0;
const REQUIRED_NO_CLICKS = 10;

function getRandomMessage() {
    return tooSoonMessages[Math.floor(Math.random() * tooSoonMessages.length)];
}

// Update video
function updateVideo() {
    const banner = document.getElementById('banner');
    const videoIndex = Math.min(noClicks, videoSequence.length - 1);
    const videoSource = banner.querySelector('source');
    videoSource.src = videoSequence[videoIndex];
    banner.load();
    
    // Ensure video is unmuted for subsequent videos
    if (!videoSequence[videoIndex].includes('no11.mp4')) {
        banner.muted = false;
    }
    
    banner.play().catch(console.error);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeVideo);

// Function to create floating hearts
function createHearts() {
    const heartsContainer = document.querySelector('.hearts-container');
    const heartCount = 30;
    
    for (let i = 0; i <heartCount; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.animationDelay = `${Math.random() * 4}s`;
        heartsContainer.appendChild(heart);
    }
}

// Updated makeButtonDodge function to work with or without hover
function makeButtonDodge(button) {
    function moveButton() {
        const container = document.querySelector('.buttons');
        const containerRect = container.getBoundingClientRect();
        const buttonRect = button.getBoundingClientRect();
        
        // Calculate safe boundaries
        const maxX = containerRect.width - buttonRect.width;
        const maxY = containerRect.height - buttonRect.height;
        
        // Generate new position within safe boundaries
        let newX = Math.random() * maxX;
        let newY = Math.random() * maxY;
        
        button.style.position = 'absolute';
        button.style.left = `${newX}px`;
        button.style.top = `${newY}px`;
    }
    
    // Add both hover and click events to ensure button moves
    button.addEventListener('mouseover', moveButton);
    button.addEventListener('click', moveButton);
    
    // Initial position
    moveButton();
}

// Create floating hearts background
function createHeartsBackground() {
    const heartsBackground = document.createElement('div');
    heartsBackground.className = 'hearts-background';
    document.body.appendChild(heartsBackground);

    // Create 50 floating hearts
    for (let i = 0; i < 50; i++) {
        createFloatingHeart(heartsBackground);
    }
}

function createFloatingHeart(container) {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.innerHTML = '❤️';
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.animationDelay = `${Math.random() * 15}s`;
    container.appendChild(heart);
}

// Initialize video and hearts on page load
document.addEventListener('DOMContentLoaded', () => {
    createHeartsBackground();
    
    const banner = document.getElementById('banner');
    // Force video load and play
    banner.load();
    banner.play().catch(function(error) {
        console.log("Video autoplay failed:", error);
    });
});

// Function to create broken hearts effect
function createBrokenHearts(clickX, clickY) {
    const numHearts = 5; // Number of broken hearts to create
    
    for (let i = 0; i < numHearts; i++) {
        const heart = document.createElement('div');
        heart.className = 'broken-heart';
        heart.innerHTML = '💔';
        heart.style.left = `${clickX}px`;
        heart.style.top = `${clickY}px`;
        
        // Random direction and rotation for each heart
        const translateX = (Math.random() - 0.5) * 200; // Random spread left/right
        const rotation = (Math.random() - 0.5) * 720; // Random rotation
        
        heart.style.setProperty('--translateX', `${translateX}px`);
        heart.style.setProperty('--rotation', `${rotation}deg`);
        
        document.body.appendChild(heart);
        
        // Remove the heart element after animation
        setTimeout(() => {
            heart.remove();
        }, 3000);
    }
}

// Set initial size for the yes button
let yesButtonSize = 50;

// Modified no_button click handler
no_button.addEventListener('click', (event) => {
    noClicks++;
    updateVideo();
    
    // Create broken hearts effect
    createBrokenHearts(event.clientX, event.clientY);
    
    // Check if we've reached the required clicks threshold
    if (noClicks === REQUIRED_NO_CLICKS) {
        makeButtonDodge(no_button);
    }
    
    // Increase size for yes button
    const sizeIncrease = 5;
    yesButtonSize += sizeIncrease;
    
    // Update yes button size
    yes_button.style.width = `${yesButtonSize}px`;
    yes_button.style.height = `${yesButtonSize}px`;
    
    // Scale yes button text
    const yesText = yes_button.querySelector('p');
    const yesFontSize = Math.min(yesButtonSize / 6, 24);
    yesText.style.fontSize = `${yesFontSize}px`;
    
    // Update no button text
    const noText = no_button.querySelector('p');
    if (noClicks <= answers_no.length - 1) {
        noText.textContent = answers_no[noClicks];
    } else {
        noText.textContent = answers_no[answers_no.length - 1];
    }
    
    // Adjust no button width based on text content
    const textLength = noText.textContent.length;
    const minWidth = 100;
    const widthPerChar = 10; // pixels per character
    const calculatedWidth = Math.max(minWidth, textLength * widthPerChar);
    no_button.style.width = `${Math.min(calculatedWidth, 300)}px`; // Cap at 300px
    
    // Keep fixed height for no button (only adjust width)
    no_button.style.height = '45px'; // Fixed height
});

yes_button.addEventListener('click', () => {
    if (noClicks <REQUIRED_NO_CLICKS) {
        const message = getRandomMessage();
        alert(message);
        return;
    }
    
    // Stop the banner video
    const banner = document.getElementById('banner');
    banner.pause();
    
    // Hide main container
    document.querySelector('.container').style.display = 'none';
    
    // Show and animate success overlay
    const successOverlay = document.querySelector('.success-overlay');
    successOverlay.style.display = 'flex';
    setTimeout(() => successOverlay.classList.add('visible'), 100);
    
    // Create floating hearts for success screen
    createHearts();
});

// Add next button handler
document.getElementById('next-button').addEventListener('click', () => {
    const successOverlay = document.querySelector('.success-overlay');
    const videoContainer = document.querySelector('.fullscreen-video-container');
    
    // Hide success overlay
    successOverlay.style.display = 'none';
    
    // Show and play final video
    videoContainer.style.display = 'block';
    const finalVideo = document.getElementById('final-video');
    finalVideo.play();
});
