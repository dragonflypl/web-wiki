function generateCvs(people) {
  const baseHref = 'https://www.xing.com';
  return people.map(person => {
    return {
      cv: baseHref + person.attr('href'),
      name: person.text()
    }
  });
}

function fetchPage(page) {
  const searchUrl = `https://www.xing.com/search/members?_=1517822950027&advanced_form=true&filters%5Bcountry%5D%5B%5D=ch&keywords=Avaloq&page=${page}&section=members`;
  return $.get(searchUrl).then(searchPage => {
    return Array.from($(searchPage).find('a.name-page-link:not(.element-user-image)')).map(x => $(x))
  })
}

async function fetchPages() {
  // Tutaj podmien na ilosc stron ktora pojawi sie w rezultacie
  const pageCount = 15;
  const people = [];
  for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
    const page = await fetchPage(pageNumber)
    pages.push(...page);
  }

  const result = generateCvs(people);
  let cvs = '';
  result.forEach(person => {
    cvs += `${person.name};${person.cv}` + "\n"
  })
  var blob = new Blob([cvs], {
    type: 'text/csv;charset=utf-8;'
  });
  var link = document.createElement("a");
  var url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", 'agacia-jest-super.csv');
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

fetchPages();
