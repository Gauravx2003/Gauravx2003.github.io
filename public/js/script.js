// Initialize video functionality
function initializeVideo() {
    const banner = document.getElementById('banner');
    const clickOverlay = document.getElementById('click-overlay');
    
    // Start video when it's loaded
    banner.addEventListener('loadeddata', () => {
        banner.play().catch(error => {
            console.log("Autoplay failed, waiting for user interaction:", error);
            
            // Show the overlay when autoplay fails (only for first video)
            if (clickOverlay && banner.querySelector('source').src.includes('no11.mp4')) {
                clickOverlay.style.display = 'block';
                
                // Add click handler to start video and remove overlay
                const startVideoOnClick = () => {
                    banner.play().catch(console.error);
                    clickOverlay.remove(); // Completely remove the overlay
                    document.body.removeEventListener('click', startVideoOnClick);
                };
                
                clickOverlay.addEventListener('click', startVideoOnClick);
                document.body.addEventListener('click', startVideoOnClick, { once: true });
            }
        });
    });
    
    // Add loading indicator
    const videoContainer = banner.parentElement;
    const loadingIndicator = document.createElement('div');
    loadingIndicator.className = 'loading-spinner';
    loadingIndicator.innerHTML = '<div class="spinner"></div>';
    videoContainer.appendChild(loadingIndicator);
    
    banner.addEventListener('playing', () => {
        loadingIndicator.style.display = 'none';
    });
    
    banner.addEventListener('waiting', () => {
        loadingIndicator.style.display = 'block';
    });
}

// Preload all videos in sequence
function preloadVideos() {
    videoSequence.forEach(url => {
        const tempVideo = document.createElement('video');
        tempVideo.src = url;
        tempVideo.preload = 'auto';
        tempVideo.muted = true;
        tempVideo.style.display = 'none';
        
        // Track loading progress
        tempVideo.addEventListener('canplaythrough', () => {
            // Remove temporary element after loading
            if (document.body.contains(tempVideo)) {
                document.body.removeChild(tempVideo);
            }
        }, { once: true });
        
        document.body.appendChild(tempVideo);
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
    "Yes bhi kar de!!!😒",
    "Jyada hi bhav nhi kha rhi ?? 😠😠",
    "Thik hai chal Na to Na hi sahi!!!! 😒",
    "Why are you doing this to me?",
    "Please give me a chance!",
    "I am begging you to stop!",
    "Ok, Let's just start over.."
];

const tooSoonMessages = [
    "O Come on please, itni jaldi nhi manna hota!! 😒",
    "You are a girlll....do some nakhrebazi...NO daba !! 😏😏",
    "Wow, Somebody needs to be my Valentine ASAP 😊",
    "Tharkiii Itni kya jaldi hai YES ki 😉",
    "Are thoda manane de na.. !! 💝",
    "Where's the fun in saying yes right away? 🎭"
];

// Replace this array with your video paths
const videoSequence = [
    "public/images/no10.mp4",
    "public/images/no10.mp4",
    "public/images/no12.mp4",
    "public/images/no9.mp4",
    "public/images/no14.mp4",
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

// Improved video update function
function updateVideo() {
    const banner = document.getElementById('banner');
    const videoIndex = Math.min(noClicks, videoSequence.length - 1);
    
    // Create a new video element to replace the old one
    const newVideo = document.createElement('video');
    newVideo.id = 'banner';
    newVideo.className = banner.className;
    newVideo.autoplay = true;
    newVideo.loop = banner.loop;
    newVideo.muted = !videoSequence[videoIndex].includes('no11.mp4') ? false : true;
    
    const source = document.createElement('source');
    source.src = videoSequence[videoIndex];
    source.type = 'video/mp4';
    newVideo.appendChild(source);
    
    // Copy event listeners
    const loadingIndicator = banner.parentElement.querySelector('.loading-spinner');
    
    newVideo.addEventListener('playing', () => {
        if (loadingIndicator) loadingIndicator.style.display = 'none';
    });
    
    newVideo.addEventListener('waiting', () => {
        if (loadingIndicator) loadingIndicator.style.display = 'block';
    });
    
    newVideo.addEventListener('loadeddata', () => {
        newVideo.play().catch(error => {
            console.error("Video play failed:", error);
            // Add a retry mechanism
            setTimeout(() => {
                newVideo.play().catch(console.error);
            }, 300);
        });
    });
    
    // Replace old video with new one
    banner.parentNode.replaceChild(newVideo, banner);
    
    // Make sure overlay doesn't show up for subsequent videos
    const remainingOverlay = document.getElementById('click-overlay');
    if (remainingOverlay) {
        remainingOverlay.remove();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeVideo();
    createHeartsBackground();
    preloadVideos(); // Start preloading all videos
});

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
