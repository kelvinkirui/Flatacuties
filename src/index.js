// Your code here
document.addEventListener("DOMContentLoaded", () => {
    fetchData();
  });
  // declare a const variabe and assign a url to it
  const url = "http://localhost:3000/characters";
  // grab character-bar div
  const characterBar = document.getElementById("character-bar");
  const characterName = document.getElementById("name");
  const characterImage = document.getElementById("image");
  const characterVoteCount = document.getElementById("vote-count");
  const characterVoteForm = document.getElementById("votes-form");

  //Fetch function for data
  function fetchData() {
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        renderCharacters(data);
      });
  }
  
  //Function for rendering characters 
  function renderCharacters(data) {
    data.forEach((data) => {
      const nameSpan = document.createElement("span");
      nameSpan.innerText = data.name;
  
      characterBar.appendChild(nameSpan);
      nameSpan.addEventListener("click", () => {
        characterName.textContent = data.name;
        characterImage.setAttribute("src", data.image);
        characterVoteCount.textContent = data.votes;
      });
    });
  }
  
    //Function for votes update
  characterVoteForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const newVotes = parseInt(event.target.votes.value);
    const characterVoteCount = document.getElementById("vote-count");
    let current = parseInt(characterVoteCount.textContent);
    let votecount = (current += newVotes);
    characterVoteCount.innerText = votecount;

    //database update
    let updateVotes = {
      votes: votecount,
    };
  
    fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: "",
      },
      method: "PATCH",
      body: JSON.stringify({
        votes: votecount,
      }),
    })
      .then((res) => res.json())
      .then((json) => console.log(json));
  });

  const resetButton = document.querySelector('#reset-btn')

resetButton.addEventListener('click', (e) => {

    fetch(url)
    .then(res => res.json())
    .then(characters => {
        //const charName = document.querySelector('#name')
        const charID = characters.find(character => character.name === characterName.textContent)
        fetch(`${url}/${charID.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                votes : '0'
            })
        })
        .then(res => res.json())
        .then(data => characterVotes.textContent = data.votes)
    })

})