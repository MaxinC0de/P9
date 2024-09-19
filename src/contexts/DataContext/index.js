import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";


// initialement, json.json() renvoyait {loaddata: }, aucune donnée donc
// cela est dû au fait que la réponse n'était pas fetch en asynchrone
// on ajoute donc une variable response qui fetch les donneés puis une autre jsonData qui passe les données au format json
// ainsi, jsonData store bien les events

const DataContext = createContext({});

export const api = {
  loadData: async () => {
    const response = await fetch("/events.json");
    const jsonData = await response.json()
    return jsonData;
  },
};

export const DataProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const getData = useCallback(async () => {
    try {
      setData(await api.loadData());
    } catch (err) {
      setError(err);
    }
  }, []);
  // useEffect(() => {
  //   if (data) return;
  //   getData();
  // });

  useEffect(() => {
    if (!data && !error) {getData()}
  }, [data, error, getData])
  
  if (error) return <div>error on calling events</div>
  if (!data) return <div>ok</div>;

  return (
    <DataContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        data,
        error
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const useData = () => useContext(DataContext);

export default DataContext;