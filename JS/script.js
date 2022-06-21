// getting required elements

const wrapper=document.querySelector(".wrapper");
musicImg=wrapper.querySelector(".img-area img"),
musicName=wrapper.querySelector(".song-details .name"),
musicArtist=wrapper.querySelector(".song-details .artist"),
mainAudio= wrapper.querySelector("#main-audio"),
playPauseBtn= wrapper.querySelector(".play-pause"),
prevBtn= wrapper.querySelector("#prev"),
nextBtn= wrapper.querySelector("#next"),
progressArea=wrapper.querySelector(".progress-area"),
progressBar=wrapper.querySelector(".progress-bar"),
musicList= wrapper.querySelector(".music-list"),
showMoreBtn= wrapper.querySelector("#more-music"),
hideMusicBtn= wrapper.querySelector("#close");



let musicIndex= Math.floor(Math.random()*allMusics.length);

window.addEventListener("load",()=>{
    loadMusic(musicIndex); 
    playingNow() //calling load music object
})

//load music function
function loadMusic(index) {
    let current=allMusics[index];

    musicName.textContent= current.name;
    musicArtist.textContent=current.artist;
    musicImg.src=current.img;
    mainAudio.src=current.src;
    
}

// play music function
function playMusic(){
    wrapper.classList.add("paused")
    playPauseBtn.querySelector("img").setAttribute("src","images/pause.png")
    mainAudio.play()
}
// pause music function
function pauseMusic(){
    wrapper.classList.remove("paused")
    playPauseBtn.querySelector("img")
    .setAttribute("src","images/play-button.png")
    mainAudio.pause();
}



//play or pause music btutton event
playPauseBtn.addEventListener("click",()=>{
 const isMusicPaused= wrapper.classList.contains("paused");

isMusicPaused ? pauseMusic() : playMusic() 


})

function prevMusic() {
    musicIndex--;

    if (musicIndex < 0) {

        musicIndex = allMusics.length-1;
        
    }
    loadMusic(musicIndex)
    playMusic()
    playingNow();
}

prevBtn.addEventListener("click",()=>{
    prevMusic()
})
function nextMusic() {
    musicIndex++;
    if (musicIndex > allMusics.length-1) {
        
        musicIndex=0;
    }

       
     loadMusic(musicIndex)
     playMusic();
    playingNow()
}
nextBtn.addEventListener("click",()=>{
    
    nextMusic();
})

mainAudio.addEventListener("timeupdate",(e)=>{
    // console.log(e)
    const currentTime= e.target.currentTime;
    const duration=e.target.duration;

    let musicCurrentTime= wrapper.querySelector(".current");
        let musicDuration=wrapper.querySelector(".duration")

    
    let progressWidth=(currentTime/duration) * 100 
    progressBar.style.width= `${progressWidth}%` ;

    mainAudio.addEventListener("loadeddata",()=>{

        // let musicCurrentTime= wrapper.querySelector(".current");
        // let musicDuration=wrapper.querySelector(".duration")


        //update song total duration
      let audioDuration= mainAudio.duration;
      let totalMin=Math.floor(audioDuration/60);
      let totalSec= Math.floor(audioDuration % 60);

      if (totalMin < 60) {

        totalMin= `0${totalMin}`
          
      }

      if(totalSec < 10){
          totalSec= `0${totalSec}`
      }
      musicDuration.textContent= `${totalMin}:${totalSec}`;


    })
    //  update playing song current time
    let currentMin=Math.floor(currentTime/60);
    let currentSec= Math.floor(currentTime % 60);

    if (currentMin < 60) {

      currentMin= `0${currentMin}`
        
    }

    if(currentSec < 10){
        currentSec= `0${currentSec}`
    }
    musicCurrentTime.textContent= `${currentMin}:${currentSec}`;


});


// update playing song current time according to the
// progress bar width

progressArea.addEventListener("click",(e)=>{

    let progressWidthVal= progressArea.clientWidth; //getting width of progress bar
    let clickedOffSetX= e.offsetX;
     let songDuration=mainAudio.duration;
    
    mainAudio.currentTime=(clickedOffSetX/progressWidthVal)*songDuration
    //if music is paused and user clicked on the progress bar
    playMusic();    
    
})


