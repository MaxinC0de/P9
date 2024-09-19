// I- Les events ne sont pas récupérés

export const api = {
    loadData: async () => {
      const response = await fetch("/events.json");
      const jsonData = await response.json()
      return jsonData;
    },
  };


// II- Mois décalés sur les eventCards

export const MONTHS = {
    1: "janvier",
    2: "février",
    3: "mars",
    4: "avril",
    5: "mai",
    6: "juin",
    7: "juillet",
    8: "août",
    9: "septembre",
    10: "octobre",
    11: "novembre",
    12: "décembre",
  };
  
  export const getMonth = (date) => MONTHS[date.getMonth()];


// III- Last n'est pas défini, ainsi la carte de la dernière prestation est vide

const {data} = useData() // 1
const sortedProjects = data.events.sort((a, b) => new Date(b.date) - new Date(a.date))
console.log(sortedProjects)
const last = sortedProjects?.[0]


// IV- Les ancres du menu ne sont pas fonctionnelles 
<><h2 className="Title" id="nos-services">Nos services</h2></>


// V- Les props de EventCard ne sont pas définis 

        <EventCard                              
          imageSrc={last?.cover || ""}
          title={last?.title || ""}
          date={new Date(last?.date) || ""}
          small
          label="boom"
        />

// VI- Certains styles utilisaient la mauvaise syntaxe

// cf : font-size au lieu de fontSize
// Pareil pour weight et autres

// VII- Les images du slide 

const nextCard = () => {
    setTimeout(
      () => setIndex(index < dateLength - 1 ? index + 1 : 0), // 1
      5000
    );
  };


// VIII- Les radio buttons / IX- Enfants de la liste avec la même key 
// X- Problème de responsabillité de l'input 

const [index, setIndex] = useState(0);

[...]

{byDateDesc.map((_, radioIdx) => (
    <input
      key={`radio-${radioIdx.toString()}`}
      type="radio"
      name="radio-button"
      checked={(index === radioIdx)}
      readOnly
    />
  ))}


// XI- 

const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );
  const dateLength = byDateDesc?.length


// XII- Bug du défilé des catégories qui ne change pas la catégorie en cours

const changeValue = (newValue) => {
    onChange(newValue);
    setValue(newValue);
    setCollapsed(newValue);
  };

// XIII- La modale qui ne s'affiche pas après l'envoi du formulaire 

const Modal = ({ opened, Content, children }) => {
const [isOpened, setIsOpened] = useState(opened);}

const Form = ({ onSuccess, onError }) => {
    const [sending, setSending] = useState(false);
    const sendContact = useCallback(
      async (evt) => {
        evt.preventDefault();
        setSending(true);
        // We try to call mockContactApi
        try {
          await mockContactApi();
          setSending(false);
          onSuccess()
        } catch (err) {
          setSending(false);
          onError(err);
        }
      },
      [onSuccess, onError]
    );}
