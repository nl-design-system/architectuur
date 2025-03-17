const showTableOfContents = (url: string) =>
  fetch(url).then((response) => {
    response.text().then((svg) => {
      const doc = new DOMParser().parseFromString(svg, "application/xml");
      const isElement = (node: Node): node is Element => node.nodeType === 1;
      const renderFolder = (dataParent: Document | Element, renderParent: Document | Element, selector = "folder") => {
        Array.from(dataParent.childNodes)
          .filter((node) => isElement(node))
          .filter((el) => el.matches(selector))
          .sort((a, b) => (a.getAttribute("name") || "").localeCompare(b.getAttribute("name") || ""))
          .forEach((element) => {
            const folderItem = document.createElement("li");
            folderItem.textContent = element.getAttribute("name");
            renderParent.appendChild(folderItem);
            const subList = folderItem.appendChild(document.createElement("ul"));

            renderFolder(element, subList);

            // TODO: Refactor to not creating a list at all
            if (subList.childNodes.length === 0) {
              folderItem.removeChild(subList);
            }
          });

        Array.from(dataParent.childNodes)
          .filter((node) => isElement(node))
          .filter((el) => el.getAttribute("xsi:type") === "archimate:ArchimateDiagramModel")
          .sort((a, b) => (a.getAttribute("name") || "").localeCompare(b.getAttribute("name") || ""))
          .map((el) => ({
            id: el.getAttribute("id"),
            name: el.getAttribute("name"),
            element: el,
          }))
          .forEach(({ id, name }) => {
            const list = document.createElement("ul");
            const item = list.appendChild(document.createElement("li"));

            if (id) {
              const anchorLink = document.createElement("a");
              anchorLink.href = `#${id}`;
              anchorLink.textContent = name;
              item.appendChild(anchorLink);
            }
            renderParent.appendChild(list);
          });
      };
      const nav = document.body.appendChild(document.createElement("nav"));
      renderFolder(doc.documentElement, nav.appendChild(document.createElement("ul")), 'folder[type="diagrams"]');
    });
  });

showTableOfContents("./nl-design-system.archimate");
