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

// Les mois s’affichaient incorrectement car les index 
// étaient mal initialisés : de 1 à 12 au lieu de 0 à 11.

export const getMonth = (date) => MONTHS[date.getMonth() + 1];