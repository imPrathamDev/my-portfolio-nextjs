import party from "party-js";

const copyToClipBoard = (url: string, id: string | null | undefined) => {
  navigator.clipboard
    .writeText(url)
    .then(() => {
      if (id && id.length > 0) {
        party.confetti(document.getElementById(id)!, {
          count: party.variation.range(20, 40),
          size: party.variation.range(0.8, 1.2),
        });
      }
    })
    .catch(() => {});
};

export default copyToClipBoard;
