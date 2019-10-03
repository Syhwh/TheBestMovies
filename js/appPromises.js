const fetchMovies = (page) => {
    const movies = fetch(`https://api.themoviedb.org/3/movie/popular?page=${page}&language=en-US&api_key=3d7fd0461ae8d0f2e808c37fb41950d7`)
        .then((response) => response.json())
    return movies
}

const fetchVideo = (id)=>{
    return fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=3d7fd0461ae8d0f2e808c37fb41950d7&language=en-US`)
     .then(response=>response.json())
}

const fetchGenre = ()=>{
   
    return fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=3d7fd0461ae8d0f2e808c37fb41950d7&language=en-US")
        .then((response) => response.json())
      
}

const getGenre =()=>{
    let data;
  
  console.log('data en get'+data)
    return data
}

// const displayGenre = (id)=>{
//     console.log({id})
//     const source = document.getElementById('genre').innerHTML;
//     const template = Handlebars.compile(source);
//     const generatedHtml = template(id);
//     const show = document.getElementById('genres');    
//     show.innerHTML = generatedHtml;
// }

const displayMovie = (data,genre) => {

    // data.results.forEach(element => {
    //     element.genre_ids.forEach(ele=>{
    //         Object.keys(ele).forEach(function(key) {
    //             console.log(key)
    //     })
    //       })
    // });

    //const results=data.results;    

    const source = $("#movies").html();
    const template = Handlebars.compile(source);
    const context={data}
    const generatedHtml = template(context);
    $("#movies-container").html(generatedHtml)   
    
    console.log({data})
     console.log({genre})
    // const sourceG = document.getElementById('genre').innerHTML;
    // const templateG = Handlebars.compile(sourceG);
    // const generatedHtmlG = templateG(genre);
    // const showG = document.getElementById('genres');    
    // showG.innerHTML = generatedHtmlG;
    

    // displayGenre(data)
}

const importMovies = () => {    
    fetchMovies(1)
    .then((movies=> {
        fetchGenre()
        .then((genres=>{
            displayMovie(movies,genres);
            //displayGenre (genres)
         }))
      
        
    }))
    
    

}




importMovies()
//$("#import").on("click", importMovies);

$('.page').on('click', function () {
    event.preventDefault();
    const page = $(this).text()
    fetchMovies(page).then((e => {
        displayMovie(e);
    }))

})

$('#movies-container').on('click','.trailer', function (e) {
   // 
   const id= parseInt($(e.currentTarget).attr('id'))
   fetchVideo(id)
   .then(e=>{
    
    $('.videoPlayer').html(`<iframe width="790" height="451" 
    src="https://www.youtube.com/embed/${e.results[0].key}" 
    frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
    allowfullscreen></iframe>`)
    $('#trailerModal').modal('show');
    
   })
   
   
    
})

$('#movies-container').on('click','.favorites',function(e){
    $(e.currentTarget).toggleClass('saved')
    const id=$(e.currentTarget).parent().children(':first-child').attr('id')
    const page=parseInt($(e.currentTarget).parent().attr('data-page'))
    
    usingLocalStorage(page,id)
    //saveFavorite(page,id)
})



const saveFavorite=(page,id)=>{
    fetchMovies(page)
    .then(data => {
        const object =  data.results.find( (obj) =>{ return obj.id == id; })
        localStorage.setItem(id,JSON.stringify(object))        
    }    
    )}  




    const usingLocalStorage =(page,id)=>{
        const keys = Object.keys(localStorage)
        console.log()
         if (keys.includes(id)){
            localStorage.removeItem(id);
         } else{
            saveFavorite(page,id)
         }
         

    }



    const displayFavorites = (data) => {
       
        const source = $("#movies").html();
        const template = Handlebars.compile(source);
        const context={data}
        const generatedHtml = template(context);
        $("#movies-container").html(generatedHtml)   
   
    }

$('#favorites').on('click', function(){
    updateFavorites()
        
    })

   const updateFavorites=()=>{
    const data={data:allStorage()}
       
    displayFavorites(data.data)
   } 

    function allStorage() {
        var values = [],
            keys = Object.keys(localStorage),
            i = keys.length;    
        while ( i-- ) {
            values.push( JSON.parse(localStorage.getItem(keys[i])) );
        }    
        data={
            results:values
        }
        return data;
    }

    