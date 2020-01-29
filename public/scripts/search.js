//Functions wrapper

//Called function to retrieve the data
async function search_courses(name = null){
    
    //Internal endpoint
    const server_call = `/courses`;

    //Request
    const response = await fetch(server_call);
    const data = await response.json();

    //Response handle
    console.log(data.items);
    let courses = data.items;
}

var app = new Vue({
    el: '#body',
    data: {
    }
});


search_courses();
