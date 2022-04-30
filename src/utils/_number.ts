export const formater = (amount: number) => {
  if (!amount) {
    return "-";
  }

  const p1 = String(amount).split(".")[0].split("").reverse();
  const p2 = String(amount).split(".")[1];

  let step = 0;
  const r1: string[] = [];

  p1.forEach((p) => {
    step++;
    r1.push(p);
    if (step === 3) {
      step = 0;
      r1.push(" ");
    }
  });

  const f1 = r1.reverse().join("").trim();
  const f2 = p2 ? `,${p2[0] ? p2[0] : ""}${p2[1] ? p2[1] : ""}` : "";

  const wc = `${f1}${f2}`;
  return wc.trim();
};

export default { formater };
