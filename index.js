document.querySelector(".btn").addEventListener("click", ()=>{
    location.reload();
  })


const inputmotdeviner = document.querySelector("#inputchoix");
const input = document.querySelector("#input");

function removeAccentsAndUpperCase(input) {
    // Récupère la valeur saisie par l'utilisateur
    let inputValue = input.value;

    // Remplace les caractères avec accents par leurs équivalents sans accents
    inputValue = inputValue.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    // Convertit la valeur en majuscules
    inputValue = inputValue.toUpperCase();

    // Met à jour la valeur dans le champ
    input.value = inputValue;
}

var motdeviner = "";
var mot = "";
let tableau = [];


inputmotdeviner.addEventListener('keydown', function(event1) {
    if (event1.key === 'Enter') {
      const texteinput = event1.target.value;
      motdeviner = texteinput;

      mot = texteinput;
      motdeviner = '_ '.repeat(motdeviner.length);
      document.querySelector("#text1").textContent = motdeviner;
      inputmotdeviner.classList.add("none");
      document.querySelector("#h1").classList.add("none");
      document.querySelector("#h2").classList.add("none");
      input.classList.remove("none");
      document.querySelector(".compteur").classList.remove("none");

      tableau = motdeviner.split('');
      tableau = tableau.filter(element => element.trim() !== "").join("");
      tableau = tableau.split('');
      

  }
  });
  

let motnonpresent = new Set();
let tableaumotnonpresent = [];
let nonpresent = "";
var compteur = 7;

const pendu = document.querySelector(".pendu");
var posbarre = 1;
var posbarre7 = 1;

document.querySelector(".compteur").textContent = "Nombre d'essais restants : " + compteur;

input.addEventListener('keydown', function(event1) {
if (event1.key === 'Enter') {
    const texteinput = event1.target.value;
    const tableaumot = mot.split('');

    let pos = mot.indexOf(texteinput);

    if (pos!==-1){
        for (let i = 0; i<mot.length; i++){
            let lettremot = tableaumot[i];
    
            if (texteinput==lettremot){
                let lettreMot = tableaumot[i];
                tableau.splice(i, 1)
                tableau.splice(i, 0, lettreMot);
                motdeviner = tableau.join(' ');
                document.querySelector("#text1").textContent = motdeviner;
            }
        }
    } else if (pos==-1){
        motnonpresent.add(texteinput)
        tableaumotnonpresent = Array.from(motnonpresent);
        nonpresent = tableaumotnonpresent.join(', ');
        document.querySelector(".lettres").textContent = "Ces lettres ne sont pas présentes : " + nonpresent;
        compteur--;
        if (posbarre<7){
            const barre = pendu.querySelector(`#barre:nth-child(${posbarre})`);
        barre.classList.remove("none");
        } else if (posbarre==7){
            const barre = pendu.querySelector(`#barre:nth-child(${posbarre})`);
            barre.classList.remove("none");
            var barre7 = barre.querySelector(`#barre7:nth-child(${posbarre7})`);
            posbarre7++;
            barre7.classList.remove("none");
            setTimeout(() => {
                barre7 = barre.querySelector(`#barre7:nth-child(${posbarre7})`);
                posbarre7++;
                barre7.classList.remove("none");
            }, 500);
            setTimeout(() => {
                barre7 = barre.querySelector(`#barre7:nth-child(${posbarre7})`);
                posbarre7++;
                barre7.classList.remove("none");
            }, 1000);
            setTimeout(() => {
                barre7 = barre.querySelector(`#barre7:nth-child(${posbarre7})`);
                posbarre7++;
                barre7.classList.remove("none");
            }, 1500);
        }
        
        posbarre++;
        
        document.querySelector(".compteur").textContent = "Nombre d'essais restants : " + compteur;
        if (compteur==0){
            input.classList.add("none");
            setTimeout(() => {
                document.querySelector(".lettres").textContent = "Perdu !";
            }, 2500);
            
        }
    }


    var motfin = tableau.filter(element => element.trim() !== "").join("");

    if (mot==motfin){
        document.querySelector(".lettres").textContent = "Gagné !";
        input.classList.add("none")
    }
    
    input.value= "";

}
});