import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

// I- Problèmes
  // 1- slide blanc qui s'affiche après le dernier slide du focus
  // 2- radio buttons non synchronisés avec l'index du slide en cours
  // 3- enfant dans la liste des radio buttons avec la même key 
  // 4- on passe un prop checked à l'input radio qui est un champ de formulaire mais on y attache pas un "onChange" handler. 
  // Dans ce cas cela va render un champ propre qu'à la lecture (read only)
  // 5- const dateLength est undefined

// II- Solutions
  // 1- on soustrait 1 à la variable dateLength
  // 2- on remplace idx par index dans checked
  // 3- key={`radio-${radioIdx.toString()}`}
  // 4- on ajoute le prop readOnly
  // 5- on ajoute un ? entre byDateDesc et le point

// III- Explications
  // 1- dateLength vaut 3 mais on initialise notre index à 0, dans ce cas on soustrait 1 à dateLength sinon notre state irait jusqu'à trois et prendrait 4 valeurs différentes au lieu de 3 (0, 1, 2)
  // 2- on initialise l'index à 0 avec le hook useState() en début de fichier, il y a donc une erreur de typographie lorsque l'on écrit idx, au lieu de index, en effet, avec idx on se réfère à la mauvaise variable
  // 3- les keys permettent à React de déterminer si un item dans une liste à été changé, mis à jour ou supprimé. Cela permet à React d'optimiser le rendering recyclant des éléments actuels du DOM / identité stable
  // 4- le prop readOnly permet de déclarer que l'on ne veut pas utiliser l'input radio comme un élément d'un formulaire, on souhaite l'utilise à titre d'élément décoratif. On peut ajouter un "onChange" handler ou bien utiliser defaultChecked si on souhaite l'utiliser comme un champ de formulaire
  // 5- la syntaxe (byDateDesc?.length) permet de préciser que l'on veut retourner la longueur de byDateDesc ssi byDateDesc est définie. 

// IV- Fonctionnement 
  // 1- byDateDesc prend dans data ssi celui-ci est défini, les valeurs des dates des projets dans l'objet focus (dans le json events) afin de les trier du plus ancien au plus récent.
    // puis dateLength renvoie la longueur de byDateDesc si la variable existe. Puis une fonction nextCard est créée, celle-ci se déclenche toutes les 5 secondes, si l'index actuel est 
    // plus strictement inférieur à 2, alors on additionne 1 à index sinon l'index est reset à 0 ce qui permet de boucler le fonctionnement du slider
  // 2- Le radio button est checked si l'index de l'input vaut l'index de la slide en cours 
  // 5- une variable n'est pas toujours définie selon les étapes du rendu

//
const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );
  const dateLength = byDateDesc?.length

  const nextCard = () => {
    setTimeout(
      () => setIndex(index < dateLength - 1 ? index + 1 : 0), // 1
      5000
    );
  };
  useEffect(() => {
    nextCard();
  });
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <>
          <div
            key={`slide-${event.id}`}
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                <input
                  key={`radio-${radioIdx.toString()}`} // 3
                  type="radio"
                  name="radio-button"
                  checked={(index === radioIdx)} // 2
                  readOnly // 4
                />
              ))}
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default Slider;
