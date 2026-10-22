function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function pickUnique(list, count) {
  const copy = shuffle(list);
  return copy.slice(0, count);
}

function getFreeCellContent(freeCellType, freeCellText) {
  if (freeCellType === "icon-flor") return "✿";
  if (freeCellType === "icon-coracao") return "♥";
  if (freeCellType === "icon-estrela") return "★";
  if (freeCellType === "icon-bolinha") return "●";
  if (freeCellType === "icon-circulo") return "○";
  const text = (freeCellText || "").trim();
  return text.length > 0 ? text : "LIVRE";
}

function buildCardWords(wordsList, gridSize, useFreeCell, freeCellType, freeCellText) {
  const totalCells = gridSize * gridSize;
  const need = useFreeCell && gridSize % 2 === 1 ? totalCells - 1 : totalCells;
  const selected = pickUnique(wordsList, need);
  const cells = [...selected];
  if (useFreeCell && gridSize % 2 === 1) {
    const centerIndex = Math.floor(totalCells / 2);
    cells.splice(centerIndex, 0, getFreeCellContent(freeCellType, freeCellText));
  }
  return cells;
}

export function generateCards({
  wordsInput,
  gridSize,
  cardCount,
  useFreeCell,
  freeCellType,
  freeCellText,
  cardTitle,
  bgColor,
  borderColor,
  textColor,
  freeCellColor,
  fontFamily,
  fontSize
}) {
  const rawWords = wordsInput
    .split(/\r?\n/)
    .map((w) => w.trim())
    .filter((w) => w.length > 0);

  if (rawWords.length === 0) {
    throw new Error("Adicione pelo menos uma palavra na lista.");
  }

  const totalCells = gridSize * gridSize;
  const needWithoutFree = useFreeCell && gridSize % 2 === 1 ? totalCells - 1 : totalCells;

  if (rawWords.length < needWithoutFree) {
    throw new Error(`Para gerar cartelas nesse tamanho, você precisa de pelo menos ${needWithoutFree} palavras diferentes.`);
  }

  const usedSignatures = new Set();
  const cards = [];

  for (let i = 0; i < cardCount; i += 1) {
    let attempts = 0;
    let cells = [];
    let signature = "";

    do {
      cells = buildCardWords(rawWords, gridSize, useFreeCell, freeCellType, freeCellText);
      signature = cells.join("|");
      attempts += 1;
      if (attempts > 200) {
        break;
      }
    } while (usedSignatures.has(signature));

    usedSignatures.add(signature);
    cards.push({
      id: i + 1,
      cells,
      gridSize,
      cardTitle,
      bgColor,
      borderColor,
      textColor,
      freeCellColor,
      fontFamily,
      fontSize
    });
  }

  return cards;
}

export function renderCards(cards, container, template) {
  container.innerHTML = "";
  for (const card of cards) {
    const node = template.content.cloneNode(true);
    const article = node.querySelector(".bingo-card");
    const titleEl = node.querySelector(".card-title");
    const gridEl = node.querySelector(".card-grid");
    const footer = node.querySelector(".card-footer");

    article.dataset.cardId = card.id;
    article.style.background = card.bgColor;
    article.style.color = card.textColor;
    article.style.fontFamily = card.fontFamily;

    titleEl.textContent = card.cardTitle.trim();

    gridEl.style.gridTemplateColumns = `repeat(${card.gridSize}, minmax(0, 1fr))`;
    gridEl.style.fontSize = `${card.fontSize}px`;

    card.cells.forEach((word) => {
      const cell = document.createElement("div");
      cell.classList.add("card-cell");
      cell.textContent = word;
      cell.style.borderColor = card.borderColor;
      const isFree = card.cells.some((c) => c === word) && (word === "LIVRE" || word === "✿" || word === "♥" || word === "★" || word === "●" || word === "○");
      // simpler: check if it's the center? just style if marked free by logic? easier: we can pass flag; but keep simple
      if ((word === "LIVRE" || word === "✿" || word === "♥" || word === "★" || word === "●" || word === "○")) {
        cell.classList.add("free");
        cell.style.background = card.freeCellColor;
        cell.style.color = "#1f1f1f";
      }
      gridEl.appendChild(cell);
    });

    container.appendChild(node);
  }
}
