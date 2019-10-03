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

    

    const source = $("#movies").html();
    const template = Handlebars.compile(source);
    const context={data, genre}
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