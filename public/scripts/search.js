//Functions wrapper

//Called function to retrieve the data
async function search_courses(name, extraparams){

    //Internal endpoint
    const server_call = `/courses/name/${name}/offset/${extraparams}`;
    
    //Request
    const response = await fetch(server_call);
    const data = await response.json();

    //Response handle
    //console.log(data.items);
    return data;
}

//VUE Definition
const app = new Vue({
    el: '#app',
    data: {
        logoSource: "images/logo.png",
        logoTitle: "TechTransit Technical Test",
        items: [],
        courseName: " ",
        offset: "0"
    },
    created: function(){
        //bring the courses after init the module
        this.updateCourses();
    },
    methods: {
        updateCourses: async function(){
            //Send the request to the backend
            let data = await search_courses(this.courseName, this.offset);

            //Verification if this is the first consult or is restricted by a name
            if(this.courseName != " " && this.offset == 0){
                this.items = data.items;
            }
            else{
                data.items.forEach(element => {
                    this.items.push(element); 
                });
            }
            //Obtaining the offset
            let indexStart = data.next.indexOf("offset=")+7;
            let indexEnd = data.next.indexOf("&orderBy");
            this.offset = data.next.substring(indexStart,indexEnd);
        },
        onScroll: function(isVisible, entry) {
            //Updating the scroll with new data
            if (isVisible) {
                this.updateCourses();
            }
          }
    }
});


