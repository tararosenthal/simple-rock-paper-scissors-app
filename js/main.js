document.querySelector('#clickMe').addEventListener('click', makeReq)

async function makeReq(){

  const playerChoice = document.querySelector("#inputID").value;
  const res = await fetch(`/api?rockpaperscissors=${playerChoice}`)
  const data = await res.json()

  console.log(data);
  document.querySelector("#playerChoice").textContent = data.playerChoice
  document.querySelector("#computerChoice").textContent = data.computerChoice
  document.querySelector("#result").textContent = data.result
}
