/*Objetivo: llamar ultimos videos de un canal de youtube En Rapiapi tenemos acceso
 a variadas apis gratuitas y de pago*/

const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UC5HdVtarytnZi4eLogHAfoQ&part=snippet%2Cid&order=date&maxResults=8';

/*referencia para la info de la api mediante el template */
/* Es una forma de comprobar si el elemento existe. Si no es así, será nulo. */
const content = null || document.getElementById('content');

import options from './apikey.js';


/*fetch es una promesa */

async function fetchData(urlApi) {
    const response = await fetch(urlApi, options);
    const data = await response.json();
    return data;
}

/*Funcion que se llama a sí mismas */
(async () => {
    try {
        //optenemos el contenido json de la url
        const videos = await fetchData(API);
        /*plantilla de tipo html */
        let view =
            `
       ${videos.items.map(video => `
       <div class="group relative">
       <div
         class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
         <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
       </div>
       <div class="mt-4 flex justify-between">
         <h3 class="text-sm text-gray-700">
           <span aria-hidden="true" class="absolute inset-0"></span>
           ${video.snippet.title}
         </h3>
       </div>
     </div>`).slice(0, 4).join('')}
     `;

        content.innerHTML = view;
    } catch (error) {
        console.log(error);
        /*reto incrustar error en el html */
    }
})();