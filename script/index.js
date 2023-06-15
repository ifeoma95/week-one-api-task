main();

function main(){
    const ul = document.querySelector('ul');
    const [img, name, gender, height, button] = document.querySelectorAll('.details>*');
    const firstSection = document.querySelector('.home');
    const secondSection = document.querySelector('.details');

    let imageUrl = ["char1.jpeg", "char2.jpeg", "char3.jpeg"]

    fetchApi();

    button.addEventListener('click', ()=>{
        firstSection.classList.remove('hide');
        secondSection.classList.add('hide');
    })

    async function fetchApi(){
        let url = 'https://swapi.dev/api/people';
        let request = new Request(url);
        let response = await fetch(request);
        let myData = await response.json();
        console.log(myData.next);

        while (myData.next !== null){
            populatePage(myData);

            url = myData.next;
            request = new Request(url);
            response = await fetch(request);
            myData = await response.json();

            console.log(myData.next);
        }
    }

    function populatePage(myData){
        // console.log(myData.results);

        let characters = myData.results;
        characters.forEach(character => {
            // console.log(character.name);
            const li = document.createElement('li');
            li.innerHTML = character.name;
            ul.append(li);

            li.addEventListener('click', ()=>{
                console.log(character.name);
                image.src = getImage(character.gender)
                name.innerHTML = character.name;
                gender.innerHTML = character.gender;
                height.innerHTML = character.height;

                firstSection.classList.add('hide');
                secondSection.classList.remove('hide');
            })

            getImage(imageUrl);

            let image = document.getElementById("image")
            image.style.borderRadius = "50%"
            image.style.height = "400px"
            image.style.width = "400px"

            function getImage(gender){
                if (character.gender == "male"){
                    return imageUrl[0]
                } else if (character.gender == "female"){
                    return imageUrl[1]
                }else{
                    return imageUrl[2]
                }
            } 
        })
    }
}


// module.exports = { main }