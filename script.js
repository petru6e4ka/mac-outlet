//TASK_1
const getNumericString = (string) =>
  string
    .split("")
    .filter((symbol) => !Number.isNaN(Number(symbol)) && symbol.trim())
    .join("");

const searchCandidatesByPhoneNumber = (phone) => {
  const numericPhone = getNumericString(phone);

  return condidateArr.filter((elem) => {
    return getNumericString(elem.phone).includes(numericPhone);
  });
};

searchCandidatesByPhoneNumber("43");
//console.log(searchCandidatesByPhoneNumber("43"));
searchCandidatesByPhoneNumber("+1(869) 40");
//console.log(searchCandidatesByPhoneNumber("+1(869) 40"));
searchCandidatesByPhoneNumber("+1(869)408-39-82");
//console.log(searchCandidatesByPhoneNumber("+1(869)408-39-82"));

//TASK_2
const getCandidateById = (id) => {
  const candidate = condidateArr.find((elem) => elem._id === id);

  return candidate
    ? {
        ...candidate,
        registered: candidate.registered
          .split("T")[0]
          .split("-")
          .reverse()
          .join("/"),
      }
    : null;
};

getCandidateById("5e216bc9a6059760578aefa4");
//console.log(getCandidateById("5e216bc9a6059760578aefa4"));

//TASK_3
const sortCandidatesArr = (sortBy) => {
  const newArr = condidateArr.slice(0);

  switch (sortBy) {
    case "asc":
      return newArr.sort(
        (a, b) =>
          Number(getNumericString(a.balance)) -
          Number(getNumericString(b.balance))
      );
    case "desc":
      return newArr.sort(
        (a, b) =>
          Number(getNumericString(b.balance)) -
          Number(getNumericString(a.balance))
      );
    default:
      return condidateArr;
  }
};

sortCandidatesArr("asc");
//console.log(sortCandidatesArr("asc").map((elem) => elem.balance));
// отсортирует по-возростанию и вернет отсортированный массив

sortCandidatesArr("desc");
//console.log(sortCandidatesArr("desc").map((elem) => elem.balance));
// отсортирует по-убыванию и вернет отсортированный массив

sortCandidatesArr();
//console.log(sortCandidatesArr().map((elem) => elem.balance));
// не будет сортировать, а просто вернет первоначальный массив

//TASK_4
const getEyeColorMap = () => {
  const eyeColor = {};

  condidateArr.forEach((elem) => {
    if (!(elem.eyeColor in eyeColor)) {
      eyeColor[elem.eyeColor] = [];
    }

    eyeColor[elem.eyeColor].push(elem);
  });

  return eyeColor;
};

getEyeColorMap();
//console.log(getEyeColorMap());
