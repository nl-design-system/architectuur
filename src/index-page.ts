const showAllFigures = (url: string) =>
  fetch(url).then((response) => {
    response.text().then((svg) => {
      const doc = new DOMParser().parseFromString(svg, 'application/xml');
      Array.from(doc.querySelectorAll('element'))
        .filter((el) => el.getAttribute('xsi:type') === 'archimate:ArchimateDiagramModel')
        .map((el) => ({
          id: el.getAttribute('id'),
          name: el.getAttribute('name'),
          element: el,
        }))
        .forEach(({ id, name }) => {
          const section = document.createElement('section');
          const heading = section.appendChild(document.createElement('h2'));
          heading.textContent = name;

          if (id) {
            heading.id = id;

            heading.textContent = '';
            const anchorLink = document.createElement('a');
            anchorLink.href = `#${id}`;
            anchorLink.textContent = name;
            heading.appendChild(anchorLink);
          }
          const archimateImg = document.createElement('archimate-img');
          archimateImg.setAttribute('src', `${url}#${id}`);
          section.appendChild(archimateImg);
          document.body.appendChild(section);
        });
    });
  });

showAllFigures('./nl-design-system.archimate');
