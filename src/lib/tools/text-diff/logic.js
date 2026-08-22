// Line-based diff using the standard LCS (longest common subsequence)
// approach. O(m*n) — fine for the modest snippets this tool targets;
// not intended for huge files.
export function diffLines(textA, textB) {
  const a = textA.split("\n");
  const b = textB.split("\n");
  const m = a.length;
  const n = b.length;

  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }

  const result = [];
  let i = 0;
  let j = 0;
  while (i < m && j < n) {
    if (a[i] === b[j]) {
      result.push({ type: "equal", line: a[i] });
      i++;
      j++;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      result.push({ type: "removed", line: a[i] });
      i++;
    } else {
      result.push({ type: "added", line: b[j] });
      j++;
    }
  }
  while (i < m) {
    result.push({ type: "removed", line: a[i] });
    i++;
  }
  while (j < n) {
    result.push({ type: "added", line: b[j] });
    j++;
  }

  return result;
}

export function diffStats(diff) {
  return {
    added: diff.filter((d) => d.type === "added").length,
    removed: diff.filter((d) => d.type === "removed").length,
    unchanged: diff.filter((d) => d.type === "equal").length,
  };
}