// working on repeat, shuffle song accordingly


// changing of icon first
const repeatBtn=wrapper.querySelector("#repeat-plist");
repeatBtn.addEventListener("click",()=>{

    let source= repeatBtn.getAttribute('src')
    switch (source) {
        case "images/repeat(1).png":
            repeatBtn.setAttribute("src","images/repeat.png")
            repeatBtn.setAttribute("title","Song looped");
            break;
       case "images/repeat.png":
        repeatBtn.setAttribute("src","images/shuffle.png")
        repeatBtn.setAttribute("title","Playback shuffle");

           break;
       case "images/shuffle.png":
        repeatBtn.setAttribute("src","images/repeat(1).png")
        repeatBtn.setAttribute("title","Playlist looped")
        
     break;
    }
})

// what should occur after the song ended at a particular icon state 

mainAudio.addEventListener("ended", ()=>{

    let source= repeatBtn.getAttribute('src')
    switch (source) {
        case "images/repeat(1).png":
            nextMusic();
            break;
       case "images/repeat.png":
          mainAudio.currentTime=0;
          loadMusic(musicIndex);
          playMusic();
    // so that d music starts playing again [repeat current song]
           break;
       case "images/shuffle.png":
        
       let randIndex= Math.floor((Math.random()*allMusics.length))
        do{
            randIndex= Math.floor((Math.random()*allMusics.length))
            
        }while(musicIndex==randIndex); //this loop run until d next random number won't be the same
        
        musicIndex=randIndex
        loadMusic(musicIndex);
        playMusic();
        playingNow();
     break;
    }

})

//  more music , music lists and hide music section

showMoreBtn.addEventListener("click",()=>{
    musicList.classList.toggle("show")
})
hideMusicBtn.addEventListener("click",()=>{
    showMoreBtn.click();
})

const ulTag=wrapper.querySelector("ul");

for(i=0; i<allMusics.length;i++){
    let liTag=`<li li-index="${i}">
    <div class="row">
        <span> ${allMusics[i].name} </span>
        <p>${allMusics[i].artist}</p>
    </div>

    <audio class="${allMusics[i].artist}" src="${allMusics[i].src}"></audio>

     <span id="${allMusics[i].artist}" class="audio-duration">3:00</span>
</li>
    `
    ulTag.insertAdjacentHTML("beforeend",liTag)

let allELem= document.querySelector(`#${allMusics[i].artist}`)
 let liAudioDuration= ulTag.querySelector(`.${allMusics[i].artist}`)
   
// console.log(liAudioDuration)
// console.log(allELem)
 
 liAudioDuration.addEventListener("loadeddata",()=>{

    let audioDuration= liAudioDuration.duration;
    let totalMin=Math.floor(audioDuration/60);
    let totalSec= Math.floor(audioDuration % 60);

    // console.log(audioDuration)
    if (totalMin < 60) {

      totalMin= `0${totalMin}`
        
    }

    if(totalSec < 10){
        totalSec= `0${totalSec}`
    }
    
    
    allELem.textContent= `${totalMin}:${totalSec}`;
    allELem.setAttribute("t-duration",`${totalMin}:${totalSec}`)
    
 })

}

// Now working on play particular song on click
function playingNow() {
const allLiTags= ulTag.querySelectorAll("li");

// console.log(allLiTags)
for(j=0; j< allLiTags.length; j++){ 

    let audioTag= allLiTags[j].querySelector(".audio-duration");
    // if there is an li tag which li-index is equal to music index
    // then this music is playing
    if (allLiTags[j].getAttribute("li-index")==musicIndex) {
        
        allLiTags[j].classList.add("playing");
        audioTag.textContent="Playing"
    }
    else{
        allLiTags[j].classList.remove("playing")
    let cDuration= audioTag.getAttribute("t-duration");
        audioTag.textContent=cDuration;
    }

    //adding onclick attribute in all li tags
    allLiTags[j].setAttribute("onclick","clicked(this)")
}
}
function clicked(element) {
let getIndex= element.getAttribute("li-index");
    musicIndex=getIndex;
    loadMusic(musicIndex)
    playMusic();
    playingNow();
}