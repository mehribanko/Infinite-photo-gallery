const imageContainer=document.getElementById('image-container');
const loader=document.getElementById('loader');

let ready=false;
let imagesLoaded=0;
let totalImages=0;
let photosArray=[];

// unsplash API
const count=10;
const apiKey='gAFGxwjJal352vOUlrtAk3c9oTdbBiwjCgmfyNSxLC8';
const apiUrl=`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// creating imageloaded function

function imageLoad(){
    imagesLoaded++;
    if(imagesLoaded===totalImages){
        ready=true;
        loader.hidden=true;
    }
}


// set attributes - helper function

function setAttributes(element, attributes){
    for (const key in attributes){
        element.setAttribute(key, attributes[key])
    }

}

// function to display photos
function displayPhotos(){
    imagesLoaded=0;
    totalImages=photosArray.length;
    
    photosArray.forEach((photo)=> {
        // creating an anchor <a> element to link to unsplash 

        const item=document.createElement("a");
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        })
    
        // creating <img> element tos show image
        const img=document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        })
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);


        // put img tag inside link, and put both inside image-container

        // check if each image is finished loading 
        img.addEventListener('load', imageLoad);
        item.appendChild(img);
        imageContainer.appendChild(item);

    });


}


// Get photos from Unsplash API
async function getPhotos(){
    try{
        const response=await fetch(apiUrl);
        photosArray=await response.json();
        displayPhotos();
        

    }catch(error){

    }
}

// check to see if scrolling near bottom of the  page 

window.addEventListener('scroll', ()=>{
    if(window.innerHeight+window.scrollY>=document.body.offsetHeight-1000 && ready){
        ready=false;
        getPhotos();

    }
});

// On Load

getPhotos();
