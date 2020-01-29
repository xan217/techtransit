//Functions wrapper

//Called function to retrieve the data
async function search_courses(name){

    //Internal endpoint
    const server_call = `/courses/${name}`;
    
    //Request
    const response = await fetch(server_call);
    const data = await response.json();

    //Response handle
    //console.log(data.items);
    return data.items;
}

const app = new Vue({
    el: '#app',
    data: {
        logoSource: "",
        logoTitle: "TechTransit Technical Test",
        items: [],
        courseName: ""
    },
    created: function(){
        this.updateCourses();
    },
    methods: {
        updateCourses: async function(){
            console.log(this.courseName);
            this.items = await search_courses(this.courseName);
            console.log(this.items);  
        }
    }
});


