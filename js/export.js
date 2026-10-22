import { generateCards, renderCards } from "./app.js";

const wordsInput = document.getElementById("wordsInput");
const gridSize = document.getElementById("gridSize");
const cardCount = document.getElementById("cardCount");
const freeCell = document.getElementById("freeCell");
const freeCellType = document.getElementById("freeCellType");
const freeCellText = document.getElementById("freeCellText");
const freeCellTextGroup = document.getElementById("freeCellTextGroup");
const cardTitle = document.getElementById("cardTitle");
const bgColor = document.getElementById("bgColor");
const borderColor = document.getElementById("borderColor");
const textColor = document.getElementById("textColor");
const freeCellColor = document.getElementById("freeCellColor");
const fontFamily = document.getElementById("fontFamily");
const fontSize = document.getElementById("fontSize");
const fontSizeValue = document.getElementById("fontSizeValue");
const generateBtn = document.getElementById("generateBtn");
const downloadAllBtn = document.getElementById("downloadAllBtn");
const previewGrid = document.getElementById("previewGrid");
const cardTemplate = document.getElementById("cardTemplate");
const statusEl = document.getElementById("status");

let currentCards = [];

function toggleFreeCellText() {
  if (freeCellType.value === "text") {
    freeCellTextGroup.style.display = "flex";
  } else {
    freeCellTextGroup.style.display = "none";
  }
}

fontSize.addEventListener("input", () => {
  fontSizeValue.textContent = fontSize.value;
});

freeCellType.addEventListener("change", toggleFreeCellText);
toggleFreeCellText();

generateBtn.addEventListener("click", async () => {
  statusEl.textContent = "";
  downloadAllBtn.disabled = true;

  try {
    const size = Number(gridSize.value);
    const count = Number(cardCount.value);
    const useFree = freeCell.checked && size % 2 === 1;

    currentCards = generateCards({
      wordsInput: wordsInput.value,
      gridSize: size,
      cardCount: count,
      useFreeCell: useFree,
      freeCellType: freeCellType.value,
      freeCellText: freeCellText.value,
      cardTitle: cardTitle.value,
      bgColor: bgColor.value,
      borderColor: borderColor.value,
      textColor: textColor.value,
      freeCellColor: freeCellColor.value,
      fontFamily: fontFamily.value,
      fontSize: Number(fontSize.value)
    });

    renderCards(currentCards, previewGrid, cardTemplate);
    downloadAllBtn.disabled = currentCards.length === 0;
    statusEl.textContent = `Geradas ${currentCards.length} cartela(s).`;
  } catch (error) {
    statusEl.textContent = error.message;
  }
});

previewGrid.addEventListener("click", async (event) => {
  const btn = event.target.closest(".download-card");
  if (!btn) return;
  const article = btn.closest(".bingo-card");
  if (!article) return;

  const footer = article.querySelector(".card-footer");
  btn.disabled = true;
  btn.textContent = "Gerando...";
  if (footer) footer.classList.add("export-hide");

  try {
    const canvas = await html2canvas(article, {
      scale: 2,
      backgroundColor: null
    });
    const link = document.createElement("a");
    const id = article.dataset.cardId || "cartela";
    link.download = `cartela-bingo-${id}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  } catch (error) {
    statusEl.textContent = "Erro ao gerar imagem da cartela.";
  } finally {
    if (footer) footer.classList.remove("export-hide");
    btn.disabled = false;
    btn.textContent = "Baixar PNG";
  }
});

downloadAllBtn.addEventListener("click", async () => {
  if (currentCards.length === 0) return;
  downloadAllBtn.disabled = true;
  downloadAllBtn.textContent = "Gerando ZIP...";
  statusEl.textContent = "Gerando imagens para o ZIP... isso pode demorar um pouco.";

  try {
    const zip = new JSZip();
    const cards = Array.from(previewGrid.querySelectorAll(".bingo-card"));

    for (let i = 0; i < cards.length; i += 1) {
      const card = cards[i];
      const footer = card.querySelector(".card-footer");
      if (footer) footer.classList.add("export-hide");
      const canvas = await html2canvas(card, {
        scale: 2,
        backgroundColor: null
      });
      if (footer) footer.classList.remove("export-hide");
      const dataUrl = canvas.toDataURL("image/png");
      const base64 = dataUrl.split(",")[1];
      const id = card.dataset.cardId || i + 1;
      zip.file(`cartela-bingo-${id}.png`, base64, { base64: true });
    }

    const blob = await zip.generateAsync({ type: "blob" });
    saveAs(blob, "cartelas-bingo.zip");
    statusEl.textContent = "ZIP baixado com sucesso.";
  } catch (error) {
    statusEl.textContent = "Erro ao gerar o arquivo ZIP.";
  } finally {
    downloadAllBtn.disabled = false;
    downloadAllBtn.textContent = "Baixar todas em ZIP";
  }
});
